import { NextResponse } from 'next/server';

// Mock data for appointments (in a real app, this would come from a database)
let appointments = [
  { id: 1, patientId: 1, patientName: 'John Doe', date: '2026-02-10', time: '10:00', doctor: 'Dr. Smith', reason: 'Annual checkup', status: 'Scheduled' },
  { id: 2, patientId: 2, patientName: 'Jane Smith', date: '2026-02-11', time: '14:30', doctor: 'Dr. Johnson', reason: 'Follow-up visit', status: 'Scheduled' },
  { id: 3, patientId: 3, patientName: 'Robert Brown', date: '2026-02-09', time: '09:15', doctor: 'Dr. Williams', reason: 'Consultation', status: 'Completed' },
];

export async function GET() {
  // Return all appointments
  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.patientId || !body.date || !body.time || !body.doctor || !body.reason || !body.status) {
      return NextResponse.json(
        { error: 'All fields are required: patientId, date, time, doctor, reason, status' },
        { status: 400 }
      );
    }
    
    // Create new appointment
    const newAppointment = {
      id: Math.max(...appointments.map(a => a.id), 0) + 1, // Generate new ID
      ...body
    };
    
    appointments.push(newAppointment);
    
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.patientId || !body.date || !body.time || !body.doctor || !body.reason || !body.status) {
      return NextResponse.json(
        { error: 'All fields are required: id, patientId, date, time, doctor, reason, status' },
        { status: 400 }
      );
    }
    
    // Find and update the appointment
    const appointmentIndex = appointments.findIndex(a => a.id === body.id);
    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    appointments[appointmentIndex] = body;
    
    return NextResponse.json(appointments[appointmentIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update appointment' },
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
        { error: 'Appointment ID is required' },
        { status: 400 }
      );
    }
    
    // Find and remove the appointment
    const appointmentIndex = appointments.findIndex(a => a.id === parseInt(id));
    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    const deletedAppointment = appointments.splice(appointmentIndex, 1)[0];
    
    return NextResponse.json(deletedAppointment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}