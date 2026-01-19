from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Use absolute path to ensure database is created in the backend directory
db_path = os.path.join(os.path.dirname(__file__), 'roomsync.db')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', f'sqlite:///{db_path}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS FIRST - before creating db instance
# Allow all origins in development, specific origins in production
allowed_origins = os.getenv('ALLOWED_ORIGINS', '*').split(',')
CORS(app, resources={
    r"/api/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('availabilities', lazy=True))
    
    # Property details
    housing_property = db.Column(db.String(100), nullable=False)  # Beverly Plaza, Park Avenue, Patio Gardens, Circles
    apartment_plan = db.Column(db.String(50), nullable=False)
    number_of_roommates_preferred = db.Column(db.Integer, nullable=False)
    
    # Preferences
    gender_preference = db.Column(db.String(20), nullable=False)  # Male, Female, Any
    cost_preference_min = db.Column(db.Float, nullable=False)
    cost_preference_max = db.Column(db.Float, nullable=False)
    lease_term = db.Column(db.String(50), nullable=False)  # 6 months, 12 months, etc.
    dietary_restrictions = db.Column(db.String(200))
    course_program = db.Column(db.String(100))
    community = db.Column(db.String(100))  # Ethnicity/Background: Students, Working Individuals, Americans, Asians, Chinese, etc.
    miscellaneous = db.Column(db.Text)
    
    # Status
    status = db.Column(db.String(20), default='available')  # available, booking_fast, filled_up
    filled_at = db.Column(db.DateTime, nullable=True)
    
    # Post type
    post_type = db.Column(db.String(20), nullable=False)  # 'post_availability' or 'seek_availability'
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MarketplaceItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('marketplace_items', lazy=True))
    
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)  # lamp, chair, study_table, etc.
    price = db.Column(db.Float, nullable=False)
    condition = db.Column(db.String(50))  # new, like_new, good, fair
    image_url = db.Column(db.String(500))
    
    status = db.Column(db.String(20), default='available')  # available, sold
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Helper function to clean orphaned data (availabilities/marketplace items without users)
def clean_orphaned_data():
    # Delete availabilities where user_id doesn't exist
    orphaned_availabilities = Availability.query.filter(
        ~Availability.user_id.in_(db.session.query(User.id))
    ).all()
    for avail in orphaned_availabilities:
        db.session.delete(avail)
    
    # Delete marketplace items where user_id doesn't exist
    orphaned_marketplace_items = MarketplaceItem.query.filter(
        ~MarketplaceItem.user_id.in_(db.session.query(User.id))
    ).all()
    for item in orphaned_marketplace_items:
        db.session.delete(item)
    
    if orphaned_availabilities or orphaned_marketplace_items:
        db.session.commit()
        print(f"Cleaned {len(orphaned_availabilities)} orphaned availabilities and {len(orphaned_marketplace_items)} orphaned marketplace items")

# Initialize database
with app.app_context():
    # Only create tables if they don't exist - don't drop existing data
    db.create_all()
    # Clean up any orphaned data on startup
    clean_orphaned_data()

# CORS is handled by Flask-CORS, no need for manual headers
# The after_request handler was causing duplicate headers

# Handle errors - Flask-CORS will automatically add CORS headers
@app.errorhandler(404)
@app.errorhandler(500)
@app.errorhandler(400)
def handle_error(e):
    if hasattr(e, 'code'):
        code = e.code
    else:
        code = 500
    response = jsonify({'error': str(e) if hasattr(e, 'description') else 'An error occurred'})
    return response, code

# Helper function to prune filled_up posts older than 24 hours
def prune_old_filled_posts():
    cutoff_time = datetime.utcnow() - timedelta(hours=24)
    old_posts = Availability.query.filter(
        Availability.status == 'filled_up',
        Availability.filled_at < cutoff_time
    ).all()
    for post in old_posts:
        db.session.delete(post)
    db.session.commit()

