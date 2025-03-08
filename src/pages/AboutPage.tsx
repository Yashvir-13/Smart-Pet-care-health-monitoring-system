import React from 'react';
import { Heart, Shield, Users, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About PetHealth Monitor</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to improve the health and wellbeing of pets worldwide through innovative technology.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              PetHealth Monitor was founded in 2023 by a team of veterinarians, pet lovers, and technology experts who saw a gap in preventative pet healthcare.
            </p>
            <p className="text-gray-600 mb-4">
              After one of our founders lost their beloved dog to a condition that could have been detected earlier, we set out to create a comprehensive monitoring system that could help pet owners identify health issues before they become serious.
            </p>
            <p className="text-gray-600">
              Today, our technology has helped thousands of pets live healthier, longer lives by providing their owners with real-time health data and alerts.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Dogs running" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-indigo-600 text-white p-8 rounded-xl mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To empower pet owners with the tools and knowledge they need to provide the best possible care for their animal companions.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pet Wellbeing</h3>
            <p className="text-gray-600">
              We put the health and happiness of pets at the center of everything we do.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trust & Privacy</h3>
            <p className="text-gray-600">
              We handle your pet's data with the utmost care and security.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We foster a supportive community of pet owners and veterinary professionals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously improve our technology to provide the best pet health solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Dr. James Wilson" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Dr. James Wilson</h3>
            <p className="text-indigo-600 mb-2">Co-Founder & CEO</p>
            <p className="text-gray-600">
              Veterinarian with 15+ years of experience and a passion for preventative pet healthcare.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Dr. Sarah Chen" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Dr. Sarah Chen</h3>
            <p className="text-indigo-600 mb-2">Co-Founder & CTO</p>
            <p className="text-gray-600">
              Biomedical engineer specializing in wearable health monitoring technology.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Michael Rodriguez" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Michael Rodriguez</h3>
            <p className="text-indigo-600 mb-2">Head of Product</p>
            <p className="text-gray-600">
              Product designer with a background in creating intuitive user experiences for health tech.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Partners</h2>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          We work with leading veterinary clinics, animal welfare organizations, and pet technology companies to provide the best care for your pets.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
            <span className="text-xl font-bold text-gray-400">PetCare Clinics</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
            <span className="text-xl font-bold text-gray-400">Animal Health Tech</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
            <span className="text-xl font-bold text-gray-400">Paws Foundation</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
            <span className="text-xl font-bold text-gray-400">VetResearch Inc.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;