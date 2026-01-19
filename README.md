# PurSell - Student Accommodation & Marketplace Platform

A web application designed to help CSULB students find accommodation, roommates, and essential items. Built with React (frontend) and Flask (backend).

## Features

### Accommodation & Roommate Search
- **Post Availability**: Students can post about available rooms they're looking to fill
- **Seek Availability**: Students can search for available accommodations with detailed filters
- **Filter Options**:
  - Gender preference
  - Cost range
  - Lease term
  - Dietary restrictions
  - Apartment plan
  - Number of roommates preferred
  - Community (Beverly Plaza, Park Avenue, Patio Gardens, Circles Apartments)
  - Course/Program
  - Miscellaneous preferences

### Status Management
- **Available**: Standard listing
- **Booking Fast**: High demand indicator
- **Filled Up**: Automatically pruned after 24 hours

### Marketplace
- Buy and sell essential student items (lamps, chairs, study tables, etc.)
- Filter by category and price
- Contact details visible when viewing items

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Python, Flask, SQLAlchemy
- **Database**: SQLite (default, can be configured for PostgreSQL/MySQL)

## Project Structure

```
PurSell/
├── backend/
│   ├── app.py              # Flask application and API endpoints
│   ├── requirements.txt    # Python dependencies
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/      # API service layer
│   │   ├── App.js         # Main app component with routing
│   │   └── index.js       # Entry point
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional, defaults to SQLite):
```bash
DATABASE_URL=sqlite:///pursell.db
```

5. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users/<id>` - Get user details

### Availabilities
- `POST /api/availabilities` - Create an availability post
- `GET /api/availabilities` - Get availabilities with filters
- `GET /api/availabilities/<id>` - Get specific availability
- `PUT /api/availabilities/<id>/status` - Update availability status

### Marketplace
- `POST /api/marketplace` - Create a marketplace item
- `GET /api/marketplace` - Get marketplace items with filters
- `GET /api/marketplace/<id>` - Get specific marketplace item
- `PUT /api/marketplace/<id>/status` - Update item status

## Usage

1. **Posting Availability**: Navigate to "Post Availability" and fill in your details and preferences
2. **Seeking Availability**: Go to "Seek Availability", apply filters, and browse available listings
3. **Marketplace**: Visit "Marketplace" to buy or sell items

## Deployment

This application can be deployed to:
- **Backend**: Render (recommended) or Heroku
- **Frontend**: Vercel (recommended) or Netlify

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment Summary

1. **Backend (Render)**:
   - Push code to GitHub
   - Create new Web Service on Render
   - Set environment variables
   - Deploy

2. **Frontend (Vercel)**:
   - Import GitHub repository
   - Set `REACT_APP_API_URL` environment variable
   - Deploy

## Notes

- Filled up posts are automatically removed after 24 hours
- Contact details are only visible when a user clicks "Show Contact Details"
- All data is stored locally in SQLite by default (can be configured for production databases)
- For production, use PostgreSQL (Render provides this)

## Future Enhancements

- User authentication and profiles
- Image uploads for marketplace items
- Messaging system between users
- Email notifications
- Advanced search with saved preferences
- Rating and review system

