"""
Database initialization script for the Hospital Management System.
Creates the database and adds sample data for demonstration.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from main import Base, User, Patient, MedicalRecord, Appointment, Prescription

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./hospital_management.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """Initialize the database with tables and sample data."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Create a session
    db = SessionLocal()
    
    try:
        # Check if users already exist
        if db.query(User).count() == 0:
            # Create sample users
            admin_user = User(
                name="Admin User",
                email="admin@hospital.com",
                phone="+1 (555) 100-0001",
                role="Administrator",
                hashed_password="$2b$12$LQv3c1kJ5W6L4J.pHkAFkedWAD0UGpiKE.sMRqd.qMCn4YPo.yESa",  # bcrypt hash for "password"
                is_active=True
            )
            
            doctor_user = User(
                name="Dr. John Smith",
                email="dr.smith@hospital.com",
                phone="+1 (555) 100-0002",
                role="Doctor",
                department="Cardiology",
                hashed_password="$2b$12$LQv3c1kJ5W6L4J.pHkAFkedWAD0UGpiKE.sMRqd.qMCn4YPo.yESa",  # bcrypt hash for "password"
                is_active=True
            )
            
            nurse_user = User(
                name="Jane Johnson",
                email="j.johnson@hospital.com",
                phone="+1 (555) 100-0003",
                role="Nurse",
                department="Emergency",
                hashed_password="$2b$12$LQv3c1kJ5W6L4J.pHkAFkedWAD0UGpiKE.sMRqd.qMCn4YPo.yESa",  # bcrypt hash for "password"
                is_active=True
            )
            
            secretary_user = User(
                name="Robert Williams",
                email="r.williams@hospital.com",
                phone="+1 (555) 100-0004",
                role="Secretary",
                hashed_password="$2b$12$LQv3c1kJ5W6L4J.pHkAFkedWAD0UGpiKE.sMRqd.qMCn4YPo.yESa",  # bcrypt hash for "password"
                is_active=True
            )
            
            db.add(admin_user)
            db.add(doctor_user)
            db.add(nurse_user)
            db.add(secretary_user)
            db.commit()
            
            print("Sample users created successfully!")
        
        # Check if patients already exist
        if db.query(Patient).count() == 0:
            # Create sample patients
            patient1 = Patient(
                name="John Doe",
                phone="+1 (555) 123-4567",
                date_of_birth="1985-06-15",
                gender="Male",
                blood_type="O+",
                address="123 Main St, City, State",
                emergency_contact="+1 (555) 987-6543",
                owner_id=1  # Admin user
            )
            
            patient2 = Patient(
                name="Jane Smith",
                phone="+1 (555) 987-6543",
                date_of_birth="1990-03-22",
                gender="Female",
                blood_type="A-",
                address="456 Oak Ave, City, State",
                emergency_contact="+1 (555) 123-4567",
                owner_id=1  # Admin user
            )
            
            patient3 = Patient(
                name="Robert Brown",
                phone="+1 (555) 456-7890",
                date_of_birth="1978-11-08",
                gender="Male",
                blood_type="B+",
                address="789 Pine Rd, City, State",
                emergency_contact="+1 (555) 234-5678",
                owner_id=1  # Admin user
            )
            
            patient4 = Patient(
                name="Emily Davis",
                phone="+1 (555) 234-5678",
                date_of_birth="1995-09-30",
                gender="Female",
                blood_type="AB+",
                address="321 Elm St, City, State",
                emergency_contact="+1 (555) 456-7890",
                owner_id=1  # Admin user
            )
            
            db.add(patient1)
            db.add(patient2)
            db.add(patient3)
            db.add(patient4)
            db.commit()
            
            print("Sample patients created successfully!")
        
        # Check if medical records already exist
        if db.query(MedicalRecord).count() == 0:
            # Create sample medical records
            record1 = MedicalRecord(
                patient_id=1,
                date="2026-02-01",
                doctor="Dr. Smith",
                diagnosis="Routine Checkup",
                treatment="General examination",
                observations="Patient in good health",
                status="Completed"
            )
            
            record2 = MedicalRecord(
                patient_id=2,
                date="2026-02-02",
                doctor="Dr. Johnson",
                diagnosis="Flu Symptoms",
                treatment="Rest and fluids",
                observations="Patient recovering well",
                status="Completed"
            )
            
            record3 = MedicalRecord(
                patient_id=3,
                date="2026-02-03",
                doctor="Dr. Williams",
                diagnosis="Hypertension",
                treatment="Prescribed medication",
                observations="Monitor blood pressure regularly",
                status="In Progress"
            )
            
            db.add(record1)
            db.add(record2)
            db.add(record3)
            db.commit()
            
            print("Sample medical records created successfully!")
        
        # Check if appointments already exist
        if db.query(Appointment).count() == 0:
            # Create sample appointments
            appointment1 = Appointment(
                patient_id=1,
                date="2026-02-10",
                time="10:00",
                doctor="Dr. Smith",
                reason="Annual checkup",
                status="Scheduled",
                owner_id=1  # Admin user
            )
            
            appointment2 = Appointment(
                patient_id=2,
                date="2026-02-11",
                time="14:30",
                doctor="Dr. Johnson",
                reason="Follow-up visit",
                status="Scheduled",
                owner_id=1  # Admin user
            )
            
            appointment3 = Appointment(
                patient_id=3,
                date="2026-02-09",
                time="09:15",
                doctor="Dr. Williams",
                reason="Consultation",
                status="Completed",
                owner_id=1  # Admin user
            )
            
            db.add(appointment1)
            db.add(appointment2)
            db.add(appointment3)
            db.commit()
            
            print("Sample appointments created successfully!")
        
        # Check if prescriptions already exist
        if db.query(Prescription).count() == 0:
            # Create sample prescriptions
            prescription1 = Prescription(
                record_id=1,
                patient_id=1,
                medication="Aspirin",
                dosage="100mg",
                frequency="Once daily",
                duration="30 days",
                prescribed_by="Dr. Smith",
                date_prescribed="2026-02-01",
                status="Active"
            )
            
            prescription2 = Prescription(
                record_id=2,
                patient_id=2,
                medication="Amoxicillin",
                dosage="500mg",
                frequency="Twice daily",
                duration="10 days",
                prescribed_by="Dr. Johnson",
                date_prescribed="2026-02-02",
                status="Active"
            )
            
            prescription3 = Prescription(
                record_id=3,
                patient_id=3,
                medication="Lisinopril",
                dosage="10mg",
                frequency="Once daily",
                duration="90 days",
                prescribed_by="Dr. Williams",
                date_prescribed="2026-02-03",
                status="Active"
            )
            
            db.add(prescription1)
            db.add(prescription2)
            db.add(prescription3)
            db.commit()
            
            print("Sample prescriptions created successfully!")
        
        print("\nDatabase initialized successfully with sample data!")
        print("\nSample login credentials:")
        print("- Email: admin@hospital.com")
        print("- Password: password")
        print("- Role: Administrator")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()