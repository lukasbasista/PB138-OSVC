import express from 'express';
import { body, oneOf } from 'express-validator';
import WorkLogController from '../../controllers/WorkLogController';

const router = express.Router();

const controller = new WorkLogController();

/* Returns all worklogs */
router.get('/', controller.getWorkAllLogs);

/* Returns worklog by its UUID */
router.get('/:uuid', controller.getWorkLogByUUID);

/* Updates single worklog by worklog.uuid */
router.put(
  '/:uuid',
  body('email').optional().isEmail(),
  body('name').optional(),
  body('description').optional(),
  body('jobCategory.name').optional(),
  body('jobCategory.description').optional(),
  body('timeWorked').isNumeric({ no_symbols: true }),
  body('hourRate').optional().isNumeric({ no_symbols: true }),
  body('currency').optional().isAlpha().isLength({ min: 3, max: 3 }),
  body('total').optional().isNumeric().toInt(),
  body('workStart').optional().isISO8601(),
  body('workEnd').optional().isISO8601(),
  controller.updateWorkLog,
);

/* Creates new worklog */
router.post(
  '/',
  body('email').notEmpty().isEmail(),
  body('name').notEmpty(),
  body('description').optional(),
  body('jobCategory.name').notEmpty(),
  body('jobCategory.description').optional(),
  oneOf([
    [body('timeWorked').isNumeric().toInt(), body('hourRate').isNumeric().toInt()],
    body('total').isNumeric().toInt(),
  ]),
  body('currency').optional().isAlpha().isLength({ min: 3, max: 3 }),
  body('workStart').isISO8601(),
  body('workEnd').isISO8601(),
  controller.createWorkLog,
);

/* Deletes worklog by worklog.uuid and returns all worklogs */
router.delete('/:uuid', controller.deleteWorkLog);

export default router;
