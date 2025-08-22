/* Full-stack Express server with API endpoints for Heroku/Railway/Render deployment */
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist'), {
	maxAge: '1d',
}));

// API Routes
app.get('/api/health', (req, res) => {
	res.json({ 
		status: 'OK', 
		message: 'Smart Helpdesk API is running',
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || 'development'
	});
});

app.get('/api/tickets', (req, res) => {
	// Mock ticket data
	const tickets = [
		{
			id: 1,
			title: 'Login Issue',
			status: 'open',
			priority: 'high',
			createdAt: new Date().toISOString()
		},
		{
			id: 2,
			title: 'Dashboard Loading',
			status: 'in-progress',
			priority: 'medium',
			createdAt: new Date().toISOString()
		}
	];
	res.json(tickets);
});

app.post('/api/tickets', (req, res) => {
	const { title, description, priority } = req.body;
	
	if (!title) {
		return res.status(400).json({ error: 'Title is required' });
	}
	
	const newTicket = {
		id: Date.now(),
		title,
		description: description || '',
		status: 'open',
		priority: priority || 'medium',
		createdAt: new Date().toISOString()
	};
	
	res.status(201).json(newTicket);
});

app.get('/api/stats', (req, res) => {
	res.json({
		totalTickets: 25,
		openTickets: 8,
		resolvedTickets: 15,
		avgResponseTime: '2.5 hours'
	});
});

// SPA fallback - must be last
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log(`🚀 Smart Helpdesk server running on port ${port}`);
	console.log(`📊 API available at http://localhost:${port}/api/health`);
	console.log(`🌐 Frontend served from /dist directory`);
});


