import { Router } from "express";
import { getFileState, getFilesStates, createFileState, updateFileState, deleteFileState } from "../controller/file_state.comtroller.js"

const router = Router();

router.get('/file_state/:code', getFileState);
router.get('/file_state', getFilesStates);
router.post('/file_state', createFileState);
router.patch('/file_state/:code', updateFileState);
router.delete('/file_state/:code', deleteFileState);

export default router;