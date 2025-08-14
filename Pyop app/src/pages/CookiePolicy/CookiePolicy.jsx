import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cookie Policy</h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Essential Cookies */}
              <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-400 text-sm">🔒</span>
                  </div>
                  <h3 className="text-lg font-medium text-green-400">Essential Cookies</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies are necessary for the website to function properly and cannot be disabled.
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Authentication and security</li>
                  <li>• Shopping cart functionality</li>
                  <li>• Form submission</li>
                  <li>• Session management</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-400 text-sm">📊</span>
                  </div>
                  <h3 className="text-lg font-medium text-blue-400">Analytics Cookies</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Page views and traffic analysis</li>
                  <li>• User behavior tracking</li>
                  <li>• Performance monitoring</li>
                  <li>• Error reporting</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-400 text-sm">⚙️</span>
                  </div>
                  <h3 className="text-lg font-medium text-purple-400">Functional Cookies</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies enable enhanced functionality and personalization.
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Language preferences</li>
                  <li>• Theme settings</li>
                  <li>• User preferences</li>
                  <li>• Customization options</li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-orange-500/10 rounded-lg p-6 border border-orange-500/20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-400 text-sm">🎯</span>
                  </div>
                  <h3 className="text-lg font-medium text-orange-400">Marketing Cookies</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies are used to deliver relevant advertisements and track campaign effectiveness.
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Targeted advertising</li>
                  <li>• Social media integration</li>
                  <li>• Campaign tracking</li>
                  <li>• Retargeting</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Details */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white/5 rounded-lg overflow-hidden">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-medium">Cookie Name</th>
                    <th className="px-4 py-3 text-left text-white font-medium">Purpose</th>
                    <th className="px-4 py-3 text-left text-white font-medium">Duration</th>
                    <th className="px-4 py-3 text-left text-white font-medium">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">session_id</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">User session management</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">Session</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Essential</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">auth_token</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">Authentication</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">30 days</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Essential</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">_ga</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">Google Analytics tracking</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">2 years</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Analytics</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">preferences</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">User preferences</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">1 year</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Functional</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-300 font-mono text-sm">marketing_id</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">Advertisement targeting</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">90 days</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">Marketing</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-400 text-xl">📈</span>
                </div>
                <h3 className="text-white font-medium mb-2">Google Analytics</h3>
                <p className="text-gray-400 text-sm">Website traffic and user behavior analysis</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-400 text-xl">📘</span>
                </div>
                <h3 className="text-white font-medium mb-2">Facebook Pixel</h3>
                <p className="text-gray-400 text-sm">Social media integration and advertising</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-400 text-xl">💳</span>
                </div>
                <h3 className="text-white font-medium mb-2">Payment Processors</h3>
                <p className="text-gray-400 text-sm">Secure payment processing and fraud prevention</p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Managing Your Cookie Preferences</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-6 border border-indigo-500/20">
                <h3 className="text-white font-medium mb-3">Browser Settings</h3>
                <p className="text-gray-300 text-sm mb-3">
                  You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>View what cookies are stored on your device</li>
                  <li>Delete cookies individually or all at once</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block all cookies from being set</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-medium mb-2">Cookie Consent</h3>
                  <p className="text-gray-300 text-sm">
                    When you first visit our website, you'll see a cookie banner allowing you to accept or decline 
                    non-essential cookies.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-medium mb-2">Opt-Out Links</h3>
                  <p className="text-gray-300 text-sm">
                    For third-party cookies, you can opt out directly through the respective service providers' 
                    privacy settings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Impact of Disabling */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Impact of Disabling Cookies</h2>
            <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/20">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-yellow-400 text-sm">⚠️</span>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-medium mb-2">Important Notice</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Disabling cookies may affect your experience on our website. Some features may not work properly, including:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>Login and authentication</li>
                    <li>Shopping cart functionality</li>
                    <li>Personalized content and recommendations</li>
                    <li>Form submissions and user preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Updates to This Policy</h2>
            <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/20">
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                updated policy on our website.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <p className="text-gray-300 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📧 Email: cookies@pyop.com</p>
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

export default CookiePolicy;