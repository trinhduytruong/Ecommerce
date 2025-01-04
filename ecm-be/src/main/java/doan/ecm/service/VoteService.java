package doan.ecm.service;

import doan.ecm.dto.Request.VoteRequest;
import doan.ecm.model.*;
import doan.ecm.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    private static final Logger logger = LoggerFactory.getLogger(VoteService.class);

    @Autowired
    private VoteRepository repository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserViewRepository userViewRepository;


    public Page<Vote> getLists(Long user_id, Long product_id, String status,
                               String product_name, String full_name,
                               int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Vote> votePage = repository.getList(user_id, product_id, status, product_name, full_name, pageable);
            logger.info("votePage: " + votePage);
            logger.info("List vote: " + votePage.getContent());
            return votePage;
        } catch (Exception e){
            logger.error("VoteService.getLists() ", e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Vote create(VoteRequest voteRequest) {
        try {
            Page<Vote> pageable =  this.getLists(voteRequest.getUser_id(), voteRequest.getProduct_id(), null,null,null, 1, 1);
            if(pageable.getTotalElements() > 0) {
                throw new RuntimeException("You have rated this product.");
            }
            Vote data = this.buildData(voteRequest, null);
            data = repository.save(data);
            if(data != null) {
                Product product = productRepository.getById(voteRequest.getProduct_id());
                if(product != null) {
                    int totalRate = product.getTotal_vote_count();
                    int totalScore = product.getTotal_rating_score();
                    product.setTotal_vote_count(totalRate + 1);
                    product.setTotal_rating_score(totalScore + voteRequest.getRating());
                    productRepository.save(product);
                }
            }
            Optional<Vote> voteOptional = repository.findById(data.getId());
            Vote vote = voteOptional.isPresent() ? voteOptional.get() : null;
            logger.info("Create vote: " + vote);
            return vote;
        } catch (Exception e){
            logger.error("VoteService.create() ", e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void createMultipleVote(List<VoteRequest> requestDto) {
       if(!requestDto.isEmpty()) {
           for (VoteRequest item: requestDto) {
               this.create(item);
           }
       }
    }

    @Transactional
    public Vote update(Long id, VoteRequest voteRequest) {
        try {
            Vote vote = repository.getById(id);
            if (vote != null) {
                Vote newData = this.buildData(voteRequest, vote);
                logger.info("Update vote with ID: " + id);
                return repository.save(newData);
            } else {
                throw new RuntimeException("Vote not found with id " + id);
            }
        } catch (Exception e){
            logger.error("VoteService.update() ", e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete vote with ID: " + id);
            } else {
                throw new RuntimeException("Vote not found with id " + id);
            }
        } catch (Exception e){
            logger.error("VoteService.delete() ", e);
            throw new RuntimeException(e);
        }
    }

    public Vote findById(Long id) {
        logger.info("Get vote with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data not found with id " + id));
    }
    private Vote buildData(VoteRequest dataRequest, Vote data) {
        if(data == null) {
            data = new Vote();
            data.setCreated_at(new Date());
            data.setStatus(dataRequest.getStatus() != null ? dataRequest.getStatus() :  "pending");
            if(dataRequest.getUser_id() != null) {
                Optional<UserView> user = userViewRepository.findById(dataRequest.getUser_id());
                if(user.isPresent()) {
                    data.setUser(user.get());
                }
            }
            if(dataRequest.getProduct_id() != null) {
                Optional<Product> product = productRepository.findById(dataRequest.getProduct_id());
                if(product.isPresent()) {
                    data.setProduct(product.get());
                }
            }
        }

        data.setComment(dataRequest.getComment() != null ? dataRequest.getComment() : data.getComment());
        data.setRating(dataRequest.getRating());
        data.setUpdated_at(new Date());  // Set notes

        return data;
    }
}
