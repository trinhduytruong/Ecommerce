package doan.ecm.repository;

import doan.ecm.model.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query("SELECT m FROM Menu m WHERE (:name = '' OR :name IS NULL OR m.name LIKE %:name%)")
    Page<Menu> getLists(@Param("name") String name, Pageable pageable);

//    @Query("SELECT m, COUNT(a) AS postCount FROM Menu m LEFT JOIN Article a ON a.menu = m GROUP BY m")
//    Page<Object[]> getListsWithPostCount(Pageable pageable);

    Optional<Menu> findBySlug(String slug);
}
