-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `suffix` VARCHAR(191) NULL,
    `age` VARCHAR(191) NOT NULL,
    `birthdate` VARCHAR(191) NOT NULL,
    `birthplace` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `citizenship` VARCHAR(191) NOT NULL,
    `civil` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `landline` VARCHAR(191) NULL,
    `houseno` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `baranggay` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `elementary` VARCHAR(191) NULL,
    `attain` VARCHAR(191) NULL,
    `highschool` VARCHAR(191) NULL,
    `attain1` VARCHAR(191) NULL,
    `senior` VARCHAR(191) NULL,
    `attain2` VARCHAR(191) NULL,
    `college` VARCHAR(191) NULL,
    `attain3` VARCHAR(191) NULL,
    `employment` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `yearEmploy` VARCHAR(191) NULL,
    `skill1` VARCHAR(191) NULL,
    `skill2` VARCHAR(191) NULL,
    `yearUnemploy` VARCHAR(191) NULL,
    `skill1_1` VARCHAR(191) NULL,
    `skill2_1` VARCHAR(191) NULL,
    `blood` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `disability` VARCHAR(191) NOT NULL,
    `visibility` VARCHAR(191) NOT NULL,
    `made_disabled` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `specificDevice` VARCHAR(191) NULL,
    `medicine` VARCHAR(191) NOT NULL,
    `specificMedicine` VARCHAR(191) NULL,
    `others` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `refreshToken` TEXT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmergencyPerson` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `suffix` VARCHAR(191) NULL,
    `age` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `landline` VARCHAR(191) NOT NULL,
    `houseno` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `baranggay` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmergencyPerson_email_key`(`email`),
    UNIQUE INDEX `EmergencyPerson_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QRCode` (
    `id` VARCHAR(191) NOT NULL,
    `secure_url` VARCHAR(191) NOT NULL,
    `image_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `QRCode_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `expiredAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmergencyPerson` ADD CONSTRAINT `EmergencyPerson_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QRCode` ADD CONSTRAINT `QRCode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
