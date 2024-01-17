import { PrismaClient, Prisma,ObjectifGlobal } from "@prisma/client";

const prisma = new PrismaClient();

export const createObjectifGlobal = async (input: Prisma.ObjectifGlobalCreateWithoutProjetInput) => {
    return (await prisma.objectifGlobal.create({
        data: input,
    })) as ObjectifGlobal;
};

export const findUniqueObjectifGlobal = async (
    where: Prisma.ObjectifGlobalWhereUniqueInput,
    select?: Prisma.ObjectifGlobalSelect
) => {
    return (await prisma.objectifGlobal.findUnique({
        where,
        select,
    })) as ObjectifGlobal;
};

export const updateObjectifGlobal = async (
    where: Prisma.ObjectifGlobalWhereUniqueInput,
    data: Prisma.ObjectifGlobalUpdateInput,
    select?: Prisma.ObjectifGlobalSelect
) => {
    return (await prisma.objectifGlobal.update({
        where,
        data,
        select,
    })) as ObjectifGlobal;
};

export const deleteObjectifGlobal = async (where: Prisma.ObjectifGlobalWhereUniqueInput) => {
    return (await prisma.objectifGlobal.delete({
        where,
    })) as ObjectifGlobal;
};


