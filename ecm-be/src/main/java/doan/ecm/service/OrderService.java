package doan.ecm.service;

import doan.ecm.dto.Request.OrderRequest;
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

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private static final String PREFIX = "OD";
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 10 - PREFIX.length();

    @Autowired
    private OrderRepository repository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private UserViewRepository userViewRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public Page<Order> getLists(String code, String status, Long user_id,
                                String full_name, String phone, String paymentStatus,int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<Order> orderPage = repository.getLists(code, status,user_id, full_name, phone,paymentStatus, pageable);
            logger.info("orderPage: " + orderPage);
            logger.info("List order: " + orderPage.getContent());
            return orderPage;
        } catch (Exception e){
            logger.error("OrderService.getLists() ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
    }

    @Transactional
    public Order create(OrderRequest orderData) {
        try {
            Order order = this.buildOrder(orderData, null);
            order = repository.save(order);
            if(!orderData.getProducts().isEmpty()) {
                // Save product details into transactions
                this.buildTransaction(order, orderData.getProducts());
            }
            Optional<Order> orderOptional = repository.findById(order.getId());
            Order newOrder = orderOptional.isPresent() ? orderOptional.get() : null;
            logger.info("Create order: " + newOrder);
            return newOrder;
        } catch (Exception e){
            logger.error("OrderService.create() ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
    }

    @Transactional
    public Order update(Long id, OrderRequest orderRequest) {
        try {
            Order order = repository.getById(id);
            if (order != null) {
                Order newOrder = this.buildOrder(orderRequest, order);
                if(orderRequest.getProducts() != null && !orderRequest.getProducts().isEmpty()) {
                    this.transactionRepository.deleteByOrderId(id);
                    this.buildTransaction(newOrder, orderRequest.getProducts());
                }

                logger.info("Update order: " + newOrder);
                return repository.save(newOrder);
            } else {
                throw new RuntimeException("Order not found with ID: " + id);
            }
        } catch (Exception e){
            logger.error("OrderService.update() ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
    }

    @Transactional
    public Order updatePaymentStatus(Order order) {
        try {
            Order existingOpt = repository.getById(order.getId());
            if (existingOpt != null) {
                existingOpt.setPayment_status(order.getPayment_status());
                logger.info("Update order: " + existingOpt);
                return repository.save(existingOpt);
            } else {
                throw new RuntimeException("Order not found");
            }
        } catch (Exception e){
            logger.error("OrderService.updatePaymentStatus() ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
    }

    @Transactional
    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                transactionRepository.deleteByOrderId(id);
                repository.deleteById(id);
                logger.info("Delete order with ID: " + id);
            } else {
                throw new RuntimeException("Order not found with ID: " + id);
            }
        } catch (Exception e){
            logger.error("OrderService.delete() ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
    }

    public Order findById(Long id) {
        logger.info("Get order with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng " + id));
    }

    private Order buildOrder(OrderRequest orderData, Order order) {
        if(order == null) {
            order = new Order();
            order.setCreated_at(new Date());
            if(orderData.getCoupon_code() != null && !orderData.getCoupon_code().isEmpty()) {
                Voucher voucher = voucherRepository.findVoucherByCode(orderData.getCoupon_code());
                if(voucher == null) {
                    throw new RuntimeException("Mã giảm giá không tồn tại.");
                }
                voucher.setTotal_used(voucher.getTotal_used() + 1);
                order.setCoupon_code(orderData.getCoupon_code());  // Set coupon code
                order.setDiscount_amount(BigDecimal.valueOf(voucher.getPrice() != null ? voucher.getPrice() : 0));  // Set discount amount

            }
            if(orderData.getUser_id() != null) {
                Optional<UserView> user = userViewRepository.findById(orderData.getUser_id());
                if(user.isPresent()) {
                    order.setUser(user.get());
                }
            }
            order.setCode(generateOrderCode(10));  // Set code

        } else {
            if(orderData.getUser_id() != null) {
                Optional<UserView> user = userViewRepository.findById(orderData.getUser_id());
                if(user.isPresent()) {
                    order.setUser(user.get());
                }
            }
        }
        if(order.getDiscount_amount() == null) {
            order.setDiscount_amount(new BigDecimal(0));
        }
        if(orderData.getPayment_method_id() != null) {
            order.setPayment_method_id(orderData.getPayment_method_id());
        }
        if(orderData.getTotal_amount() != null) {
            BigDecimal subTotal = orderData.getTotal_amount().add(orderData.getShipping_fee() != null ? orderData.getShipping_fee() : BigDecimal.ZERO);
            order.setSub_total(subTotal.subtract(order.getDiscount_amount()  != null ? order.getDiscount_amount() : BigDecimal.ZERO));  // Set subtotal
        }
        if(order.getCode() == null) {
            order.setCode(generateOrderCode(10));  // Set code
        }

        order.setTotal_shipping_fee(orderData.getShipping_fee() != null ? orderData.getShipping_fee() : (order.getShipping_amount() != null ? order.getShipping_amount() : BigDecimal.ZERO));  // Set shipping fee

        order.setPayment_status(orderData.getPayment_status() != null ? orderData.getPayment_status() : (order.getPayment_status() != null ? order.getPayment_status() : "pending"));  // Set payment status
        order.setStatus(orderData.getStatus()!= null ? orderData.getStatus() : "pending");  // Set order status

        order.setAmount(orderData.getTotal_amount() != null ? orderData.getTotal_amount() : BigDecimal.ZERO);  // Set total amount
        order.setAddress(orderData.getAddress() != null ? orderData.getAddress() : order.getAddress());  // Set total amount
        order.setShipping_amount(orderData.getShipping_fee() != null ? orderData.getShipping_fee() : BigDecimal.ZERO);  // Set shipping amount
        order.setTax_amount(orderData.getTax_amount() != null ? orderData.getTax_amount() : BigDecimal.ZERO);  // Set tax amount
        order.setCompleted_at(orderData.getCompleted_at() != null ? new Date(orderData.getCompleted_at()) : new Date());  // Set completed_at
        order.setNotes(orderData.getNotes());  // Set notes
        order.setUpdated_at(new Date());  // Set notes

        return order;
    }


    private void buildTransaction(Order order, List<OrderRequest.ProductData> products) {
        if(!products.isEmpty()) {
            // Save product details into transactions
            for (OrderRequest.ProductData productData : products) {
                Product product = productRepository.getById(productData.getId());
                if(product != null) {
                    BigDecimal totalProductPrice = new BigDecimal(product.getPrice()).multiply(new BigDecimal(productData.getQuantity()));
                    Transaction transaction = new Transaction();
                    transaction.setOrder(order);
                    transaction.setPrice(product.getPrice());
                    transaction.setQty(productData.getQuantity());
                    transaction.setProduct(product);
                    transaction.setTotal_price(totalProductPrice);
                    transaction.setStatus(order.getStatus() != null ? order.getStatus() : "pending");
                    transactionRepository.save(transaction);
                }

            }
        }
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
}
