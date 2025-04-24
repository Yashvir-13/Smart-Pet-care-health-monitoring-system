import {
  User,
  Pet,
  MedicalRecord,
  VitalReading,
  LocationData,
  EmergencyAlert,
  Veterinarian,
  DietRecommendation,
  HealthReport
} from '../types';
import { format, subDays, subHours } from 'date-fns';

// ------------------ Mock Users ------------------
export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
  },
];

// ------------------ Mock Pets ------------------
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

// ------------------ Mock Medical Records ------------------
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

// ------------------ Vital Readings ------------------
export const generateVitalReadings = (): VitalReading[] => {
  const readings: VitalReading[] = [];
  for (let i = 0; i < 24; i++) {
    const timestamp = format(subHours(new Date(), i), "yyyy-MM-dd'T'HH:mm:ss");
    readings.push({
      timestamp,
      heartRate: Math.floor(70 + Math.random() * 30),
      temperature: 38 + Math.random() * 1,
      spO2: Math.floor(95 + Math.random() * 5),
    });
  }
  return readings;
};

// ------------------ Location Data ------------------
export const generateLocationData = (): LocationData[] => {
  const locations: LocationData[] = [];
  const baseLatitude = 28.4744;
  const baseLongitude = 77.5030;
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

// Generate and store pet location data once
export const petLocationData = generateLocationData();
const latestLocation = petLocationData[0]; // use latest as current location

// ------------------ Emergency Alerts ------------------
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

// ------------------ Veterinarians ------------------
export const veterinarians: Veterinarian[] = [
  {
    id: 'vet1',
    name: 'Dr. Gaurav Dog Clinic',
    address: 'Shop No. 5, Near Dominos, Alpha 1, Greater Noida',
    phone: '09891036971',
    email: '',
    latitude: 28.4746,
    longitude: 77.5001,
    distance: 0,
  },
  {
    id: 'vet2',
    name: 'Dr. Khullar Pet Clinic',
    address: 'Shop No 3, Delta 1, Near Indian Bank, Greater Noida',
    phone: '09911977411',
    email: '',
    latitude: 28.4758,
    longitude: 77.5025,
    distance: 0,
  },
  {
    id: 'vet3',
    name: "Dr. Manisha's Pet Clinic",
    address: 'Alpha II, Commercial Belt, Near Omaxe Mall, Greater Noida',
    phone: '08750012345',
    email: '',
    latitude: 28.4742,
    longitude: 77.5070,
    distance: 0,
  },
  {
    id: 'vet4',
    name: 'Pet Care Centre',
    address: 'Gamma 1, Jagat Farm, Greater Noida',
    phone: '01202327667',
    email: '',
    latitude: 28.4750,
    longitude: 77.5010,
    distance: 0,
  },
  {
    id: 'vet5',
    name: "Dr. Ghosh's Pet Clinic",
    address: 'Sector Beta 1, Greater Noida',
    phone: '09811076543',
    email: '',
    latitude: 28.4710,
    longitude: 77.5045,
    distance: 0,
  },
  {
    id: 'vet6',
    name: 'Happy Tails Vet Clinic',
    address: 'Delta 2, Greater Noida, Near DPS School',
    phone: '09555123456',
    email: '',
    latitude: 28.4785,
    longitude: 77.5000,
    distance: 0,
  },
  {
    id: 'vet7',
    name: 'Pawsh Pet Care',
    address: 'Pari Chowk, Greater Noida',
    phone: '09873467890',
    email: '',
    latitude: 28.4700,
    longitude: 77.5100,
    distance: 0,
  },
  {
    id: 'vet8',
    name: 'Green Vets Animal Clinic',
    address: 'Sector Alpha 2, Greater Noida',
    phone: '08567811223',
    email: '',
    latitude: 28.4760,
    longitude: 77.4980,
    distance: 0,
  },
  {
    id: 'vet9',
    name: 'Noida Pet Hospital',
    address: 'Sector Omega 1, Greater Noida',
    phone: '09988944332',
    email: '',
    latitude: 28.4690,
    longitude: 77.5090,
    distance: 0,
  },
  {
    id: 'vet10',
    name: 'Vets & Pets Clinic',
    address: 'Gamma 2, Greater Noida, Near Axis Bank',
    phone: '09011209876',
    email: '',
    latitude: 28.4765,
    longitude: 77.4975,
    distance: 0,
  },
];

// ------------------ Haversine Formula ------------------
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ------------------ Nearest 3 Veterinarians ------------------
export const nearestVets = veterinarians
  .map(vet => ({
    ...vet,
    distance: parseFloat(
      getDistance(
        latestLocation.latitude,
        latestLocation.longitude,
        vet.latitude,
        vet.longitude
      ).toFixed(2)
    ),
  }))
  .sort((a, b) => a.distance - b.distance)
  .slice(0, 3);

// ------------------ Diet Recommendations ------------------
export const dietRecommendations: DietRecommendation[] = [
  {
    id: 'diet1',
    petId: 'pet1',
    timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss"),
    recommendation:
      "Based on your pet's activity level and weight, we recommend a high-protein diet with moderate fat content. Include 2 cups of premium dry food divided into two meals per day. Ensure fresh water is always available. Avoid table scraps and limit treats to 10% of daily caloric intake.",
  },
];

// ------------------ Health Reports ------------------
export const generateHealthReports = (): HealthReport[] => {
  const today = new Date();
  const reports: HealthReport[] = [];

  for (let i = 0; i < 7; i++) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    reports.push({
      date,
      averageHeartRate: Math.floor(60 + Math.random() * 40),
      averageTemperature: parseFloat((37 + Math.random()).toFixed(1)),
      averageSpO2: Math.floor(95 + Math.random() * 5),
      activityScore: Math.floor(20 + Math.random() * 80),
    });
  }

  return reports;
};
