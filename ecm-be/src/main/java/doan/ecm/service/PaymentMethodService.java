package doan.ecm.service;

import doan.ecm.model.PaymentMethod;
import doan.ecm.repository.PaymentMethodRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PaymentMethodService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentMethodService.class);

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    public Page<PaymentMethod> getListPaymentsMethod(String name, String status, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<PaymentMethod> paymentMethodPage = paymentMethodRepository.getListPaymentsMethod(name, status, pageable);
            logger.info("paymentMethodPage: " + paymentMethodPage);
            logger.info("List paymentMethod: " + paymentMethodPage.getContent());
            return paymentMethodPage;
        } catch (Exception e) {
            logger.error("PaymentMethodService.getListPaymentsMethod(): " + e);
            throw new RuntimeException(e);
        }
    }
}
