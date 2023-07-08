CREATE TABLE `user` (
	`login_key` INT(11) NOT NULL AUTO_INCREMENT,
	`id` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`salt` CHAR(64) NOT NULL COLLATE 'utf8mb4_general_ci',
	`hashedPw` CHAR(88) NOT NULL COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`nickname` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`login_key`) USING BTREE,
	UNIQUE INDEX `id` (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE,
	UNIQUE INDEX `nickname` (`nickname`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

