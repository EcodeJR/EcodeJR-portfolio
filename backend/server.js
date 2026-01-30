const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Disable CSP for development to prevent image blocking
}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/portfolio', require('./routes/portfolioProjectRoutes'));
app.use('/api/projects', require('./routes/clientProjectRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));


// Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
