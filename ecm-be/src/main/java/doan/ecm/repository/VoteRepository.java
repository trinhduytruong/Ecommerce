package doan.ecm.repository;

import doan.ecm.model.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    @Query("SELECT c FROM Vote c WHERE " +
            "(:user_id IS NULL OR c.user.id =:user_id) AND " +
            "(:product_id IS NULL OR c.product.id =:product_id) AND " +
            "(:product_name = '' OR :product_name IS NULL OR c.product.name LIKE %:product_name% ) AND " +
            "(:full_name = '' OR  :full_name IS NULL OR c.user.name LIKE %:full_name%) AND " +
            "(:status = '' OR :status IS NULL OR c.status = :status)")
    Page<Vote> getList(@Param("user_id") Long user_id,
                                     @Param("product_id") Long product_id,
                       @Param("status") String status,
                       @Param("product_name") String product_name,
                       @Param("full_name") String full_name,
                                     Pageable pageable);

}
