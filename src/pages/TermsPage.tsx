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
            Welcome to PetHealth Monitor! These Terms and Conditions ("Terms") govern your use of our website, mobile application, and pet health monitoring services (collectively, the "Services").
          </p>
          <p className="mb-4">
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you may not access or use the Services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Definitions</h2>
          <p className="mb-4">
            <strong>"User"</strong> refers to the individual who registers to use our Services.<br />
            <strong>"Pet"</strong> refers to the animal whose health is being monitored through our Services.<br />
            <strong>"Device"</strong> refers to the physical hardware used to monitor the Pet's health metrics.<br />
            <strong>"Data"</strong> refers to all information collected through our Services, including but not limited to Pet health metrics, location information, and User account details.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Account Registration</h2>
          <p className="mb-4">
            To use our Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and keep it updated.
          </p>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your password and for all activities under your account. We strongly recommend using a strong password (a mix of uppercase, lowercase, numbers, and symbols).
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Pet Health Monitoring</h2>
          <p className="mb-4">
            Our Services monitor various health metrics of your Pet. However, these are for informational purposes only and do not replace professional veterinary care.
          </p>
          <p className="mb-4">
            You acknowledge that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The information provided by our Services is not a substitute for professional veterinary advice, diagnosis, or treatment.</li>
            <li>You should always consult a qualified veterinarian for any health concerns related to your Pet.</li>
            <li>You should never ignore or delay professional veterinary care based on information from our Services.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Privacy</h2>
          <p className="mb-4">
            We collect and process User and Pet-related Data in accordance with our Privacy Policy, which is an integral part of these Terms.
          </p>
          <p className="mb-4">
            By using our Services, you agree to this data collection and processing. You also confirm that all Data you provide is accurate.
          </p>
          <p className="mb-4">
            Our Services comply with Indian data protection laws, including the Digital Personal Data Protection Act (DPDPA), 2023.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">6. Subscription and Billing</h2>
          <p className="mb-4">
            Some features of our Services are available on a subscription basis. By subscribing, you agree to pay the applicable fees as per the chosen plan.
          </p>
          <p className="mb-4">
            <strong>Billing Cycle:</strong> Subscription fees are charged in advance on a recurring basis (monthly/yearly, as selected).
          </p>
          <p className="mb-4">
            <strong>Cancellation:</strong> You can cancel your subscription at any time, but no refunds will be provided for the unused portion of the current billing period.
          </p>
          <p className="mb-4">
            <strong>Taxes:</strong> Prices are inclusive of GST (Goods and Services Tax), if applicable.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">7. Device Warranty</h2>
          <p className="mb-4">
            Our Devices come with a limited warranty, as described in the Device documentation. This warranty is provided in addition to your statutory rights under Indian consumer protection laws, including the Consumer Protection Act, 2019.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by Indian law, PetHealth Monitor and its affiliates shall not be liable for any:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Errors, inaccuracies, or service interruptions.</li>
            <li>Personal injury or property damage due to use of the Services.</li>
            <li>Unauthorized access to or use of your data.</li>
            <li>Losses due to bugs, viruses, or cyberattacks.</li>
            <li>Damages arising from the use or inability to use our Services.</li>
          </ul>
          <p className="mb-4">
            Our total liability, in any case, shall not exceed the amount paid by you in the last six (6) months for using our Services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">9. Changes to Terms</h2>
          <p className="mb-4">
            We may update or modify these Terms from time to time. If the changes are significant, we will notify you at least 30 days before they take effect.
          </p>
          <p className="mb-4">
            Your continued use of the Services after the changes means you accept the new Terms. If you disagree, you should stop using the Services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">10. Governing Law and Jurisdiction</h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [Insert City, India].
          </p>
          <p className="mb-4">
            Our failure to enforce any provision of these Terms does not waive our rights. If any part of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
