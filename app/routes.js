import express from 'express';
import asyncHandler from 'express-async-handler';
import * as ConfigsController from './controllers/ConfigsController.js';

const router = express.Router();

router.get('/nginx-configs', asyncHandler(ConfigsController.getList));

export default router;
