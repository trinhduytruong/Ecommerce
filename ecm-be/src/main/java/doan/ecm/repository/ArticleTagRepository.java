package doan.ecm.repository;

import doan.ecm.model.ArticleTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long> {
    void deleteByArticleId(Long articleId);

    @Query("SELECT m FROM ArticleTag m WHERE " +
            "(:labelId IS NULL OR m.tag.id IN :labelId) AND " +
            "(:productId IS NULL OR m.article.id IN :productId)")
    List<ArticleTag> getLists(@Param("labelId") Set<Long> labelId,
                              @Param("productId") Set<Long> productId);
}
