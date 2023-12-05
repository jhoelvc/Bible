import { Router } from "express";
import { getPackageDetail, getPackageDetails, createPackageDetail, updatePackageDetail, deletePackageDetail } from '../controller/package_detail.controller.js'

const router = Router();

router.get('/package_detail/:code', getPackageDetail)
router.get('/package_detail', getPackageDetails)
router.post('/package_detail', createPackageDetail)
router.patch('/package_detail/:code', updatePackageDetail)
router.delete('/package_detail/:code', deletePackageDetail)

export default router; 