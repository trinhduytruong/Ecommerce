package doan.ecm.repository;

import doan.ecm.model.ServiceModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
    @Query("SELECT s FROM ServiceModel s")
    Page<ServiceModel> getLists(Pageable pageable);
}
