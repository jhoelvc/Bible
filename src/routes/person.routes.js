import { Router } from 'express';
import { getPerson, getPersons, createPerson, updatePerson, deletePerson } from "../controller/person.controller.js"

const router = Router()

router.get('/person/:code', getPerson)
router.get('/persons/:person_type_code', getPersons)
router.post('/person', createPerson)
router.patch('/person/:code', updatePerson)
router.delete('/person/:code', deletePerson)

export default router; 