import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import Client from '../../db/types/client';
import WorkLog from '../../db/types/workLog';
import WorkLogController from './WorkLogController';
import db from './dbController';

const workLogController = new WorkLogController();

type ClientStats = {
  earningsSum: number;
  currency: string;
  timeWorked: number; // minutes
};
export default class ClientsController {
  private getClientsFromDB = (email?: string | undefined): Client[] => {
    try {
      let clients = db.getData('/data/clients');
      if (email) {
        clients = clients.filter((el: WorkLog) => {
          return el.email == email;
        });
      }
      return clients;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };
  
  public getClients = (req: Request, res: Response): void => {
    try {
      const clients = this.getClientsFromDB();
      clients.forEach((el: Client) => {
        const stats = this.getStats(el.email);
        for (const attrname in stats) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          el[attrname] = stats[attrname];
        }
      })

      res.json(clients);
    } catch (err) {
      res.status(500).json({ err: 'Could not fetch clients.' });
    }
  };

  public getClientFromDB = (req: Request, res: Response): Client | void => {
    const { email } = req.params;
    const index = db.getIndex('/data/clients', email, 'email');
    if (index === -1) {
      res
        .status(404)
        .json({ err: `Client with email ${email} was not found in the database!` });
      return;
    }
    const objectQuery = `/data/clients[${index}]`;
    const client: Client = db.getData(objectQuery);
    if (!client) {
      res
        .status(404)
        .json({ err: `Client with email ${email} was not found in the database!` });
      return;
    }
    return client;
  };

  public getClientByEmail = (req: Request, res: Response): void => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ err: 'Missing client email in request params' });
      return;
    }
    try {
      const client = this.getClientFromDB(req, res);
      if (!client) {
        return;
      }
      res.json(client);
    } catch (err) {
      res.status(500).json({ err: 'Could not fetch client.' });
    }
  };

  private getStats = (email: string) => {
    try {
      const index = db.getIndex('/data/clients', email, 'email');
      if (index === -1) {
        return;
      }
      const objectQuery = `/data/clients[${index}]`;
      const client: Client = db.getData(objectQuery);
      if (!client) {
        return;
      }

      const workLogs = workLogController.getWorkLogsFromDB(email);

      let earningsSum = 0;
      workLogs.forEach((el: WorkLog) => {
        earningsSum += el.total;
      });

      let timeWorked = 0;
      workLogs.forEach((el: WorkLog) => {
        timeWorked += el.timeWorked;
      });

      const result: ClientStats = {
        earningsSum: earningsSum,
        currency: client.bankAccount.currency,
        timeWorked: timeWorked,
      };
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  public getTotalTimeAndCurrency = (req: Request, res: Response): void => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ err: 'Missing client email in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/clients', email, 'email');
      if (index === -1) {
        res.status(404).json({ err: `Client with email ${email} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/clients[${index}]`;
      const client: Client = db.getData(objectQuery);
      if (!client) {
        res.status(404).json({ err: `Client with email ${email} was not found in the database!` });
        return;
      }

      const workLogs = workLogController.getWorkLogsFromDB(email);

      let earningsSum = 0;
      workLogs.forEach((el: WorkLog) => {
        earningsSum += el.total;
      });

      let timeWorked = 0;
      workLogs.forEach((el: WorkLog) => {
        timeWorked += el.timeWorked;
      });

      const result: ClientStats = {
        earningsSum: earningsSum,
        currency: client.bankAccount.currency,
        timeWorked: timeWorked,
      };

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public updateClient = (req: Request, res: Response): void => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ err: 'Missing client email in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/clients', email, 'email');
      if (index === -1) {
        res.status(404).json({ err: `Client with email ${email} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/clients[${index}]`;
      const client: Client = db.getData(objectQuery);
      if (!client) {
        res.status(404).json({ err: `Client with email ${email} was not found in the database!` });
        return;
      }

      const body = req.body;

      // This is retarded but I haven't found a better way to do it
      client.email = body.email || client.email;
      client.name = body.name || client.name;
      client.mobileNumber = body.mobileNumber || client.mobileNumber;
      client.isCompany = body.isCompany || client.isCompany;
      client.ic = body.ic || client.ic;
      client.dic = body.dic || client.dic;
      client.address = body.address
        ? {
            address: body.address.address || client.address.address,
            city: body.address.city || client.address.city,
            postcode: body.address.postcode || client.address.postcode,
            country: body.address.country || client.address.country,
          }
        : client.address;
      client.bankAccount = body.bankAccount
        ? {
            accountNumber: body.bankAccount.accountNumber || client.bankAccount.accountNumber,
            currency: body.bankAccount.currency || client.bankAccount.currency,
          }
        : client.bankAccount;
      client.updatedAt = new Date();

      db.push(objectQuery, client);

      const clients = this.getClientsFromDB();

      res.json(clients);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public createClient = (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const client: Client = req.body;
    client.creationTime = new Date();

    try {
      if (db.getIndex('/data/clients', client.email, 'email') > -1) {
        res.status(403).json({ err: 'Already exists' });
        return;
      }

      db.push('/data/clients[]', client);

      const clients = this.getClientsFromDB();

      res.json(clients);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public deleteClient = (req: Request, res: Response): void => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ err: 'Missing email in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/clients', email, 'email');
      if (index === -1) {
        res.status(404).json({ err: `Client with email ${email} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/clients[${index}]`;
      db.delete(objectQuery);

      const clients = this.getClientsFromDB();

      res.json(clients);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  };
}
