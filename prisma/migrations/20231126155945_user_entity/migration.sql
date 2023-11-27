-- DropForeignKey
ALTER TABLE "ObjectifGlobal" DROP CONSTRAINT "ObjectifGlobal_projetId_fkey";

-- AlterTable
ALTER TABLE "ObjectifGlobal" ALTER COLUMN "projetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ObjectifGlobal" ADD CONSTRAINT "ObjectifGlobal_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
