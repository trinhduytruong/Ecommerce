package doan.ecm.service;

import doan.ecm.model.UserView;
import doan.ecm.repository.UserViewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserViewRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Page<UserView> getLists(int page, int size, String name, String email, String phone, Integer status) {
        try {
            Pageable pageable = PageRequest.of(page - 1, size);
            Page<UserView> userViewPage = repository.getListByConditions(name, email, phone, status, pageable);
            logger.info("userViewPage: " + userViewPage);
            logger.info("List UserView: " + userViewPage.getContent());
            return userViewPage;
        } catch (Exception e){
            logger.error("UserService.getLists() ", e);
            throw new RuntimeException(e);
        }
    }

    public UserView create(UserView userView) {
        try {
            userView.setCreated_at(new Date());
            userView.setUpdated_at(new Date());
            if(userView.getPassword() != null && !userView.getPassword().isEmpty()) {
                userView.setPassword(passwordEncoder.encode(userView.getPassword()));
            }

            logger.info("Create UserView: " + userView);
            return repository.save(userView);
        } catch (Exception e){
            logger.error("UserService.create() ", e);
            throw new RuntimeException(e);
        }
    }

    public UserView update(Long id, UserView user) {
        try {
            Optional<UserView> userViewOptional = repository.findById(id);
            if (userViewOptional.isPresent()) {
                UserView existingUser = this.buildData(user, userViewOptional.get());

                logger.info("Update user with ID: " + id);
                return repository.save(existingUser);
            } else {
                throw new RuntimeException("User not found with ID: " + id);
            }
        } catch (Exception e){
            logger.error("UserService.update() ", e);
            throw new RuntimeException(e);
        }
    }


    public UserView updateProfile(Long id, UserView user) {
        Optional<UserView> userViewOptional = repository.findById(id);

        if (userViewOptional.isPresent()) {
            UserView existingUser = userViewOptional.get();
            if(user.getAvatar() != null) {
                existingUser.setAvatar(user.getAvatar());
            }
            if(user.getName() != null) {
                existingUser.setName(user.getName());
            }
            if(user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }
            if(user.getPhone() != null) {
                existingUser.setPhone(user.getPhone());
            }
            if(user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }

            logger.info("Update user with ID: " + id);
            return repository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

    public void delete(Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                logger.info("Delete user with ID: " + id);
            } else {
                throw new RuntimeException("User not found with id " + id);
            }
        } catch (Exception e){
            logger.error("UserService.delete() ", e);
            throw new RuntimeException(e);
        }
    }

    public UserView findById(Long id) {
        logger.info("Get user with ID: " + id);
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public UserView buildData(UserView requestDto, UserView data) {
        if(data == null) {
            data = new UserView();
            data.setCreated_at(new Date());

        }
        if(!requestDto.getEmail().isEmpty()) {
            UserView email = this.repository.findUserViewByEmail(requestDto.getEmail());
            if(email != null && !Objects.equals(email.getId(), data.getId())) {
                throw new RuntimeException("Email already exists.");
            }
        }

        if(!requestDto.getPhone().isEmpty()) {
            UserView phone = this.repository.findUserViewByPhone(requestDto.getPhone());
            if(phone != null && !Objects.equals(phone.getId(), data.getId())) {
                throw new RuntimeException("Phone already exists.");
            }
        }

        if(!requestDto.getAvatar().isEmpty()) {
            data.setAvatar(requestDto.getAvatar());
        }
        if(requestDto.getName() != null) {
            data.setName(requestDto.getName());
        }
        if(requestDto.getEmail() != null) {
            data.setEmail(requestDto.getEmail());
        }
        if(requestDto.getPhone() != null) {
            data.setPhone(requestDto.getPhone());
        }
        data.setStatus(
                requestDto.getStatus() == 1
                        ? 1
                        : -1
        );
        if(requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
            data.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        }
        data.setUser_type(requestDto.getUser_type() != null ? requestDto.getUser_type() : (data.getUser_type()  != null ? data.getUser_type() : "USER"));
        data.setUpdated_at(new Date());
        return data;
    }
}
