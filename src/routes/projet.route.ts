import express from 'express'
import { 
    createProjetHandler,
    findProjetByIdHandler,
    findProjetByZoneHandler,
    deleteProjetHandler,
    updateProjetHandler,
    getAllProjetHandler,
    findByTypeProjetHandler
 } from '../controllers/projet.controller'

const router = express.Router();

router.post('/create', createProjetHandler);
router.get('/get/:id', findProjetByIdHandler);
router.get('/getall', getAllProjetHandler)
router.get('/get/zoneId/:zoneId', findProjetByZoneHandler);
router.delete('/delete/:id', deleteProjetHandler);
router.put('/update/:id',updateProjetHandler)
router.get('/get/typeprojet/:typeProjetId', findByTypeProjetHandler)

export default router
