import { useState } from "react";

const Navbar = () => {
    const notifications = [
      "New blood request received!",
      "Inventory is running low for O+ blood group.",
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    return (
      <div className="bg-blue-800 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">Blood Bank Panel</h1>
        <div className="relative">
          <button onClick={()=>(setIsDropdownOpen(!isDropdownOpen))} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Notifications
          </button>
          {isDropdownOpen ? (<div className="absolute bg-white text-black p-2 shadow mt-2 w-64 right-0 rounded">
            {notifications.map((note, idx) => (
              <p key={idx} className="border-b p-2">
                {note}
              </p>
            ))}
          </div>): null}
          
        </div>
      </div>
    );
  };
  export default Navbar;
  