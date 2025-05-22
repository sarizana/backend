import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// Routes imports
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import routineRoutes from './routes/routineRoutes.js'; // Added routine routes
import productRoutes from './routes/productRoutes.js'; // Added product routes
import contactRoutes from "./routes/contactRoutes.js";
import userProfileRoutes from './routes/userProfileRoutes.js';
import emailPrefRoutes from './routes/userEmailPreferencesRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js'; // ✅ Added WhatsApp route
import webhookRoutes from './routes/webhookRoutes.js';

const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
});
app.set('io', io);

// Enable CORS with specific settings
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for cookie parsing
app.use(cookieParser());

// Define your API routes
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/routines', routineRoutes); // Add route for routines
app.use('/api/products', productRoutes); // Add route for products
app.use("/api/contact", contactRoutes);
app.use('/api/profile', userProfileRoutes);
app.use('/api/email-preferences', emailPrefRoutes);
app.use('/api', whatsappRoutes); //  WhatsApp API route
app.use('/webhook', webhookRoutes);

// Default endpoint to check server status
app.get('/', (req, res) => {
    res.send('Server is ready');
});





// Error handling middleware
app.use(notFound);  // 404 handler for undefined routes
app.use(errorHandler); // Custom error handler middleware

// Socket.IO connection logging
io.on('connection', (socket) => {
    console.log("🟢 Socket connected:", socket.id);
    socket.on('disconnect', () => {
        console.log("🔴 Socket disconnected:", socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
