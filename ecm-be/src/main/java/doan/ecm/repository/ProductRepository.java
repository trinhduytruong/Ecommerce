package doan.ecm.repository;

import doan.ecm.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT  p FROM Product p WHERE " +
            " (:name = '' OR :name IS NULL OR p.name LIKE %:name%) AND " +
            "(:status = '' OR :status IS NULL OR p.status = :status) AND " +
            "(:category_id IS NULL OR p.category.id = :category_id) AND " +
            "(:brand_id IS NULL OR p.brand.id = :brand_id) AND " +
            "(:productIds IS NULL OR p.id IN (:productIds))")
    Page<Product> getListProducts(@Param("name") String name,
                                  @Param("status") String status,
                                  @Param("productIds") Set<Long> productIds,
                                  @Param("category_id") Long category_id,
                                  @Param("brand_id") Long brand_id,
                                  Pageable pageable);
    Optional<Product> findBySlug(String slug);
}
