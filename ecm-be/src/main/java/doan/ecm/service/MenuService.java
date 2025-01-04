package doan.ecm.service;

import doan.ecm.model.Menu;
import doan.ecm.repository.MenuRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class MenuService {

    private static final Logger logger = LoggerFactory.getLogger(MenuService.class);

    @Autowired
    private MenuRepository repository;

    public Page<Menu> getLists(int page, int size, String name) {
        try{
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Menu> menuPage = repository.getLists(name, pageable);
            logger.info("menuPage: " + menuPage);
            logger.info("List menu: " + menuPage.getContent());
            return menuPage;
        } catch (Exception e){
            logger.error("MenuService.getLists() ", e);
            throw new RuntimeException("Failed to fetch menus", e);
        }
    }

    public Menu create(Menu menu) {
        try {
            menu.setCreated_at(new Date());
            menu.setUpdated_at(new Date());
            logger.info("Create menu: " + menu);
            return repository.save(menu);
        } catch (Exception e){
            logger.error("MenuService.create() ", e);
            throw new RuntimeException("Failed to fetch menus", e);
        }
    }

    public Menu update(Long id, Menu menu) {
        try {
            Optional<Menu> menuOptional = repository.findById(id);
            if (menuOptional.isPresent()) {
                Menu existingMenu = menuOptional.get();
                existingMenu.setName(menu.getName());
                existingMenu.setSlug(menu.getSlug());
                if(menu.getStatus() != null) {
                    existingMenu.setStatus(menu.getStatus());
                }
                if(existingMenu.getStatus() == null) {
                    existingMenu.setStatus("published");
                }
                existingMenu.setDescription(menu.getDescription());
                existingMenu.setUpdated_at(new Date());

                logger.info("Update menu with ID: " + id);
                return repository.save(existingMenu);
            } else {
                throw new RuntimeException("Menu not found with id " + id);
            }
        } catch (Exception e){
            logger.error("MenuService.update() ", e);
            throw new RuntimeException("Failed to fetch menus", e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete menu with ID: " + id);
            } else {
                throw new RuntimeException("Menu not found with id " + id);
            }
        } catch (Exception e){
            logger.error("MenuService.delete() ", e);
            throw new RuntimeException("Failed to fetch menus", e);
        }
    }

    public Menu findById(Long id) {
        logger.info("Get menu with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data not found with id " + id));
    }

    public Menu findBySlug(String slug) {
        logger.info("Get menu by slug: " + slug);
        return repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Data not found with slug " + slug));
    }
}
