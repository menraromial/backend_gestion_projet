import express from "express";
import TypeprojetController from "../controllers/typeprojet.controller";

const router = express.Router();

router.post("/create", TypeprojetController.createTypeProjet);
router.get("/getall", TypeprojetController.getTypeProjets);
router.get("/get/:id", TypeprojetController.getTypeProjet);
router.put("/update/:id", TypeprojetController.updateTypeProjet);
router.delete("/delete/:id", TypeprojetController.deleteTypeProjet);

export default router;