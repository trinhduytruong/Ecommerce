package doan.ecm.service;

import doan.ecm.model.Voucher;
import doan.ecm.repository.VoucherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

@Service
public class VoucherService {

    private static final Logger logger = LoggerFactory.getLogger(VoucherService.class);

    private static final String PREFIX = "OD";
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 10 - PREFIX.length();

    @Autowired
    private VoucherRepository repository;

    public Page<Voucher> getLists(String name, String status, String type, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Voucher> voucherPage = repository.getListPagination(name, status, type, pageable);
            logger.info("voucherPage: " + voucherPage);
            logger.info("List voucher: " + voucherPage.getContent());
            return voucherPage;
        } catch (Exception e){
            logger.error("VoucherService.getLists() ", e);
            throw new RuntimeException(e);
        }
    }

    public Voucher create(Voucher voucher) {
        try {
            if(voucher.getStatus() == null) {
                voucher.setStatus("published");
            }
            logger.info("Create vote: " + voucher);
            return repository.save(this.buildData(voucher, null));
        } catch (Exception e){
            logger.error("VoucherService.create() ", e);
            throw new RuntimeException(e);
        }
    }

    public Voucher update(Long id, Voucher voucher) {
        try {
            Optional<Voucher> voucherOptional = repository.findById(id);
            if (voucherOptional.isPresent()) {
                Voucher existingVoucher = this.buildData(voucher, voucherOptional.get());
                logger.info("Update vote with ID: " + id);
                return repository.save(existingVoucher);
            } else {
                throw new RuntimeException("Voucher not found with id " + id);
            }
        } catch (Exception e){
            logger.error("VoucherService.update() ", e);
            throw new RuntimeException(e);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete vote with ID: " + id);
            } else {
                throw new RuntimeException("Voucher not found");
            }
        } catch (Exception e){
            logger.error("VoucherService.update() ", e);
            throw new RuntimeException(e);
        }
    }

    public Voucher findById(Long id) {
        logger.info("Get voucher with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found with id " + id));
    }

    public Voucher findByCode(String code) {
        logger.info("Get voucher with code: " + code);
        return repository.findVoucherByCode(code);
    }

    public String generateOrderCode(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder randomCode = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            randomCode.append(CHARACTERS.charAt(index));
        }

        return PREFIX + randomCode.toString();
    }

    private Voucher buildData(Voucher requestDto, Voucher data) {
        if(data == null) {
            data = new Voucher();
            data.setCreated_at(new Date());
            data.setCode(this.generateOrderCode(5));
        }
        data.setName(requestDto.getName() != null ? requestDto.getName() : data.getName());
        data.setDescription(requestDto.getDescription() != null ? requestDto.getDescription() : data.getDescription());
        data.setPrice(requestDto.getPrice() != null ? requestDto.getPrice() : data.getPrice());
        data.setType(requestDto.getType() != null ? requestDto.getType() : "fix");
        data.setStatus(requestDto.getStatus() != null ? requestDto.getStatus() : "published");
        data.setUpdated_at(new Date());
        return data;
    }
}
