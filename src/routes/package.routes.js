import { Router } from "express";
import { getPackage, getPackages, createPackage, updatePackage, deletePackage } from '../controller/package.controller.js'

const router = Router();

router.get('/package/:code', getPackage)
router.get('/package', getPackages)
router.post('/package', createPackage)
router.patch('/package/:code', updatePackage)
router.delete('/package/:code', deletePackage)

export default router; 