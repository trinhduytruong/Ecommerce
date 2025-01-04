package doan.ecm.service;

import doan.ecm.model.Brand;
import doan.ecm.repository.BrandRepository;
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
public class BrandService {

    private static final Logger logger = LoggerFactory.getLogger(BrandService.class);

    @Autowired
    private BrandRepository repository;

    public Page<Brand> getLists(String name, String status, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Brand> brandPage = repository.getLists(name, status, pageable);
            logger.info("BrandPage: " + brandPage);
            logger.info("List brand: " + brandPage.getContent());
            return brandPage;
        } catch (Exception e) {
            logger.error("BrandRepository.getLists(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Brand create(Brand brand) {
        try {
            if(brand.getStatus() == null) {
                brand.setStatus("published");
            }
            brand.setCreated_at(new Date());
            brand.setUpdated_at(new Date());
            logger.info("Create brand: " + brand);
            return repository.save(brand);
        } catch (Exception e) {
            logger.error("BrandRepository.create(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Brand update(Long id, Brand brand) {
        try {
            Optional<Brand> brandOptional = repository.findById(id);
            if (brandOptional.isPresent()) {
                Brand existingBrand = brandOptional.get();
                existingBrand.setName(brand.getName());
                existingBrand.setDescription(brand.getDescription());
                existingBrand.setSlug(brand.getSlug());
                existingBrand.setAvatar(brand.getAvatar());
                if(brand.getStatus() != null) {
                    existingBrand.setStatus(brand.getStatus());
                }
                existingBrand.setUpdated_at(new Date());

                logger.info("Update brand with ID: " + id);
                return repository.save(existingBrand);
            } else {
                throw new RuntimeException("Brand not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("BrandRepository.update(): " + e);
            throw new RuntimeException(e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete brand with ID: " + id);
            } else {
                throw new RuntimeException("Brand not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("BrandRepository.delete(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Brand findById(Long id) {
        logger.info("Get brand with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id " + id));
    }
}
