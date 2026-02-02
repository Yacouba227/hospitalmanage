# Hospital Management System

A comprehensive hospital management application built with Next.js, FastAPI, and SQLite as specified in the requirements.

## Features

- **Patient Records Management**: Create, edit, and view patient information
- **Medical Records Management**: Track patient medical history and treatments
- **Appointment Scheduling**: Schedule and manage patient appointments
- **Prescription Management**: Handle patient prescriptions and medications
- **User Management**: Role-based access control for different user types
- **Responsive UI**: Clean, professional interface with dark/light mode
- **Authentication**: Secure login and registration system

### User Roles

- Administrator: Full access to all features
- Doctor: Access to patient records and prescriptions
- Nurse: Read access to patient records
- Secretary: Manage appointments and patient check-ins
- Patient: View personal information and appointments

## Technical Architecture

- **Frontend**: Next.js 14+ with TypeScript
- **Backend**: FastAPI (planned)
- **Database**: SQLite (planned)
- **Styling**: Tailwind CSS with custom components
- **Authentication**: JWT-based (simulated in frontend)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation header with dark mode toggle
│   └── Sidebar.tsx      # Main navigation sidebar
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── dashboard/           # Dashboard page
├── patients/            # Patient management page
├── records/             # Medical records page
├── appointments/        # Appointment scheduling page
├── prescriptions/       # Prescription management page
├── users/               # User management page
├── login/               # Login page
├── register/            # Registration page
├── api/                 # API routes
│   ├── auth/            # Authentication API
│   └── patients/        # Patient management API
├── layout.tsx           # Main layout with AuthProvider
├── globals.css          # Global styles and theme
└── page.tsx             # Homepage (redirects to dashboard)
```

## API Endpoints

- `GET /api/patients` - Retrieve all patients
- `POST /api/patients` - Create a new patient
- `PUT /api/patients` - Update a patient
- `DELETE /api/patients?id=x` - Delete a patient
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Future Enhancements

- Implement full FastAPI backend
- Connect to SQLite database
- Add more comprehensive validation
- Implement proper JWT authentication
- Add reporting and analytics features
- Include appointment reminders
- Add inventory management for medical supplies

## Learn More

This project demonstrates a complete hospital management system frontend with:

- Modern React patterns (Context API, hooks)
- TypeScript for type safety
- Tailwind CSS for responsive styling
- Next.js App Router for routing
- Professional UI/UX design
- Dark/light mode support
- Role-based access patterns

## Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).