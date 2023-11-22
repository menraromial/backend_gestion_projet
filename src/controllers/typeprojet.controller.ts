import { PrismaClient} from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient()

const createTypeProjet = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTypeProjet = await prisma.typeProjet.create({
      data: {
        title
      },
    });
    res.status(200).json(newTypeProjet);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};


const getTypeProjets = async (req: Request, res: Response) => {
  try {
    const typeProjets = await prisma.typeProjet.findMany();
    res.status(200).json(typeProjets);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getTypeProjet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeProjet = await prisma.typeProjet.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(typeProjet);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateTypeProjet = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const updateTypeProjet = await prisma.typeProjet.update({
      where: {
        id: Number(id),
      },
      data: {
        title
      },
    });
    res.status(200).json(updateTypeProjet);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteTypeProjet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTypeProjet = await prisma.typeProjet.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deleteTypeProjet);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};


export default {
  createTypeProjet,
  getTypeProjets,
  getTypeProjet,
  updateTypeProjet,
  deleteTypeProjet
};
