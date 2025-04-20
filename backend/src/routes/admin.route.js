import { Router } from 'express';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controllers/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protectRoute, requireAdmin); // Apply middleware to all routes

router.get('/check', checkAdmin);

router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;