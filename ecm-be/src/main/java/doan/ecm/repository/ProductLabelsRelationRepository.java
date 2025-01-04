package doan.ecm.repository;

import doan.ecm.model.ProductsLabels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ProductLabelsRelationRepository extends JpaRepository<ProductsLabels, Long> {
    @Query("SELECT m FROM ProductsLabels m WHERE " +
            "(:labelId IS NULL OR m.label.id IN :labelId) AND " +
            "(:productId IS NULL OR m.product.id IN :productId)")
    List<ProductsLabels> getLists(@Param("labelId") Set<Long> labelId,
                                  @Param("productId") Set<Long> productId);
}
