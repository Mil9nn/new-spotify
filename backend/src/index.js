import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload';
import path from 'path';

import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import statRoutes from './routes/stat.route.js';
import albumRoutes from './routes/album.route.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()) // this will add auth to request object
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
}));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/albums', albumRoutes);

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    connectDB();
})