/*
  Warnings:

  - You are about to alter the column `montant` on the `Financement` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `montant` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `montantAE` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `montantCP` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `montantCP1` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `montantCP2` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `montantPreleve` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `solde` on the `Projet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `population` on the `Zone` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `population_projete` on the `Zone` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `superficie` on the `Zone` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Financement" ALTER COLUMN "montant" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Projet" ALTER COLUMN "montant" SET DATA TYPE INTEGER,
ALTER COLUMN "montantAE" SET DATA TYPE INTEGER,
ALTER COLUMN "montantCP" SET DATA TYPE INTEGER,
ALTER COLUMN "montantCP1" SET DATA TYPE INTEGER,
ALTER COLUMN "montantCP2" SET DATA TYPE INTEGER,
ALTER COLUMN "montantPreleve" SET DATA TYPE INTEGER,
ALTER COLUMN "solde" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Zone" ALTER COLUMN "population" SET DATA TYPE INTEGER,
ALTER COLUMN "population_projete" SET DATA TYPE INTEGER,
ALTER COLUMN "superficie" SET DATA TYPE INTEGER;
