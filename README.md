# RoomSync

A comprehensive platform designed to simplify the accommodation and roommate search process for international students at California State University, Long Beach (CSULB).

## Problem Statement

Imagine arriving in a new country, thousands of miles from home, with just a few weeks before classes begin. Your priority list is overwhelming: navigate a new city, understand a different culture, set up banking, get a phone number, and somehow find a place to live. But here's the reality that every international student at CSULB knows all too well:

You spend hours scrolling through Facebook groups, WhatsApp chats, and random websites, hoping to find someone who needs a roommate or has a room available. You message dozens of people, only to discover the room is already taken, the location is too far, or worse you realize after moving in that your roommate's lifestyle is completely incompatible with yours. Maybe they're night owls and you need quiet study time, or they have dietary restrictions that clash with yours, or the cost is more than you budgeted for.

The search becomes a full-time job you didn't sign up for. You're juggling time zones to call home, trying to understand lease agreements in a language that's not your first, and making decisions about where you'll live for the next year based on incomplete information. Meanwhile, you're also trying to find basic furniture and essentials a desk, a chair, a lamp because you can't afford to buy everything new, but you don't know where to look or who to trust.

This isn't just about finding a room. It's about finding a home, a community, and roommates who understand what it means to be an international student. It's about reducing the stress of an already challenging transition and focusing on what you came here to do: learn, grow, and succeed.

The current system is broken. Information is scattered, preferences are ignored, and students are left to figure it out alone. There has to be a better way.

## Solution

RoomSync is that better way. Built by students, for students, specifically for the CSULB community. We understand because we've been there the late-night searches, the uncertainty, the hope that the next message will be the one that works out.

RoomSync brings everything you need into one place, designed with your actual needs in mind. No more jumping between platforms. No more guessing if a listing is still available. No more moving in blind, hoping for the best. Here's how we're changing the game:

### One Platform, Everything You Need
Stop the endless tab-switching. Whether you're looking for a room or have one to fill, RoomSync is your single destination. Post your availability in minutes, or search with filters that actually matter to you. No more Facebook groups, no more random websites, no more missed opportunities.

### Find Your Perfect Match
We get it compatibility matters. That's why RoomSync lets you filter by what really counts:
- Gender preferences
- Budget constraints
- Lease term requirements
- Dietary restrictions
- Apartment plans and configurations
- Number of roommates preferred
- Community preferences (ethnicity/background)
- Academic programs and courses
- Custom miscellaneous preferences

### CSULB-Focused, Student-Tested
We started with the properties you actually care about the ones within walking distance or a short commute to campus. Beverly Plaza, Park Avenue, Patio Gardens, and Circles Apartments. No more wondering if a listing is actually near campus. Every property on RoomSync is verified and relevant to your CSULB life.

### More Than Just Housing
Moving in is just the beginning. You need furniture, study supplies, and essentials that won't break your budget. RoomSync's integrated marketplace connects you with other students selling exactly what you need, at prices you can afford. It's your one-stop shop for setting up your new life.

### Always Up-to-Date
Tired of messaging people about rooms that were filled weeks ago? RoomSync shows real-time status. Available, Booking Fast, or Filled Up. Once a room is filled, it automatically disappears after 24 hours, so you're always seeing what's actually available. No wasted time, no false hope.

<img width="3420" height="2214" alt="Screenshot 2026-01-19 at 7 12 53 PM" src="https://github.com/user-attachments/assets/56a6bb7d-c07b-4cd0-af4f-b8411c77d5d7" />

## Features

### Accommodation Management

**Post Availability**
- Students can create detailed listings for available rooms
- Include preferences for ideal roommates
- Set status indicators to reflect urgency
- Manage listings with the ability to mark as filled

<img width="1710" height="1107" alt="Screenshot 2026-01-19 at 7 14 12 PM" src="https://github.com/user-attachments/assets/c2498a9a-39a0-4916-a203-e1848e6ff8f7" />

<img width="1710" height="1107" alt="Screenshot 2026-01-19 at 7 14 37 PM" src="https://github.com/user-attachments/assets/48218eeb-9722-484e-83b4-a02588b865c2" />

