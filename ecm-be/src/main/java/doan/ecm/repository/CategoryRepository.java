package doan.ecm.repository;

import doan.ecm.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE " +
            "(:name = '' OR :name IS NULL OR c.name LIKE %:name%) AND " +
            "(:status = '' OR :status IS NULL OR c.status = :status)")
    Page<Category> getListCategories(@Param("name") String name,
                                     @Param("status") String status,
                                     Pageable pageable);

    List<Category> findAll();
}
