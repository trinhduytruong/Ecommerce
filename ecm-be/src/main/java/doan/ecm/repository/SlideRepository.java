package doan.ecm.repository;

import doan.ecm.model.Slide;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SlideRepository extends JpaRepository<Slide, Long> {
    @Query("SELECT s FROM Slide s")
    Page<Slide> getLists(Pageable pageable);
}
