import { User, Pet, MedicalRecord, VitalReading, LocationData, EmergencyAlert, Veterinarian, DietRecommendation, HealthReport } from '../types';
import { format, subDays, subHours, subMinutes } from 'date-fns';

// Mock Users
export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
  },
];

// Mock Pets
export const pets: Pet[] = [
  {
    id: 'pet1',
    name: 'Buddy',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    sex: 'male',
    ownerId: 'user1',
  },
];

// Mock Medical Records
export const medicalRecords: MedicalRecord[] = [
  {
    id: 'med1',
    petId: 'pet1',
    type: 'vaccination',
    date: '2023-10-15',
    description: 'Rabies Vaccination',
    veterinarian: 'Dr. Smith',
    location: 'PetCare Clinic',
  },
  {
    id: 'med2',
    petId: 'pet1',
    type: 'appointment',
    date: '2023-11-20',
    description: 'Annual Checkup',
    veterinarian: 'Dr. Johnson',
    location: 'Animal Hospital',
  },
];

// Generate mock vital readings for the last 24 hours
export const generateVitalReadings = (): VitalReading[] => {
  const readings: VitalReading[] = [];
  for (let i = 0; i < 24; i++) {
    const timestamp = format(subHours(new Date(), i), "yyyy-MM-dd'T'HH:mm:ss");
    readings.push({
      timestamp,
      heartRate: Math.floor(70 + Math.random() * 30), // 70-100 bpm
      temperature: 38 + Math.random() * 1, // 38-39°C
      spO2: Math.floor(95 + Math.random() * 5), // 95-100%
    });
  }
  return readings;
};

// Generate mock location data for the last 24 hours
export const generateLocationData = (): LocationData[] => {
  const locations: LocationData[] = [];
  const baseLatitude = 28.4744; // NYC latitude
  const baseLongitude = 77.5030; // NYC longitude
  
  for (let i = 0; i < 24; i++) {
    const timestamp = format(subHours(new Date(), i), "yyyy-MM-dd'T'HH:mm:ss");
    locations.push({
      timestamp,
      latitude: baseLatitude + (Math.random() - 0.5) * 0.005,
      longitude: baseLongitude + (Math.random() - 0.5) * 0.005,
    });
  }
  return locations;
};

// Mock Emergency Alerts
export const emergencyAlerts: EmergencyAlert[] = [
  {
    id: 'alert1',
    petId: 'pet1',
    timestamp: format(subDays(new Date(), 2), "yyyy-MM-dd'T'HH:mm:ss"),
    type: 'heartRate',
    value: 130,
    status: 'resolved',
    notes: 'Pet was exercising heavily',
  },
  {
    id: 'alert2',
    petId: 'pet1',
    timestamp: format(subHours(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss"),
    type: 'temperature',
    value: 39.8,
    status: 'active',
    notes: 'Possible fever',
  },
];

// Mock Veterinarians
export const veterinarians: Veterinarian[] = [
  {
    id: 'vet1',
    name: 'PetCare Emergency Clinic',
    address: '123 Main St, New York, NY 10001',
    phone: '(212) 555-1234',
    email: 'info@petcare.com',
    latitude: 40.7128,
    longitude: -74.0060,
    distance: 1.2,
  },
  {
    id: 'vet2',
    name: 'Animal Hospital 24/7',
    address: '456 Park Ave, New York, NY 10022',
    phone: '(212) 555-5678',
    email: 'info@animalhospital.com',
    latitude: 40.7589,
    longitude: -73.9851,
    distance: 2.5,
  },
  {
    id: 'vet3',
    name: 'Downtown Veterinary Center',
    address: '789 Broadway, New York, NY 10003',
    phone: '(212) 555-9012',
    email: 'info@downtownvet.com',
    latitude: 40.7309,
    longitude: -73.9973,
    distance: 3.1,
  },
];

// Mock Diet Recommendations
export const dietRecommendations: DietRecommendation[] = [
  {
    id: 'diet1',
    petId: 'pet1',
    timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss"),
    recommendation: 'Based on your pet\'s activity level and weight, we recommend a high-protein diet with moderate fat content. Include 2 cups of premium dry food divided into two meals per day. Ensure fresh water is always available. Avoid table scraps and limit treats to 10% of daily caloric intake.',
  },
];

// Generate mock health reports for the last 7 days
export const generateHealthReports = (): HealthReport[] => {
  const reports: HealthReport[] = [];
  for (let i = 0; i < 7; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    reports.push({
      date,
      averageHeartRate: Math.floor(75 + Math.random() * 20),
      averageTemperature: 38.2 + Math.random() * 0.8,
      averageSpO2: Math.floor(96 + Math.random() * 4),
      activityLevel: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'moderate' | 'high',
      alerts: Math.floor(Math.random() * 2),
    });
  }
  return reports;
};