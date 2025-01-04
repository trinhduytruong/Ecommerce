package doan.ecm.controller.guest;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.model.Article;
import doan.ecm.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/articles")

public class ArticleController {

    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    private ArticleService service;

    @GetMapping
    public PaginatedResponse<Article> getListsArticle(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int page_size,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "menu_id", required = false) Long menu_id,
            @RequestParam(value = "tag_ids", required = false) String tagIds) {
        logger.info("##### REQUEST RECEIVED (getListsArticle) #####");
        try {
            Page<Article> articlePage = this.service.getLists(page, page_size,name, tagIds, menu_id, status);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", articlePage);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsArticle) #####");
        }
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Article>> findArticleBySlug(@PathVariable String slug) {
        logger.info("##### REQUEST RECEIVED (findArticleBySlug) #####");
        try{
            Article article = service.findBySlug(slug);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", article
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findArticleBySlug) #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Article>> findArticleById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findArticleById) #####");
        try{
            Article article = service.findById(id);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", article
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findArticleById) #####");
        }
    }
}
