import { Router } from "express";
import { getPersonType, getPersonTypes, createPersonType, updatePersonType, deletePersonType } from "../controller/person_type.controller.js"

const router = Router();

router.get('/person_type/:code', getPersonType);
router.get('/person_type', getPersonTypes);
router.post('/person_type', createPersonType);
router.patch('/person_type/:code', updatePersonType);
router.delete('/person_type/:code', deletePersonType);

export default router;