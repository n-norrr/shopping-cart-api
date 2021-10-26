import express from 'express';
import getDefault from '../controllers/gets.js';

const router = express.Router();

router.get('/test', getDefault);

export default router;