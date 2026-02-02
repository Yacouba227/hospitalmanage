'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function PrescriptionsPage() {
  // Define the type for our prescriptions
  type Prescription = {
    id: number;
    recordId: number;
    patientId: number;
    patientName: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    prescribedBy: string;
    datePrescribed: string;
    status: 'Active' | 'Completed' | 'Cancelled';
  };

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 1, recordId: 1, patientId: 1, patientName: 'John Doe', medication: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: '30 days', prescribedBy: 'Dr. Smith', datePrescribed: '2026-02-01', status: 'Active' },
    { id: 2, recordId: 2, patientId: 2, patientName: 'Jane Smith', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '10 days', prescribedBy: 'Dr. Johnson', datePrescribed: '2026-02-02', status: 'Active' },
    { id: 3, recordId: 3, patientId: 3, patientName: 'Robert Brown', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '90 days', prescribedBy: 'Dr. Williams', datePrescribed: '2026-02-03', status: 'Active' },
  ]);

  const [medicalRecords] = useState([
    { id: 1, patientId: 1, patientName: 'John Doe' },
    { id: 2, patientId: 2, patientName: 'Jane Smith' },
    { id: 3, patientId: 3, patientName: 'Robert Brown' },
  ]);

  const [doctors] = useState([
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Williams',
    'Dr. Davis',
    'Dr. Miller'
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);
  
  const [formData, setFormData] = useState({
    recordId: 0,
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    prescribedBy: '',
    datePrescribed: '',
    status: 'Active' as 'Active' | 'Completed' | 'Cancelled'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'recordId' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPrescription) {
      // Update existing prescription
      const relatedRecord = medicalRecords.find(r => r.id === formData.recordId);
      const patientName = relatedRecord ? relatedRecord.patientName : '';
      setPrescriptions(prev => prev.map(prescription => 
        prescription.id === editingPrescription.id 
          ? { ...prescription, ...formData, patientName, patientId: relatedRecord?.patientId || 0 } 
          : prescription
      ));
    } else {
      // Add new prescription
      const relatedRecord = medicalRecords.find(r => r.id === formData.recordId);
      const patientName = relatedRecord ? relatedRecord.patientName : '';
      const patientId = relatedRecord?.patientId || 0;
      const newPrescription: Prescription = {
        id: Date.now(), // In a real app, this would come from the backend
        recordId: formData.recordId,
        patientId,
        patientName,
        medication: formData.medication,
        dosage: formData.dosage,
        frequency: formData.frequency,
        duration: formData.duration,
        prescribedBy: formData.prescribedBy,
        datePrescribed: formData.datePrescribed,
        status: formData.status
      };
      setPrescriptions(prev => [...prev, newPrescription]);
    }
    
    // Reset form and close modal
    setFormData({ 
      recordId: 0, 
      medication: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      prescribedBy: '', 
      datePrescribed: '', 
      status: 'Active' 
    });
    setShowModal(false);
    setEditingPrescription(null);
  };

  const handleEdit = (prescription: Prescription) => {
    setEditingPrescription(prescription);
    setFormData({
      recordId: prescription.recordId,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      prescribedBy: prescription.prescribedBy,
      datePrescribed: prescription.datePrescribed,
      status: prescription.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
  };

  const openAddModal = () => {
    setEditingPrescription(null);
    setFormData({ 
      recordId: 0, 
      medication: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      prescribedBy: '', 
      datePrescribed: '', 
      status: 'Active' 
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prescriptions</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage patient prescriptions and medications
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Prescriptions</h2>
                <button
                  onClick={openAddModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Prescription
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Medication
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Dosage
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Prescribed By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{prescription.patientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.medication}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.dosage}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.frequency}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.prescribedBy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.datePrescribed}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            prescription.status === 'Active' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
                              : prescription.status === 'Completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                          }`}>
                            {prescription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(prescription)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(prescription.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for adding/editing prescriptions */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingPrescription ? 'Edit Prescription' : 'Add New Prescription'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="recordId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Medical Record
                  </label>
                  <select
                    id="recordId"
                    name="recordId"
                    value={formData.recordId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value={0}>Select Medical Record</option>
                    {medicalRecords.map(record => (
                      <option key={record.id} value={record.id}>{record.patientName} (ID: {record.id})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="datePrescribed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Prescribed
                  </label>
                  <input
                    type="date"
                    id="datePrescribed"
                    name="datePrescribed"
                    value={formData.datePrescribed}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="medication" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Medication
                  </label>
                  <input
                    type="text"
                    id="medication"
                    name="medication"
                    value={formData.medication}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Frequency
                  </label>
                  <input
                    type="text"
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="prescribedBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prescribed By
                  </label>
                  <select
                    id="prescribedBy"
                    name="prescribedBy"
                    value={formData.prescribedBy}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc, index) => (
                      <option key={index} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPrescription(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingPrescription ? 'Update Prescription' : 'Add Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}