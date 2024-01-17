import express from 'express'
import {
    getIndicateurByIdHandler,
    getIndicateurByObjectifSpecificHandler,
    createIndicateurHandler,
    updateIndicateurHandler,
    deleteIndicateurHandler
} from '../controllers/indicateur.controller' 

const router = express.Router()

router.get("/get/:id",getIndicateurByIdHandler)
router.get("/get/objectifSpecifique/:objectifSpecifiqueId", getIndicateurByObjectifSpecificHandler)
router.post("/create", createIndicateurHandler)
router.delete("/delete/:id", deleteIndicateurHandler)
router.put("/update/:id", updateIndicateurHandler)

export default router

