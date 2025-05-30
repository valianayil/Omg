import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaQuoteLeft, FaArrowRight, FaPlay, FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaArrowDown, FaCross } from 'react-icons/fa';
import Layout from '../components/Layout';
import DailyVerse from '../components/DailyVerse';
import Modal from '../components/Modal';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Feature content data
  const featureContent = [
    {
      id: 1,
      title: 'Morning Prayer Guide',
      summary: 'Start your day with intentional prayer to align your heart with God\'s purpose.',
      content: `
        <p class="mb-4">Starting your day with a meaningful prayer creates a spiritual foundation that can carry you through the challenges ahead. Here's a simple guide to morning prayer:</p>
        
        <h4 class="text-lg font-semibold mb-2">1. Begin with Gratitude</h4>
        <p class="mb-4">"This is the day that the Lord has made; let us rejoice and be glad in it." (Psalm 118:24)</p>
        <p class="mb-4">Take a moment to thank God for specific blessings in your life. Even on difficult days, there is always something to be grateful for.</p>
        
        <h4 class="text-lg font-semibold mb-2">2. Surrender Your Day</h4>
        <p class="mb-4">"Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." (Proverbs 3:5-6)</p>
        <p class="mb-4">Offer your plans, challenges, and goals to God, asking for His guidance and wisdom throughout your day.</p>
        
        <h4 class="text-lg font-semibold mb-2">3. Pray for Others</h4>
        <p class="mb-4">Take time to intercede for family, friends, and those in need. This shifts our focus outward and builds compassion.</p>
        
        <h4 class="text-lg font-semibold mb-2">4. Close with Listening</h4>
        <p class="mb-4">End your prayer time with a moment of silence, listening for God's gentle guidance and wisdom for your day.</p>
      `
    },
    {
      id: 2,
      title: 'Finding Peace in Chaos',
      summary: 'Discover practices for maintaining spiritual calm when life feels overwhelming.',
      content: `
        <p class="mb-4">In today's fast-paced, constantly connected world, finding moments of peace can seem impossible. Yet Scripture assures us that God's peace is available even in the most chaotic circumstances.</p>
        
        <h4 class="text-lg font-semibold mb-2">Breathe and Remember</h4>
        <p class="mb-4">"Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." (John 14:27)</p>
        <p class="mb-4">When anxiety rises, take three deep breaths while repeating a short scripture verse as a reminder of God's presence.</p>
        
        <h4 class="text-lg font-semibold mb-2">Create Sacred Pauses</h4>
        <p class="mb-4">"Be still, and know that I am God." (Psalm 46:10)</p>
        <p class="mb-4">Schedule brief moments throughout your day to pause, pray, and reorient yourself to God's presence. Even 60 seconds can reset your spiritual compass.</p>
        
        <h4 class="text-lg font-semibold mb-2">Practice Gratitude</h4>
        <p class="mb-4">In moments of chaos, intentionally identify three things you're grateful for. Gratitude shifts our focus from what's wrong to what's right.</p>
        
        <h4 class="text-lg font-semibold mb-2">Limit Information Intake</h4>
        <p class="mb-4">Set boundaries around news and social media consumption. Instead, fill your mind with scripture, worship music, and faith-building content.</p>
      `
    },
    {
      id: 3,
      title: 'Bible Verse Reflection Prompt',
      summary: 'Use this template with ChatGPT to get deeper insights and personal reflections on any Bible verse.',
      content: `
        <p class="mb-4">Copy and paste this prompt into ChatGPT to gain deeper understanding and personal application from any Bible verse:</p>
        
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 relative overflow-hidden">
          <p class="font-medium mb-2 text-[#8B4513]">ChatGPT Prompt Template:</p>
          <div class="whitespace-pre-wrap text-gray-700 font-mono text-sm">
I'd like to understand the following Bible verse more deeply: "[INSERT BIBLE VERSE HERE]"

Please help me with:

1. The historical and cultural context of this verse
2. The core spiritual principles or teachings in this passage
3. How these principles apply to modern life
4. A personal reflection question that helps me apply this verse to my own life
5. A short prayer based on the verse's message
6. Other related verses that illuminate this same teaching

Please write in a warm, thoughtful tone and make the insights accessible even to someone new to Bible study.
          </div>
          <button class="absolute top-2 right-2 text-xs bg-[#8B4513] text-white px-2 py-1 rounded hover:bg-[#654321] transition-colors" 
                  onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent.trim()); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy', 2000)">
            Copy
          </button>
        </div>
        
        <h4 class="text-lg font-semibold mb-2">Example Usage:</h4>
        <p class="mb-2">For Philippians 4:13: "I can do all things through Christ who strengthens me."</p>
        
        <p class="mb-4">The prompt will help you understand:</p>
        <ul class="list-disc pl-5 mb-4">
          <li class="mb-2">What Paul meant in his original context</li>
          <li class="mb-2">How this verse relates to spiritual dependence vs. self-reliance</li>
          <li class="mb-2">How to apply this principle to your challenges today</li>
          <li class="mb-2">Questions for personal reflection</li>
          <li class="mb-2">A prayer based on the verse</li>
        </ul>
        
        <p class="mb-4">This approach works with any verse you're studying or memorizing, helping you develop a more meaningful connection with Scripture.</p>
      `
    }
  ];

  // Open modal with specific content
  const openModal = (id: number) => {
    const feature = featureContent.find(item => item.id === id);
    if (feature) {
      setModalContent({
        title: feature.title,
        content: feature.content
      });
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const latestVideos = await response.json();
        setVideos(latestVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <Head>
        <title>One Minute Grace - Daily Bible Verses & Christian Inspiration</title>
        <meta name="description" content="Find daily Bible verses, Christian prayers, Gospel teachings, and messages of faith and hope in Jesus Christ. One minute of God's grace to transform your day." />
        <meta property="og:title" content="One Minute Grace - Daily Bible Verses & Christian Inspiration" />
        <meta property="og:description" content="Daily Bible verses, Christian prayers, and messages of faith in Jesus Christ to inspire your spiritual journey." />
        <meta property="og:url" content="https://oneminutegrace.org" />
        <meta property="og:image" content="/navlogo.png" />
        <meta property="twitter:title" content="One Minute Grace - Daily Bible Verses & Christian Inspiration" />
        <meta property="twitter:description" content="Daily Bible verses, Christian prayers, and messages of faith in Jesus Christ to inspire your spiritual journey." />
        <meta property="twitter:image" content="/navlogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/navlogo.png" type="image/png" />
        <link rel="canonical" href="https://oneminutegrace.org" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Video Background */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 transform hover:scale-105 transition-transform duration-500 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <Image
                  src="/navlogo.png"
                  alt="One Minute Grace Logo"
                  width={96}
                  height={96}
                  className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-all duration-500"
                />
              </div>
            </div>
            <h1 className={`text-5xl md:text-7xl font-playfair text-white mb-6 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              One Minute Grace
            </h1>
            <p className={`text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              A moment of grace every single day
            </p>
            <div className="flex flex-wrap justify-center gap-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <a 
                href="https://facebook.com/1minuteGrace" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://instagram.com/1minuteGrace" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://youtube.com/@OneMinuteGrace" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a 
                href="https://x.com/oneminutegrace" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-110"
                aria-label="X (Twitter)"
              >
                <FaTwitter size={24} />
              </a>
            </div>  
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-fadeInUp" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <DailyVerse />

      {/* About Section */}
      <section className="relative py-16 bg-[url('/images/subtle-pattern.png')] bg-repeat">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src="/aboutimg.png" 
                alt="About One Minute Grace" 
                fill
                style={{ objectFit: 'cover' }}
                className="transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div>
              <h6 className="text-[#8B4513] font-medium mb-2">ABOUT US</h6>
              <h2 className="text-3xl md:text-4xl font-playfair mb-6 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                One Minute Grace was created to provide moments of spiritual reflection in our busy lives. 
                Our mission is to deliver daily messages of hope, faith, and inspiration that can be consumed 
                in just one minute, but impact your entire day.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We believe that small doses of Grace can transform your perspective and bring peace 
                to your spirit. Through Bible verses, prayer prompts, and thoughtful reflections, 
                we aim to help you connect with your faith in meaningful ways.
              </p>
              <button className="flex items-center text-[#8B4513] font-medium group hover:text-[#654321] transition-colors">
                Learn more about our journey
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="relative py-16 bg-gradient-to-b from-white to-[#f9f5f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-[#8B4513] font-medium mb-2">INSPIRATION</h6>
            <h2 className="text-3xl md:text-4xl font-playfair bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">Featured Grace Moments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureContent.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-[200px]">
                  <Image 
                    src={`/${item.id}.${item.id === 3 ? 'png' : 'jpeg'}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.summary}
                  </p>
                  <button 
                    onClick={() => openModal(item.id)}
                    className="text-[#8B4513] font-medium hover:text-[#654321] transition-colors group"
                  >
                    Read More
                    <FaArrowRight className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social-media-section" className="relative py-20 bg-[url('/images/paper-texture.png')] bg-cover">
        <div className="absolute inset-0 bg-[#8B4513]/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h6 className="text-[#8B4513] font-medium mb-2">CONNECT WITH US</h6>
            <h2 className="text-3xl md:text-4xl font-playfair bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent mb-3">Join Our Community</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#8B4513] to-[#654321] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Follow us on social media for daily inspiration, videos, and spiritual content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* YouTube Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-[#8B4513]/10 to-[#654321]/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-[#8B4513] text-white p-2 rounded-lg mr-3">
                      <FaYoutube size={24} />
                    </div>
                    <h3 className="text-2xl font-playfair text-gray-800">YouTube</h3>
                  </div>
                  <a 
                    href="https://youtube.com/@OneMinuteGrace" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#8B4513] hover:text-[#654321] font-medium flex items-center group"
                  >
                    View Channel
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
                  </div>
                ) : videos.length > 0 ? (
                  <div className="space-y-5">
                    {videos.slice(0, 3).map((video) => (
                      <a 
                        key={video.id} 
                        href={`https://youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start space-x-4 p-3 hover:bg-[#8B4513]/5 rounded-xl transition-colors group"
                      >
                        <div className="relative w-32 h-20 md:w-48 md:h-28 flex-shrink-0 rounded-xl overflow-hidden">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 rounded-full p-2 transform group-hover:scale-110 transition-transform">
                              <FaPlay className="text-[#8B4513]" size={16} />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className="font-medium text-gray-800 text-base md:text-lg line-clamp-2 group-hover:text-[#8B4513] transition-colors">
                            {video.title}
                          </h4>
                          <div className="flex items-center text-gray-500 text-xs mt-2">
                            <span className="mr-3">{video.views}</span>
                            <span>{video.publishedAt}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                    <p>No videos available at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Instagram Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-[#8B4513]/10 to-[#654321]/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-[#8B4513] text-white p-2 rounded-lg mr-3">
                      <FaInstagram size={24} />
                    </div>
                    <h3 className="text-2xl font-playfair text-gray-800">Instagram</h3>
                  </div>
                  <a 
                    href="https://instagram.com/1minuteGrace" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#8B4513] hover:text-[#654321] font-medium flex items-center group"
                  >
                    View Profile
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1533000759938-aa0ba70beceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                      caption: 'Trust in the Lord',
                      likes: '245',
                      date: '3d'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                      caption: 'Be still and know',
                      likes: '189',
                      date: '5d'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                      caption: 'Through Christ',
                      likes: '312',
                      date: '1w'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1519834089823-af9a493dc878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                      caption: 'The Lord is my shepherd',
                      likes: '276',
                      date: '2d'
                    }
                  ].map((post, index) => (
                    <a 
                      key={index} 
                      href="https://instagram.com/1minuteGrace" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block relative group rounded-xl overflow-hidden"
                    >
                      <div className="aspect-square relative rounded-xl overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.caption}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-sm font-medium mb-1">{post.caption}</p>
                            <div className="flex items-center justify-center space-x-3 mt-2">
                              <span className="text-xs flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                {post.likes}
                              </span>
                              <span className="text-xs">{post.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <div className="bg-[#8B4513]/80 backdrop-blur-sm rounded-full p-1.5">
                            <FaInstagram className="text-white" size={12} />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-16 bg-gradient-to-b from-[#f9f5f2] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-[#8B4513] font-medium mb-2">TESTIMONIALS</h6>
            <h2 className="text-3xl md:text-4xl font-playfair bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent">What People Say</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Beautiful comments and experiences shared by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Daily Follower',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                comment: 'One Minute Grace has transformed my daily routine. The morning prayers and verses bring so much peace to my day.',
                date: '2 days ago'
              },
              {
                name: 'Michael Chen',
                role: 'YouTube Subscriber',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                comment: 'The guided meditations and scripture readings have helped me find strength during difficult times. Thank you for this ministry.',
                date: '1 week ago'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Instagram Follower',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                comment: 'Every post brings light to my day. The verses and reflections are always exactly what I need to hear.',
                date: '3 days ago'
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-[#8B4513]/20">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
      >
        <div className="text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
          <div className="mt-6 pt-4 border-t border-gray-200 text-right">
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>
        </div>
      </Modal>

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

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0px) rotate(360deg);
          }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage; 