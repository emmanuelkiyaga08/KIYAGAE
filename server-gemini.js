const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:5500', 'https://your-production-url.com']
}));

// Middleware to parse JSON requests
app.use(express.json());

// Rate Limit Configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Ask Tutor Endpoint
app.post('/ask-tutor', (req, res) => {
    const { question } = req.body;
    // Implement question answering logic here
    // Send a response:
    res.status(200).json({ success: true, answer: 'This is a dummy answer.' });
});

// Summarize Endpoint
app.post('/summarize', (req, res) => {
    const { notes } = req.body;
    // Implement summary generation logic here
    res.status(200).json({ success: true, summary: 'Summary of notes.' });
});

// Generate Revision Endpoint
app.post('/generate-revision', (req, res) => {
    const { topic } = req.body;
    // Implement revision question generation logic here
    res.status(200).json({ success: true, questions: 'Revision questions.' });
});

// Generate Exam Endpoint
app.post('/generate-exam', (req, res) => {
    const { subject } = req.body;
    // Implement exam paper generation logic here
    res.status(200).json({ success: true, exam: 'Generated exam paper.' });
});

// Generate Study Plan Endpoint
app.post('/generate-study-plan', (req, res) => {
    const { duration } = req.body;
    // Implement study plan creation logic here
    res.status(200).json({ success: true, plan: 'Your study plan.' });
});

// Explain Concept Endpoint
app.post('/explain-concept', (req, res) => {
    const { concept } = req.body;
    // Implement concept explanation logic here
    res.status(200).json({ success: true, explanation: 'Explanation of the concept.' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
