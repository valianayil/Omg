import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaArrowRight, FaFacebook, FaInstagram, FaYoutube, FaPray, FaHandsHelping, FaLightbulb } from 'react-icons/fa';

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About | One Minute Grace</title>
        <meta name="description" content="Learn about One Minute Grace and our mission" />
      </Head>

      {/* Hero Section */}
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
        
        <div className="container mx-auto px-4 z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h6 className="text-white font-medium mb-2 tracking-wider opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>OUR STORY</h6>
            <h1 className="text-4xl md:text-6xl font-playfair text-white mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              About One Minute Grace
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                Discover how One Minute Grace began and our mission to share spiritual wisdom with the world.
              </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 bg-[url('/images/paper-texture.png')] bg-cover relative">
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            {/* Timeline for desktop */}
            <div className="hidden md:grid md:grid-cols-[auto_1fr] md:gap-8">
              <div className="w-32 flex-shrink-0">
                <div className="sticky top-24 flex flex-col items-center">
                  {/* Timeline item 1 */}
                  <div className="relative">
                    <div className="h-24 w-1 bg-gradient-to-b from-[#8B4513] to-[#8B4513]/20 rounded-full"></div>
                    <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <div className="h-16 w-1 bg-gradient-to-b from-[#8B4513]/20 to-[#8B4513]/60 mt-4 rounded-full"></div>
                  </div>
                  
                  {/* Timeline item 2 */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <div className="h-16 w-1 bg-gradient-to-b from-[#8B4513]/60 to-[#8B4513]/80 mt-4 rounded-full"></div>
            </div>
            
                  {/* Timeline item 3 */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                      <span className="text-xl font-bold">3</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                {/* Our Beginning section */}
                <div className="mb-16 pt-6">
                  <h3 className="text-3xl font-playfair mb-6 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                    Our Beginning
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    One Minute Grace was created from a simple idea: in our fast-paced world, we all need moments 
                    of spiritual reflection that don't demand hours of our time. What began as a small social
                    media account sharing daily verses has grown into a community of believers seeking brief but 
                    meaningful connections with their faith.
                  </p>
                </div>
                
                {/* Our Mission section */}
                <div className="mb-16">
                  <h3 className="text-3xl font-playfair mb-6 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    Our mission is to deliver daily messages of hope, faith, and inspiration that can be consumed 
                    in just one minute, but impact your entire day. We believe that small doses of Grace can transform 
                    your perspective and bring peace to your spirit.
                  </p>
                </div>
                
                {/* Our Vision section */}
              <div>
                  <h3 className="text-3xl font-playfair mb-6 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    We envision a world where everyone can access moments of spiritual growth regardless of their busy schedules. 
                    Through Bible verses, prayer prompts, and thoughtful reflections, we aim to help you connect with 
                    your faith in meaningful ways that enhance your daily life and strengthen your spiritual journey.
                  </p>
                  <div className="flex justify-center mt-10">
                    <Link href="/contact" className="inline-flex items-center bg-[#8B4513] text-white px-8 py-3 rounded-full hover:bg-[#654321] transition-colors group">
                      Join our journey
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline for mobile */}
            <div className="md:hidden space-y-16">
              {/* Our Beginning section - Mobile */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14">
                  <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                    <span className="text-xl font-bold">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-playfair mb-4 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                    Our Beginning
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    One Minute Grace was created from a simple idea: in our fast-paced world, we all need moments 
                    of spiritual reflection that don't demand hours of our time. What began as a small social
                    media account sharing daily verses has grown into a community of believers seeking brief but 
                    meaningful connections with their faith.
                  </p>
                </div>
              </div>
              
              {/* Our Mission section - Mobile */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14">
                  <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                    <span className="text-xl font-bold">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-playfair mb-4 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our mission is to deliver daily messages of hope, faith, and inspiration that can be consumed 
                    in just one minute, but impact your entire day. We believe that small doses of Grace can transform 
                    your perspective and bring peace to your spirit.
                  </p>
                </div>
              </div>
              
              {/* Our Vision section - Mobile */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14">
                  <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                    <span className="text-xl font-bold">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-playfair mb-4 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We envision a world where everyone can access moments of spiritual growth regardless of their busy schedules. 
                    Through Bible verses, prayer prompts, and thoughtful reflections, we aim to help you connect with 
                    your faith in meaningful ways that enhance your daily life and strengthen your spiritual journey.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link href="/contact" className="inline-flex items-center bg-[#8B4513] text-white px-8 py-3 rounded-full hover:bg-[#654321] transition-colors group">
                  Join our journey
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              </div>
            </div>
          </div>
        </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h6 className="text-[#8B4513] font-medium mb-2 tracking-wider">OUR VALUES</h6>
            <h2 className="text-3xl md:text-5xl font-playfair mb-8 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
              What We Stand For
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#8B4513] to-[#654321] mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our values guide everything we do, from the content we create to how we interact with our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-full flex items-center justify-center mb-8 mx-auto text-white transform group-hover:rotate-12 transition-transform duration-500">
                <FaPray className="text-3xl" />
                </div>
              <h3 className="text-2xl font-playfair mb-6 text-center text-gray-800">Faith</h3>
                <p className="text-gray-600 text-center">
                We believe in the power of faith to transform lives and bring hope to every situation. Faith is the foundation of our message and our community.
                </p>
              </div>
              
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-full flex items-center justify-center mb-8 mx-auto text-white transform group-hover:rotate-12 transition-transform duration-500">
                <FaHandsHelping className="text-3xl" />
                </div>
              <h3 className="text-2xl font-playfair mb-6 text-center text-gray-800">Community</h3>
                <p className="text-gray-600 text-center">
                Building a supportive community where everyone can grow in their spiritual journey, share experiences, and lift each other up in faith and love.
                </p>
              </div>
              
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-full flex items-center justify-center mb-8 mx-auto text-white transform group-hover:rotate-12 transition-transform duration-500">
                <FaLightbulb className="text-3xl" />
                </div>
              <h3 className="text-2xl font-playfair mb-6 text-center text-gray-800">Inspiration</h3>
                <p className="text-gray-600 text-center">
                Creating content that inspires and uplifts, one minute at a time. We believe that even brief moments of inspiration can lead to lasting spiritual growth.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Call to Action */}
      <section className="py-20 bg-[url('/images/paper-texture.png')] bg-cover relative">
        <div className="absolute inset-0 bg-[#8B4513]/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-playfair mb-6 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Connect with us on social media for daily inspiration and become part of our growing spiritual family
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://facebook.com/oneminutegrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
                >
                  <FaFacebook size={28} />
                </a>
                <a
                  href="https://instagram.com/oneminutegrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://youtube.com/oneminutegrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
                >
                  <FaYoutube size={28} />
                </a>
              </div>
              
              <div className="mt-12">
                <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-[#8B4513] to-[#654321] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group">
                  Contact Us
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              </div>
            </div>
            </div>
          </div>
        </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
};

export default About; 