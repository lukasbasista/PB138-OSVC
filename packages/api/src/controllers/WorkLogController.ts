import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import WorkLog from '../../db/types/workLog';
import Client from '../../db/types/client';
import db from './dbController';

export default class WorkLogController {
  private getClientFromDB = (email: string): Client | undefined => {
    const index = db.getIndex('/data/clients', email, 'email');
    if (index === -1) {
      return undefined;
    }
    const objectQuery = `/data/clients[${index}]`;
    return db.getData(objectQuery);
  };

  public getWorkAllLogs = (req: Request, res: Response): void => {
    const email = req.query.email ? String(req.query.email) : undefined;
    try {
      const workLogs = this.getWorkLogsFromDB(email);
      res.json(workLogs);
    } catch (err) {
      res.status(500).json({ err: 'Could not fetch work logs.' });
    }
  };

  public getWorkLogByUUID = (req: Request, res: Response): void => {
    const { uuid } = req.params;
    try {
      const index = db.getIndex('/data/workLogs', uuid, 'uuid');
      if (index === -1) {
        res.status(404).json({ err: `Work log with UUID ${uuid} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/workLogs[${index}]`;
      const workLog: WorkLog = db.getData(objectQuery);
      if (!workLog) {
        res.status(404).json({ err: `Work log with UUID ${uuid} was not found in the database!` });
        return;
      }
      res.json(workLog);
    } catch (err) {
      res.status(500).json({ err: 'Could not fetch work logs.' });
    }
  };

  public getWorkLogsFromDB = (email?: string | undefined): WorkLog[] => {
    try {
      let workLogs = db.getData('/data/workLogs');
      if (email) {
        workLogs = workLogs.filter((el: WorkLog) => {
          return el.email == email;
        });
      }
      return workLogs;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  public updateWorkLog = (req: Request, res: Response): void => {
    const { uuid } = req.params;
    if (!uuid) {
      res.status(400).json({ err: 'Missing UUID in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/workLogs', uuid, 'uuid');
      if (index === -1) {
        res.status(404).json({ err: `Work log with UUID ${uuid} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/workLogs[${index}]`;
      const workLog: WorkLog = db.getData(objectQuery);
      if (!workLog) {
        res.status(404).json({ err: `Work log with UUID ${uuid} was not found in the database!` });
        return;
      }

      const body = req.body;

      workLog.email = body.email || workLog.email;
      workLog.name = body.name || workLog.name;
      workLog.description = body.description || workLog.description;
      workLog.jobCategory = body.jobCategory || workLog.jobCategory;
      workLog.timeWorked = body.timeWorked || workLog.timeWorked;
      workLog.hourRate = body.hourRate || workLog.hourRate;
      workLog.currency = body.currency || workLog.currency;
      workLog.total = body.total || workLog.total;
      workLog.workStart = body.workStart || workLog.workStart;
      workLog.workEnd = body.workEnd || workLog.workEnd;

      db.push(objectQuery, workLog);

      const workLogs: WorkLog[] = this.getWorkLogsFromDB();

      res.json(workLogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public createWorkLog = (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const workLog: WorkLog = req.body;
    workLog.total = req.body.total || req.body.hourRate * req.body.timeWorked;
    workLog.uuid = uuidv4();
    try {
      const client = this.getClientFromDB(req.body.email);
      if (!client) {
        res
          .status(404)
          .json({ err: `Client with email ${req.body.email} was not found in the database!` });
        return;
      }
      workLog.workStart = new Date(workLog.workStart);
      workLog.workEnd = new Date(workLog.workEnd);
      workLog.currency = client.bankAccount.currency;
    } catch (err) {
      console.error(err);
      res.status(400).json({ err: 'Bad date format' });
    }
    workLog.creationTime = new Date();

    try {
      db.push('/data/workLogs[]', workLog);
      const workLogs = this.getWorkLogsFromDB();
      res.json(workLogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public deleteWorkLog = (req: Request, res: Response): void => {
    const { uuid } = req.params;
    if (!uuid) {
      res.status(400).json({ err: 'Missing UUID in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/workLogs', uuid, 'uuid');
      if (index === -1) {
        res.status(404).json({
          err: `Client with email ${req.body.email} was not found in the database! Cannot create work log for non existing client.`,
        });
        return;
      }
      const objectQuery = `/data/workLogs[${index}]`;
      db.delete(objectQuery);

      const workLogs = this.getWorkLogsFromDB();

      res.json(workLogs);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  };
}
