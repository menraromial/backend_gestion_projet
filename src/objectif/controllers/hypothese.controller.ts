import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createHypotheseHandler = async (req: Request, res: Response) => {
  console.log("createHypothese", req.body);

  const {
    hypothese,
    resultat,
    objectifGlobalId,
    objectifSpecificId
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
        const Hypothese = await prisma.hypothese.create({
            data: {
            hypothese,
            resultat,
            objectifGlobalId,
            objectifSpecificId
            },
        });
        res.status(200).json(Hypothese);
    }else{
        res.status(401).json({ "error":  "objectifGlobal ou objectifSpecific introuvable"});
    }
    
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getHypotheseByIdHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        const hypothese = await prisma.hypothese.findUnique({
            where: {
                id: Number(id),
              },
        })
        res.status(200).json(hypothese)
    } catch (error) {
        next(error)
    }
    
}

export const getHypotheseByObjectifGlobalHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.log("req.params",req.params)
    const { objectifGlobalId } = req.params
    try {
        const objectifSpecific = await prisma.hypothese.findMany({
            where: {
                objectifGlobalId:Number(objectifGlobalId)
            },
        })
        res.status(200).json(objectifSpecific)
    } catch (error) {
        next(error)
    }
};

export  const deleteHypotheseHandler = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        const deleteHypothese = await prisma.hypothese.delete({
            where: {
              id: Number(id),
            },
          });
        res.status(200).json({message: "Succès"})
    } catch (error) {
        next(error)
    }
};

export const updateHypotheseHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    const {  
        hypothese,
        resultat,
        objectifGlobalId,
        objectifSpecificId
        } = req.body
    try {
        const updateObjectifSpecifique = await prisma.hypothese.update({
            where: {
              id: Number(id),
            },
            data: {
                hypothese,
                resultat,
                objectifGlobalId,
                objectifSpecificId
            },
          });
        res.status(200).json(updateObjectifSpecifique)
    } catch (error) {
        next(error)
    }
}
