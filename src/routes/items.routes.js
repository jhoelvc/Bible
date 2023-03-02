import { Router } from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controller/items.controller.js"

const router = Router()

router.get('/items/:code', getItem)
router.get('/items', getItems)
router.post('/items', createItem)
router.patch('/items/:code', updateItem)
router.delete('/items/:code', deleteItem)

export default router; 