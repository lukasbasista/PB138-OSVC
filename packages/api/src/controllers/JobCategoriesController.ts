import { Response, Request } from 'express';
import JobCategory from '../../db/types/jobCategory';
import db from './dbController';

export default class JobCategoriesController {
  public getCategories = (req: Request, res: Response): void => {
    try {
      const categories = this.getCategoriesFromDB();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ err: 'Could not fetch job categories.' });
    }
  };

  public getCategoryByName = (req: Request, res: Response): void => {
    const { name } = req.params;
    if (!name) {
      res.status(400).json({ err: 'Missing category name in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/jobCategories', name, 'name');
      if (index === -1) {
        res.status(404).json({ err: `Category with name ${name} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/jobCategories[${index}]`;
      const category: JobCategory = db.getData(objectQuery);
      if (!category) {
        res.status(404).json({ err: `Category with name ${name} was not found in the database!` });
        return;
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ err: 'Could not fetch job categories.' });
    }
  };

  private getCategoriesFromDB = (): JobCategory[] => {
    try {
      const categories = db.getData('/data/jobCategories');
      return categories;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  public updateCategory = (req: Request, res: Response): void => {
    const { name } = req.params;
    if (!name) {
      res.status(400).json({ err: 'Missing name in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/jobCategories', name, 'name');
      if (index === -1) {
        res.status(404).json({ err: `Category with name ${name} was not found in the database!` });
        return;
      }
      const objectQuery = `/data/jobCategories[${index}]`;
      const category: JobCategory = db.getData(objectQuery);
      if (!category) {
        res.status(404).json({ err: `Category with name ${name} was not found in the database!` });
        return;
      }
      category.name = req.body.name || category.name;
      category.description = req.body.description || category.description;
      category.updatedAt = new Date();

      db.push(objectQuery, category);

      const categories: JobCategory[] = this.getCategoriesFromDB();

      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public createCategory = (req: Request, res: Response): void => {
    const name = req.body.name || null;
    if (!name) {
      res.status(400).json({ err: 'Missing category name' });
      return;
    }
    try {
      if (db.getIndex('/data/jobCategories', name, 'name') > -1) {
        res.status(403).json({ err: 'Already exists' });
        return;
      }

      const description = req.body.description || undefined;

      const category: JobCategory = {
        name: name,
        description: description,
        creationTime: new Date(),
      };

      db.push('/data/jobCategories[]', category);

      const categories = this.getCategoriesFromDB();

      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'fucky wucky' });
    }
  };

  public deleteCategory = (req: Request, res: Response): void => {
    const { name } = req.params;
    if (!name) {
      res.status(400).json({ err: 'Missing name in request params' });
      return;
    }
    try {
      const index = db.getIndex('/data/jobCategories', name, 'name');
      const objectQuery = `/data/jobCategories[${index}]`;
      db.delete(objectQuery);

      const categories = this.getCategoriesFromDB();

      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  };
}
