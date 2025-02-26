import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactsId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactsId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactsId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactsId', ctrlWrapper(patchContactController));

export default router;
