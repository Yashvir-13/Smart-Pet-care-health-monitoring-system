import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Map, Navigation, Clock, MapPin } from 'lucide-react';
import { LocationData } from '../types';
import { generateLocationData } from '../data/mockData';
import { format, parseISO, subHours } from 'date-fns';

const TrackingPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('6h');
  const [latestLocation, setLatestLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const locations = generateLocationData();
    setLocationData(locations);
    setLatestLocation(locations[0]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const lastLocation = locationData[0] || {
        latitude: 40.7128,
        longitude: -74.0060,
      };
      
      const newLocation: LocationData = {
        timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        latitude: lastLocation.latitude + (Math.random() - 0.5) * 0.001,
        longitude: lastLocation.longitude + (Math.random() - 0.5) * 0.001,
      };
      
      setLatestLocation(newLocation);
      setLocationData(prev => [newLocation, ...prev.slice(0, 23)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredLocations = () => {
    const now = new Date();
    let cutoffTime;
    
    switch (timeRange) {
      case '1h':
        cutoffTime = subHours(now, 1);
        break;
      case '6h':
        cutoffTime = subHours(now, 6);
        break;
      case '24h':
      default:
        cutoffTime = subHours(now, 24);
        break;
    }
    
    return locationData.filter(location => {
      const locationTime = parseISO(location.timestamp);
      return locationTime >= cutoffTime;
    });
  };

  if (!currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tracking not available</h2>
        <p className="text-gray-600">Please log in to view pet tracking data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">GPS Tracking</h1>
      
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {currentPet.name}'s Location
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeRange('1h')}
                  className={`px-3 py-1 rounded-md ${
                    timeRange === '1h' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  1h
                </button>
                <button
                  onClick={() => setTimeRange('6h')}
                  className={`px-3 py-1 rounded-md ${
                    timeRange === '6h' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  6h
                </button>
                <button
                  onClick={() => setTimeRange('24h')}
                  className={`px-3 py-1 rounded-md ${
                    timeRange === '24h' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  24h
                </button>
              </div>
            </div>
            
            {/* Current Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border-2 border-indigo-500">
                <div className="flex items-center mb-2">
                  <MapPin className="h-6 w-6 mr-2 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Current Location</h3>
                </div>
                <div className="text-gray-700">
                  <p>Latitude: {latestLocation?.latitude.toFixed(6) || '--'}</p>
                  <p>Longitude: {latestLocation?.longitude.toFixed(6) || '--'}</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border-2 border-indigo-500">
                <div className="flex items-center mb-2">
                  <Clock className="h-6 w-6 mr-2 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Last Updated</h3>
                </div>
                <div className="text-gray-700">
                  {latestLocation ? (
                    <p>{format(parseISO(latestLocation.timestamp), 'MMM dd, yyyy HH:mm:ss')}</p>
                  ) : (
                    <p>--</p>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border-2 border-indigo-500">
                <div className="flex items-center mb-2">
                  <Navigation className="h-6 w-6 mr-2 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                </div>
                <div className="text-gray-700">
                  <p className="flex items-center">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    Active and tracking
                  </p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Map</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Map view would display here with the pet's location and movement history.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      In a real application, this would integrate with a mapping service like Google Maps or Mapbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Latitude
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Longitude
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredLocations().map((location, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {format(parseISO(location.timestamp), 'MMM dd, HH:mm:ss')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {location.latitude.toFixed(6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {location.longitude.toFixed(6)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;