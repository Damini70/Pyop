import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to PYOP (Plan Your Own Party). We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and 
              tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-400 mb-2">Personal Information</h3>
                <ul className="text-gray-300 space-y-1 list-disc list-inside">
                  <li>Name and contact information</li>
                  <li>Email address and phone number</li>
                  <li>Billing and payment information</li>
                  <li>Event preferences and requirements</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-400 mb-2">Usage Data</h3>
                <ul className="text-gray-300 space-y-1 list-disc list-inside">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Device information and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Service Provision</h3>
                <p className="text-gray-300 text-sm">
                  To provide and maintain our party planning services, process bookings, and communicate with you about your events.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Improvement</h3>
                <p className="text-gray-300 text-sm">
                  To analyze usage patterns, improve our website functionality, and enhance user experience.
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Communication</h3>
                <p className="text-gray-300 text-sm">
                  To send you updates, promotional materials, and important notices about our services.
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Legal Compliance</h3>
                <p className="text-gray-300 text-sm">
                  To comply with legal obligations and protect our rights and the rights of our users.
                </p>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>With service providers who assist us in operating our website and conducting business</li>
              <li>When required by law or to protect our rights and safety</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent for specific purposes</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-6 border border-indigo-500/20">
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
                or electronic storage is 100% secure.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-400 text-xl">👁️</span>
                </div>
                <h3 className="text-white font-medium mb-2">Access</h3>
                <p className="text-gray-400 text-sm">Request access to your personal data</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-400 text-xl">✏️</span>
                </div>
                <h3 className="text-white font-medium mb-2">Rectification</h3>
                <p className="text-gray-400 text-sm">Correct inaccurate personal data</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-400 text-xl">🗑️</span>
                </div>
                <h3 className="text-white font-medium mb-2">Erasure</h3>
                <p className="text-gray-400 text-sm">Request deletion of your data</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-6 border border-yellow-500/20">
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📧 Email: privacy@pyop.com</p>
                <p>📞 Phone: +1 (555) 123-4567</p>
                <p>📍 Address: 123 Party Street, Event City, EC 12345</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;