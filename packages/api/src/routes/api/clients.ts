import express from 'express';
import { body } from 'express-validator';
import ClientsController from '../../controllers/ClientsController';

const router = express.Router();

const controller = new ClientsController();

/* Returns all clients */
router.get('/', controller.getClients);

/* Returns client by email */
router.get('/:email', controller.getClientByEmail);

/* Returns total time spent and sum of all earnings */
router.get('/:email/stats', controller.getTotalTimeAndCurrency);

/* Updates single client by client.email */
router.put(
  '/:email',
  body('email').optional().isEmail(),
  body('name').optional().not().isNumeric(),
  body('mobileNumber').optional().isMobilePhone('any'),
  body('isCompany').optional().isBoolean(),
  body('ic').optional(),
  body('dic').optional(),
  body('address.address').optional(),
  body('address.city').optional(),
  body('address.postcode').optional().isPostalCode('any'),
  body('address.country').optional().isLength({ min: 2, max: 2 }),
  body('bankAccount.accountNumber').optional(),
  body('bankAccount.currency').optional().isAlpha().isLength({ min: 3, max: 3 }),
  controller.updateClient,
);

/* Creates new client and returns all clients */
router.post(
  '/',
  body('email').normalizeEmail().isEmail(),
  body('name').notEmpty().not().isNumeric(),
  body('mobileNumber').optional().isMobilePhone('any'),
  body('isCompany').isBoolean(),
  body('ic').optional(),
  body('dic').optional(),
  body('address.address').notEmpty(),
  body('address.city').optional(),
  body('address.postcode').isPostalCode('any'),
  body('address.country').isLength({ min: 2, max: 2 }),
  body('bankAccount.accountNumber').notEmpty(),
  body('bankAccount.currency').isAlpha().isLength({ min: 3, max: 3 }),
  controller.createClient,
);

/* Deletes client by client.email and returns all clients */
router.delete('/:email', controller.deleteClient);

export default router;
