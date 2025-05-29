import React from "react";

const Footer = () => {
  return (
    
    <footer className="footer footer-horizontal footer-center fixed bottom-0 bg-[#46494C] text-white p-4 mt-10 rounded-t-lg shadow-inner">
  <aside>
    <p className="font-bold text-lg text-[#1985A1]">Matchably</p>
    <p className="text-sm text-[#C5C3C6]">
      © {new Date().getFullYear()} – All rights reserved
    </p>
  </aside>
</footer>

  );
};

export default Footer;
