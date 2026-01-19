#!/bin/bash
# Kill any existing Flask processes on port 5000
lsof -ti:5000 | xargs kill -9 2>/dev/null || true

# Wait a moment
sleep 1

# Start the Flask server
echo "Starting Flask server on http://localhost:5000"
python3 app.py

