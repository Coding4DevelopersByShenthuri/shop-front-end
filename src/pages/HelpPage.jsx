import React, { useState } from 'react';
import { Accordion, Badge, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faQuestionCircle, faLifeRing, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge color="indigo" size="lg" className="w-fit mx-auto px-4 py-1 uppercase tracking-widest font-bold">Support Center</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            How can we <span className="text-indigo-600">help you</span> today?
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Find quick answers to common questions or reach out to our world-class support team.
          </p>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-12">
          <div className="p-8 md:p-12 border-b border-slate-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-xl" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="p-4 md:p-8">
            <Accordion flush>
              <Accordion.Panel>
                <Accordion.Title className="text-slate-900 font-bold hover:bg-slate-50 rounded-2xl transition-colors py-6">
                  How do I navigate the premium shop?
                </Accordion.Title>
                <Accordion.Content className="text-slate-500 font-medium leading-relaxed pb-8 pl-4">
                  <p>
                    Our shop is organized by curated categories. You can use the top navigation bar to access the Shop directly, or use our smart search to find specific gourmet items instantly.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-slate-900 font-bold hover:bg-slate-50 rounded-2xl transition-colors py-6">
                  What is the standard delivery timeframe?
                </Accordion.Title>
                <Accordion.Content className="text-slate-500 font-medium leading-relaxed pb-8 pl-4">
                  <p>
                    We prioritize freshness. Standard orders are delivered within 2-4 hours in Colombo, while regional orders typically arrive within 24 hours of placement.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title className="text-slate-900 font-bold hover:bg-slate-50 rounded-2xl transition-colors py-6">
                  How can I track my order in real-time?
                </Accordion.Title>
                <Accordion.Content className="text-slate-500 font-medium leading-relaxed pb-8 pl-4">
                  <p>
                    Once your order is confirmed, you'll receive a notification. You can track your status directly from your "User Dashboard" under the "Recent Orders" section.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>

        {/* Contact Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white space-y-4 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
              </div>
              <h3 className="text-2xl font-black">Email Support</h3>
              <p className="text-indigo-100 font-medium pb-6 opacity-90">Prefer writing? Our support experts are ready to assist you via email.</p>
              <a href="mailto:support@shenthurishop.com" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-indigo-50 transition-colors">
                Send Email <FontAwesomeIcon icon={faChevronRight} />
              </a>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faPhone} className="text-2xl" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Direct Hotline</h3>
              <p className="text-slate-500 font-medium pb-6">Need a quick answer? Call our hotline for immediate assistance with your order.</p>
              <a href="tel:+94771234567" className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors">
                +94 77 123 4567 <FontAwesomeIcon icon={faChevronRight} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
