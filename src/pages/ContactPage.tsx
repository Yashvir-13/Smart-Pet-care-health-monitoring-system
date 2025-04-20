import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about our pet health monitoring system? We're here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <div>
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">info@pethealth.com</p>
                  <p className="text-gray-600">support@pethealth.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                  <p className="text-gray-600">+1 (123) 456-7891</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">123 Pet Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="font-semibold">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="font-semibold">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="font-semibold">Closed</span>
              </div>
              <div className="pt-4 border-t border-gray-200 mt-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Note:</span> Technical support is available 24/7 for emergency situations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <p>Thank you for your message! We'll get back to you shortly.</p>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How does the pet monitoring device work?</h3>
            <p className="text-gray-600">
              Our device uses advanced sensors to track your pet's vital signs and location. The data is transmitted to our secure servers and made available to you through our mobile and web applications.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Is the device comfortable for my pet?</h3>
            <p className="text-gray-600">
              Yes, our devices are designed with pet comfort in mind. They are lightweight, waterproof, and designed to be worn comfortably for extended periods.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How accurate are the health readings?</h3>
            <p className="text-gray-600">
              Our devices provide clinical-grade accuracy for vital signs monitoring. They are regularly calibrated and tested against veterinary equipment to ensure reliability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What if I have multiple pets?</h3>
            <p className="text-gray-600">
              Our platform supports multiple pets under a single account. You can easily switch between pets in the app to monitor each one individually.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;