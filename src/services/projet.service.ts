import { PrismaClient, Prisma, Projet } from "@prisma/client";

const prisma = new PrismaClient();

export const createProjet = async(input:Prisma.ProjetCreateInput)=>{
    return ( await prisma.projet.create({
        data:input,
    })) as Projet;
};

export const findUniqueProjet = async(
    where:Prisma.ProjetWhereUniqueInput,
    select?:Prisma.ProjetSelect
) => {
    return ( await prisma.projet.findUnique({
        where,
        select
    })) as Projet
}

export const updateProjet = async(
    where:Prisma.ProjetWhereUniqueInput,
    data:Prisma.ProjetUpdateInput,
    select?:Prisma.ProjetSelect
) => {
    return ( await prisma.projet.update({
        where,
        data,
        select
    })) as Projet
}