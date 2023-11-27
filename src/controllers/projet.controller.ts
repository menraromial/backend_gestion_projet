import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import { Projet, Prisma } from '@prisma/client'

import { 
    createProjet,
    deleteProjet,
    updateProjet,
    findUniqueProjet,
    findProjet,
    getAllProjet
} from '../services/projet.service'
import { error } from 'console';


//const prisma = new PrismaClient()

export const createProjetHandler = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {

    const projetData:Projet = req.body
    

    try{
        const projet = await createProjet(projetData)
    
        res.status(201).json(projet)
    } catch(error: any){
        next(error)
    }
};


// Find unique projet using id
export const findProjetByIdHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
    
        try {
            const { id } = req.params
            const projet = await findUniqueProjet({ id : Number(id) })
            res.status(200).json(projet)
        } catch (error) {
            next(error)
        }
}

//Find project by zone
export const findProjetByZoneHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    
    try {
        const { zoneId } = req.params
        const projects = await findProjet({ zoneId : Number(zoneId) })
        res.status(200).json(projects)
    } catch (error:any) {
        console.error(error.message)
        next(error)
        
    }
}

//Find by type projet
export const findByTypeProjetHandler = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
    const { typeProjetId } = req.params
    try {
        const projets = await findProjet({typeProjetId:Number(typeProjetId)})
        res.status(200).json(projets)
    } catch (error) {
        next(error)
    }
}

//Delete projet
export const deleteProjetHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const { id } = req.params
    try {
        await deleteProjet({id: Number(id)})
        res.status(200).json({message:"succès"})
    } catch (error) {
        next(error)
    }
}

//get All projet
export const getAllProjetHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const projets = await getAllProjet()
        res.status(200).json(projets)
    } catch (error) {
        next(error)
    }
}

export const updateProjetHandler =async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const {id} = req.params
        const projet:Projet = req.body
        const updatedProjet = await updateProjet(Number(id), projet)
        res.status(200).json(updatedProjet)
    } catch (error) {
        next(error)
    }
    
}