/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3333
 Source Schema         : core_ecm

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 05/12/2024 01:43:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for acl_model_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS `acl_model_has_permissions`;
CREATE TABLE `acl_model_has_permissions`  (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`, `model_id`, `model_type`) USING BTREE,
  INDEX `model_has_permissions_model_id_model_type_index`(`model_id` ASC, `model_type` ASC) USING BTREE,
  CONSTRAINT `acl_model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `acl_permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of acl_model_has_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for acl_model_has_roles
-- ----------------------------
DROP TABLE IF EXISTS `acl_model_has_roles`;
CREATE TABLE `acl_model_has_roles`  (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `model_id`, `model_type`) USING BTREE,
  INDEX `model_has_roles_model_id_model_type_index`(`model_id` ASC, `model_type` ASC) USING BTREE,
  CONSTRAINT `acl_model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of acl_model_has_roles
-- ----------------------------
INSERT INTO `acl_model_has_roles` VALUES (1, 'App\\Models\\UserApi', 1);

-- ----------------------------
-- Table structure for acl_permissions
-- ----------------------------
DROP TABLE IF EXISTS `acl_permissions`;
CREATE TABLE `acl_permissions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `acl_permissions_name_guard_name_unique`(`name` ASC, `guard_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of acl_permissions
-- ----------------------------
INSERT INTO `acl_permissions` VALUES (1, 'all', 'api', 'all', 'Toàn quyền', '2024-10-20 10:47:11', '2024-10-20 10:47:11');
INSERT INTO `acl_permissions` VALUES (2, 'product_index', 'api', 'product_index', 'Danh sách sản phẩm', '2024-10-20 10:47:11', '2024-10-20 10:47:11');

-- ----------------------------
-- Table structure for acl_role_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS `acl_role_has_permissions`;
CREATE TABLE `acl_role_has_permissions`  (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`, `role_id`) USING BTREE,
  INDEX `acl_role_has_permissions_role_id_foreign`(`role_id` ASC) USING BTREE,
  CONSTRAINT `acl_role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `acl_permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `acl_role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `acl_roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of acl_role_has_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for acl_roles
-- ----------------------------
DROP TABLE IF EXISTS `acl_roles`;
CREATE TABLE `acl_roles`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `acl_roles_name_guard_name_unique`(`name` ASC, `guard_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of acl_roles
-- ----------------------------
INSERT INTO `acl_roles` VALUES (1, 'administrator', 'api', 'Toàn quyền', '2024-10-20 10:47:11', '2024-10-20 10:47:11');
INSERT INTO `acl_roles` VALUES (2, 'manage', 'api', 'Quản lý', '2024-10-20 10:47:11', '2024-10-20 10:47:11');
INSERT INTO `acl_roles` VALUES (3, 'general_director', 'api', 'Tổng giám đốc', '2024-10-20 10:47:11', '2024-10-20 10:47:11');
INSERT INTO `acl_roles` VALUES (4, 'staff', 'api', 'Nhân viên', '2024-10-20 10:47:11', '2024-10-20 10:47:11');

-- ----------------------------
-- Table structure for banks
-- ----------------------------
DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `swift_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banks
-- ----------------------------

-- ----------------------------
-- Table structure for bl_articles
-- ----------------------------
DROP TABLE IF EXISTS `bl_articles`;
CREATE TABLE `bl_articles`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `author_id` int NULL DEFAULT NULL,
  `menu_id` bigint UNSIGNED NOT NULL,
  `is_featured` tinyint NOT NULL DEFAULT 0,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `views` bigint NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bl_articles_menu_id_foreign`(`menu_id` ASC) USING BTREE,
  INDEX `bl_articles_author_id_index`(`author_id` ASC) USING BTREE,
  CONSTRAINT `bl_articles_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `bl_menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bl_articles
-- ----------------------------
INSERT INTO `bl_articles` VALUES (4, 'ĐỘC QUYỀN WEBSITE - VOUCHER 100K CHO KHÁCH HÀNG ĐĂNG KÍ EMAIL', 'doc-quyen-website-voucher-100k-cho-khach-hang-dang-ki-email', 'adadadadada', '<p>Nội dung1212</p>', 'published', NULL, 4, 0, 'http://localhost:3014/uploads/images/6565d76a-5b00-4f17-b461-cb69d2b404b6.jpg', 0, '2024-10-20 10:47:11', '2024-12-04 00:13:49');
INSERT INTO `bl_articles` VALUES (7, 'Tặng ngay Voucher 25K cho khách hàng Follow Zalo YODY trong tháng 10', NULL, 'Ưu đãi cực Hot trong tháng 10, chỉ cần quý khách thao tác theo dõi kênh Zalo OA của YODY sẽ được nhận ngay Voucher giảm giá', '<p>Nội dung</p>', 'published', NULL, 3, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/2.%20ZALO%20YODY%2050K.jpg', 0, '2024-10-27 12:42:41', NULL);
INSERT INTO `bl_articles` VALUES (8, 'Ưu đãi lớn nhất năm 2024 - SALE CUỐI MÙA LÊN ĐẾN 50%', NULL, 'Quý khách có thể thực hiện mua sắm trực tiếp tại hệ thống Online Yody bao gồm Website, Fanpge, Zalo OA hoặc trực tiếp tại hơn 270 cửa hàng YODY trên toàn quốc.', '<p>Nội dung</p>', 'pending', NULL, 4, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-sale-cuoi-mua.png', 0, '2024-10-27 12:42:41', NULL);
INSERT INTO `bl_articles` VALUES (11, 'ĐỘC QUYỀN WEBSITE - VOUCHER 100K CHO KHÁCH HÀNG ĐĂNG KÍ EMAIL', NULL, 'Thời gian nhận và sử dụng mã khuyến mãi kéo dài từ ngày 01/10/2024 đến ngày 31/10/2024. Sau khi nhận mã, khách hàng sẽ sử dụng trực tiếp để mua hàng trên Website (không áp dụng tại cửa hàng).', '<p>Nội dung</p>', 'pending', NULL, 3, 0, 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/4.%20%C4%90%C4%82NG%20K%C3%8D%20TH%C3%94NG%20TIN.jpg', 0, NULL, NULL);
INSERT INTO `bl_articles` VALUES (13, '1212121', NULL, '21', '<p>12212121</p>', 'pending', NULL, 3, 0, 'http://localhost:3014/uploads/images/264f3cbf-b3e6-49c0-9e4b-3bfe4b18a32f.png', 0, NULL, NULL);
INSERT INTO `bl_articles` VALUES (14, 'ádasd', 'adasd', 'ádasdasd', '<p>ádasdasdasdasd</p>', 'published', NULL, 3, 0, 'http://localhost:3014/uploads/images/aef1d33c-e45f-4ab1-b195-690f47845108.jpg', 0, '2024-12-01 18:22:42', '2024-12-01 18:22:42');

-- ----------------------------
-- Table structure for bl_articles_tags
-- ----------------------------
DROP TABLE IF EXISTS `bl_articles_tags`;
CREATE TABLE `bl_articles_tags`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_id` bigint UNSIGNED NOT NULL,
  `tag_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bl_articles_tags_article_id_foreign`(`article_id` ASC) USING BTREE,
  INDEX `bl_articles_tags_tag_id_foreign`(`tag_id` ASC) USING BTREE,
  CONSTRAINT `bl_articles_tags_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `bl_articles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bl_articles_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `bl_tags` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bl_articles_tags
-- ----------------------------
INSERT INTO `bl_articles_tags` VALUES (18, 7, 11);
INSERT INTO `bl_articles_tags` VALUES (19, 7, 4);
INSERT INTO `bl_articles_tags` VALUES (24, 14, 3);
INSERT INTO `bl_articles_tags` VALUES (29, 4, 5);
INSERT INTO `bl_articles_tags` VALUES (30, 4, 4);
INSERT INTO `bl_articles_tags` VALUES (31, 4, 8);
INSERT INTO `bl_articles_tags` VALUES (32, 4, 9);

-- ----------------------------
-- Table structure for bl_menus
-- ----------------------------
DROP TABLE IF EXISTS `bl_menus`;
CREATE TABLE `bl_menus`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_featured` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bl_menus
-- ----------------------------
INSERT INTO `bl_menus` VALUES (3, 'Đồng phục', 'dong-phuc', 'Đồng phục', 'published', 1, '2024-10-20 10:47:11', NULL);
INSERT INTO `bl_menus` VALUES (4, 'Tin tức thời trang', NULL, 'Tin tức thời trang', 'published', 1, '2024-10-25 09:53:11', NULL);
INSERT INTO `bl_menus` VALUES (5, 'ádasdasd', 'adasdasd', '123123', 'pending', 1, '2024-12-04 00:43:05', '2024-12-04 00:43:05');

-- ----------------------------
-- Table structure for bl_tags
-- ----------------------------
DROP TABLE IF EXISTS `bl_tags`;
CREATE TABLE `bl_tags`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_featured` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bl_tags
-- ----------------------------
INSERT INTO `bl_tags` VALUES (1, 'thời trang nổi bật', 'thoi-trang-noi-bat', 'thời trang nổi bật123', 'pending', 1, '2024-10-20 10:47:11', NULL);
INSERT INTO `bl_tags` VALUES (3, 'Đồng phục', NULL, 'Đồng phục', 'published', 1, '2024-10-20 10:47:11', NULL);
INSERT INTO `bl_tags` VALUES (4, 'thời trang nổi bật', NULL, 'thời trang nổi bật', 'published', 1, '2024-10-25 09:58:38', NULL);
INSERT INTO `bl_tags` VALUES (5, 'xu hướng', NULL, 'xu hướng', 'published', 1, '2024-10-25 09:58:38', NULL);
INSERT INTO `bl_tags` VALUES (6, 'thoáng mát', NULL, 'thoáng mát', 'published', 1, '2024-10-25 09:58:38', NULL);
INSERT INTO `bl_tags` VALUES (7, 'thời trang nổi bật', NULL, 'thời trang nổi bật', 'published', 1, '2024-10-25 10:12:45', NULL);
INSERT INTO `bl_tags` VALUES (8, 'xu hướng', NULL, 'xu hướng', 'published', 1, '2024-10-25 10:12:45', NULL);
INSERT INTO `bl_tags` VALUES (9, 'thoáng mát', NULL, 'thoáng mát', 'published', 1, '2024-10-25 10:12:45', NULL);
INSERT INTO `bl_tags` VALUES (11, 'xu hướng 1221', NULL, 'xu hướng', 'pending', 0, '2024-10-26 03:51:50', NULL);
INSERT INTO `bl_tags` VALUES (12, 'thoáng mát', 'thoang-mat', 'thoáng mát', 'published', 1, '2024-10-26 03:51:50', NULL);
INSERT INTO `bl_tags` VALUES (14, '2212', NULL, '2121211', 'pending', 0, NULL, NULL);
INSERT INTO `bl_tags` VALUES (16, 'từ khoá mới nhập', NULL, 'từ khoá mới nhập', 'pending', 0, NULL, NULL);
INSERT INTO `bl_tags` VALUES (17, 'test', 'test', 'test', 'pending', 0, NULL, NULL);
INSERT INTO `bl_tags` VALUES (18, 'test', 'test', 'test', 'pending', 0, NULL, NULL);
INSERT INTO `bl_tags` VALUES (19, 'đồng', 'dong', 'đồng', 'pending', 0, NULL, NULL);
INSERT INTO `bl_tags` VALUES (20, '123123', '123123', '123123', 'pending', 0, '2024-12-04 00:18:39', '2024-12-04 00:18:39');
INSERT INTO `bl_tags` VALUES (21, 'test nhé', 'test-nhe', 'test nhé', 'pending', 0, '2024-12-04 00:34:14', '2024-12-04 00:34:14');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `parent_id` int NOT NULL DEFAULT 0,
  `title_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `keywords_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `index_seo` tinyint NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `categories_parent_id_index`(`parent_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (5, 'Dầu dưỡng xả', 'dau-duong-xa', NULL, NULL, 'published', 'Dầu dưỡng xả', 0, NULL, NULL, NULL, 1, '2024-10-20 10:47:11', '2024-12-02 17:49:57');
INSERT INTO `categories` VALUES (7, 'Tạo kiểu tóc', 'tao-kieu-toc', NULL, NULL, 'pending', 'Tạo kiểu tóc123', 0, NULL, NULL, NULL, 1, '2024-10-25 08:47:55', '2024-12-01 04:27:58');
INSERT INTO `categories` VALUES (8, 'Chăm sóc da mặt', 'cham-soc-da-mat', NULL, NULL, 'pending', 'Chăm sóc da mặt', 0, NULL, NULL, NULL, 1, '2024-10-25 08:47:55', '2024-12-01 19:27:59');
INSERT INTO `categories` VALUES (10, 'Chăm sóc tóc', 'cham-soc-toc', NULL, NULL, 'pending', 'Chăm sóc tóc', 0, NULL, NULL, NULL, 1, '2024-10-25 08:47:55', NULL);
INSERT INTO `categories` VALUES (11, 'Chăm sóc cơ thể', 'cham-soc-co-the', NULL, NULL, 'pending', 'Chăm sóc cơ thể', 0, NULL, NULL, NULL, 1, '2024-10-25 08:47:55', NULL);
INSERT INTO `categories` VALUES (12, 'Thực phẩm chức năng', 'thuc-pham-chuc-nang', NULL, NULL, 'pending', 'Thực phẩm chức năng', 0, NULL, NULL, NULL, 1, '2024-10-25 08:47:55', NULL);
INSERT INTO `categories` VALUES (13, 'ádasd', 'adasd', NULL, NULL, 'pending', 'ádasdasd', 0, NULL, NULL, NULL, 0, '2024-12-01 19:27:30', '2024-12-01 19:27:30');

-- ----------------------------
-- Table structure for ec_attribute_values
-- ----------------------------
DROP TABLE IF EXISTS `ec_attribute_values`;
CREATE TABLE `ec_attribute_values`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `attribute_id` bigint UNSIGNED NOT NULL,
  `is_default` tinyint NOT NULL DEFAULT 0,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_attribute_values_attribute_id_foreign`(`attribute_id` ASC) USING BTREE,
  CONSTRAINT `ec_attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `ec_attributes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_attribute_values
-- ----------------------------

-- ----------------------------
-- Table structure for ec_attributes
-- ----------------------------
DROP TABLE IF EXISTS `ec_attributes`;
CREATE TABLE `ec_attributes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT 0,
  `is_use_in_product_listing` tinyint NOT NULL DEFAULT 0,
  `use_image_from_product_variation` tinyint NOT NULL DEFAULT 0,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_attributes
-- ----------------------------

-- ----------------------------
-- Table structure for ec_brands
-- ----------------------------
DROP TABLE IF EXISTS `ec_brands`;
CREATE TABLE `ec_brands`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `title_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `keywords_seo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `index_seo` tinyint NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_brands
-- ----------------------------
INSERT INTO `ec_brands` VALUES (1, 'Chanel', 'chanel', NULL, 'published', 'sadasd', NULL, NULL, NULL, 1, '2024-10-20 10:47:11', NULL);
INSERT INTO `ec_brands` VALUES (2, 'Gucci', 'gucci', 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/gucci-logo-inkythuatso-01-02-10-02-14.jpg', 'published', 'ádasdasd', NULL, NULL, NULL, 1, '2024-10-20 10:47:11', '2024-12-01 19:41:29');
INSERT INTO `ec_brands` VALUES (3, 'Zara', 'zara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (4, 'H&M', 'hm', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (5, 'Adidas', 'adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (6, 'Nike', 'nike', 'https://img.favpng.com/25/2/1/swoosh-nike-logo-just-do-it-adidas-png-favpng-KMjV5sizT4FG7v09BEnKe7mRA.jpg', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (7, 'Levi\'s', 'levis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/2560px-Levi%27s_logo.svg.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (8, 'Puma', 'puma', 'https://www.logodesignvalley.com/blog/wp-content/uploads/2023/05/puma-2.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (9, 'Balenciage', 'balenciage', 'https://bizweb.dktcdn.net/thumb/grande/100/106/923/products/balenciaga-logo-3.png?v=1617552563317', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (10, 'Yody', 'yody', 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Yody.png', 'published', NULL, NULL, NULL, NULL, 1, '2024-10-25 08:50:40', NULL);
INSERT INTO `ec_brands` VALUES (11, 'ád', 'ad', 'http://localhost:3014/uploads/images/f7bb13d0-e2b1-4363-8798-ef04d594f851.png', 'pending', 'ádasd', NULL, NULL, NULL, 1, '2024-12-01 19:41:08', '2024-12-01 19:41:08');

-- ----------------------------
-- Table structure for ec_orders
-- ----------------------------
DROP TABLE IF EXISTS `ec_orders`;
CREATE TABLE `ec_orders`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `payment_method_id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_shipping_fee` bigint NOT NULL DEFAULT 0,
  `payment_status` enum('pending','completed','refunding','refunded','fraud','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `status` enum('pending','processing','completed','canceled','returned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `coupon_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `amount` decimal(16, 2) NOT NULL COMMENT 'Tổng tiền hàng',
  `shipping_amount` decimal(16, 2) NOT NULL COMMENT 'Tiền ship',
  `tax_amount` decimal(16, 2) NOT NULL COMMENT 'tiền thuế',
  `discount_amount` decimal(16, 2) NOT NULL COMMENT 'Tiền giảm giá',
  `sub_total` decimal(16, 2) NOT NULL COMMENT 'Tổng tiền',
  `completed_at` datetime NULL DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `supplier_id` int NULL DEFAULT 0,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Địa chỉ giao hàng',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ec_orders_code_unique`(`code` ASC) USING BTREE,
  INDEX `ec_orders_user_id_foreign`(`user_id` ASC) USING BTREE,
  INDEX `ec_orders_payment_method_id_foreign`(`payment_method_id` ASC) USING BTREE,
  CONSTRAINT `ec_orders_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ec_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_orders
-- ----------------------------
INSERT INTO `ec_orders` VALUES (6, 6, 1, 'ODrWfpEv129r', 121212, 'refunding', 'pending', NULL, 24212121.00, 121212.00, 0.00, 0.00, 24333333.00, '2024-11-29 23:39:45', NULL, NULL, '2024-11-29 23:39:45', 0, NULL);
INSERT INTO `ec_orders` VALUES (7, 4, 1, 'ODlilEo2YY', 120000, 'pending', 'pending', NULL, 8260000.00, 120000.00, 0.00, 0.00, 8380000.00, '2024-12-02 14:42:14', NULL, NULL, '2024-12-02 14:42:14', 0, NULL);
INSERT INTO `ec_orders` VALUES (11, 1, 1, 'ODlV5sCoQK', 0, 'completed', 'completed', NULL, 1350000.00, 0.00, 0.00, 0.00, 1350000.00, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `ec_orders` VALUES (12, 1, 1, 'ODXQ4FOYXy', 0, 'completed', 'completed', NULL, 1350000.00, 0.00, 0.00, 0.00, 1350000.00, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `ec_orders` VALUES (13, 10, 1, 'ODobpUVSkG', 0, 'pending', 'pending', NULL, 450000.00, 0.00, 0.00, 0.00, 450000.00, NULL, NULL, '2024-11-14 21:48:01', NULL, 0, NULL);
INSERT INTO `ec_orders` VALUES (14, 9, 1, 'ODMKvJL6Zn', 0, 'pending', 'pending', NULL, 450000.00, 0.00, 0.00, 0.00, 450000.00, NULL, NULL, '2024-11-15 13:51:34', NULL, 0, NULL);
INSERT INTO `ec_orders` VALUES (15, 9, 1, 'ODs49eLm99', 0, 'pending', 'pending', NULL, 340000.00, 0.00, 0.00, 0.00, 340000.00, NULL, NULL, '2024-11-15 23:12:05', NULL, 0, NULL);
INSERT INTO `ec_orders` VALUES (16, 9, 1, 'ODcOgHeMSP', 0, 'pending', 'pending', NULL, 560000.00, 0.00, 0.00, 0.00, 560000.00, NULL, NULL, '2024-11-15 23:14:14', NULL, 0, NULL);
INSERT INTO `ec_orders` VALUES (17, 1, 1, 'ODrbIvAqJGT8', 0, 'completed', 'canceled', NULL, 0.00, 0.00, 0.00, 0.00, 650000.00, '2024-11-26 23:37:13', NULL, '2024-11-26 22:13:58', '2024-11-26 23:37:13', 0, NULL);
INSERT INTO `ec_orders` VALUES (18, 1, 1, 'ODASgXD8ZUVb', 120000, 'pending', 'pending', 'ODvpod6', 650000.00, 120000.00, 0.00, 123.00, 769877.00, '2024-12-04 11:32:37', NULL, '2024-12-01 04:07:25', '2024-12-04 11:32:37', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (19, 1, 1, 'ODzAnwl9bcMi', 12312312, 'pending', 'pending', 'ODvpod6', 6856246.00, 12312312.00, 0.00, 123.00, 19168435.00, '2024-12-04 11:27:19', NULL, '2024-12-01 04:08:23', '2024-12-04 11:27:19', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (20, 1, 2, 'ODHyJRcr1Lwu', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:09:24', 'sadasdas123123', '2024-12-01 04:09:24', '2024-12-01 04:09:24', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (21, 1, 2, 'ODb9H9NltKX4', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:12:23', 'sadasdas123123', '2024-12-01 04:10:49', '2024-12-01 04:12:23', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (22, 1, 1, 'ODX6Hb2D62e6', 0, 'pending', 'pending', 'ODvpod6', 6856246.00, 0.00, 0.00, 123.00, 6856123.00, '2024-12-04 11:29:47', NULL, '2024-12-01 04:13:53', '2024-12-04 11:29:47', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (23, 1, 2, 'ODvQ3ojgiIIM', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:15:20', 'sadasdas123123', '2024-12-01 04:14:06', '2024-12-01 04:15:20', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (24, 1, 2, 'OD7YvHeLmI9P', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:16:55', 'sadasdas123123', '2024-12-01 04:15:36', '2024-12-01 04:16:55', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (25, 1, 2, 'ODJ1OhwPp5av', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:17:53', 'sadasdas123123', '2024-12-01 04:17:39', '2024-12-01 04:17:53', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (26, 1, 2, 'OD8lOrTUBWrW', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:19:33', 'sadasdas123123', '2024-12-01 04:19:33', '2024-12-01 04:19:33', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (27, 1, 2, 'ODE1YRMPWWw3', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:19:38', 'sadasdas123123', '2024-12-01 04:19:38', '2024-12-01 04:19:38', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (28, 1, 2, 'ODwPq2kCleCa', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:20:51', 'sadasdas123123', '2024-12-01 04:20:51', '2024-12-01 04:20:51', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (29, 1, 2, 'OD8oJVSjxXIZ', 0, 'pending', 'pending', 'ODvpod6', 650000.00, 0.00, 0.00, 123.00, 650000.00, '2024-12-01 04:21:01', 'sadasdas123123', '2024-12-01 04:21:01', '2024-12-01 04:21:01', 0, 'sdasdasd');
INSERT INTO `ec_orders` VALUES (30, 1, 2, 'ODJrJf4bZN7E', 0, 'pending', 'pending', NULL, 200000.00, 0.00, 0.00, 0.00, 200000.00, '2024-12-03 01:41:11', '', '2024-12-03 01:41:11', '2024-12-03 01:41:11', 0, 'dasdasd');
INSERT INTO `ec_orders` VALUES (31, 1, 2, 'ODmTaXTYbmor', 0, 'pending', 'pending', NULL, 200000.00, 0.00, 0.00, 0.00, 200000.00, '2024-12-03 01:42:03', '', '2024-12-03 01:42:03', '2024-12-03 01:42:03', 0, 'asdasd');
INSERT INTO `ec_orders` VALUES (32, 1, 2, 'OD8GVWd0YaeG', 0, 'pending', 'pending', NULL, 200000.00, 0.00, 0.00, 0.00, 200000.00, '2024-12-03 01:42:44', '', '2024-12-03 01:42:44', '2024-12-03 01:42:44', 0, 'asdasd');
INSERT INTO `ec_orders` VALUES (33, 1, 2, 'ODzKAraLJQQW', 0, 'pending', 'pending', NULL, 200000.00, 0.00, 0.00, 0.00, 200000.00, '2024-12-03 01:44:02', '', '2024-12-03 01:44:02', '2024-12-03 01:44:02', 0, '12312312');
INSERT INTO `ec_orders` VALUES (34, 1, 2, 'OD1rUsvM9aL2', 0, 'completed', 'pending', NULL, 200000.00, 0.00, 0.00, 0.00, 200000.00, '2024-12-03 01:44:23', '', '2024-12-03 01:44:23', '2024-12-03 01:44:23', 0, 'asdasdasd123123');
INSERT INTO `ec_orders` VALUES (35, 1, 1, 'ODs152eRhE3l', 0, 'pending', 'canceled', NULL, 0.00, 0.00, 0.00, 0.00, 200000.00, '2024-12-05 00:48:43', NULL, '2024-12-05 00:48:31', '2024-12-05 00:48:43', 0, 'asdasasd');

-- ----------------------------
-- Table structure for ec_product_labels
-- ----------------------------
DROP TABLE IF EXISTS `ec_product_labels`;
CREATE TABLE `ec_product_labels`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT 0,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_product_labels
-- ----------------------------
INSERT INTO `ec_product_labels` VALUES (1, 'New', 'Sản phẩm mớiasdasd', 'new', 0, 'published', '2024-10-20 10:47:11', '2024-11-28 23:55:04');
INSERT INTO `ec_product_labels` VALUES (3, 'Sale', 'Sản phẩm khuyến mãi 2', 'sale', 0, 'published', NULL, NULL);
INSERT INTO `ec_product_labels` VALUES (4, '123123', '123123', '123123', 0, 'published', NULL, NULL);
INSERT INTO `ec_product_labels` VALUES (5, 'test@gmail.com', 'ádasdasd', 'testgmailcom', 0, 'pending', '2024-12-01 19:45:28', '2024-12-01 19:45:28');

-- ----------------------------
-- Table structure for ec_product_options
-- ----------------------------
DROP TABLE IF EXISTS `ec_product_options`;
CREATE TABLE `ec_product_options`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT 0,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_product_options
-- ----------------------------

-- ----------------------------
-- Table structure for ec_product_options_values
-- ----------------------------
DROP TABLE IF EXISTS `ec_product_options_values`;
CREATE TABLE `ec_product_options_values`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_option_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_product_options_values_product_option_id_foreign`(`product_option_id` ASC) USING BTREE,
  CONSTRAINT `ec_product_options_values_product_option_id_foreign` FOREIGN KEY (`product_option_id`) REFERENCES `ec_product_options` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_product_options_values
-- ----------------------------

-- ----------------------------
-- Table structure for ec_products
-- ----------------------------
DROP TABLE IF EXISTS `ec_products`;
CREATE TABLE `ec_products`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `number` int NOT NULL DEFAULT 0,
  `price` int NOT NULL DEFAULT 0,
  `sale` int NOT NULL DEFAULT 0,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `length` double(8, 2) NULL DEFAULT NULL,
  `width` double(8, 2) NULL DEFAULT NULL,
  `height` double(8, 2) NULL DEFAULT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `brand_id` bigint UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `images` json NULL,
  `total_vote_count` int NOT NULL DEFAULT 0,
  `total_rating_score` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_products_category_id_foreign`(`category_id` ASC) USING BTREE,
  INDEX `ec_products_brand_id_foreign`(`brand_id` ASC) USING BTREE,
  CONSTRAINT `ec_products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `ec_brands` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ec_products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_products
-- ----------------------------
INSERT INTO `ec_products` VALUES (1, 'Đồ Bộ Nam Phối Dây Dệt12', 'do-bo-nam-phoi-day-det12', 'ádasdasdádasdádasd', 'http://localhost:3014/uploads/images/32d46975-2de6-4389-9911-7c5171c6587b.png', 'pending', 20, 200000, 0, '<p>ádasdasdasd123123123ádasd</p>', NULL, NULL, NULL, 5, 1, '2024-10-20 10:47:11', '2024-12-01 21:31:34', '[\"http://localhost:3014/uploads/images/c3037f3c-8e9c-4723-9cf3-97c1626cc2ab.jpg\", \"http://localhost:3014/uploads/images/e6364296-33dd-4eb1-abf5-2ef063281ad6.png\", \"http://localhost:3014/uploads/images/e7a7bfdc-b948-4760-bf35-c66315643830.jpg\", \"http://localhost:3014/uploads/images/e1c493fc-1843-45ef-864d-03b6340eb740.jpg\", \"http://localhost:3014/uploads/images/760a7c76-00dc-4edd-ba9b-3b5601898f02.png\", null, null]', 0, 0);
INSERT INTO `ec_products` VALUES (5, 'Đầm dã hội mới', 'dam-da-hoi-moi', NULL, 'http://localhost:3014/uploads/images/2193b280-4e7d-4f2c-ab53-1ccea7bee986.webp', 'pending', 0, 900000, 0, NULL, NULL, NULL, NULL, 11, 2, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (6, 'Áo Polo Nam Thêu Ngực', 'ao-polo-nam-theu-nguc', NULL, 'http://localhost:3014/uploads/images/9e9027eb-c80d-496a-933f-edacf70e8e89.jpg', 'pending', 0, 560000, 0, NULL, NULL, NULL, NULL, 7, 3, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (7, 'Áo thể thao nam nỉ in Limitless', 'ao-the-thao-nam-ni-in-limitless', NULL, 'http://localhost:3014/uploads/images/fb08918d-875c-486c-a516-6538d3fc5e06.jpg', 'pending', 0, 340000, 0, NULL, NULL, NULL, NULL, 7, 4, NULL, NULL, NULL, 1, 4);
INSERT INTO `ec_products` VALUES (8, 'Mặt Khóa Kim Thắt Lưng Nam Xoay 2 Chiều Bản 3.5cm', NULL, NULL, 'http://localhost:3014/uploads/images/1d135f8c-cf06-41f1-8988-084d684c9dc1.webp', 'pending', 0, 450000, 0, NULL, NULL, NULL, NULL, 7, 5, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (9, 'Tinh dầu dưỡng tóc ATS For man Styling Oil 80ml', 'tinh-dau-duong-toc-ats-for-man-styling-oil-80ml', NULL, 'http://localhost:3014/uploads/images/7264572e-13e2-4156-a1ff-9a618ac9c286.jpg', 'pending', 200, 650000, 0, NULL, NULL, NULL, NULL, 8, 6, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (10, 'Tinh chất nuôi dưỡng chăm sóc tóc khô và hư tổn UNOVE SILK OIL ESSENCE 70ml', 'tinh-chat-nuoi-duong-cham-soc-toc-kho-va-hu-ton-unove-silk-oil-essence-70ml', NULL, 'http://localhost:3014/uploads/images/537c1978-7e92-42af-ba3d-f99bd8037138.jpg', 'pending', 10, 250000, 0, NULL, NULL, NULL, NULL, 7, 7, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (11, 'Mặt nạ phục hồi tóc Laborie Derma Molecular Repair Hair Mask', 'mat-na-phuc-hoi-toc-laborie-derma-molecular-repair-hair-mask', NULL, 'http://localhost:3014/uploads/images/535b24fd-6e20-4373-b8a2-440e3473bb91.jpg', 'pending', 100, 450000, 0, NULL, NULL, NULL, NULL, 8, 8, NULL, NULL, NULL, 1, 3);
INSERT INTO `ec_products` VALUES (12, 'Tinh dầu dưỡng tóc Arren Men\'s Grooming 100ml', 'tinh-dau-duong-toc-arren-mens-grooming-100ml', NULL, 'http://localhost:3014/uploads/images/389ddfa8-5c8f-448c-9e80-76fe6b8269f3.jpg', 'pending', 10, 450000, 0, NULL, NULL, NULL, NULL, 5, 9, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (13, 'Tinh dầu dưỡng tóc ATS For man Styling Oil 80ml', 'tinh-dau-duong-toc-ats-for234-man-styling-oil-80ml', NULL, 'http://localhost:3014/uploads/images/a26592e2-ff7c-411f-a77b-709ca706cad8.jpg', 'pending', 100, 560000, 0, NULL, NULL, NULL, NULL, 10, 10, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (14, 'Dầu gội cho da đầu nhạy cảm và rụng tóc Laborie Derma Scalp Shampoo 250ml', 'dau-goi-cho-da-dau-nhay-cam-va-rung-toc-laborie-derma-scalp-shampoo-250ml', NULL, 'http://localhost:3014/uploads/images/34a74fd6-743f-429b-b374-a17fd2411f36.jpg', 'pending', 100, 900000, 0, NULL, NULL, NULL, NULL, 10, 1, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (15, 'TrungPhuNA', 'trungphuna', '<p>Mô tả</p>', 'https://via.placeholder.com/150', 'pending', 100, 100000, 0, NULL, NULL, NULL, NULL, 10, 2, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (16, 'Dầu xả Blairsom Thảo Mộc Phục Hồi 500ml', 'dau-xa-blairsom-thao-moc-phuc-hoi-500ml', '<p>Dầu xả Blairsom Thảo Mộc Phục Hồi 500ml</p>', 'http://localhost:3014/uploads/images/fd92cbd0-6832-47ea-bb1a-95a92d79f2e7.jpg', 'pending', 100, 560000, 0, NULL, NULL, NULL, NULL, 10, 3, NULL, NULL, NULL, 1, 2);
INSERT INTO `ec_products` VALUES (17, '123123', '123123', '<p>123123</p>', 'http://localhost:3014/uploads/images/43ffc6f2-2ac8-4576-a033-0008a6be7978.xlsx', 'published', 0, 123123, 0, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `ec_products` VALUES (18, 'Đồ hải sản', 'do-hai-san', '<p>đồ sản phẩm ngon lắm</p>', 'http://localhost:3014/uploads/images/8b6a8fdc-4470-4905-9e66-1866fd490010.jpg', 'published', 120000, 120000, 0, NULL, NULL, NULL, NULL, 8, NULL, '2024-12-01 19:54:16', '2024-12-01 19:54:16', NULL, 0, 0);
INSERT INTO `ec_products` VALUES (19, 'Đồ hải sản', 'do-hai-san', '<p>đồ sản phẩm ngon lắm</p>', 'http://localhost:3014/uploads/images/8b6a8fdc-4470-4905-9e66-1866fd490010.jpg', 'published', 120000, 120000, 0, NULL, NULL, NULL, NULL, 8, 3, '2024-12-01 20:34:24', '2024-12-01 20:34:24', '[\"http://localhost:3014/uploads/images/2e9d4f2b-07af-4b6c-befb-ebab5ce74e83.png\", \"http://localhost:3014/uploads/images/1fb9865f-3f60-40cc-8020-f949ddeb2c1e.png\", \"http://localhost:3014/uploads/images/dc2a3eb1-1a30-4118-8940-596077ee8690.jpg\", \"http://localhost:3014/uploads/images/bdb11eba-71db-4f8a-8039-9329ea4a30c9.png\"]', 0, 0);
INSERT INTO `ec_products` VALUES (20, 'test', 'test', 'sadasd', 'http://localhost:3014/uploads/images/ca9a8754-f318-4379-bef0-6ae5d6689361.png', 'pending', 123123, 123123, 0, '<p>ádasdsad</p>', NULL, NULL, NULL, 8, 3, '2024-12-04 01:08:56', '2024-12-04 01:08:56', '[\"http://localhost:3014/uploads/images/894a3cd4-39d7-412a-928d-543af9894cdd.png\"]', 0, 0);

-- ----------------------------
-- Table structure for ec_products_labels
-- ----------------------------
DROP TABLE IF EXISTS `ec_products_labels`;
CREATE TABLE `ec_products_labels`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint UNSIGNED NOT NULL,
  `product_label_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_products_labels_product_id_foreign`(`product_id` ASC) USING BTREE,
  INDEX `ec_products_labels_product_label_id_foreign`(`product_label_id` ASC) USING BTREE,
  CONSTRAINT `ec_products_labels_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ec_products_labels_product_label_id_foreign` FOREIGN KEY (`product_label_id`) REFERENCES `ec_product_labels` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 76 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_products_labels
-- ----------------------------
INSERT INTO `ec_products_labels` VALUES (14, 8, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (15, 8, 3, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (31, 5, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (33, 9, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (34, 10, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (36, 11, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (38, 12, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (39, 15, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (40, 6, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (41, 7, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (42, 16, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (48, 17, 3, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (49, 18, 4, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (50, 19, 4, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (73, 1, 3, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (74, 1, 1, NULL, NULL);
INSERT INTO `ec_products_labels` VALUES (75, 20, 4, NULL, NULL);

-- ----------------------------
-- Table structure for ec_stock_ins
-- ----------------------------
DROP TABLE IF EXISTS `ec_stock_ins`;
CREATE TABLE `ec_stock_ins`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` int NULL DEFAULT 0,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'final: Kho thành phẩm      ingredient: kho nguyên liệu   ',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_stock_ins_product_id_foreign`(`product_id` ASC) USING BTREE,
  CONSTRAINT `ec_stock_ins_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_stock_ins
-- ----------------------------
INSERT INTO `ec_stock_ins` VALUES (1, 1, 10, 10000, '2024-10-28', '2024-10-28 16:18:40', '2024-10-28 16:18:40', NULL);
INSERT INTO `ec_stock_ins` VALUES (2, 1, 30, 30000, '2024-10-28', '2024-10-28 16:32:56', '2024-10-28 16:32:56', NULL);

-- ----------------------------
-- Table structure for ec_stock_outs
-- ----------------------------
DROP TABLE IF EXISTS `ec_stock_outs`;
CREATE TABLE `ec_stock_outs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` int NULL DEFAULT 0,
  `user_id` bigint UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'final: Kho thành phẩm      ingredient: kho nguyên liệu   ',
  `order_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_stock_outs_product_id_foreign`(`product_id` ASC) USING BTREE,
  INDEX `ec_stock_outs_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `ec_stock_outs_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ec_stock_outs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_stock_outs
-- ----------------------------
INSERT INTO `ec_stock_outs` VALUES (1, 1, 2, 20000, 1, '2024-10-28', '2024-10-28 16:18:57', '2024-10-28 16:18:57', NULL, 0);
INSERT INTO `ec_stock_outs` VALUES (2, 1, 3, 20000, 1, '2024-10-28', '2024-10-28 16:32:08', '2024-10-28 16:32:08', NULL, 0);

-- ----------------------------
-- Table structure for ec_transactions
-- ----------------------------
DROP TABLE IF EXISTS `ec_transactions`;
CREATE TABLE `ec_transactions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `qty` int NOT NULL DEFAULT 1,
  `price` bigint NOT NULL DEFAULT 0,
  `total_price` bigint NOT NULL DEFAULT 0,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ec_transactions_order_id_foreign`(`order_id` ASC) USING BTREE,
  INDEX `ec_transactions_product_id_foreign`(`product_id` ASC) USING BTREE,
  CONSTRAINT `ec_transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `ec_orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ec_transactions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_transactions
-- ----------------------------
INSERT INTO `ec_transactions` VALUES (14, 11, 11, 3, 450000, 1350000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (15, 12, 11, 3, 450000, 1350000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (16, 13, 11, 1, 450000, 450000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (17, 14, 11, 1, 450000, 450000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (18, 15, 7, 1, 340000, 340000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (19, 16, 16, 1, 560000, 560000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (20, 17, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (23, 6, 1, 121, 200000, 24200000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (26, 20, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (27, 21, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (29, 23, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (30, 24, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (31, 25, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (32, 26, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (33, 27, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (34, 28, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (35, 29, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (40, 7, 7, 1, 340000, 340000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (41, 7, 9, 12, 650000, 7800000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (42, 30, 1, 1, 200000, 200000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (43, 31, 1, 1, 200000, 200000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (44, 32, 1, 1, 200000, 200000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (45, 33, 1, 1, 200000, 200000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (46, 34, 1, 1, 200000, 200000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (50, 19, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (51, 19, 8, 1, 450000, 450000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (52, 22, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (53, 22, 10, 1, 250000, 250000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (56, 18, 9, 1, 650000, 650000, 'pending', NULL, NULL);
INSERT INTO `ec_transactions` VALUES (57, 35, 1, 1, 200000, 200000, 'pending', NULL, NULL);

-- ----------------------------
-- Table structure for ec_vouchers
-- ----------------------------
DROP TABLE IF EXISTS `ec_vouchers`;
CREATE TABLE `ec_vouchers`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `price` double NULL DEFAULT 0,
  `total_used` bigint NULL DEFAULT NULL,
  `max_used` bigint NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'pending',
  `type` enum('percent','fix') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'fix',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ec_vouchers
-- ----------------------------
INSERT INTO `ec_vouchers` VALUES (2, 'test@gmail.com', 'adasdasd', 'ODfzq77', 20000, 0, 0, 'published', 'fix', '2024-12-03 00:29:12', '2024-12-03 00:29:17');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (33, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (34, '2014_10_12_100000_create_password_reset_tokens_table', 1);
INSERT INTO `migrations` VALUES (35, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (36, '2019_12_14_000001_create_personal_access_tokens_table', 1);
INSERT INTO `migrations` VALUES (37, '2024_08_24_073329_create_products_table', 1);
INSERT INTO `migrations` VALUES (38, '2024_09_29_001703_create_permission_tables', 1);
INSERT INTO `migrations` VALUES (39, '2024_10_13_163624_create_csdl_base_module_admin', 1);
INSERT INTO `migrations` VALUES (40, '2024_10_15_155633_create_csdl_blogs_module_admin', 1);
INSERT INTO `migrations` VALUES (41, '2024_11_01_045329_create_supplier', 2);
INSERT INTO `migrations` VALUES (42, '2024_11_02_082440_alter_add_column_order_id', 2);
INSERT INTO `migrations` VALUES (43, '2024_11_07_164654_create_services_table', 2);
INSERT INTO `migrations` VALUES (46, '2024_11_13_041229_create_services_user_table', 3);
INSERT INTO `migrations` VALUES (48, '2024_11_15_102428_create_votes_table', 4);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for payment_methods
-- ----------------------------
DROP TABLE IF EXISTS `payment_methods`;
CREATE TABLE `payment_methods`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VND',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `config` json NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment_methods
-- ----------------------------
INSERT INTO `payment_methods` VALUES (1, 'VND', 'COD', NULL, 'Nhận hàng thanh toán', 1, 'active', NULL, '2024-10-20 10:47:11', NULL);
INSERT INTO `payment_methods` VALUES (2, 'VND', 'Thanh toán online', NULL, 'VnPay', 0, 'active', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token` ASC) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type` ASC, `tokenable_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
INSERT INTO `personal_access_tokens` VALUES (1, 'App\\Models\\User', 1, 'MyApp', 'e88cb3d3fe9007e3e07a4e0691fe2b9febe38a4904b09cee57e12d61df341204', '[\"*\"]', '2024-10-27 12:54:58', NULL, '2024-10-25 06:58:56', '2024-10-27 12:54:58');
INSERT INTO `personal_access_tokens` VALUES (2, 'App\\Models\\User', 1, 'MyApp', '40582587078b7bba038b6a1ed450ba40d95b0b890dc8d80f1bb1fad33c591fbb', '[\"*\"]', '2024-11-02 12:08:09', NULL, '2024-10-26 04:25:40', '2024-11-02 12:08:09');

-- ----------------------------
-- Table structure for product_variants
-- ----------------------------
DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE `product_variants`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint UNSIGNED NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_variants_product_id_foreign`(`product_id` ASC) USING BTREE,
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_variants
-- ----------------------------

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT 0,
  `price` int NOT NULL DEFAULT 0,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (1, 'Dịch vụ bảo hành', NULL, 1, 10000, '<p>Dịch vụ bảo hành</p>', NULL, '2024-11-30 00:02:22');
INSERT INTO `services` VALUES (2, 'Dịch vụ 10 bước gội đầu', NULL, 0, 100000, '<p>Dịch vụ 10 bước gội đầu</p>', NULL, NULL);
INSERT INTO `services` VALUES (3, 'ádasdasd', NULL, 1, 121212, '<p>12123123123</p>', '2024-11-30 00:02:35', '2024-11-30 00:02:35');

-- ----------------------------
-- Table structure for services_user
-- ----------------------------
DROP TABLE IF EXISTS `services_user`;
CREATE TABLE `services_user`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `price` int NOT NULL DEFAULT 0,
  `status` enum('pending','processing','completed','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `is_home_service` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `services_user_user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `services_user_service_id_index`(`service_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services_user
-- ----------------------------
INSERT INTO `services_user` VALUES (1, 9, 1, 10000, 'pending', 'Dịch vụ bảo hành', NULL, NULL, 0, NULL, NULL);
INSERT INTO `services_user` VALUES (2, 10, 2, 100000, 'pending', 'Dịch vụ 10 bước gội đầu', NULL, NULL, 0, NULL, NULL);

-- ----------------------------
-- Table structure for slides
-- ----------------------------
DROP TABLE IF EXISTS `slides`;
CREATE TABLE `slides`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `position` tinyint NOT NULL DEFAULT 1,
  `page` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'home',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of slides
-- ----------------------------
INSERT INTO `slides` VALUES (9, 'Sản phẩm thông minh', 'Bộ sưu tập ưu đãi mùa đông 2024', 1, 'home', 'https://123code.net', 'http://localhost:3014/uploads/images/7d9fb5eb-44fb-41e6-b6ae-9508232e0b89.jpeg', 'pending', '2024-10-25 09:41:41', NULL);
INSERT INTO `slides` VALUES (10, 'MCN', 'Bộ sưu tập ưu đãi mùa đông 2024', 1, 'home', 'https://123code.net', 'http://localhost:3014/uploads/images/e5898531-6533-49b4-b262-bd1a8d803c27.jpeg', 'pending', '2024-10-25 09:41:41', NULL);
INSERT INTO `slides` VALUES (11, 'ádasdád123123', 'ádasdasd', 1, 'home', 'https://mail.google.com/mail/u/0/?pli=1#inbox/FMfcgzQXKWbktgnkBxLcpmkzRlvDrsfn', 'http://localhost:3014/uploads/images/4b5c9043-76f3-4498-a962-86bd1cfe0f93.jpg', 'pending', NULL, '2024-11-30 00:06:53');

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of supplier
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `provider_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 1,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_type` enum('USER','ADMIN','SHIPPER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'sdfsdf', 'admin@gmail.com', NULL, '$2a$10$RBXDZNg96a4s8TT29LN1SOF1yO3aGDghoejKfh1bXPZXUOJCHIctS', '0987654321', NULL, NULL, 1, 'http://localhost:3014/uploads/images/404b67c8-d1ba-477c-b995-97258c40ac58.jpg', NULL, '2024-10-20 10:47:10', '2024-12-01 17:38:05', 'ADMIN');
INSERT INTO `users` VALUES (4, 'Hạ Linh', 'codethue9402@gmail.com', NULL, '$2a$10$tai56eo5T0CB1DY9uywD1OQjN7H2/k26Ba0sJuPbamNpUA.B8MSY.', '0986787625', NULL, NULL, 1, 'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg', NULL, NULL, NULL, 'ADMIN');
INSERT INTO `users` VALUES (6, 'Bích ngọc', 'admin2@gmail.com', NULL, '$2a$10$XdpPkBpM6tZTMWghviq7vOzzrNSkNc8pHa19xZt38eWxmzQ.E13I6', '0986420994', NULL, NULL, 1, NULL, NULL, NULL, NULL, 'USER');
INSERT INTO `users` VALUES (7, 'Nhã An', 'phuphandata@gmail.com', NULL, '$2a$10$urkwF3Ax7M6NzPqyjBV47enG0WHwuvCIywv.qp5R1Zz2rtHXCVXf6', '0978656212', NULL, NULL, 1, 'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg', NULL, NULL, NULL, 'USER');
INSERT INTO `users` VALUES (9, 'Phú PT', 'phupt.humg.94@gmail.com', NULL, '$2a$10$c65qUmLXehEbRhckL/KNPOTbJhTwEvoD5FIJ34ul8SfkQqGhhglLa', '0987676222', NULL, NULL, 1, 'http://localhost:3014/uploads/images/46973176-09b2-4642-bf00-de0d995408cd.jpg', NULL, NULL, NULL, 'USER');
INSERT INTO `users` VALUES (10, 'ngoc na', 'ngoc@gmail.com', NULL, '$2a$10$KLfvLksRuqlrLkuAh/EjeO6uqFtFtzWntsyc.PZJSqlG22fxGCZVq', NULL, NULL, NULL, 1, 'http://localhost:3014/uploads/images/c20534bf-8090-40ac-841e-e85c3ca3aa16.jpg', NULL, NULL, NULL, 'USER');
INSERT INTO `users` VALUES (11, 'letrinhxuan', 'letrinhxuan@gmail.com', NULL, '$2a$10$bLPUPfgErXseoS3iAvmZkueOWgD0IP2ozk9tBtUiFTcL7i7gb/A4q', NULL, NULL, NULL, 1, 'https://via.placeholder.com/150', NULL, NULL, NULL, 'USER');
INSERT INTO `users` VALUES (12, 'Nguyễn văn A', 'admin@gmail.com123123', NULL, '$2a$10$w0XZImRABpYFrb5uYutkG.4MbTS8BwzzHEh1VoAOyA7SwDwPUOFSu', '0987654345', NULL, NULL, -1, 'http://localhost:3014/uploads/images/6a945599-908b-4d0c-bfc5-2de11190cc1e.jpg', NULL, NULL, '2024-12-02 14:18:47', 'ADMIN');
INSERT INTO `users` VALUES (13, 'Nguyeenx vcan a', 'asd123@gmail.com', NULL, '$2a$10$/8AZEHfeeBnCWG7X2Nha..SagZc0/MMjEHM8oKm8BjQPv/5/rECee', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (14, 'ádasdasd', 'sadad@sdaasd', NULL, '123456789', '12312312321', NULL, NULL, 1, 'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg', NULL, NULL, NULL, 'USER');

-- ----------------------------
-- Table structure for users_bank_accounts
-- ----------------------------
DROP TABLE IF EXISTS `users_bank_accounts`;
CREATE TABLE `users_bank_accounts`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `bank_id` bigint UNSIGNED NOT NULL,
  `account_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_branch` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_bank_accounts_user_id_foreign`(`user_id` ASC) USING BTREE,
  INDEX `users_bank_accounts_bank_id_foreign`(`bank_id` ASC) USING BTREE,
  CONSTRAINT `users_bank_accounts_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `users_bank_accounts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_bank_accounts
-- ----------------------------

-- ----------------------------
-- Table structure for users_has_types
-- ----------------------------
DROP TABLE IF EXISTS `users_has_types`;
CREATE TABLE `users_has_types`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `user_type_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_has_types_user_id_foreign`(`user_id` ASC) USING BTREE,
  INDEX `users_has_types_user_type_id_foreign`(`user_type_id` ASC) USING BTREE,
  CONSTRAINT `users_has_types_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `users_has_types_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `users_types` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_has_types
-- ----------------------------
INSERT INTO `users_has_types` VALUES (1, 1, 2, NULL, NULL);
INSERT INTO `users_has_types` VALUES (2, 1, 1, NULL, NULL);

-- ----------------------------
-- Table structure for users_types
-- ----------------------------
DROP TABLE IF EXISTS `users_types`;
CREATE TABLE `users_types`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_types_name_unique`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_types
-- ----------------------------
INSERT INTO `users_types` VALUES (1, 'ADMIN', '2024-10-20 10:47:09', '2024-10-20 10:47:09');
INSERT INTO `users_types` VALUES (2, 'USER', '2024-10-20 10:47:09', '2024-10-20 10:47:09');
INSERT INTO `users_types` VALUES (3, 'SYSTEM', '2024-10-20 10:47:09', '2024-10-20 10:47:09');

-- ----------------------------
-- Table structure for users_wallets
-- ----------------------------
DROP TABLE IF EXISTS `users_wallets`;
CREATE TABLE `users_wallets`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `balance` decimal(15, 2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_wallets_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `users_wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_wallets
-- ----------------------------

-- ----------------------------
-- Table structure for users_wallets_transactions
-- ----------------------------
DROP TABLE IF EXISTS `users_wallets_transactions`;
CREATE TABLE `users_wallets_transactions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `wallet_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `type` enum('credit','debit') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','paid','reject','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15, 2) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_wallets_transactions_wallet_id_foreign`(`wallet_id` ASC) USING BTREE,
  INDEX `users_wallets_transactions_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `users_wallets_transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `users_wallets_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `users_wallets` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_wallets_transactions
-- ----------------------------

-- ----------------------------
-- Table structure for variant_attributes
-- ----------------------------
DROP TABLE IF EXISTS `variant_attributes`;
CREATE TABLE `variant_attributes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `variant_id` bigint UNSIGNED NOT NULL,
  `attribute_value_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `variant_attributes_variant_id_foreign`(`variant_id` ASC) USING BTREE,
  INDEX `variant_attributes_attribute_value_id_foreign`(`attribute_value_id` ASC) USING BTREE,
  CONSTRAINT `variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `ec_attribute_values` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `variant_attributes_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of variant_attributes
-- ----------------------------

-- ----------------------------
-- Table structure for votes
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `rating` int NOT NULL DEFAULT 0,
  `product_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` enum('published','draft','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `votes_product_id_foreign`(`product_id` ASC) USING BTREE,
  INDEX `votes_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `votes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `ec_products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of votes
-- ----------------------------
INSERT INTO `votes` VALUES (2, 'Cũng bình thường', 4, 11, 11, 'pending', '2024-11-15 23:12:28', NULL);
INSERT INTO `votes` VALUES (3, 'Chán quá', 2, 11, 9, 'pending', '2024-11-15 23:14:28', NULL);

SET FOREIGN_KEY_CHECKS = 1;
