import { NextFunction, Request, Response } from "express"
import {
    createObjectifGlobal,
    findUniqueObjectifGlobal,
    updateObjectifGlobal,
    deleteObjectifGlobal
} from '../services/objectifglobal.service'


import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createObjectifGlobalHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { projetId, description } = req.body
    console.log("req.body",req.body)
    try {
        const projet = await prisma.projet.findUnique({
            where: {
                id:Number(projetId)
            },
        })
        const newObjectifGlobal = await createObjectifGlobal({
            description: description,
        })
        newObjectifGlobal.projetId = Number(projetId)
        console.log("newObjectifGlobal",newObjectifGlobal)
        res.status(201).json(newObjectifGlobal)
    } catch (error) {
        res.status(500).json({error: error})
        
    }
}

export const getObjectifGlobalByIdHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        const objectifGlobal = await findUniqueObjectifGlobal({id:Number(id)})
        res.status(200).json(objectifGlobal)
    } catch (error) {
        next(error)
    }
    
}

export const getObjectifGlobalByProjetHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { projetId } = req.params
    try {
        const objectifGlobal = await findUniqueObjectifGlobal({projetId:Number(projetId)})
        res.status(200).json(objectifGlobal)
    } catch (error) {
        next(error)
    }
}

export  const deleteObjectifGlobalHandler = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        deleteObjectifGlobal({id: Number(id)})
        res.status(200).json({message: "Succès"})
    } catch (error) {
        next(error)
    }

}

export const updateObjectifGlobalHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    const { description } = req.body
    try {
        const updatedObjectifGlobal = await updateObjectifGlobal({id : Number(id)},{ description : description})
        res.status(200).json(updatedObjectifGlobal)
    } catch (error) {
        next(error)
    }
}