import React from 'react';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram   } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

//! have to change the hover bg color of join us and get in touch button 

const Footer = () => {

    const navigate = useNavigate();

    // Handle Join Us button click
    const handleJoinUs = () => {
        console.log('Join Us button clicked');
        navigate('/register')
        // Add your join us logic here (e.g., navigate to signup page)
    };

    // Handle Get in Touch button click
    const handleGetInTouch = () => {
        console.log('Get in Touch button clicked');
        navigate('/contact')
        // Add your contact logic here (e.g., open contact form)
    };

    const SOCIAL_LINKS = {
        'Instagram': "https://www.instagram.com/gursikhdevs",
        'LinkedIn': "https://linkedin.com/in/gursikhdevs",
        'Twitter': "https://twitter.com/gursikhdevs",
        'GitHub': "https://github.com/gursikhdevs",
        };

    // Handle social media clicks
    const handleSocialClick = (platform) => {
        const url = SOCIAL_LINKS[platform];
        if (!url) return;

        window.open(url, "_blank", "noopener,noreferrer");  // opens in new tab
    };


    const FOOTER_Links = {
        //edit navigation links
        'home': "landing",
        'features': "features",
        'alumni-directory': "alumni",
        'blog-stories': "blogs-stories",
        'events-reunions': "events-reunions",
        'privacy-policy': "/privacy-policy",
        'terms-of-condition': "/terms&condition",
        'faqs': "faqs",
    };

    // Handle navigation clicks
    const handleNavClick = (page) => {
        const navigationLink = FOOTER_Links[page]
        navigate(`/${navigationLink}`);

        console.log('edit navigation links')
    };

  return (
    <footer className="bg-main-color">
      {/* before footer Section */}
      <div className="px-8 pt-8 pb-2 text-center">
        <h1 className="text-theme-white text-4xl md:text-5xl font-bold mb-8 leading-tight bg-image">
          ONCE A NAME ON THE ATTENDANCE LIST, NOW<br />
          A NAME WORTH KNOWING.
        </h1>
        
        {/* Join Us Button */}
        <button
          onClick={handleJoinUs}
          className="join-us-btn relative bg-secondary-color cursor-pointer hover:bg-orange-500 text-white-color font-bold text-xl px-14 py-3 rounded-lg transition-colors duration-300 sd:px-8 sd:py-2"
        >
          JOIN US
        </button>
      </div>


      {/* Main Footer Content */}
      <div className="clip-mobile md:clip-tablet lg:clip-desktop bg-secondary-color px-8 pt-10 pb-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          
          {/* Left Column - Logo and Social Media */}
          <div className="space-y-6 lg:ml-30">
            {/* Logo Placeholder */}
            <div onClick={()=> navigate('/landing')} className="text-white-color cursor-pointer text-3xl font-bold italic">
              LOGO
            </div>
            
            {/* Tagline */}
            <p className="text-white-color text-lg font-semibold uppercase">
              WHERE PAST MEETS PRESENT, FUTURE GETS INSPIRED.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <div
                onClick={() => handleSocialClick('GitHub')}
                className="w-10 h-10 bg-transparent flex items-center justify-center"
                aria-label="GitHub"
              >
                <FaGithub className="w-8 h-8 text-white-color cursor-pointer hover:text-permanent-main-color hover:scale-120 transition-all duration-300" />
              </div>
              
              <div
                onClick={() => handleSocialClick('Instagram')}
                className="w-10 h-10 bg-transparent flex items-center justify-center "
                aria-label="Instagram"
              >
                <FaInstagram  className="w-8 h-8 text-white-color cursor-pointer hover:text-permanent-main-color hover:scale-120 transition-all duration-300" />
              </div>

              <div
                onClick={() => handleSocialClick('Twitter')}
                className="w-10 h-10 bg-transparent flex items-center justify-center"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-8 h-8 text-white-color cursor-pointer hover:text-permanent-main-color hover:scale-120 transition-all duration-300" />
              </div>

              <div
                onClick={() => handleSocialClick('LinkedIn')}
                className="w-10 h-10 bg-transparent flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-8 h-8 text-white-color cursor-pointer hover:text-main-color hover:scale-120 transition-all duration-300" />
              </div>

            </div>
          </div>

          {/* Middle Column - Navigation */}
          <div className='md:ml-10 lg:ml-30'>
            <h3 className="text-white-color text-xl font-bold mb-4">Navigation</h3>
            <nav className="space-y-1">
              {['Home', 'Features', 'Alumni Directory', 'Blog/Stories', 'Events/Reunions'].map((item) => (
                <div
                  key={item}
                  onClick={() => handleNavClick(
                        item.toLowerCase().trim().replace(/\s+/g, "-").replace(/\//g, "-")
                    )}
                  className="w-fit block cursor-pointer text-white-color text-md hover:text-permanent-main-color transition-colors duration-300"
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Column - Legal Links and CTA */}
          <div className="space-y-8 md:mt-10" >
            <div className="space-y-1">
              {['Privacy Policy', 'Terms of condition', 'FAQs'].map((item) => (
                <div
                  key={item}
                  onClick={() => handleNavClick(
                        item.toLowerCase().trim().replace(/\s+/g, "-").replace(/\//g, "-") 
                    )}
                  className="w-fit block cursor-pointer text-white-color text-md hover:text-permanent-main-color transition-colors duration-300"
                >
                  {item}
                </div>
              ))}
            </div>
            
            {/* Get in Touch Button */}
            <button
              onClick={handleGetInTouch}
              className="bg-permanent-main-color hover:bg-forest-green-600 hover:scale-105 cursor-pointer text-white-color font-bold px-8 py-2 rounded-lg transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t-2 border-white-color">
          <div className="text-center text-white-color text-lg">
            <span>&copy; 2025 Setu, All Rights Reserved.</span>
            <span className="mx-4">|</span>
            <span>Made with 💗 by GursikhDevs</span>
          </div>
        </div>
      </div>

      {/* Scrolling Text Banner */}
      <div className="bg-main-color text-theme-white py-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          <span className="text-xl font-bold mx-8"> ✦ PAST MEETS PRESENT, FUTURE GETS INSPIRED</span>
          <span className="text-xl font-bold mx-8"> ✦ YESTERDAY'S JUNIORS, TODAY'S LEADERS</span>
          <span className="text-xl font-bold mx-8"> ✦ PAST MEETS PRESENT, FUTURE GETS INSPIRED</span>
          <span className="text-xl font-bold mx-8"> ✦ YESTERDAY'S JUNIORS, TODAY'S LEADERS</span>
          <span className="text-xl font-bold mx-8"> ✦ PAST MEETS PRESENT, FUTURE GETS INSPIRED</span>
          <span className="text-xl font-bold mx-8"> ✦ YESTERDAY'S JUNIORS, TODAY'S LEADERS</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;