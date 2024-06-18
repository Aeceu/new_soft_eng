/*
  Warnings:

  - You are about to drop the column `district` on the `emergencyperson` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `user` table. All the data in the column will be lost.
  - Added the required column `region` to the `EmergencyPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `refreshToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `emergencyperson` DROP COLUMN `district`,
    ADD COLUMN `region` VARCHAR(191) NOT NULL,
    MODIFY `province` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `district`,
    ADD COLUMN `region` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `province` VARCHAR(191) NULL,
    MODIFY `refreshToken` VARCHAR(191) NULL;
