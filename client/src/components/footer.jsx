import React from "react";

function Footer() {
  return (
    <footer className="bg-[#fffaed] text-center py-6 mt-10 shadow-inner">
      <p className="text-gray-700">© 2024 Myoptique. All rights reserved.</p>
      <p className="text-gray-600 mt-2">
        Follow us on{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Social Media
        </a>
      </p>
    </footer>
  );
}

export default Footer;