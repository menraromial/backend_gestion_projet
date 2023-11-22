/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypePayement" AS ENUM ('ORANGE_MONEY', 'MTN_MOBILE', 'VISA', 'CASH');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RoleEnumType" ADD VALUE 'acteurPTF';
ALTER TYPE "RoleEnumType" ADD VALUE 'agent';
ALTER TYPE "RoleEnumType" ADD VALUE 'ministere';

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "TypeProjet" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "TypeProjet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectifGlobal" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ObjectifGlobal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projet" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "objGId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectifSpecific" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "objGId" TEXT NOT NULL,

    CONSTRAINT "ObjectifSpecific_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tache" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "objSId" TEXT NOT NULL,

    CONSTRAINT "Tache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financement" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" BIGINT NOT NULL,
    "methodePaiement" "TypePayement" DEFAULT 'CASH',
    "projetId" TEXT NOT NULL,

    CONSTRAINT "Financement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indicateur" (
    "id" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "objectifSpecificId" TEXT NOT NULL,

    CONSTRAINT "Indicateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ODD" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "objectifs" TEXT NOT NULL,

    CONSTRAINT "ODD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projet_objGId_key" ON "Projet"("objGId");

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_objGId_fkey" FOREIGN KEY ("objGId") REFERENCES "ObjectifGlobal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectifSpecific" ADD CONSTRAINT "ObjectifSpecific_objGId_fkey" FOREIGN KEY ("objGId") REFERENCES "ObjectifGlobal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_objSId_fkey" FOREIGN KEY ("objSId") REFERENCES "ObjectifSpecific"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financement" ADD CONSTRAINT "Financement_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicateur" ADD CONSTRAINT "Indicateur_objectifSpecificId_fkey" FOREIGN KEY ("objectifSpecificId") REFERENCES "ObjectifSpecific"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