# API Routes

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'RoomSync API Server', 'status': 'running', 'endpoints': '/api/*'}), 200

# Test endpoint to verify server is running
@app.route('/api/test', methods=['GET', 'OPTIONS'])
def test():
    return jsonify({'message': 'Server is running!', 'cors': 'enabled'}), 200

@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Check if user with this email already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'id': existing_user.id, 'name': existing_user.name, 'email': existing_user.email, 'contact': existing_user.contact}), 200
        
        user = User(
            name=data['name'],
            email=data['email'],
            contact=data['contact']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'contact': user.contact}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'contact': user.contact})

@app.route('/api/availabilities', methods=['POST'])
def create_availability():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate that user exists
        user_id = data.get('user_id')
        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': f'User with id {user_id} does not exist. Please create a user account first.'}), 400
        
        availability = Availability(
            user_id=data['user_id'],
            housing_property=data['housing_property'],
            apartment_plan=data['apartment_plan'],
            number_of_roommates_preferred=data['number_of_roommates_preferred'],
            gender_preference=data['gender_preference'],
            cost_preference_min=data['cost_preference_min'],
            cost_preference_max=data['cost_preference_max'],
            lease_term=data['lease_term'],
            dietary_restrictions=data.get('dietary_restrictions', ''),
            course_program=data.get('course_program', ''),
            community=data.get('community', ''),
            miscellaneous=data.get('miscellaneous', ''),
            post_type=data['post_type'],
            status=data.get('status', 'available')
        )
        db.session.add(availability)
        db.session.commit()
        return jsonify({'id': availability.id, 'message': 'Availability posted successfully'}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing required field: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/availabilities', methods=['GET'])
def get_availabilities():
    # Clean orphaned data first
    clean_orphaned_data()
    # Prune old filled posts
    prune_old_filled_posts()
    
    # Get query parameters for filtering
    post_type = request.args.get('post_type')
    housing_property = request.args.get('housing_property')
    community = request.args.get('community')  # Now means ethnicity/background
    gender_preference = request.args.get('gender_preference')
    cost_max = request.args.get('cost_max', type=float)
    lease_term = request.args.get('lease_term')
    apartment_plan = request.args.get('apartment_plan')
    number_of_roommates = request.args.get('number_of_roommates', type=int)
    course_program = request.args.get('course_program')
    status = request.args.get('status')
    
    query = Availability.query
    
    if post_type:
        query = query.filter(Availability.post_type == post_type)
    if housing_property:
        query = query.filter(Availability.housing_property == housing_property)
    if community:
        query = query.filter(Availability.community == community)
    if gender_preference:
        query = query.filter(
            (Availability.gender_preference == gender_preference) | 
            (Availability.gender_preference == 'Any')
        )
    if cost_max:
        query = query.filter(Availability.cost_preference_max <= cost_max)
    if lease_term:
        query = query.filter(Availability.lease_term == lease_term)
    if apartment_plan:
        query = query.filter(Availability.apartment_plan == apartment_plan)
    if number_of_roommates:
        query = query.filter(Availability.number_of_roommates_preferred == number_of_roommates)
    if course_program:
        query = query.filter(Availability.course_program.contains(course_program))
    if status:
        query = query.filter(Availability.status == status)
    
    availabilities = query.all()
    
    result = []
    for avail in availabilities:
        user = User.query.get(avail.user_id)
        if not user:
            continue  # Skip if user doesn't exist
        result.append({
            'id': avail.id,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'contact': user.contact
            },
            'user_id': avail.user_id,  # Add user_id so frontend can check if viewer is author
            'housing_property': avail.housing_property,
            'apartment_plan': avail.apartment_plan,
            'number_of_roommates_preferred': avail.number_of_roommates_preferred,
            'gender_preference': avail.gender_preference,
            'cost_preference_min': avail.cost_preference_min,
            'cost_preference_max': avail.cost_preference_max,
            'lease_term': avail.lease_term,
            'dietary_restrictions': avail.dietary_restrictions,
            'course_program': avail.course_program,
            'community': avail.community,
            'miscellaneous': avail.miscellaneous,
            'status': avail.status,
            'post_type': avail.post_type,
            'created_at': avail.created_at.isoformat()
        })
    
    return jsonify(result)

