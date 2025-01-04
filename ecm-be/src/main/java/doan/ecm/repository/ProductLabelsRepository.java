package doan.ecm.repository;

import doan.ecm.model.ProductLabels;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductLabelsRepository extends JpaRepository<ProductLabels, Long> {
    @Query("SELECT m FROM ProductLabels m WHERE " +
            "(:name = '' OR :name IS NULL OR m.name LIKE %:name%) AND " +
            "(:status = '' OR :status IS NULL OR m.status=:status)")
    Page<ProductLabels> getLists(@Param("name") String name, @Param("status") String status, Pageable pageable);
}
