CREATE TABLE `demo`.`new_table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `message` TEXT NULL,
  `photo_path` VARCHAR(256) NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));