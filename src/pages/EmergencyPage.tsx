  import React, { useState, useEffect } from 'react';
  import { useAuth } from '../context/AuthContext';
  import { AlertTriangle, Heart, Thermometer, Activity, MapPin, Phone, Navigation, CheckCircle } from 'lucide-react';
  import { VitalReading, Veterinarian } from '../types';
  import { generateVitalReadings, veterinarians } from '../data/mockData';
  import { format, parseISO } from 'date-fns';

  interface EmergencyInfo {
    type: 'heartRate' | 'temperature' | 'spO2';
    title: string;
    description: string;
    tips: string[];
  }

  const EmergencyPage: React.FC = () => {
    const { currentPet } = useAuth();
    const [latestReading, setLatestReading] = useState<VitalReading | null>(null);
    const [emergencyStatus, setEmergencyStatus] = useState<'normal' | 'warning' | 'critical'>('normal');
    const [emergencyType, setEmergencyType] = useState<'heartRate' | 'temperature' | 'spO2' | null>(null);
    const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo | null>(null);
    const [nearbyVets, setNearbyVets] = useState<Veterinarian[]>([]);

    useEffect(() => {
      // In a real app, this would fetch from an API
      const readings = generateVitalReadings();
      const latestReading = readings[0];
      setLatestReading(latestReading);
      
      // Check for emergency conditions
      checkVitalSigns(latestReading);
      
      // Get nearby vets
      setNearbyVets(veterinarians);

      // Simulate real-time updates
      const interval = setInterval(() => {
        const newReading: VitalReading = {
          timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
          heartRate: Math.floor(70 + Math.random() * 40), // Wider range for demo
          temperature: 37.5 + Math.random() * 2.5, // Wider range for demo
          spO2: Math.floor(92 + Math.random() * 8), // Wider range for demo
        };
        
        setLatestReading(newReading);
        checkVitalSigns(newReading);
      }, 10000);

      return () => clearInterval(interval);
    }, []);

    const checkVitalSigns = (reading: VitalReading) => {
      // Check heart rate
      if (reading.heartRate > 140) {
        setEmergencyStatus('critical');
        setEmergencyType('heartRate');
        setEmergencyInfo({
          type: 'heartRate',
          title: 'Elevated Heart Rate',
          description: `Your pet's heart rate is ${reading.heartRate} bpm, which is significantly above the normal range (60-120 bpm).`,
          tips: [
            'Keep your pet calm and in a quiet environment',
            'Ensure they have access to fresh water',
            'Avoid any strenuous activity',
            'Contact your veterinarian immediately',
            'Monitor for other symptoms like difficulty breathing or weakness'
          ]
        });
      } else if (reading.heartRate > 120) {
        setEmergencyStatus('warning');
        setEmergencyType('heartRate');
        setEmergencyInfo({
          type: 'heartRate',
          title: 'Elevated Heart Rate',
          description: `Your pet's heart rate is ${reading.heartRate} bpm, which is above the normal range (60-120 bpm).`,
          tips: [
            'Keep your pet calm and in a quiet environment',
            'Ensure they have access to fresh water',
            'Avoid any strenuous activity',
            'Monitor for changes and contact your veterinarian if it persists'
          ]
        });
      }
      // Check temperature
      else if (reading.temperature > 40) {
        setEmergencyStatus('critical');
        setEmergencyType('temperature');
        setEmergencyInfo({
          type: 'temperature',
          title: 'High Temperature',
          description: `Your pet's temperature is ${reading.temperature.toFixed(1)}°C, which is significantly above the normal range (37.5-39.5°C).`,
          tips: [
            'Move your pet to a cool, shaded area',
            'Provide fresh, cool water to drink',
            'Apply cool (not cold) water to their paws and ears',
            'Use a fan to increase air circulation',
            'Contact your veterinarian immediately as heat stroke is a medical emergency'
          ]
        });
      } else if (reading.temperature > 39.5) {
        setEmergencyStatus('warning');
        setEmergencyType('temperature');
        setEmergencyInfo({
          type: 'temperature',
          title: 'Elevated Temperature',
          description: `Your pet's temperature is ${reading.temperature.toFixed(1)}°C, which is above the normal range (37.5-39.5°C).`,
          tips: [
            'Ensure your pet is in a cool, comfortable environment',
            'Provide plenty of fresh water',
            'Monitor for other symptoms like lethargy or loss of appetite',
            'Contact your veterinarian if the temperature continues to rise or persists'
          ]
        });
      }
      // Check SpO2
      else if (reading.spO2 < 92) {
        setEmergencyStatus('critical');
        setEmergencyType('spO2');
        setEmergencyInfo({
          type: 'spO2',
          title: 'Low Oxygen Saturation',
          description: `Your pet's oxygen saturation is ${reading.spO2}%, which is significantly below the normal range (95-100%).`,
          tips: [
            'Keep your pet calm and restrict movement',
            'Ensure they are in a well-ventilated area',
            'Check for any signs of breathing difficulty or blue gums',
            'Contact your veterinarian immediately as low oxygen is a medical emergency'
          ]
        });
      } else if (reading.spO2 < 95) {
        setEmergencyStatus('warning');
        setEmergencyType('spO2');
        setEmergencyInfo({
          type: 'spO2',
          title: 'Low Oxygen Saturation',
          description: `Your pet's oxygen saturation is ${reading.spO2}%, which is below the normal range (95-100%).`,
          tips: [
            'Keep your pet calm and restrict movement',
            'Ensure they are in a well-ventilated area',
            'Monitor for any signs of breathing difficulty',
            'Contact your veterinarian if the levels continue to drop or other symptoms develop'
          ]
        });
      } else {
        setEmergencyStatus('normal');
        setEmergencyType(null);
        setEmergencyInfo(null);
      }
    };

    if (!currentPet) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency services not available</h2>
          <p className="text-gray-600">Please log in to access emergency services.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Emergency Services</h1>
        
        {/* Emergency Status */}
        <div className="mb-8">
          <div className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
            emergencyStatus === 'critical' 
              ? 'border-red-500' 
              : emergencyStatus === 'warning'
                ? 'border-yellow-500'
                : 'border-green-500'
          }`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                {emergencyStatus === 'critical' ? (
                  <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                ) : emergencyStatus === 'warning' ? (
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {emergencyStatus === 'critical' 
                    ? 'Critical Alert' 
                    : emergencyStatus === 'warning'
                      ? 'Warning Alert'
                      : 'All Vitals Normal'}
                </h2>
              </div>
              
              <div className="mb-6">
                {emergencyStatus !== 'normal' && emergencyInfo ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">{emergencyInfo.title}</h3>
                    <p className="text-gray-700 mb-4">{emergencyInfo.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    {currentPet.name}'s vital signs are currently within normal ranges. Continue to monitor regularly.
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {latestReading && (
                  <div className="col-span-3 md:col-span-1">
                    <div className={`flex justify-between items-center p-3 rounded-lg ${
                      emergencyType === 'heartRate' 
                        ? emergencyStatus === 'critical' 
                          ? 'bg-red-100' 
                          : 'bg-yellow-100'
                        : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center">
                        <Heart className={`h-5 w-5 mr-2 ${
                          emergencyType === 'heartRate' 
                            ? emergencyStatus === 'critical'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                            : 'text-gray-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-700">Heart Rate</span>
                      </div>
                      <span className="text-lg font-semibold">{latestReading.heartRate} bpm</span>
                    </div>
                  </div>
                )}
                
                {latestReading && (
                  <div className="col-span-3 md:col-span-1">
                    <div className={`flex justify-between items-center p-3 rounded-lg ${
                      emergencyType === 'temperature' 
                        ? emergencyStatus === 'critical' 
                          ? 'bg-red-100' 
                          : 'bg-yellow-100'
                        : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center">
                        <Thermometer className={`h-5 w-5 mr-2 ${
                          emergencyType === 'temperature' 
                            ? emergencyStatus === 'critical'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                            : 'text-gray-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-700">Temperature</span>
                      </div>
                      <span className="text-lg font-semibold">{latestReading.temperature.toFixed(1)}°C</span>
                    </div>
                  </div>
                )}
                
                {latestReading && (
                  <div className="col-span-3 md:col-span-1">
                    <div className={`flex justify-between items-center p-3 rounded-lg ${
                      emergencyType === 'spO2' 
                        ? emergencyStatus === 'critical' 
                          ? 'bg-red-100' 
                          : 'bg-yellow-100'
                        : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center">
                        <Activity className={`h-5 w-5 mr-2 ${
                          emergencyType === 'spO2' ? 'text-yellow-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-700">Oxygen</span>
                      </div>
                      <span className="text-lg font-semibold">{latestReading.spO2}%</span>
                    </div>
                  </div>
                )}
                
                {emergencyStatus !== 'normal' && emergencyInfo && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Emergency Treatment Tips:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {emergencyInfo.tips.map((tip, index) => (
                        <li key={index} className="text-gray-700">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Nearby Veterinarians */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Nearby Emergency Veterinarians
              </h2>
              
              <div className="space-y-6">
                {nearbyVets.map((vet) => (
                  <div key={vet.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{vet.name}</h3>
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{vet.address}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{vet.phone}</span>
                        </div>
                        <div className="mt-1 text-indigo-600">
                          <span className="font-medium">{vet.distance} km away</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex space-x-3">
                        <a 
                          href={`tel:${vet.phone.replace(/[^0-9]/g, '')}`}
                          className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                        >
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </a>
                        <a 
                          href="#"
                          className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
                        >
                          <Navigation className="h-4 w-4" />
                          <span>Directions</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Emergency Guidelines */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              General Emergency Guidelines
            </h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-800 mb-2">When to Seek Immediate Veterinary Care:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Difficulty breathing or choking</li>
                  <li>Severe bleeding or trauma</li>
                  <li>Inability to urinate or defecate</li>
                  <li>Seizures or collapse</li>
                  <li>Suspected poisoning</li>
                  <li>Severe vomiting or diarrhea</li>
                  <li>Eye injuries</li>
                  <li>Obvious pain or distress</li>
                  <li>Prolonged abnormal vital signs</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Bleeding</h3>
                  <p className="text-gray-700 mb-2">
                    Apply direct pressure with a clean cloth or bandage. For limb bleeding, elevate if possible while maintaining pressure.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Choking</h3>
                  <p className="text-gray-700 mb-2">
                    If your pet can breathe, cough, or make sounds, monitor but do not interfere. If they cannot breathe, seek emergency care immediately.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Seizures</h3>
                  <p className="text-gray-700 mb-2">
                    Remove objects that could cause injury. Do not restrain your pet or put anything in their mouth. Time the seizure and seek veterinary care.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Heat Stroke</h3>
                  <p className="text-gray-700 mb-2">
                    Move to a cool area. Apply cool (not cold) water to the body, especially the neck, armpits, and groin. Seek immediate veterinary care.
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-gray-800 mb-2">Emergency Kit Checklist:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Digital thermometer (normal range: 37.5-39.5°C)</li>
                  <li>Gauze pads and rolls</li>
                  <li>Adhesive tape</li>
                  <li>Hydrogen peroxide (3%)</li>
                  <li>Saline eye wash</li>
                  <li>Tweezers</li>
                  <li>Scissors with blunt ends</li>
                  <li>Disposable gloves</li>
                  <li>Emergency contact information</li>
                  <li>Pet first aid guide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default EmergencyPage;