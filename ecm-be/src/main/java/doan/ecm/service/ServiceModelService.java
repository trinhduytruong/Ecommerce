package doan.ecm.service;

import doan.ecm.dto.Request.ServiceRequestDto;
import doan.ecm.model.ServiceModel;
import doan.ecm.repository.ServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class ServiceModelService {

    private static final Logger logger = LoggerFactory.getLogger(ServiceModelService.class);

    @Autowired
    private ServiceRepository repository;

    public Page<ServiceModel> getLists(int page, int size) {
        try{
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<ServiceModel> serviceModelPage = repository.getLists(pageable);
            logger.info("serviceModelPage: " + serviceModelPage);
            logger.info("List serviceModel: " + serviceModelPage.getContent());
            return serviceModelPage;

        } catch (Exception e){
            logger.error("ServiceRepository.getLists() ", e);
            throw new RuntimeException("Failed to fetch service", e);
        }
    }


    @Transactional
    public ServiceModel create(ServiceRequestDto data) {
        try {
            ServiceModel serviceModel = new ServiceModel();
            serviceModel.setPrice(data.getPrice());
            serviceModel.setDescription(data.getDescription());
            serviceModel.setName(data.getName());
            serviceModel.setSlug(data.getSlug());
            serviceModel.setIs_home_service(data.getIs_home_service());
            serviceModel.setCreated_at(new Date());
            serviceModel.setUpdated_at(new Date());

            logger.info("Create service model: " + serviceModel);
            return repository.save(serviceModel);
        } catch (Exception e){
            logger.error("ServiceRepository.create() ", e);
            throw new RuntimeException("Failed to fetch service", e);
        }
    }

    public ServiceModel update(Long id, ServiceRequestDto requestDto) {
        try {
            Optional<ServiceModel> serviceModelOptional = repository.findById(id);
            if (serviceModelOptional.isPresent()) {
                ServiceModel serviceModel = serviceModelOptional.get();
                serviceModel.setName(requestDto.getName());
                serviceModel.setSlug(requestDto.getSlug());
                serviceModel.setPrice(requestDto.getPrice());
                serviceModel.setDescription(requestDto.getDescription());
                serviceModel.setUpdated_at(new Date());
                serviceModel.setIs_home_service(requestDto.getIs_home_service());

                logger.info("Update service model with ID: " + id);
                return repository.save(serviceModel);
            } else {
                throw new RuntimeException("ServiceModel not found with id " + id);
            }
        } catch (Exception e){
            logger.error("ServiceRepository.update() ", e);
            throw new RuntimeException("Failed to fetch service", e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete service model with ID: " + id);
            } else {
                throw new RuntimeException("ServiceModel not found with id " + id);
            }
        } catch (Exception e){
            logger.error("ServiceRepository.delete() ", e);
            throw new RuntimeException("Failed to fetch service", e);
        }
    }

    public ServiceModel findById(Long id) {
        logger.info("Get service model with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("ServiceModel not found with id " + id));
    }

//    public ServiceModel findBySlug(String slug) {
//        return repository.findBySlug(slug)
//                .orElseThrow(() -> new RuntimeException("Data not found with slug " + slug));
//    }
}
