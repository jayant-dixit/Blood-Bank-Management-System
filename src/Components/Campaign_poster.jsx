import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const images = [
    'https://imgs.search.brave.com/5aRCB6ef6lqmxOpVIPDecsqLXOPVY61BS583TcPU6qk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdhL2Yx/L2JhLzdhZjFiYTMz/MmYzMWM1NTA2ZjVi/MTE2OGJiZjk5NmEz/LmpwZw',
    'https://imgs.search.brave.com/RukgHSZSyf38LaK6oP6axmVrNWAjCvNE9GNGQgICm2c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q0LzNh/LzVjL2Q0M2E1Y2Jh/ZTQ4N2MyYWQ4NGU3/YzFlNDRhNDBmNmVm/LmpwZw',
    'https://imgs.search.brave.com/CX_p51GWdG4XDTD_aMY97oraQnHdy-uKd9Em8ERlbS4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vZ29vZG1v/cm5pbmdsb3ZlcXVv/dGUuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzEwL0Js/b29kLURvbmF0aW9u/LUlzLUEtR3JlYXQt/QWN0LU9mLUtpbmRu/ZXNzLmpwZz9yZXNp/emU9OTQwLDUyOSZz/c2w9MQ',
    'https://imgs.search.brave.com/-lDQXhUWcm68ybOKJyPMraPQraxwshG36UHWvXdSwGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vZ29vZG1v/cm5pbmdsb3ZlcXVv/dGUuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzEwL0Js/b29kLURvbmF0ZS1x/dW90ZXMtSXMtQS1H/cmVhdC1BY3QtT2Yt/S2luZG5lc3MtNC5q/cGc_cmVzaXplPTk0/MCw1Mjkmc3NsPTE',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Go to next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Carousel Images */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Carousel Image ${currentIndex + 1}`}
          className="w-full h-80 object-bottom transition-all duration-500"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-3 rounded-full shadow-lg hover:bg-gray-900"
      >
        ❮
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-3 rounded-full shadow-lg hover:bg-gray-900"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? 'bg-white' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};  

export default Carousel;
