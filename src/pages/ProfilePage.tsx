import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Edit, Save, Plus, Trash2, Calendar, Syringe, Stethoscope } from 'lucide-react';
import { MedicalRecord } from '../types';
import { medicalRecords } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { currentUser, currentPet } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [petData, setPetData] = useState(() => {
    const savedPetData = localStorage.getItem('petData');
    return savedPetData ? JSON.parse(savedPetData) : currentPet;
  });
  
  const [records, setRecords] = useState<MedicalRecord[]>(medicalRecords);
  const [newRecord, setNewRecord] = useState<Partial<MedicalRecord>>({
    type: 'vaccination',
    date: '',
    description: '',
    veterinarian: '',
    location: ''
  });
  const [showAddRecord, setShowAddRecord] = useState(false);

  const handlePetDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetData((prev: any) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('petData', JSON.stringify(petData));

    setIsEditing(false);
  };

  const handleNewRecordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = () => {
    const record: MedicalRecord = {
      id: `med${records.length + 1}`,
      petId: currentPet?.id || '',
      type: newRecord.type as 'vaccination' | 'appointment',
      date: newRecord.date || '',
      description: newRecord.description || '',
      veterinarian: newRecord.veterinarian,
      location: newRecord.location
    };
    
    setRecords(prev => [record, ...prev]);
    setNewRecord({
      type: 'vaccination',
      date: '',
      description: '',
      veterinarian: '',
      location: ''
    });
    setShowAddRecord(false);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  if (!currentUser || !currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile not available</h2>
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pet Profile</h1>
      
      {/* Owner Information */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="h-6 w-6 mr-2 text-indigo-600" />
            Owner Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pet Information */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Stethoscope className="h-6 w-6 mr-2 text-indigo-600" />
              Pet Information
            </h2>
            
            {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={petData?.name || ''}
                  onChange={handlePetDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={petData?.type || ''}
                  onChange={handlePetDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={petData?.breed || ''}
                  onChange={handlePetDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={petData?.age || ''}
                  onChange={handlePetDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={petData?.weight || ''}
                  onChange={handlePetDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
                  Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  value={petData?.sex || ''}
                  onChange={handlePetDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Pet Name</p>
                <p className="text-lg font-medium">{petData?.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Pet Type</p>
                <p className="text-lg font-medium">{petData?.type}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Breed</p>
                <p className="text-lg font-medium">{petData?.breed}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-lg font-medium">{petData?.age} years</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="text-lg font-medium">{petData?.weight} kg</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Sex</p>
                <p className="text-lg font-medium capitalize">{petData?.sex}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Medical Records */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Syringe className="h-6 w-6 mr-2 text-indigo-600" />
              Medical Records
            </h2>
            
            {!showAddRecord && (
              <button
                onClick={() => setShowAddRecord(true)}
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              >
                <Plus className="h-4 w-4" />
                <span>Add Record</span>
              </button>
            )}
          </div>
          
          {showAddRecord && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Add New Medical Record</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Record Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newRecord.type}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="vaccination">Vaccination</option>
                    <option value="appointment">Appointment</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newRecord.date}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newRecord.description}
                    onChange={handleNewRecordChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="veterinarian" className="block text-sm font-medium text-gray-700 mb-1">
                    Veterinarian
                  </label>
                  <input
                    type="text"
                    id="veterinarian"
                    name="veterinarian"
                    value={newRecord.veterinarian}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newRecord.location}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddRecord(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRecord}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                >
                  Add Record
                </button>
              </div>
            </div>
          )}
          
          {records.length > 0 ? (
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="mr-3">
                        {record.type === 'vaccination' ? (
                          <Syringe className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Calendar className="h-5 w-5 text-indigo-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {record.type === 'vaccination' ? 'Vaccination' : 'Appointment'}: {record.description}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Date: {record.date}
                        </p>
                        {record.veterinarian && (
                          <p className="text-sm text-gray-600">
                            Veterinarian: {record.veterinarian}
                          </p>
                        )}
                        {record.location && (
                          <p className="text-sm text-gray-600">
                            Location: {record.location}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteRecord(record.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Syringe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No medical records available.</p>
              <p className="text-gray-500 mt-2">
                Click the "Add Record" button to add vaccination records or appointment history.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;