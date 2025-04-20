import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, Heart, Thermometer, Activity, Filter, Check, X } from 'lucide-react';
import { EmergencyAlert } from '../types';
import { emergencyAlerts } from '../data/mockData';
import { format, parseISO } from 'date-fns';

const AlertsPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(emergencyAlerts);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved'>('all');
  const [filterType, setFilterType] = useState<'all' | 'heartRate' | 'temperature' | 'spO2'>('all');

  const getFilteredAlerts = () => {
    return alerts.filter(alert => {
      const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
      const typeMatch = filterType === 'all' || alert.type === filterType;
      return statusMatch && typeMatch;
    });
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' } 
          : alert
      )
    );
  };

  const getAlertIcon = (type: 'heartRate' | 'temperature' | 'spO2') => {
    switch (type) {
      case 'heartRate':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'temperature':
        return <Thermometer className="h-5 w-5 text-red-500" />;
      case 'spO2':
        return <Activity className="h-5 w-5 text-red-500" />;
    }
  };

  const getAlertTitle = (alert: EmergencyAlert) => {
    switch (alert.type) {
      case 'heartRate':
        return `Abnormal Heart Rate: ${alert.value} bpm`;
      case 'temperature':
        return `Abnormal Temperature: ${alert.value.toFixed(1)}°C`;
      case 'spO2':
        return `Low Oxygen Saturation: ${alert.value}%`;
    }
  };

  if (!currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Alert history not available</h2>
        <p className="text-gray-600">Please log in to view pet alert history.</p>
      </div>
    );
  }

  const filteredAlerts = getFilteredAlerts();

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Alert History</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Status</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-md ${
                    filterStatus === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-3 py-1 rounded-md ${
                    filterStatus === 'active' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus('resolved')}
                  className={`px-3 py-1 rounded-md ${
                    filterStatus === 'resolved' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  Resolved
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-md ${
                    filterType === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('heartRate')}
                  className={`px-3 py-1 rounded-md ${
                    filterType === 'heartRate' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  Heart Rate
                </button>
                <button
                  onClick={() => setFilterType('temperature')}
                  className={`px-3 py-1 rounded-md ${
                    filterType === 'temperature' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  Temperature
                </button>
                <button
                  onClick={() => setFilterType('spO2')}
                  className={`px-3 py-1 rounded-md ${
                    filterType === 'spO2' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  SpO2
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alert List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentPet.name}'s Health Alerts
          </h2>
          
          {filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.status === 'active' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="mr-3">
                        {alert.status === 'active' ? (
                          <AlertTriangle className="h-6 w-6 text-red-500" />
                        ) : (
                          <Check className="h-6 w-6 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {getAlertTitle(alert)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {format(parseISO(alert.timestamp), 'MMMM d, yyyy')} at {format(parseISO(alert.timestamp), 'h:mm a')}
                        </p>
                        {alert.notes && (
                          <p className="mt-2 text-gray-700">{alert.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    {alert.status === 'active' && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        <Check className="h-4 w-4" />
                        <span>Mark Resolved</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No alerts found matching your filters.</p>
              <p className="text-gray-500 mt-2">
                Try changing your filter settings or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;