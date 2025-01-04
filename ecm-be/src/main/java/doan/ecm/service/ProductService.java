package doan.ecm.service;

import doan.ecm.dto.ProductRequest;
import doan.ecm.model.*;
import doan.ecm.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductLabelsRelationRepository productLabelsRelationRepository;


    @Autowired
    private ProductLabelsRepository productLabelsRepository;

    public Page<Product> getListProducts(String name, String status, String productLabelIds,Long category_id,
                                         Long brand_id,
                                         int page, int size, String sort) {
        try {
            Pageable pageable = this.getPageable(page, size, sort);
            Set<Long> productIds  = null;
            if(productLabelIds != null && !productLabelIds.isEmpty()) {
                Set<Long> labelIds= (productLabelIds != null && !productLabelIds.isEmpty()) ?
                        Arrays.stream(productLabelIds.split(",")).map(Long::parseLong).collect(Collectors.toSet()) :
                        null;
                List<ProductsLabels> dataProductsLabels = this.productLabelsRelationRepository.getLists(labelIds, null);
                if(!dataProductsLabels.isEmpty()) {
                    productIds  = dataProductsLabels.stream()
                            .map(productLabel -> productLabel.getProduct().getId())  // Assuming `getId()` returns Long
                            .collect(Collectors.toSet());
                } else {
                    return null;
                }
            }

            Page<Product> productPage = this.productRepository.getListProducts(name, status,
                    productIds, category_id,brand_id, pageable);

            logger.info("productPage: " + productPage);
            logger.info("List product: " + productPage.getContent());
            return productPage;
        } catch (Exception e) {
            logger.error("ProductService.getListProducts(): " + e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Product createProduct(ProductRequest request) {
        try {
            Product newProduct = this.buildData(request, null);
            logger.info("Create product: " + newProduct);
            return productRepository.save(newProduct);
        } catch (Exception e) {
            logger.error("ProductService.createProduct(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Product updateProduct(Long id, ProductRequest request) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            Product newProduct = this.buildData(request, product);

            logger.info("Update product: " + newProduct);
            return productRepository.save(newProduct);
        } catch (Exception e) {
            logger.error("ProductService.updateProduct(): " + e);
            throw new RuntimeException(e);
        }
    }

    public void deleteProduct(Long id) {
        try {
            if (productRepository.existsById(id)) {
                productRepository.deleteById(id);
                logger.info("Delete product with ID: " + id);
            } else {
                throw new RuntimeException("Product not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("ProductService.deleteProduct(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Product getProductById(Long id) {
        logger.info("Get product with ID: " + id);
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    public Product findBySlug(String slug) {
        logger.info("Get product by slug: " + slug);
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found with slug " + slug));
    }

    private Product buildData(ProductRequest requestDto, Product data) {
        if(data == null) {
            data = new Product();
            data.setCreated_at(new Date());
            data.setTotal_rating_score(0);
            data.setTotal_vote_count(0);
        }

        data.setName(requestDto.getName());
        data.setSlug(requestDto.getSlug());
        data.setAvatar(requestDto.getAvatar());
        data.setPrice(requestDto.getPrice());
        data.setSale(requestDto.getSale());
        data.setNumber(requestDto.getNumber());

        data.setContents(requestDto.getContents());

        data.setDescription(requestDto.getDescription());
        data.setImages(requestDto.getImages());
        data.setDescription(requestDto.getDescription());



        if(requestDto.getStatus() != null) {
            data.setStatus(requestDto.getStatus());
        }
        if(data.getStatus() == null) {
            data.setStatus("published");
        }
        // Xử lý category nếu có
        if (requestDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(requestDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            data.setCategory(category);
        }

        // Xử lý category nếu có
        if (requestDto.getBrand() != null) {
            Brand brand = brandRepository.findById(requestDto.getBrand())
                    .orElseThrow(() -> new RuntimeException("Brand not found"));
            data.setBrand(brand);
        }

        if (requestDto.getProductsLabels() == null) {
            data.getLabels().clear();  // Xoá tất cả liên kết labels
        } else {
            Set<ProductLabels> labels = requestDto.getProductsLabels().stream()
                    .map(idLabel -> productLabelsRepository.findById(idLabel)
                            .orElseThrow(() -> new RuntimeException("Label not found: " + idLabel)))
                    .collect(Collectors.toSet());

            data.setLabels(labels);
        }
        data.setUpdated_at(new Date());
        return data;
    }

    private Pageable getPageable(int page, int size, String sort) {
        // If sort is not null or empty, create the Sort object
        if (sort != null && !sort.isEmpty()) {
            // Split the sort criteria by commas to handle multiple fields
            String[] sortParams = sort.split(",");

            // Create Sort.Order objects from the split values (assuming ascending order)
            Sort.Order[] orders = new Sort.Order[sortParams.length];
            for (int i = 0; i < sortParams.length; i++) {
                // Assuming the format is "field,asc" or "field,desc"
                String[] sortParts = sortParams[i].split(":");
                String field = sortParts[0];
                String direction = (sortParts.length > 1 && sortParts[1].equalsIgnoreCase("desc")) ? "desc" : "asc";

                // Add sort order to the orders array
                orders[i] = new Sort.Order(direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, field);
            }

            // Return the Pageable with sorting
            return PageRequest.of(page - 1, size, Sort.by(orders));
        } else {
            // If no sort is provided, return a Pageable without sorting
            return PageRequest.of(page - 1, size);
        }
    }
}