<img width="1710" height="1107" alt="Screenshot 2026-01-19 at 7 14 54 PM" src="https://github.com/user-attachments/assets/dc3640be-fd59-4059-8667-9fa97532785b" />

**Seek Availability**
- Comprehensive search with multiple filter options
- View detailed listings with contact information
- Filter by housing property, cost range, lease terms, and more
- Real-time availability status

<img width="1710" height="1107" alt="Screenshot 2026-01-19 at 7 16 21 PM" src="https://github.com/user-attachments/assets/ffc5cfd8-43d0-48b6-aaaf-ed4755be693d" />

### Marketplace

- Buy and sell essential student items
- Price-based filtering
- Category organization
- Direct contact information for transactions

<img width="1710" height="1107" alt="Screenshot 2026-01-19 at 7 16 30 PM" src="https://github.com/user-attachments/assets/bcda0345-9499-40bc-a3ca-ff07d10f59c3" />

<img width="1710" height="1107" alt="Screenshot 2026-01-19 at 7 18 23 PM" src="https://github.com/user-attachments/assets/fc919042-0334-49ec-9d62-a23154c99a98" />

### User Experience

- Clean, intuitive interface designed for ease of use
- Responsive design for mobile and desktop access
- Fast, efficient search and filtering
- Secure contact information sharing

## Tech Stack

### Frontend
- **React**: Modern UI framework for building interactive user interfaces
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with responsive design principles

### Backend
- **Python 3**: Core programming language
- **Flask**: Lightweight web framework for API development
- **SQLAlchemy**: Object-relational mapping for database operations
- **Flask-CORS**: Cross-origin resource sharing support

### Database
- **SQLite**: Default database for development
- **PostgreSQL**: Recommended for production deployments

### Deployment
- **Backend**: Azure App Service, PythonAnywhere, or other cloud platforms
- **Frontend**: Vercel, Netlify, or similar static hosting services

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn package manager
- Git for version control

### Installation

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables (optional):
Create a `.env` file in the backend directory:
```bash
DATABASE_URL=sqlite:///roomsync.db
ALLOWED_ORIGINS=http://localhost:3000
FLASK_ENV=development
```

5. Run the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5001`

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint (if different from default):
Create a `.env` file in the frontend directory:
```bash
REACT_APP_API_URL=http://localhost:5001/api
```

4. Start the development server:
```bash
npm start
```

The frontend application will open at `http://localhost:3000`

## Project Structure

```
RoomSync/
├── backend/
│   ├── app.py                 # Flask application, API endpoints, and database models
│   ├── requirements.txt       # Python dependencies
│   ├── Procfile              # Process configuration for deployment
│   ├── render.yaml           # Render deployment configuration
│   └── roomsync.db           # SQLite database (created automatically)
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Home.js
│   │   │   ├── Navbar.js
│   │   │   ├── PostAvailability.js
│   │   │   ├── SeekAvailability.js
│   │   │   ├── AvailabilityCard.js
│   │   │   ├── Marketplace.js
│   │   │   └── MarketplaceCard.js
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── App.js            # Main app component with routing
│   │   └── index.js          # Application entry point
│   └── package.json          # Node.js dependencies
├── DEPLOYMENT.md             # Detailed deployment instructions
├── QUICKSTART.md             # Quick setup guide
└── README.md                 # This file
```

## API Documentation

### User Endpoints

- `POST /api/users` - Create a new user account
  - Request body: `{ "name": string, "email": string, "contact": string }`
  - Returns: User object with ID

- `GET /api/users/<id>` - Retrieve user information
  - Returns: User object

### Availability Endpoints

- `POST /api/availabilities` - Create a new availability listing
  - Request body: Includes housing property, preferences, contact details
  - Returns: Availability object with ID

- `GET /api/availabilities` - Retrieve availability listings
  - Query parameters: Filters for gender, cost, lease term, property, etc.
  - Returns: Array of availability objects

- `GET /api/availabilities/<id>` - Get specific availability details
  - Returns: Availability object with full details

