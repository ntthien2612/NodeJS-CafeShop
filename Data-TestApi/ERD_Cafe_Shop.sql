CREATE TABLE `tables` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `table_name` varchar(255),
  `delete` integer DEFAULT 0
);

CREATE TABLE `category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `category_name` varchar(255),
  `delete` integer DEFAULT 0
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `id_category` integer,
  `product_name` varchar(255),
  `img` varchar(255),
  `price` integer,
  `cost` integer,
  `delete` integer DEFAULT 0
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(255),
  `email` varchar(255),
  `pass_word` varchar(255),
  `phone` varchar(255),
  `delete` integer DEFAULT 0,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now())
);

CREATE TABLE `roles` (
  `id` integer PRIMARY KEY,
  `role_name` varchar(255)
);

CREATE TABLE `order_bill` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `id_table` integer,
  `id_user_order` integer,
  `id_user_bartender` integer,
  `status` varchar(255),
  `total_money` integer,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now())
);

CREATE TABLE `detail_order_bill` (
  `id_order` integer,
  `id_product` integer,
  `number` integer,
  `note` varchar(255)
);

CREATE TABLE `users_roles` (
  `users_id` integer,
  `roles_id` integer,
  PRIMARY KEY (`users_id`, `roles_id`)
);

ALTER TABLE `users_roles` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_roles` ADD FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);


ALTER TABLE `products` ADD FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);

ALTER TABLE `order_bill` ADD FOREIGN KEY (`id_table`) REFERENCES `tables` (`id`);

ALTER TABLE `detail_order_bill` ADD FOREIGN KEY (`id_order`) REFERENCES `order_bill` (`id`);

ALTER TABLE `detail_order_bill` ADD FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);

ALTER TABLE `order_bill` ADD FOREIGN KEY (`id_user_order`) REFERENCES `users` (`id`);
