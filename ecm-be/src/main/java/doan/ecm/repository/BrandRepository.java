package doan.ecm.repository;

import doan.ecm.model.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query("SELECT b FROM Brand b WHERE " +
            "(:name = '' OR :name IS NULL OR b.name LIKE %:name%) AND " +
            "(:status = '' OR :status IS NULL OR b.status = :status)")
    Page<Brand> getLists(@Param("name") String name,
                                     @Param("status") String status,
                                     Pageable pageable);
}
