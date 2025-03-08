export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  sex: 'male' | 'female';
  ownerId: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  type: 'vaccination' | 'appointment';
  date: string;
  description: string;
  veterinarian?: string;
  location?: string;
}

export interface VitalReading {
  timestamp: string;
  heartRate: number;
  temperature: number;
  spO2: number;
}

export interface LocationData {
  timestamp: string;
  latitude: number;
  longitude: number;
}

export interface EmergencyAlert {
  id: string;
  petId: string;
  timestamp: string;
  type: 'heartRate' | 'temperature' | 'spO2';
  value: number;
  status: 'active' | 'resolved';
  notes?: string;
}

export interface Veterinarian {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface DietRecommendation {
  id: string;
  petId: string;
  timestamp: string;
  recommendation: string;
}

export interface HealthReport {
  date: string;
  averageHeartRate: number;
  averageTemperature: number;
  averageSpO2: number;
  activityLevel: 'low' | 'moderate' | 'high';
  alerts: number;
}