import { Router } from "express";
import { getFile, getFiles, createFile, updateFile, deleteFile } from "../controller/file.controller.js"

const router = Router()

router.get('/file/:code', getFile)
router.get('/file', getFiles)
router.post('/file', createFile)
router.patch('/file/:code', updateFile)
router.delete('/file/:code', deleteFile)

export default router; 