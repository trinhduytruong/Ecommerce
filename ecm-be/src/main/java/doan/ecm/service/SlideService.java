package doan.ecm.service;

import doan.ecm.model.Slide;
import doan.ecm.repository.SlideRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class SlideService {

    private static final Logger logger = LoggerFactory.getLogger(SlideService.class);

    @Autowired
    private SlideRepository repository;

    public Page<Slide> getLists(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Slide> slidePage = repository.getLists(pageable);
            logger.info("slidePage: " + slidePage);
            logger.info("List slide: " + slidePage.getContent());
            return slidePage;
        } catch (Exception e) {
            logger.error("SlideService.getLists(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Slide create(Slide slide) {
        try {
            slide.setCreated_at(new Date());
            slide.setUpdated_at(new Date());
            slide.setStatus(slide.getStatus() != null ? slide.getStatus() : "published");
            logger.info("Create slide: " + slide);
            return repository.save(slide);
        } catch (Exception e) {
            logger.error("SlideService.create(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Slide update(Long id, Slide slide) {
        try {
            Optional<Slide> slideOptional = repository.findById(id);
            if (slideOptional.isPresent()) {
                Slide existingSlide = slideOptional.get();
                existingSlide.setName(slide.getName());
                existingSlide.setAvatar(slide.getAvatar());
                existingSlide.setDescription(slide.getDescription());
                existingSlide.setPosition(slide.getPosition());
                if(slide.getStatus() != null) {
                    existingSlide.setStatus(slide.getStatus());
                }
                if(slide.getStatus() == null) {
                    existingSlide.setStatus("published");
                }
                existingSlide.setLink(slide.getLink());
                existingSlide.setPage(slide.getPage());
                existingSlide.setUpdated_at(new Date());

                logger.info("Update slide with ID: " + id);
                return repository.save(existingSlide);
            } else {
                throw new RuntimeException("Slide not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("SlideService.update(): " + e);
            throw new RuntimeException(e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete slide with ID: " + id);
            } else {
                throw new RuntimeException("Slide not found with id " + id);
            }
        } catch (Exception e) {
            logger.error("SlideService.delete(): " + e);
            throw new RuntimeException(e);
        }
    }

    public Slide findById(Long id) {
        logger.info("Get slide with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slide not found with id " + id));
    }
}
