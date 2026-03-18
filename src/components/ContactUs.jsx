import React, { useState } from 'react';
import { Button, Card, Label, TextInput, Textarea, Badge, Modal } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { HiOutlineMail } from 'react-icons/hi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/upload-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'There was a problem submitting the form.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge color="indigo" size="lg" className="w-fit mx-auto px-4 py-1 uppercase tracking-widest font-bold">Get In Touch</Badge>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Let's Start a <span className="text-indigo-600">Conversation</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Have a question or feedback? Our team is here to provide world-class support for your shopping journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Email Us</h3>
                <p className="text-slate-500 font-medium">support@shenthurishop.com</p>
                <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">Response within 24h</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faPhone} className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Call Expertise</h3>
                <p className="text-slate-500 font-medium">+94 11 234 5678</p>
                <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">Mon - Fri, 9am - 6pm</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Flagship Store</h3>
                <p className="text-slate-500 font-medium leading-relaxed">123 Premium Lane, Colombo 07,<br />Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1">Full Name</Label>
                    <TextInput
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1">Email Address</Label>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1">Subject</Label>
                  <TextInput
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1">Message Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your thoughts with us..."
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-3xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-indigo-600 transition-all text-lg p-6"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="xl" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black py-4 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                  disabled={loading}
                >
                  {loading ? 'Sending Request...' : (
                    <span className="flex items-center gap-2">
                      Send Secure Message <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccess} onClose={() => setShowSuccess(false)} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheckCircle} className="text-4xl" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
            <p className="text-slate-500 font-medium mb-10">Thank you for reaching out. A premium support representative will contact you shortly.</p>
            <Button color="indigo" onClick={() => setShowSuccess(false)} className="w-full rounded-2xl font-bold">
              Got it, thanks!
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactUs;
