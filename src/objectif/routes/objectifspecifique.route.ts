import express from 'express'
import {
    getObjectifSpecificByIdHandler,
    getObjectifSpecifiqueByObjectifGlobalHandler,
    createObjectifSpecifiqueHandler,
    updateObjectifSpecifiqueHandler,
    deleteObjectifSpecifiqueHandler
} from '../controllers/objectifspecifique.controller' 

const router = express.Router()

router.get("/get/:id",getObjectifSpecificByIdHandler)
router.get("/get/objectifSpecifiqueByObjectifGlobal/:objectifGlobalId", getObjectifSpecifiqueByObjectifGlobalHandler)
router.post("/create", createObjectifSpecifiqueHandler)
router.delete("/delete/:id", deleteObjectifSpecifiqueHandler)
router.put("/update/:id", updateObjectifSpecifiqueHandler)

export default router