- `PUT /api/availabilities/<id>/status` - Update availability status
  - Request body: `{ "status": "available" | "booking_fast" | "filled_up" }`
  - Returns: Success message

### Marketplace Endpoints

- `POST /api/marketplace` - Create a new marketplace item
  - Request body: Item details including name, description, price, category
  - Returns: Marketplace item object with ID

- `GET /api/marketplace` - Retrieve marketplace items
  - Query parameters: Filters for category, price range
  - Returns: Array of marketplace item objects

- `GET /api/marketplace/<id>` - Get specific marketplace item
  - Returns: Marketplace item object with full details

- `PUT /api/marketplace/<id>/status` - Update item status
  - Request body: `{ "status": "available" | "sold" }`
  - Returns: Success message

## Usage Guide

### Posting an Availability

1. Navigate to "Post Availability" from the main menu
2. Fill in your personal information (name, email, contact)
3. Select your housing property
4. Specify your apartment plan and number of roommates needed
5. Set your preferences (gender, cost range, lease term, dietary restrictions, etc.)
6. Add any additional notes in the miscellaneous field
7. Submit the form to create your listing



### Seeking an Availability

1. Navigate to "Seek Availability" from the main menu
2. Apply filters based on your preferences:
   - Housing property
   - Gender preference
   - Cost range
   - Lease term
   - Number of roommates
   - Community preference
   - Course/Program
3. Browse filtered results
4. Click on a listing card to view details
5. Click "Show Contact Details" to get in touch with the poster

### Using the Marketplace

1. Navigate to "Marketplace" from the main menu
2. Browse available items or use filters to narrow your search
3. Click on an item card to view full details
4. Contact the seller using provided contact information
5. To sell an item, use the marketplace posting feature

## Deployment

RoomSync can be deployed to various cloud platforms. Detailed deployment instructions are available in [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Overview

**Backend Deployment Options:**
- Azure App Service (recommended, free tier available)
- PythonAnywhere (free tier available)
- Cyclic.sh (serverless, free tier)
- Other cloud platforms supporting Python/Flask

**Frontend Deployment Options:**
- Vercel (recommended, free tier)
- Netlify (free tier)
- Other static hosting services

### Environment Variables

**Backend:**
- `DATABASE_URL`: Database connection string
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs
- `FLASK_ENV`: Environment mode (development/production)
- `PORT`: Server port (optional, defaults to 5001)

**Frontend:**
- `REACT_APP_API_URL`: Backend API URL (must include `/api` suffix)

## Data Management

- Filled availability posts are automatically removed after 24 hours
- Contact details are only visible when explicitly requested by clicking "Show Contact Details"
- All data is stored in SQLite by default for development
- PostgreSQL is recommended for production deployments
- Orphaned data (posts without valid users) is automatically cleaned up

## Security Considerations

- CORS is configured to allow requests from specified origins
- User authentication is handled via localStorage (basic implementation)
- Contact information is only shared when explicitly requested
- Input validation is performed on both frontend and backend
- SQL injection protection via SQLAlchemy ORM

## Future Enhancements

- Comprehensive user authentication and authorization system
- User profiles with ratings and reviews
- Image uploads for marketplace items and accommodations
- In-app messaging system between users
- Email notifications for new matches and messages
- Advanced search with saved preferences
- Mobile application development
- Integration with university student information systems
- Automated matching algorithm based on preferences
- Calendar integration for viewing schedules

## Contributing

This project is designed specifically for CSULB students. Contributions, suggestions, and feedback are welcome. Please ensure any changes align with the project's goal of helping international students find suitable accommodation and roommates.

## License

This project is developed for educational and community purposes at California State University, Long Beach.

## Support

For issues, questions, or suggestions:
- Check the deployment guide in [DEPLOYMENT.md](./DEPLOYMENT.md)
- Review the quick start guide in [QUICKSTART.md](./QUICKSTART.md)
- Verify environment variables are configured correctly
- Check application logs for detailed error messages

---

Built with the goal of making student accommodation search easier, one connection at a time.
