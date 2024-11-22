import React from "react";

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <a href="#about" className="text-gray-400 hover:text-white mx-2">
              About Us
            </a>
            <a href="#faqs" className="text-gray-400 hover:text-white mx-2">
              FAQs
            </a>
            <a href="#privacy" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            {["facebook", "twitter", "instagram"].map((platform) => (
              <a
                key={platform}
                href={`https://${platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className={`fab fa-${platform}`}></i>
              </a>
            ))}
          </div>
          <p className="text-gray-400 mt-4">© 2024 RaktMitra @ Tech Titan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
