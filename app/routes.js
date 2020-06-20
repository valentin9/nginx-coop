import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';

import * as ConfigsController from './controllers/ConfigsController.js';

router.get('/nginx-configs', asyncHandler(ConfigsController.getList));

export default router;
