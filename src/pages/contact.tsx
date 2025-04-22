import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contact Us - One Minute Grace</title>
        <meta name="description" content="Get in touch with One Minute Grace" />
      </Head>

      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute object-cover w-full h-full"
            >
              <source src="/videos/clouds.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            We'd love to hear from you
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <a 
              href="mailto:valianayil@gmail.com" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all duration-300 text-lg font-medium shadow-lg"
            >
              <FaPaperPlane className="mr-3" />
              Email Us Now
            </a>
            <a 
              href="tel:+919972814579" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#8B4513] transition-all duration-300 text-lg font-medium"
            >
              <FaPhone className="mr-3" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Contact Information
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Feel free to reach out through any of these channels. We're here to listen and respond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-[#8B4513] to-[#654321] flex items-center justify-center">
                <FaEnvelope className="text-white text-4xl" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-6">We'll respond within 24 hours</p>
                <a
                  href="mailto:valianayil@gmail.com"
                  className="text-[#8B4513] hover:text-[#654321] font-medium text-lg flex items-center justify-center"
                >
                  valianayil@gmail.com
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Phone Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-[#8B4513] to-[#654321] flex items-center justify-center">
                <FaPhone className="text-white text-4xl" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-6">Available during business hours</p>
                <a
                  href="tel:+919972814579"
                  className="text-[#8B4513] hover:text-[#654321] font-medium text-lg flex items-center justify-center"
                >
                  +91 9972 814 579
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Social Media Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-[#8B4513] to-[#654321] flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-4xl" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect With Us</h3>
                <p className="text-gray-600 mb-6">Follow us on social media</p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://facebook.com/1minutegrace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8B4513] text-white p-3 rounded-full hover:bg-[#654321] transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/1minutegrace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8B4513] text-white p-3 rounded-full hover:bg-[#654321] transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com/@OneMinuteGrace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8B4513] text-white p-3 rounded-full hover:bg-[#654321] transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Optional) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about One Minute Grace
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What is One Minute Grace?</h3>
              <p className="text-gray-600">
                One Minute Grace is a spiritual platform dedicated to sharing daily inspirational content that can be consumed in just one minute, helping you connect with grace in your busy life.
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How can I subscribe to daily content?</h3>
              <p className="text-gray-600">
                You can subscribe to our daily content by following us on social media or by sending us an email requesting to be added to our mailing list.
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do you offer speaking engagements?</h3>
              <p className="text-gray-600">
                No, we are just a social media page for now. Our focus is on providing daily inspirational content through our online platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
};

export default Contact; 