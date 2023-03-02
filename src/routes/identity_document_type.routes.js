import { Router } from "express";
import { getIdentityDocumentType, getIdentityDocumentTypes, createIdentityDocumentType, updateIdentityDocumentType, deleteIdentityDocumentType } from "../controller/identity_document_type.controller.js"

const router = Router();

router.get('/identity_document_type/:code', getIdentityDocumentType);
router.get('/identity_document_type', getIdentityDocumentTypes);
router.post('/identity_document_type', createIdentityDocumentType);
router.patch('/identity_document_type/:code', updateIdentityDocumentType);
router.delete('/identity_document_type/:code', deleteIdentityDocumentType);

export default router;