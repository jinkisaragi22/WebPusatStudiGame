-- CreateTable
CREATE TABLE `games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `game_detail` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `developer` VARCHAR(255) NOT NULL,
    `publisher` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `game_id` INTEGER NOT NULL,
    `min_OS` VARCHAR(255) NOT NULL,
    `recom_OS` VARCHAR(255) NOT NULL,
    `min_processor` VARCHAR(255) NOT NULL,
    `recom_processor` VARCHAR(255) NOT NULL,
    `min_memory` VARCHAR(255) NOT NULL,
    `recom_memory` VARCHAR(255) NOT NULL,
    `min_graphics` VARCHAR(255) NOT NULL,
    `recom_graphics` VARCHAR(255) NOT NULL,
    `min_directx` VARCHAR(255) NOT NULL,
    `recom_directx` VARCHAR(255) NOT NULL,
    `min_network` VARCHAR(255) NOT NULL,
    `recom_network` VARCHAR(255) NOT NULL,
    `min_storage` VARCHAR(255) NOT NULL,
    `recom_storage` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Specs_games_id_fk`(`game_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `specs` ADD CONSTRAINT `Specs_games_id_fk` FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
