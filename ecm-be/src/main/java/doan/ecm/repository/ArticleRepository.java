package doan.ecm.repository;

import doan.ecm.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("SELECT m FROM Article m  WHERE " +
            "(:name = '' OR :name IS NULL OR m.name LIKE %:name%) AND " +
            "(:status = '' OR :status IS NULL OR m.status=:status) AND " +
            "(:menu_id IS NULL OR m.menu.id = :menu_id) AND " +
            "(:articleIds IS NULL OR m.id IN (:articleIds))")
    Page<Article> getLists(Pageable pageable,
                           @Param("name") String name,
                           @Param("articleIds")  Set<Long> articleIds ,
                           @Param("menu_id") Long menu_id,
                           @Param("status") String status
                           );

    @Query("SELECT a FROM Article a JOIN a.tags t WHERE t.id IN :tagIds GROUP BY a.id")
    Page<Article> getListsByTagIds(@Param("tagIds") Set<Long> tagIds, Pageable pageable);

    Optional<Article> findBySlug(String slug);
}
