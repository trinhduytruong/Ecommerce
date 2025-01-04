package doan.ecm.repository;

import doan.ecm.model.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    @Query("SELECT c FROM Voucher c WHERE " +
            "(:name = '' OR :name IS NULL OR c.name LIKE %:name%) AND " +
            "(:type = '' OR :name IS NULL OR c.type LIKE %:type%) AND " +
            "(:status = '' OR :status IS NULL OR c.status = :status)")
    Page<Voucher> getListPagination(@Param("name") String name,
                                     @Param("status") String status,
                                     @Param("type") String type,
                                     Pageable pageable);

    List<Voucher> findAll();
    Voucher findVoucherByCode(String code);
}
