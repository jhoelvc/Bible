import { Router } from 'express';
import { getClient, getClients, createClient, updateClient, deleteClient } from "../controller/client.controller.js"

const router = Router()

router.get('/client/:code', getClient)
router.get('/client', getClients)
router.post('/client', createClient)
router.patch('/client/:code', updateClient)
router.delete('/client/:code', deleteClient)

export default router; 