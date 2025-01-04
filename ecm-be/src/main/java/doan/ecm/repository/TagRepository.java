package doan.ecm.repository;

import doan.ecm.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {


    @Query("SELECT m FROM Tag m WHERE (:name = '' OR :name IS NULL OR m.name LIKE %:name%)")
    Page<Tag> getLists(@Param("name") String name, Pageable pageable);

    Optional<Tag> findBySlug(String slug);
}
