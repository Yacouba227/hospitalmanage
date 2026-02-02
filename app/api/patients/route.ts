import { NextResponse } from 'next/server';

// Mock data for patients (in a real app, this would come from a database)
let patients = [
  { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', dateOfBirth: '1985-06-15', gender: 'Male', bloodType: 'O+' },
  { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', dateOfBirth: '1990-03-22', gender: 'Female', bloodType: 'A-' },
  { id: 3, name: 'Robert Brown', phone: '+1 (555) 456-7890', dateOfBirth: '1978-11-08', gender: 'Male', bloodType: 'B+' },
  { id: 4, name: 'Emily Davis', phone: '+1 (555) 234-5678', dateOfBirth: '1995-09-30', gender: 'Female', bloodType: 'AB+' },
];

export async function GET() {
  // Return all patients
  return NextResponse.json(patients);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.dateOfBirth || !body.gender || !body.bloodType) {
      return NextResponse.json(
        { error: 'All fields are required: name, phone, dateOfBirth, gender, bloodType' },
        { status: 400 }
      );
    }
    
    // Create new patient
    const newPatient = {
      id: Math.max(...patients.map(p => p.id), 0) + 1, // Generate new ID
      ...body
    };
    
    patients.push(newPatient);
    
    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.name || !body.phone || !body.dateOfBirth || !body.gender || !body.bloodType) {
      return NextResponse.json(
        { error: 'All fields are required: id, name, phone, dateOfBirth, gender, bloodType' },
        { status: 400 }
      );
    }
    
    // Find and update the patient
    const patientIndex = patients.findIndex(p => p.id === body.id);
    if (patientIndex === -1) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }
    
    patients[patientIndex] = body;
    
    return NextResponse.json(patients[patientIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Patient ID is required' },
        { status: 400 }
      );
    }
    
    // Find and remove the patient
    const patientIndex = patients.findIndex(p => p.id === parseInt(id));
    if (patientIndex === -1) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }
    
    const deletedPatient = patients.splice(patientIndex, 1)[0];
    
    return NextResponse.json(deletedPatient);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}