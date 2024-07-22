import React from 'react';

export default function Footer() {
 return (
    <footer className="bg-gray-200 p-4 fixed left-0 bottom-0 w-full shadow-md">
      <div className="text-center">
        <p className="text-gray-600">Copyright © {new Date().getFullYear()} - All rights reserved.</p>
      </div>
    </footer>
 );
}
