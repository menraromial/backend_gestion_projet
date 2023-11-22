/*
  Warnings:

  - The primary key for the `Financement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Financement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Indicateur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Indicateur` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `objectifSpecificId` column on the `Indicateur` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ODD` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ODD` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ObjectifGlobal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ObjectifGlobal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ObjectifSpecific` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `objGId` on the `ObjectifSpecific` table. All the data in the column will be lost.
  - The `id` column on the `ObjectifSpecific` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Projet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `objGId` on the `Projet` table. All the data in the column will be lost.
  - The `id` column on the `Projet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tache` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `objSId` on the `Tache` table. All the data in the column will be lost.
  - The `id` column on the `Tache` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TypeProjet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TypeProjet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[projetId]` on the table `ObjectifGlobal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Financement` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `projetId` on the `Financement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `projetId` to the `ObjectifGlobal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montant` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantAE` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantCP` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantCP1` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantCP2` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periode` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoneId` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Projet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoneId` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatutProjet" AS ENUM ('NON_DEBUTE', 'EN_COURS_EXECUTION', 'ACHEVE', 'ABANDONNE');

-- DropForeignKey
ALTER TABLE "Financement" DROP CONSTRAINT "Financement_projetId_fkey";

-- DropForeignKey
ALTER TABLE "Indicateur" DROP CONSTRAINT "Indicateur_objectifSpecificId_fkey";

-- DropForeignKey
ALTER TABLE "ObjectifSpecific" DROP CONSTRAINT "ObjectifSpecific_objGId_fkey";

-- DropForeignKey
ALTER TABLE "Projet" DROP CONSTRAINT "Projet_objGId_fkey";

-- DropForeignKey
ALTER TABLE "Projet" DROP CONSTRAINT "Projet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tache" DROP CONSTRAINT "Tache_objSId_fkey";

-- DropIndex
DROP INDEX "Projet_objGId_key";

-- AlterTable
ALTER TABLE "Financement" DROP CONSTRAINT "Financement_pkey",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "projetId",
ADD COLUMN     "projetId" INTEGER NOT NULL,
ADD CONSTRAINT "Financement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Indicateur" DROP CONSTRAINT "Indicateur_pkey",
ADD COLUMN     "objectifGlobalId" INTEGER,
ADD COLUMN     "tacheId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "objectifSpecificId",
ADD COLUMN     "objectifSpecificId" INTEGER,
ADD CONSTRAINT "Indicateur_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ODD" DROP CONSTRAINT "ODD_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ODD_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ObjectifGlobal" DROP CONSTRAINT "ObjectifGlobal_pkey",
ADD COLUMN     "projetId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ObjectifGlobal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ObjectifSpecific" DROP CONSTRAINT "ObjectifSpecific_pkey",
DROP COLUMN "objGId",
ADD COLUMN     "objectifGlobalId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ObjectifSpecific_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Projet" DROP CONSTRAINT "Projet_pkey",
DROP COLUMN "objGId",
ADD COLUMN     "cdmt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "consolide" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "csge" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "defaillance" TEXT,
ADD COLUMN     "defaillanceEntreprise" TEXT,
ADD COLUMN     "entreprise" TEXT,
ADD COLUMN     "manuel" TEXT,
ADD COLUMN     "mensuel" TEXT,
ADD COLUMN     "montant" BIGINT NOT NULL,
ADD COLUMN     "montantAE" BIGINT NOT NULL,
ADD COLUMN     "montantCP" BIGINT NOT NULL,
ADD COLUMN     "montantCP1" BIGINT NOT NULL,
ADD COLUMN     "montantCP2" BIGINT NOT NULL,
ADD COLUMN     "montantPreleve" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "observation" TEXT,
ADD COLUMN     "oddId" INTEGER[],
ADD COLUMN     "periode" TEXT NOT NULL,
ADD COLUMN     "pia" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pofpv" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ppm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "probelemeFinancement" TEXT,
ADD COLUMN     "problemeTechnique" TEXT,
ADD COLUMN     "psge" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receptionne" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "remarques" TEXT,
ADD COLUMN     "ressourcesFinancieres" TEXT,
ADD COLUMN     "ressourcesHumaines" TEXT,
ADD COLUMN     "ressourcesMaterielles" TEXT,
ADD COLUMN     "semestriel" TEXT,
ADD COLUMN     "solde" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "statutAvancement" "StatutProjet" DEFAULT 'NON_DEBUTE',
ADD COLUMN     "tauxRealisation" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "trimestriel" TEXT,
ADD COLUMN     "zoneId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Projet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tache" DROP CONSTRAINT "Tache_pkey",
DROP COLUMN "objSId",
ADD COLUMN     "objectifSpecificId" INTEGER,
ADD COLUMN     "zoneId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tache_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeProjet" DROP CONSTRAINT "TypeProjet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TypeProjet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "denomination" TEXT NOT NULL,
    "population" BIGINT NOT NULL,
    "population_projete" BIGINT NOT NULL,
    "superficie" BIGINT NOT NULL,
    "densite" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hypothese" (
    "id" SERIAL NOT NULL,
    "hypothese" TEXT NOT NULL,
    "resultat" TEXT,
    "objectifGlobalId" INTEGER,
    "objectifSpecificId" INTEGER,

    CONSTRAINT "Hypothese_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ObjectifGlobal_projetId_key" ON "ObjectifGlobal"("projetId");

-- AddForeignKey
ALTER TABLE "ObjectifGlobal" ADD CONSTRAINT "ObjectifGlobal_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectifSpecific" ADD CONSTRAINT "ObjectifSpecific_objectifGlobalId_fkey" FOREIGN KEY ("objectifGlobalId") REFERENCES "ObjectifGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_objectifSpecificId_fkey" FOREIGN KEY ("objectifSpecificId") REFERENCES "ObjectifSpecific"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financement" ADD CONSTRAINT "Financement_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicateur" ADD CONSTRAINT "Indicateur_objectifSpecificId_fkey" FOREIGN KEY ("objectifSpecificId") REFERENCES "ObjectifSpecific"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicateur" ADD CONSTRAINT "Indicateur_objectifGlobalId_fkey" FOREIGN KEY ("objectifGlobalId") REFERENCES "ObjectifGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hypothese" ADD CONSTRAINT "Hypothese_objectifGlobalId_fkey" FOREIGN KEY ("objectifGlobalId") REFERENCES "ObjectifGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hypothese" ADD CONSTRAINT "Hypothese_objectifSpecificId_fkey" FOREIGN KEY ("objectifSpecificId") REFERENCES "ObjectifSpecific"("id") ON DELETE SET NULL ON UPDATE CASCADE;