@app.route('/api/availabilities/<int:availability_id>', methods=['GET'])
def get_availability(availability_id):
    availability = Availability.query.get_or_404(availability_id)
    user = User.query.get(availability.user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': availability.id,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'contact': user.contact
        },
        'user_id': availability.user_id,
        'housing_property': availability.housing_property,
        'apartment_plan': availability.apartment_plan,
        'number_of_roommates_preferred': availability.number_of_roommates_preferred,
        'gender_preference': availability.gender_preference,
        'cost_preference_min': availability.cost_preference_min,
        'cost_preference_max': availability.cost_preference_max,
        'lease_term': availability.lease_term,
        'dietary_restrictions': availability.dietary_restrictions,
        'course_program': availability.course_program,
        'community': availability.community,
        'miscellaneous': availability.miscellaneous,
        'status': availability.status,
        'post_type': availability.post_type,
        'created_at': availability.created_at.isoformat()
    })

@app.route('/api/availabilities/<int:availability_id>/status', methods=['PUT'])
def update_availability_status(availability_id):
    data = request.json
    availability = Availability.query.get_or_404(availability_id)
    availability.status = data['status']
    if data['status'] == 'filled_up':
        availability.filled_at = datetime.utcnow()
    db.session.commit()
    return jsonify({'message': 'Status updated successfully'})

@app.route('/api/marketplace', methods=['POST'])
def create_marketplace_item():
    data = request.json
    item = MarketplaceItem(
        user_id=data['user_id'],
        title=data['title'],
        description=data.get('description', ''),
        category=data['category'],
        price=data['price'],
        condition=data.get('condition', ''),
        image_url=data.get('image_url', ''),
        status=data.get('status', 'available')
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({'id': item.id, 'message': 'Item posted successfully'}), 201

@app.route('/api/marketplace', methods=['GET'])
def get_marketplace_items():
    # Clean orphaned data first
    clean_orphaned_data()
    category = request.args.get('category')
    price_max = request.args.get('price_max', type=float)
    status = request.args.get('status', 'available')
    
    query = MarketplaceItem.query.filter(MarketplaceItem.status == status)
    
    if category:
        query = query.filter(MarketplaceItem.category == category)
    if price_max:
        query = query.filter(MarketplaceItem.price <= price_max)
    
    items = query.all()
    
    result = []
    for item in items:
        user = User.query.get(item.user_id)
        if not user:
            continue  # Skip if user doesn't exist
        result.append({
            'id': item.id,
            'user': {
                'id': user.id,
                'name': user.name,
                'contact': user.contact
            },
            'title': item.title,
            'description': item.description,
            'category': item.category,
            'price': item.price,
            'condition': item.condition,
            'image_url': item.image_url,
            'status': item.status,
            'created_at': item.created_at.isoformat()
        })
    
    return jsonify(result)

@app.route('/api/marketplace/<int:item_id>', methods=['GET'])
def get_marketplace_item(item_id):
    item = MarketplaceItem.query.get_or_404(item_id)
    user = User.query.get(item.user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': item.id,
        'user': {
            'id': user.id,
            'name': user.name,
            'contact': user.contact
        },
        'title': item.title,
        'description': item.description,
        'category': item.category,
        'price': item.price,
        'condition': item.condition,
        'image_url': item.image_url,
        'status': item.status,
        'created_at': item.created_at.isoformat()
    })

@app.route('/api/marketplace/<int:item_id>/status', methods=['PUT'])
def update_marketplace_item_status(item_id):
    data = request.json
    item = MarketplaceItem.query.get_or_404(item_id)
    item.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Status updated successfully'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug, host='0.0.0.0', port=port)

