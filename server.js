/* Simple Express server to serve the Vite build (dist) on Heroku */
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath, {
	maxAge: '1d',
}));

app.get('*', (_req, res) => {
	res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});


