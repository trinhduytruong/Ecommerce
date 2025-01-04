package doan.ecm.repository;

import doan.ecm.model.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    @Query("SELECT pc FROM PaymentMethod pc WHERE " +
            "(:name = '' OR :name IS NULL OR pc.name LIKE %:name%) AND " +
            "(:status = '' OR :status IS NULL OR pc.status = :status)")
    Page<PaymentMethod> getListPaymentsMethod(@Param("name") String name,
                                     @Param("status") String status,
                                     Pageable pageable);

    PaymentMethod findPaymentMethodByIsDefault(int type);


}
