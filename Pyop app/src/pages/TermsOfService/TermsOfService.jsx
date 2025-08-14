import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using PYOP (Plan Your Own Party) services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Party Planning</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Event coordination and management</li>
                  <li>• Vendor recommendations and bookings</li>
                  <li>• Custom party themes and decorations</li>
                  <li>• Timeline and budget planning</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Platform Features</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Online booking and scheduling</li>
                  <li>• Customer dashboard and tracking</li>
                  <li>• Payment processing and invoicing</li>
                  <li>• Communication tools and updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-400 mb-2">Account Security</h3>
                <p className="text-gray-300 text-sm">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                  that occur under your account.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-400 mb-2">Accurate Information</h3>
                <p className="text-gray-300 text-sm">
                  You agree to provide accurate, current, and complete information during registration and to update 
                  such information to keep it accurate, current, and complete.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-400 mb-2">Prohibited Activities</h3>
                <p className="text-gray-300 text-sm">
                  You may not use our service for any illegal or unauthorized purpose, including but not limited to 
                  violating any applicable laws or regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Payment and Billing</h2>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Payment Schedule</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• 50% deposit required to secure booking</li>
                    <li>• Remaining balance due 7 days before event</li>
                    <li>• Late payment fees may apply</li>
                    <li>• All payments are non-refundable unless specified</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-3">Accepted Methods</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Credit and debit cards</li>
                    <li>• Bank transfers</li>
                    <li>• Digital payment platforms</li>
                    <li>• Cash payments (in-person only)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cancellation and Refunds</h2>
            <div className="space-y-4">
              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                <h3 className="text-red-400 font-medium mb-2">Cancellation Timeline</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">30+</div>
                    <div className="text-sm text-gray-300">days before</div>
                    <div className="text-green-400 text-sm font-medium">Full refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">7-29</div>
                    <div className="text-sm text-gray-300">days before</div>
                    <div className="text-yellow-400 text-sm font-medium">50% refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">0-6</div>
                    <div className="text-sm text-gray-300">days before</div>
                    <div className="text-red-400 text-sm font-medium">No refund</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <div className="bg-orange-500/10 rounded-lg p-6 border border-orange-500/20">
              <p className="text-gray-300 leading-relaxed mb-4">
                PYOP shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-orange-400 font-medium mb-2">Force Majeure</h3>
                  <p className="text-gray-400 text-sm">
                    We are not responsible for delays or failures due to circumstances beyond our reasonable control.
                  </p>
                </div>
                <div>
                  <h3 className="text-orange-400 font-medium mb-2">Third-Party Services</h3>
                  <p className="text-gray-400 text-sm">
                    We are not liable for the actions or services provided by third-party vendors or partners.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/20">
              <p className="text-gray-300 leading-relaxed">
                All content, features, and functionality of our service are owned by PYOP and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Modifications to Terms</h2>
            <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                via email or through our platform. Continued use of our services after such modifications constitutes 
                acceptance of the updated terms.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-6 border border-indigo-500/20">
              <p className="text-gray-300 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📧 Email: legal@pyop.com</p>
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

export default TermsOfService;