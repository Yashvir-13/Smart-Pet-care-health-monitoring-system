import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="prose max-w-none">
          <p className="mb-4">
            Last updated: June 1, 2025
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p className="mb-4">
            Welcome to PetHealth Monitor. These Terms and Conditions govern your use of our website, mobile application, and pet health monitoring services (collectively, the "Services").
          </p>
          <p className="mb-4">
            By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Definitions</h2>
          <p className="mb-4">
            <strong>"User"</strong> refers to the individual who registers to use our Services.<br />
            <strong>"Pet"</strong> refers to the animal whose health is being monitored through our Services.<br />
            <strong>"Device"</strong> refers to the physical hardware used to monitor the Pet's health metrics.<br />
            <strong>"Data"</strong> refers to all information collected through our Services, including but not limited to Pet health metrics, location information, and User account information.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Account Registration</h2>
          <p className="mb-4">
            To use our Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Pet Health Monitoring</h2>
          <p className="mb-4">
            Our Services provide monitoring of various health metrics for your Pet. While we strive to provide accurate and reliable information, our Services are not intended to replace professional veterinary care.
          </p>
          <p className="mb-4">
            You acknowledge that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Our Services are for informational purposes only and are not a substitute for professional veterinary advice, diagnosis, or treatment.</li>
            <li>You should always seek the advice of a qualified veterinarian with any questions you may have regarding your Pet's health.</li>
            <li>You should never disregard professional veterinary advice or delay in seeking it because of something you have read or seen through our Services.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Privacy</h2>
          <p className="mb-4">
            We collect and process Data in accordance with our Privacy Policy, which is incorporated by reference into these Terms. By using our Services, you consent to such processing and you warrant that all Data provided by you is accurate.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Subscription and Billing</h2>
          <p className="mb-4">
            Some aspects of our Services may be offered on a subscription basis. By subscribing to our Services, you agree to pay the subscription fees as described at the time of purchase.
          </p>
          <p className="mb-4">
            Subscription fees are billed in advance on a recurring basis, depending on the subscription plan you select. You may cancel your subscription at any time, but no refunds will be provided for any unused portion of the current billing period.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Device Warranty</h2>
          <p className="mb-4">
            Our Devices come with a limited warranty as described in the Device documentation. This warranty is in addition to, and does not affect, your statutory rights.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, in no event shall PetHealth Monitor, its affiliates, agents, directors, employees, suppliers, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, that result from the use of, or inability to use, the Services.
          </p>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, PetHealth Monitor assumes no liability or responsibility for any:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Errors, mistakes, or inaccuracies in the Services;</li>
            <li>Personal injury or property damage, of any nature whatsoever, resulting from your access to or use of our Services;</li>
            <li>Any unauthorized access to or use of our secure servers and/or any and all personal information stored therein;</li>
            <li>Any interruption or cessation of transmission to or from the Services;</li>
            <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Services by any third party;</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Services.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="mb-4">
            By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">10. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
          <p className="mb-4">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">11. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-4">
            PetHealth Monitor<br />
            123 Pet Street<br />
            New York, NY 10001<br />
            Email: legal@pethealth.com<br />
            Phone: (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;