import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, ChevronLeft, ChevronRight, Activity, Heart, Thermometer } from 'lucide-react';
import { HealthReport } from '../types';
import { generateHealthReports } from '../data/mockData';
import { format, parseISO, subDays, addDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportsPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
    const healthReports = generateHealthReports();
    setReports(healthReports);
  }, []);

  const handlePreviousDay = () => setSelectedDate(prev => subDays(prev, 1));
  const handleNextDay = () => {
    const nextDay = addDays(selectedDate, 1);
    if (nextDay <= new Date()) {
      setSelectedDate(nextDay);
    }
  };

  const getSelectedReport = () => reports.find(report => report.date === format(selectedDate, 'yyyy-MM-dd'));
  const getWeeklyReports = () => reports.slice(0, 7).reverse();
  
  if (!currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports not available</h2>
        <p className="text-gray-600">Please log in to view pet health reports.</p>
      </div>
    );
  }

  const selectedReport = getSelectedReport();
  const weeklyReports = getWeeklyReports();

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Health Reports</h1>
      <div className="flex space-x-2 mb-6">
        <button onClick={() => setReportType('daily')} className={`px-4 py-2 rounded-md ${reportType === 'daily' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Daily Report</button>
        <button onClick={() => setReportType('weekly')} className={`px-4 py-2 rounded-md ${reportType === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Weekly Report</button>
      </div>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <button onClick={handlePreviousDay} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft className="h-5 w-5 text-gray-600" /></button>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="text-lg font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
        </div>
        <button onClick={handleNextDay} disabled={format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      {reportType === 'daily' && selectedReport ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daily Health Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2"><Heart className="h-5 w-5 text-indigo-600 mr-2" /><h3 className="font-semibold text-gray-800">Heart Rate</h3></div>
              <span className="text-3xl font-bold">{selectedReport.averageHeartRate} bpm</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2"><Thermometer className="h-5 w-5 text-indigo-600 mr-2" /><h3 className="font-semibold text-gray-800">Temperature</h3></div>
              <span className="text-3xl font-bold">{selectedReport.averageTemperature.toFixed(1)}°C</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2"><Activity className="h-5 w-5 text-indigo-600 mr-2" /><h3 className="font-semibold text-gray-800">SpO2</h3></div>
              <span className="text-3xl font-bold">{selectedReport.averageSpO2}%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Weekly Activity Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyReports} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), 'MMM dd')} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activityScore" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
