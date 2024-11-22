import React, { useEffect, useState } from "react";

const useCountUp = (target) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < target) return prev + 5;
        clearInterval(interval);
        return prev;
      });
    }, 10); // Adjust the speed of the count-up by changing this value
    return () => clearInterval(interval);
  }, [target]);
  return count;
};

const App = () => {

  const donorCount = useCountUp(1500);  // Target for donors
  const acceptorCount = useCountUp(500);
  const bloodCount = useCountUp(250);
  return (
    <div>     

      {/* Hero Section */}
      <section className="relative w-full bg-[rgb(194,29,25)] text-center px-0 h-[80vh]">
        <div className="container flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 relative right-0 top-[40px] text-[21px]">
            <h2 className="text-4xl font-bold text-white mb-4 ">
              Save Lives with Your Blood
            </h2>
            <p className="text-white mb-6">
              Join our community of lifesavers and help those in need.
            </p>
            <a
              href="#donate"
              className="bg-yellow-400 text-black hover:bg-white hover:text-red-700 font-semibold py-3 px-6 rounded shadow"
            >
              Donate Now
            </a>
          </div>
          <div className="h-[61vh] top-[52px] relative rounded-lg">
            <img
              src="https://imgs.search.brave.com/tfjqsFAWn7Sms6Zph1YIXn2cfCoVeDBmOX7v4lUW0NM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4Lzg0LzAy/LzM2MF9GXzI2ODg0/MDI4OV9QZHRvNHd4/aTkyTXJuMGZwMHlh/VjFlMzEwa292c1Ax/Ny5qcGc"
              alt="People donating blood"
              className="w-full h-full shadow-lg rounded-[20px]"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Choose BloodConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Find Nearby Donors", icon: "🌍" },
              { title: "Schedule Donations", icon: "📅" },
              { title: "Track Donation History", icon: "📜" },
              { title: "Earn Rewards", icon: "🎁" },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded shadow hover:shadow-md transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Count-Up Section */}
      <section className="py-20 bg-cover bg-center relative h-[80vh]" style={{ backgroundImage: "url('https://files.oaiusercontent.com/file-JW73f7AIcTja6JGnDjyIftTQ?se=2024-11-22T17%3A55%3A51Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D61494258-f8fe-4662-ae11-4ce3ad5d5995.webp&sig=WdZXPcCBpOF5tIXRLJin%2Bhk1lxeV/5ExCsgvur0G31Y%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold text-white mb-8">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Donors Block */}
            <div className="p-6 bg-gray-50 bg-opacity-75 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-red-600 mb-4">
                Donors
              </h3>
              <p className="text-4xl font-bold text-gray-800">{donorCount}</p>
              <p className="text-gray-600 mt-2">Lifesaving donors in our network</p>
            </div>

            {/* Acceptors Block */}
            <div className="p-6 bg-gray-50 bg-opacity-75 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-red-600 mb-4">
                Acceptors
              </h3>
              <p className="text-4xl font-bold text-gray-800">{acceptorCount}</p>
              <p className="text-gray-600 mt-2">People helped by blood donations</p>
            </div>

            <div className="p-6 w-[200vh] bg-gray-50 bg-opacity-75 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-red-600 mb-4">
                Blood Banks
              </h3>
              <p className="text-4xl font-bold text-gray-800">{bloodCount}</p>
              <p className="text-gray-600 mt-2">Blood Banks Integrated Worldwide</p>
            </div>
          </div>
        </div>
      </section>



      {/* Campaigns Section */}
      <section id="campaigns" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Upcoming Donation Drives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((drive, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded shadow hover:shadow-md transition"
              >
                <img className="object-cover" src="https://imgs.search.brave.com/hvuLPRwLAK0tYmjAVbtyTcEsaGmmRm7iyStcSbBUYeI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVkY3Jvc3NibG9v/ZC5vcmcvY29udGVu/dC9kYW0vcmVkY3Jv/c3NibG9vZC9ob21l/LXBhZ2UtaW1hZ2Vz/L0Jsb29kX01vYmls/ZS5qcGcudHJhbnNm/b3JtLzEyODgvcTgy/L2ZlYXR1cmUvaW1h/Z2UuanBlZw" alt="" />
                <h3 className="text-lg font-semibold text-center text-red-600">
                  Drive #{drive}
                </h3>
                <p className="text-gray-600 mt-2">
                  Date: Dec {10 + drive}, 2024
                </p>
                <p className="text-gray-600">Location: City Blood Bank</p>
                <p className="text-gray-600">Contact: 123-456-7890</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;
