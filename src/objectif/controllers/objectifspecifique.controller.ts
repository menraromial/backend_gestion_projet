import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createObjectifSpecifiqueHandler = async (
  req: Request,
  res: Response
) => {
  console.log("ObjectifSpecifique", req.body);

  const { objectifGlobalId, description } = req.body;

  try {
    const objectifGlobal = await prisma.objectifGlobal.findUnique({
      where: {
        id: Number(objectifGlobalId),
      },
    });
    if (objectifGlobal) {
      const newObjectifSpecific = await prisma.objectifSpecific.create({
        data: {
          objectifGlobalId,
          description,
        },
      });
      res.status(200).json(newObjectifSpecific);
    } else {
      res.status(401).json({ error: "objectifGlobal introuvable" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getObjectifSpecificByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const objectifSpecifique = await prisma.objectifSpecific.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(objectifSpecifique);
  } catch (error) {
    next(error);
  }
};

export const getObjectifSpecifiqueByObjectifGlobalHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.params", req.params);
  const { objectifGlobalId } = req.params;
  try {
    const objectifSpecific = await prisma.objectifSpecific.findMany({
      where: {
        objectifGlobalId: Number(objectifGlobalId),
      },
    });
    res.status(200).json(objectifSpecific);
  } catch (error) {
    next(error);
  }
};

export const deleteObjectifSpecifiqueHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deleteObjectifSpecifique = await prisma.objectifSpecific.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Succès" });
  } catch (error) {
    next(error);
  }
};

export const updateObjectifSpecifiqueHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updateObjectifSpecifique = await prisma.objectifSpecific.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
      },
    });
    res.status(200).json(updateObjectifSpecifique);
  } catch (error) {
    next(error);
  }
};
