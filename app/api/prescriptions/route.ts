import { NextResponse } from 'next/server';

// Mock data for prescriptions (in a real app, this would come from a database)
let prescriptions = [
  { id: 1, recordId: 1, patientId: 1, patientName: 'John Doe', medication: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: '30 days', prescribedBy: 'Dr. Smith', datePrescribed: '2026-02-01', status: 'Active' },
  { id: 2, recordId: 2, patientId: 2, patientName: 'Jane Smith', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '10 days', prescribedBy: 'Dr. Johnson', datePrescribed: '2026-02-02', status: 'Active' },
  { id: 3, recordId: 3, patientId: 3, patientName: 'Robert Brown', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '90 days', prescribedBy: 'Dr. Williams', datePrescribed: '2026-02-03', status: 'Active' },
];

export async function GET() {
  // Return all prescriptions
  return NextResponse.json(prescriptions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.recordId || !body.patientId || !body.medication || !body.dosage || !body.frequency || !body.duration || !body.prescribedBy || !body.datePrescribed || !body.status) {
      return NextResponse.json(
        { error: 'All fields are required: recordId, patientId, medication, dosage, frequency, duration, prescribedBy, datePrescribed, status' },
        { status: 400 }
      );
    }
    
    // Create new prescription
    const newPrescription = {
      id: Math.max(...prescriptions.map(p => p.id), 0) + 1, // Generate new ID
      ...body
    };
    
    prescriptions.push(newPrescription);
    
    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prescription' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.recordId || !body.patientId || !body.medication || !body.dosage || !body.frequency || !body.duration || !body.prescribedBy || !body.datePrescribed || !body.status) {
      return NextResponse.json(
        { error: 'All fields are required: id, recordId, patientId, medication, dosage, frequency, duration, prescribedBy, datePrescribed, status' },
        { status: 400 }
      );
    }
    
    // Find and update the prescription
    const prescriptionIndex = prescriptions.findIndex(p => p.id === body.id);
    if (prescriptionIndex === -1) {
      return NextResponse.json(
        { error: 'Prescription not found' },
        { status: 404 }
      );
    }
    
    prescriptions[prescriptionIndex] = body;
    
    return NextResponse.json(prescriptions[prescriptionIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update prescription' },
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
        { error: 'Prescription ID is required' },
        { status: 400 }
      );
    }
    
    // Find and remove the prescription
    const prescriptionIndex = prescriptions.findIndex(p => p.id === parseInt(id));
    if (prescriptionIndex === -1) {
      return NextResponse.json(
        { error: 'Prescription not found' },
        { status: 404 }
      );
    }
    
    const deletedPrescription = prescriptions.splice(prescriptionIndex, 1)[0];
    
    return NextResponse.json(deletedPrescription);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete prescription' },
      { status: 500 }
    );
  }
}