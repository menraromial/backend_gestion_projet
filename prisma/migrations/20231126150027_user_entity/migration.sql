-- AlterTable
ALTER TABLE "Projet" ADD COLUMN     "typeProjetId" INTEGER;

-- AddForeignKey
ALTER TABLE "Projet" ADD CONSTRAINT "Projet_typeProjetId_fkey" FOREIGN KEY ("typeProjetId") REFERENCES "TypeProjet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
