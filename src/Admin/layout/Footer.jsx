import React from "react";

const Footer = () => {
  return (
    <div className="text-white container max-md:w-full w-[80%] lg:max-w-7xl mx-auto py-5 space-y-5 max-md:px-5">
      {/* Top Section with Payment and Socials */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
        <section className="flex flex-wrap justify-center sm:justify-start gap-2">
          <span>PAYMENT LOGO</span>
          <span>PAYMENT LOGO</span>
          <span>PAYMENT LOGO</span>
          <span>PAYMENT LOGO</span>
        </section>
        <section className="flex flex-wrap justify-center sm:justify-end gap-2">
          <span>Socials</span>
        </section>
      </div>

      {/* Links Grid - Responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        <section>
          <h6 className="font-semibold mb-3">About Qwikgold</h6>
          <ul className="text-sm font-light">
            <li className="mb-1">About Us</li>
            <li className="mb-1">News</li>
            <li className="mb-1">Support</li>
            <li className="mb-1">Contact Us</li>
          </ul>
        </section>
        <section>
          <h6 className="font-semibold mb-3">Shopping</h6>
          <ul className="text-sm font-light">
            <li className="mb-1">Spin Rewards</li>
            <li className="mb-1">Offers</li>
            <li className="mb-1">Special Discounts</li>
          </ul>
        </section>
        <section>
          <h6 className="font-semibold mb-3">Legal</h6>
          <ul className="text-sm font-light">
            <li className="mb-1">Terms of use</li>
            <li className="mb-1">Terms of sale</li>
            <li className="mb-1">Privacy Policy</li>
          </ul>
        </section>
        <section>
          <h6 className="font-semibold mb-3">Partners</h6>
          <ul className="text-sm font-light">
            <li className="mb-1">Partnership</li>
          </ul>
        </section>
        <section className="col-span-1 hidden md:block"></section>
      </div>

      {/* Bottom Section with Logo and Copyright */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-light">
        <span className="font-semibold">LOGO</span>
        <span>© 2026 Qwikgold Location NP</span>
      </div>
    </div>
  );
};

export default Footer;
