import {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Succesfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const createContactController = async (req, res, next) => {
  const { contactType, phoneNumber, name } = req.body;

  if (!contactType || !phoneNumber || !name) {
    return next(
      createHttpError(400, 'Name, phone number, and contact type are required'),
    );
  }

  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully updated contact!',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contacttId } = req.params;
  const result = await updateContact(contacttId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
