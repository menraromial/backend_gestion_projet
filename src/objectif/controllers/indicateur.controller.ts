import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createIndicateurHandler = async (req: Request, res: Response) => {
  console.log("createIndicateur", req.body);

  const {
    nature,
    type,
    impact,
    niveau,
    objectifGlobalId,
    objectifSpecificId,
    tacheId
  } = req.body;

  try {

    const objectifGlobal = await prisma.objectifGlobal.findUnique({
        where: {
            id:Number(objectifGlobalId)
        },
    });
    const objectifSpecific = await prisma.objectifSpecific.findUnique({
        where: {
            id:Number(objectifSpecificId)
        },
    });
    if(objectifGlobal && objectifSpecific){
        const newIndicateur = await prisma.indicateur.create({
            data: {
              nature,
              type,
              impact,
              niveau,
              objectifGlobalId,
              objectifSpecificId,
              tacheId
            },
          });
          res.status(200).json(newIndicateur);
    }else{
        res.status(401).json({ "error":  "objectifGlobal ou objectifSpecific introuvable"});
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getIndicateurByIdHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        const indicateur = await prisma.indicateur.findUnique({
            where: {
                id: Number(id),
              },
        })
        res.status(200).json(indicateur)
    } catch (error) {
        next(error)
    }
    
}

export const getIndicateurByObjectifSpecificHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.log("req.params",req.params)
    const { objectifSpecifiqueId } = req.params
    try {
        const indicateur = await prisma.indicateur.findMany({
            where: {
                objectifSpecificId:Number(objectifSpecifiqueId)
            },
        })
        res.status(200).json(indicateur)
    } catch (error) {
        next(error)
    }
}

export  const deleteIndicateurHandler = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        const deleteIndicateur = await prisma.indicateur.delete({
            where: {
              id: Number(id),
            },
          });
        res.status(200).json({message: "Succès"})
    } catch (error) {
        next(error)
    }
}

export const updateIndicateurHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    const {  
        nature,
        type,
        impact,
        niveau,
        objectifGlobalId,
        objectifSpecificId,
        tacheId
        } = req.body
    try {
        const updateIndicateur = await prisma.indicateur.update({
            where: {
              id: Number(id),
            },
            data: {
                nature,
                type,
                impact,
                niveau,
                objectifGlobalId,
                objectifSpecificId,
                tacheId
            },
          });
        res.status(200).json(updateIndicateur)
    } catch (error) {
        next(error)
    }
}
