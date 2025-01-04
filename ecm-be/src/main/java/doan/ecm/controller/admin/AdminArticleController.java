package doan.ecm.controller.admin;

import doan.ecm.common.PaginatedResponse;
import doan.ecm.common.ResponseHelper;
import doan.ecm.dto.ArticleRequest;
import doan.ecm.model.Article;
import doan.ecm.model.Menu;
import doan.ecm.service.ArticleService;
import doan.ecm.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/articles")
public class AdminArticleController {

    private static final Logger logger = LoggerFactory.getLogger(AdminArticleController.class);

    @Autowired
    private ArticleService service;

    @Autowired
    private MenuService menuService;


    @GetMapping
    public PaginatedResponse<Article> getListsArticle(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "20") int page_size,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "status", required = false, defaultValue = "") String status,
            @RequestParam(value = "menu_id", required = false) Long menu_id,
            @RequestParam(value = "tag_ids", required = false, defaultValue = "") String tagIds) {
        logger.info("##### REQUEST RECEIVED (getListsArticle) [Admin] #####");
        try {
            Page<Article> lists = this.service.getLists(page, page_size,name, tagIds, menu_id, status);
            return ResponseHelper.createPaginatedResponse("success", 0, "successfully", lists);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseHelper.createPaginatedResponse("errors", 0, "successfully", null);
        } finally {
            logger.info("##### REQUEST FINISHED (getListsArticle) [Admin] #####");
        }
    }

    @PostMapping
    public ResponseEntity<PaginatedResponse.SingleResponse<Article>> createArticle(@RequestBody ArticleRequest articleRequest) {
        logger.info("##### REQUEST RECEIVED (createArticle) [Admin] #####");
        try {
            Menu menu = menuService.findById(articleRequest.getMenuId());
            Article article = new Article();
            article.setName(articleRequest.getName());
            article.setSlug(articleRequest.getSlug());
            article.setStatus(articleRequest.getStatus() != null ? articleRequest.getStatus() : "published");
            article.setDescription(articleRequest.getDescription());
            article.setIs_featured(articleRequest.getIsFeatured());
            article.setViews(articleRequest.getViews());
            article.setAvatar(articleRequest.getAvatar());
            article.setContent(articleRequest.getContent());
            article.setMenu(menu);

            Article createdArticle = service.create(article, articleRequest.getTags());
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", createdArticle
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (createArticle) [Admin] #####");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Article>> updateArticle(
            @PathVariable Long id,
            @RequestBody ArticleRequest article) {
        logger.info("##### REQUEST RECEIVED (updateArticle) [Admin] #####");
        try {
            Article updateModel = service.update(id, article);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", updateModel
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (updateArticle) [Admin] #####");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Article>> deleteArticle(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (deleteArticle) [Admin] #####");
        try {
            service.delete(id);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", null
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Exception: " + e.getMessage(), e);
            return ResponseEntity.ok(ResponseHelper.createSingleResponse(
                    "error", 0, e.getMessage(), null
            ));
        } finally {
            logger.info("##### REQUEST FINISHED (deleteArticle) [Admin] #####");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaginatedResponse.SingleResponse<Article>> findArticleById(@PathVariable Long id) {
        logger.info("##### REQUEST RECEIVED (findArticleById) [Admin] #####");
        try{
            Article modelData = service.findById(id);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "success", 0, "successfully", modelData
            );
            return ResponseEntity.ok(response);
        } catch (Exception e){
            logger.error("Exception: " + e.getMessage(), e);
            PaginatedResponse.SingleResponse<Article> response = ResponseHelper.createSingleResponse(
                    "errors", 0, "Có lỗi xẩy ra, xin vui lòng thử lại", null
            );
            return ResponseEntity.ok(response);
        } finally {
            logger.info("##### REQUEST FINISHED (findArticleById) [Admin] #####");
        }
    }
}
