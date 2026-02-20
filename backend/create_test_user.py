"""
Script to create a test user with known credentials for debugging
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import Base, User
from passlib.context import CryptContext

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./hospital_management.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_test_user():
    """Create a test user with known credentials"""
    db = SessionLocal()
    
    try:
        # Check if test user already exists
        existing_user = db.query(User).filter(User.email == "test@hospital.com").first()
        if existing_user:
            print("Test user already exists")
            return
        
        # Create test user with password "test123"
        test_user = User(
            name="Test User",
            email="test@hospital.com",
            phone="+1 (555) 000-0000",
            role="Administrator",
            hashed_password=pwd_context.hash("test123"),  # Hash for "test123"
            is_active=True
        )
        
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        print("Test user created successfully!")
        print("Login credentials:")
        print("- Email: test@hospital.com")
        print("- Password: test123")
        print("- Role: Administrator")
        
    except Exception as e:
        print(f"Error creating test user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_user()