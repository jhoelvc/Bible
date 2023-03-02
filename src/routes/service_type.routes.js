import { Router } from "express";
import { getServiceType, getServicesTypes, createServiceType, updateServiceType, deleteServiceType } from "../controller/service_type.controller.js"

const router = Router();

router.get('/service_type/:code', getServiceType);
router.get('/service_type', getServicesTypes);
router.post('/service_type', createServiceType);
router.patch('/service_type/:code', updateServiceType);
router.delete('/service_type/:code', deleteServiceType);

export default router;