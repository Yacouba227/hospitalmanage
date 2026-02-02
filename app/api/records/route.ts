import { NextResponse } from 'next/server';

// Mock data for medical records (in a real app, this would come from a database)
let records = [
  { id: 1, patientId: 1, patientName: 'John Doe', date: '2026-02-01', doctor: 'Dr. Smith', diagnosis: 'Routine Checkup', treatment: 'General examination', status: 'Completed' },
  { id: 2, patientId: 2, patientName: 'Jane Smith', date: '2026-02-02', doctor: 'Dr. Johnson', diagnosis: 'Flu Symptoms', treatment: 'Rest and fluids', status: 'Completed' },
  { id: 3, patientId: 3, patientName: 'Robert Brown', date: '2026-02-03', doctor: 'Dr. Williams', diagnosis: 'Hypertension', treatment: 'Prescribed medication', status: 'In Progress' },
];

export async function GET() {
  // Return all records
  return NextResponse.json(records);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.patientId || !body.date || !body.doctor || !body.diagnosis || !body.treatment || !body.status) {
      return NextResponse.json(
        { error: 'All fields are required: patientId, date, doctor, diagnosis, treatment, status' },
        { status: 400 }
      );
    }
    
    // Create new record
    const newRecord = {
      id: Math.max(...records.map(r => r.id), 0) + 1, // Generate new ID
      ...body
    };
    
    records.push(newRecord);
    
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create record' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.patientId || !body.date || !body.doctor || !body.diagnosis || !body.treatment || !body.status) {
      return NextResponse.json(
        { error: 'All fields are required: id, patientId, date, doctor, diagnosis, treatment, status' },
        { status: 400 }
      );
    }
    
    // Find and update the record
    const recordIndex = records.findIndex(r => r.id === body.id);
    if (recordIndex === -1) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
    
    records[recordIndex] = body;
    
    return NextResponse.json(records[recordIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update record' },
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
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }
    
    // Find and remove the record
    const recordIndex = records.findIndex(r => r.id === parseInt(id));
    if (recordIndex === -1) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
    
    const deletedRecord = records.splice(recordIndex, 1)[0];
    
    return NextResponse.json(deletedRecord);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete record' },
      { status: 500 }
    );
  }
}