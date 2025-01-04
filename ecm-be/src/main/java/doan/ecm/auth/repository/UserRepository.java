package doan.ecm.auth.repository;

import doan.ecm.model.UserView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserView, Long> {
    Optional<UserView> findByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE remember_token = :token AND email_verified_at < :email_at", nativeQuery = true)
    Optional<UserView> findByTokenAndEmailAt(@Param("token") String token, @Param("email_at") Timestamp email_at);


    @Query(value = " SELECT id, name, email, created_at AS joinedDate  FROM users  " +
            " ORDER BY created_at DESC LIMIT :page_size", nativeQuery = true)
    List<Object[]> getNewUser(@Param("page_size") int page_size);
}
