import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format, parseISO, subHours } from 'date-fns';

import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { LocationData } from '../types';
import { generateLocationData } from '../data/mockData';

const TrackingPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('6h');
  const [latestLocation, setLatestLocation] = useState<LocationData | null>(null);
  const mapRef = useRef<L.Map>();

  // Load initial mock data and start real‑time simulation
  useEffect(() => {
    const initial = generateLocationData();
    setLocationData(initial);
    setLatestLocation(initial[0]);

    const iv = setInterval(() => {
      setLocationData(prev => {
        const last = prev[0] || { latitude: 0, longitude: 0, timestamp: new Date().toISOString() };
        const next: LocationData = {
          timestamp: new Date().toISOString(),
          latitude: last.latitude + (Math.random() - 0.5) * 0.001,
          longitude: last.longitude + (Math.random() - 0.5) * 0.001,
        };
        setLatestLocation(next);
        return [next, ...prev].slice(0, 100);
      });
    }, 15000);

    return () => clearInterval(iv);
  }, []);

  // Initialize Leaflet map once
  useEffect(() => {
    mapRef.current = L.map('leaflet-map').setView(
      [latestLocation?.latitude || 0, latestLocation?.longitude || 0],
      13
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Update marker & trail whenever latestLocation or timeRange changes
  useEffect(() => {
    if (!mapRef.current || !latestLocation) return;

    // Remove old layers except tile layer
    mapRef.current.eachLayer(layer => {
      // tile layers have _url property
      if (!(layer as any)._url) {
        mapRef.current!.removeLayer(layer);
      }
    });

    // Add marker
    L.marker([latestLocation.latitude, latestLocation.longitude])
      .addTo(mapRef.current)
      .bindPopup(
        `Last seen at ${format(parseISO(latestLocation.timestamp), 'MMM dd, HH:mm:ss')}`
      );

    // Draw trail
    const positions = getFilteredLocations().map(l => [l.latitude, l.longitude]) as [number, number][];
    L.polyline(positions, { color: 'indigo' }).addTo(mapRef.current);

    // Recenter map
    mapRef.current.setView(
      [latestLocation.latitude, latestLocation.longitude],
      mapRef.current.getZoom()
    );
  }, [latestLocation, timeRange, locationData]);

  // Filter by selected time range
  const getFilteredLocations = () => {
    const now = new Date();
    let cutoff = subHours(now, 24);
    if (timeRange === '1h') cutoff = subHours(now, 1);
    if (timeRange === '6h') cutoff = subHours(now, 6);
    return locationData.filter(loc => parseISO(loc.timestamp) >= cutoff);
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

      {/* Time Range Buttons */}
      <div className="flex space-x-2 mb-4">
        {(['1h','6h','24h'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-md ${
              timeRange === range
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border-2 border-indigo-500">
          <div className="flex items-center mb-2">
            <MapPin className="h-6 w-6 mr-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">Current Location</h3>
          </div>
          <p className="text-gray-700">
            Lat: {latestLocation?.latitude.toFixed(6) || '--'}
          </p>
          <p className="text-gray-700">
            Lon: {latestLocation?.longitude.toFixed(6) || '--'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-indigo-500">
          <div className="flex items-center mb-2">
            <Clock className="h-6 w-6 mr-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">Last Updated</h3>
          </div>
          <p className="text-gray-700">
            {latestLocation
              ? format(parseISO(latestLocation.timestamp), 'MMM dd, yyyy HH:mm:ss')
              : '--'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-indigo-500">
          <div className="flex items-center mb-2">
            <Navigation className="h-6 w-6 mr-2 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">Status</h3>
          </div>
          <p className="text-gray-700 flex items-center">
            <span className="h-3 w-3 bg-green-500 rounded-full mr-2" />
            Active &amp; Tracking
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Map</h3>
        <div id="leaflet-map" className="rounded-lg overflow-hidden" style={{ height: 400 }} />
      </div>

      {/* Location History Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Location History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredLocations().map((loc, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {format(parseISO(loc.timestamp), 'MMM dd, HH:mm:ss')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{loc.latitude.toFixed(6)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{loc.longitude.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
)};

export default TrackingPage;
