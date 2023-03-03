import { Router } from "express";
import { getProvider, getProviders, createProvider, updateProvider, deleteProvider } from '../controller/provider.controller.js'

const router = Router();

router.get('/provider/:code', getProvider)
router.get('/provider', getProviders)
router.post('/provider', createProvider)
router.patch('/provider/:code', updateProvider)
router.delete('/provider/:code', deleteProvider)

export default router; 