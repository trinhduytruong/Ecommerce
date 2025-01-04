package doan.ecm.repository;

import doan.ecm.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    void deleteByOrderId(Long orderId);

}
