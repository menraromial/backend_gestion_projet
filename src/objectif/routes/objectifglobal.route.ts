import express from 'express'
import {
    getObjectifGlobalByIdHandler,
    getObjectifGlobalByProjetHandler,
    createObjectifGlobalHandler,
    updateObjectifGlobalHandler,
    deleteObjectifGlobalHandler
} from '../controllers/objectifglobal.controller' 

const router = express.Router()

router.get("/get/:id",getObjectifGlobalByIdHandler)
router.get("/get/projet/:projetId", getObjectifGlobalByProjetHandler)
router.post("/create", createObjectifGlobalHandler)
router.delete("/delete/:id", deleteObjectifGlobalHandler)
router.put("/update/:id", updateObjectifGlobalHandler)

export default router

