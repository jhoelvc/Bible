import { Router } from "express";
import { getService, getServices, createService, updateService, deleteService } from "../controller/service.controller.js"

const router = Router()

router.get('/service/:code', getService)
router.get('/services/:name/:service_type_code', getServices)
router.post('/service', createService)
router.patch('/service/:code', updateService)
router.delete('/service/:code', deleteService)

export default router; 