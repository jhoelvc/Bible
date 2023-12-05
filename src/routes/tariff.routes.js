import { Router } from "express";
import { getTariff, getTariffs, createTariff, updateTariff, deleteTariff } from "../controller/tariff.controller.js"

const router = Router()

router.get('/tariff/:code', getTariff)
router.get('/tariffs/:person_code', getTariffs)
router.post('/tariff', createTariff)
router.patch('/tariff/:code', updateTariff)
router.delete('/tariff/:code', deleteTariff)

export default router; 