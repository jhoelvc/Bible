import { Router } from "express";
import { getLanguage, getLanguages, createLanguage, updateLanguage, deleteLanguage } from "../controller/languages.controller.js"

const router = Router()

router.get('/languages/:code', getLanguage)
router.get('/languages', getLanguages)
router.post('/languages', createLanguage)
router.patch('/languages/:code', updateLanguage)
router.delete('/languages/:code', deleteLanguage)

export default router; 