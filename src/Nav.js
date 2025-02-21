import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    // Code to run when component mounts
    return () => {
      // Cleanup code if necessary
    };
  }, []); // Dependency array (empty means it runs only once)

  const handleEvent = (event) => {
    // Handle your event here
  };

  return (
    <div class="bg-zinc-700">
     <h1 class="text-blue-600">My Contacts</h1>
     {/* Internal CSS */}
     <style jsx>{`
        div {
          background-color: #282c34;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
        }
        
        h1 {
          color: #fff;
          font-size: 2em;
        }
      `}</style>
    </div>
  );
};

export default Nav;
