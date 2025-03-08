import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Map, Shield, Award, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-4 rounded-xl">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Complete Health Monitoring For Your Beloved Pets
              </h1>
              <p className="text-xl text-indigo-100">
                Track vital signs, location, and health metrics in real-time. Get alerts for emergencies and personalized care recommendations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium text-lg transition shadow-lg">
                  Get Started
                </Link>
                <Link to="/about" className="bg-indigo-700 hover:bg-indigo-800 px-6 py-3 rounded-lg font-medium text-lg transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Happy dog with owner" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Comprehensive Pet Health Monitoring</h2>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            Our advanced system provides everything you need to keep your pet healthy and safe
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Activity className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600">
              Track your pet's heart rate, temperature, and oxygen levels in real-time with our advanced sensors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Map className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">GPS Tracking</h3>
            <p className="text-gray-600">
              Always know where your pet is with precise GPS tracking and location history.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Emergency Alerts</h3>
            <p className="text-gray-600">
              Receive immediate notifications when your pet's vital signs indicate a potential health issue.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Reports</h3>
            <p className="text-gray-600">
              Get detailed daily and weekly health reports with visualizations of your pet's vital trends.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diet Recommendations</h3>
            <p className="text-gray-600">
              Receive personalized diet recommendations based on your pet's health data and activity levels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
            <p className="text-gray-600">
              Store and access your pet's complete medical history, vaccinations, and vet appointments.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-4 rounded-xl">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Pet Owners Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Sarah J." 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-gray-500 text-sm">Dog Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The emergency alert feature saved my dog's life when he had an unexpected health crisis. I was able to get him to the vet immediately."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Michael T." 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-gray-500 text-sm">Cat Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The GPS tracking feature gives me peace of mind knowing where my indoor/outdoor cat is at all times. The health monitoring is an added bonus!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Jennifer K." 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Jennifer K.</h4>
                  <p className="text-gray-500 text-sm">Multiple Pets</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Managing the health of multiple pets has never been easier. The weekly reports help me stay on top of everyone's needs and spot trends."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-6xl px-4 text-center">
        <div className="bg-indigo-600 text-white py-12 px-6 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Monitor Your Pet's Health?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of pet owners who trust PetHealth Monitor for their pet's wellbeing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium text-lg transition">
              Sign Up Now
            </Link>
            <Link to="/contact" className="bg-indigo-700 hover:bg-indigo-800 px-6 py-3 rounded-lg font-medium text-lg transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;