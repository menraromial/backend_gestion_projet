import { PrismaClient, Prisma, Projet } from "@prisma/client";

const prisma = new PrismaClient();

export const createProjet = async (input: Projet) => {
    return (await prisma.projet.create({
        data: input,
    })) as Projet;
};

export const findUniqueProjet = async (
    where: Prisma.ProjetWhereUniqueInput,
    select?: Prisma.ProjetSelect
) => {
    return (await prisma.projet.findUnique({
        where,
        select,
    })) as Projet;
};

export const updateProjet = async (id:number, data:Projet) => {
    return (await prisma.projet.update({
        where: {id},
        data,
    })) as Projet;
};

export const deleteProjet = async (where: Prisma.ProjetWhereUniqueInput) => {
    return (await prisma.projet.delete({
        where,
    })) as Projet;
};

export const findProjet = async (
    where: Partial<Prisma.ProjetWhereInput>,
    select?: Prisma.ProjetSelect
) => {
    return (await prisma.projet.findMany({
        where,
        select,
    })) as Projet[];
};

export const getAllProjet = async () : Promise<Projet[]> => {
    return await prisma.projet.findMany();
};

