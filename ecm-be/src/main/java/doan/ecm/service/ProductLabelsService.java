package doan.ecm.service;

import doan.ecm.model.ProductLabels;
import doan.ecm.repository.ProductLabelsRepository;
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
public class ProductLabelsService {

    private static final Logger logger = LoggerFactory.getLogger(ProductLabelsService.class);

    @Autowired
    private ProductLabelsRepository repository;

    public Page<ProductLabels> getLists(int page, int size, String name, String status) {
        try{
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<ProductLabels> productLabelsPage = repository.getLists(name, status,pageable);
            logger.info("productLabelsPage: " + productLabelsPage);
            logger.info("List productLabels: " + productLabelsPage.getContent());
            return productLabelsPage;
        } catch (Exception e){
            logger.error("ProductLabelsService.getLists(): ", e);
            throw new RuntimeException("Failed to fetch ProductLabels", e);
        }
    }

    public ProductLabels create(ProductLabels productLabels) {
        try {
            productLabels.setCreated_at(new Date());
            productLabels.setUpdated_at(new Date());
            productLabels.setStatus(productLabels.getStatus() != null ? productLabels.getStatus() :  "published");
            logger.info("Create ProductLabels: " + productLabels);
            return repository.save(productLabels);
        } catch (Exception e){
            logger.error("ProductLabelsService.create(): ", e);
            throw new RuntimeException("Failed to fetch ProductLabels", e);
        }
    }

    public ProductLabels update(Long id, ProductLabels productLabels) {
        try {
            Optional<ProductLabels> productLabelsOptional = repository.findById(id);
            if (productLabelsOptional.isPresent()) {
                ProductLabels existingProductLabels = productLabelsOptional.get();
                existingProductLabels.setName(productLabels.getName());
                existingProductLabels.setSlug(productLabels.getSlug());
                if(productLabels.getStatus() != null) {
                    existingProductLabels.setStatus(productLabels.getStatus());
                }
                if(existingProductLabels.getStatus() == null) {
                    existingProductLabels.setStatus("published");
                }
                existingProductLabels.setDescription(productLabels.getDescription());
                existingProductLabels.setUpdated_at(new Date());

                logger.info("Update ProductLabels with ID: " + id);
                return repository.save(existingProductLabels);
            } else {
                throw new RuntimeException("ProductLabels not found with id " + id);
            }
        } catch (Exception e){
            logger.error("ProductLabelsService.update(): ", e);
            throw new RuntimeException("Failed to fetch ProductLabels", e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete ProductLabels with ID: " + id);
            } else {
                throw new RuntimeException("ProductLabels not found with id " + id);
            }
        } catch (Exception e){
            logger.error("ProductLabelsService.delete(): ", e);
            throw new RuntimeException("Failed to fetch ProductLabels", e);
        }
    }

    public ProductLabels findById(Long id) {
        logger.info("Get ProductLabels with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data not found with id " + id));
    }
}
