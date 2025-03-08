import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, Thermometer, Activity } from 'lucide-react';
import { VitalReading } from '../types';
import { generateVitalReadings } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, subHours } from 'date-fns';

const MonitoringPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [vitalReadings, setVitalReadings] = useState<VitalReading[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('6h');
  const [latestReading, setLatestReading] = useState<VitalReading | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const readings = generateVitalReadings();
    setVitalReadings(readings);
    setLatestReading(readings[0]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newReading: VitalReading = {
        timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        heartRate: Math.floor(70 + Math.random() * 30),
        temperature: 38 + Math.random() * 1,
        spO2: Math.floor(95 + Math.random() * 5),
      };
      
      setLatestReading(newReading);
      setVitalReadings(prev => [newReading, ...prev.slice(0, 23)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredReadings = () => {
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
    
    return vitalReadings.filter(reading => {
      const readingTime = parseISO(reading.timestamp);
      return readingTime >= cutoffTime;
    });
  };

  const formatChartTime = (timestamp: string) => {
    return format(parseISO(timestamp), 'HH:mm');
  };

  const getVitalStatus = (type: 'heartRate' | 'temperature' | 'spO2') => {
    if (!latestReading) return 'normal';
    
    switch (type) {
      case 'heartRate':
        return latestReading.heartRate > 120 || latestReading.heartRate < 60 ? 'alert' : 'normal';
      case 'temperature':
        return latestReading.temperature > 39.5 || latestReading.temperature < 37.5 ? 'alert' : 'normal';
      case 'spO2':
        return latestReading.spO2 < 95 ? 'alert' : 'normal';
      default:
        return 'normal';
    }
  };

  if (!currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Monitoring not available</h2>
        <p className="text-gray-600">Please log in to view pet monitoring data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Real-time Monitoring</h1>
      
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {currentPet.name}'s Vital Signs
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
            
            {/* Current Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`bg-white p-6 rounded-xl border-2 ${
                getVitalStatus('heartRate') === 'alert' ? 'border-red-500' : 'border-green-500'
              }`}>
                <div className="flex items-center mb-2">
                  <Heart className={`h-6 w-6 mr-2 ${
                    getVitalStatus('heartRate') === 'alert' ? 'text-red-500' : 'text-green-500'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-800">Heart Rate</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">
                    {latestReading?.heartRate || '--'}
                  </span>
                  <span className="text-gray-600 ml-2 mb-1">bpm</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Normal range: 60-120 bpm</p>
              </div>
              
              <div className={`bg-white p-6 rounded-xl border-2 ${
                getVitalStatus('temperature') === 'alert' ? 'border-red-500' : 'border-green-500'
              }`}>
                <div className="flex items-center mb-2">
                  <Thermometer className={`h-6 w-6 mr-2 ${
                    getVitalStatus('temperature') === 'alert' ? 'text-red-500' : 'text-green-500'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-800">Temperature</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">
                    {latestReading?.temperature.toFixed(1) || '--'}
                  </span>
                  <span className="text-gray-600 ml-2 mb-1">°C</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Normal range: 37.5-39.5°C</p>
              </div>
              
              <div className={`bg-white p-6 rounded-xl border-2 ${
                getVitalStatus('spO2') === 'alert' ? 'border-red-500' : 'border-green-500'
              }`}>
                <div className="flex items-center mb-2">
                  <Activity className={`h-6 w-6 mr-2 ${
                    getVitalStatus('spO2') === 'alert' ? 'text-red-500' : 'text-green-500'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-800">Oxygen Saturation</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">
                    {latestReading?.spO2 || '--'}
                  </span>
                  <span className="text-gray-600 ml-2 mb-1">%</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Normal range: 95-100%</p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Heart Rate Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getFilteredReadings()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={formatChartTime}
                        reversed
                      />
                      <YAxis domain={[40, 160]} />
                      <Tooltip 
                        labelFormatter={(value) => format(parseISO(value), 'MMM dd, yyyy HH:mm')}
                        formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Heart Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Temperature Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getFilteredReadings()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={formatChartTime}
                        reversed
                      />
                      <YAxis domain={[37, 41]} />
                      <Tooltip 
                        labelFormatter={(value) => format(parseISO(value), 'MMM dd, yyyy HH:mm')}
                        formatter={(value) => [`${value}°C`, 'Temperature']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#ff7300" 
                        activeDot={{ r: 8 }} 
                        name="Temperature"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Oxygen Saturation Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getFilteredReadings()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={formatChartTime}
                        reversed
                      />
                      <YAxis domain={[90, 100]} />
                      <Tooltip 
                        labelFormatter={(value) => format(parseISO(value), 'MMM dd, yyyy HH:mm')}
                        formatter={(value) => [`${value}%`, 'SpO2']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="spO2" 
                        stroke="#82ca9d" 
                        activeDot={{ r: 8 }} 
                        name="SpO2"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;