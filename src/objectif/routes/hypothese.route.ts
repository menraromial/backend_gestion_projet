import express from 'express'
import {
    getHypotheseByIdHandler,
    getHypotheseByObjectifGlobalHandler,
    createHypotheseHandler,
    updateHypotheseHandler,
    deleteHypotheseHandler
} from '../controllers/hypothese.controller' 

const router = express.Router()

router.get("/get/:id",getHypotheseByIdHandler)
router.get("/get/objectifGlobal/:objectifGlobalId", getHypotheseByObjectifGlobalHandler)
router.post("/create", createHypotheseHandler)
router.delete("/delete/:id", deleteHypotheseHandler)
router.put("/update/:id", updateHypotheseHandler)

export default router

