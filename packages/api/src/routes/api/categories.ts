import express from 'express';
import JobCategoriesController from '../../controllers/JobCategoriesController';

const router = express.Router();

const controller = new JobCategoriesController();

/* Returns all categories */
router.get('/', controller.getCategories);

/* Returns category by its name */
router.get('/:name', controller.getCategoryByName);

/* Updates single category by category.name and returns all categories */
router.put('/:name', controller.updateCategory);

/* Creates new category and returns all categories */
router.post('/', controller.createCategory);

/* Deletes category by category.name and returns all categories */
router.delete('/:name', controller.deleteCategory);

export default router;
