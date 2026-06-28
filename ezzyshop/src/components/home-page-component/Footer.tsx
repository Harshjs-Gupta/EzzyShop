import Link from 'next/link'
import React from 'react'
import {FaInstagram, FaFacebook, FaPinterest, FaTruck, FaHeadset, FaSync} from "react-icons/fa"
import {FaShield, FaXTwitter} from "react-icons/fa6"

const socialLinks = [{
  name: "Instagram",
  icon: <FaInstagram/>,
  url: "#"
},
{
  name: "Facebook",
  icon: <FaFacebook/>,
  url: "#"
}
,{
  name: "X / Twitter",
  icon: <FaXTwitter/>,
  url: "#"
},
{
  name: "Pinterest",
  icon: <FaPinterest/>,
  url: "#"
}
]

const promises = [{
  icon: <FaTruck className="w-[20px] shrink-0"/>,
  title: "Free Shipping",
  description: "On orders over ₹5,000"
},{
  icon: <FaShield className="w-[20px] shrink-0"/>,
  title: "Authenticity Guaranteed",
  description: "Every product verified"
},{
  icon: <FaSync className="w-[20px] shrink-0"/>,
  title: "Easy Returns",
  description: "30-day hassle-free policy"
},{
  icon: <FaHeadset className="w-[20px] shrink-0"/>,
  title: "24/7 Concierge",
  description: "Premium customer care"
}]

const policies = [{
  title: "Privacy",
  url: "#"
},{ 
  title: "Terms",
  url: "#"
},{ 
  title: "Cookies",
  url: "#"
},
{
  title: "Sitemap",
  url: "#"
}
]

const paymentCards = [{
  cardName: "VISA",
  url: "#"
},
{
  cardName: "MASTERCARD",
  url: "#"
},
{
  cardName: "UPI",
  url: "#"
},
{
  cardName: "PAYPAL",
  url: "#",
}
]

export default function Footer() {
  return (
  <footer className="font-sans bg-luxury-black/90 text-gold border-t border-gold/20 w-full">
    {/* TOP GRID */}
 
  <div className="bg-linear-to-b from-luxury-dark to-luxury-black px-8 md:px-12 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 lg:gap-12 border-b border-gold/20">
 
    {/*//SECTION:  Brand Column  */}
    <div>
      <div className="font-light text-[30px] tracking-[0.22em] text-gold mb-1">
        EZZY<em className="text-gold">SHOP</em>
      </div>
      <p className="text-[10px] tracking-[0.38em] uppercase text-gold mb-5 font-medium">
        Curated Luxury &amp; Lifestyle
      </p>
      <p className="text-[12.5px] text-gold-dim leading-[1.9] font-light max-w-[270px]">
        Discover an unparalleled collection of premium products crafted for those who appreciate the extraordinary. Quality, elegance, and refinement in every detail.
      </p>
 
      {/*//SECTION: Social Icons */}
      <div className="flex gap-2.5 mt-6">
       {socialLinks.map((social) => <Link href={social.url} key={social.name} aria-label={social.name}
           className="w-9 h-9 border border-gold/25 flex items-center justify-center
                  text-gold text-[15px] transition-all duration-200
                  hover:bg-gold-light hover:text-luxury-black hover:border-luxury-black">
          {social.icon}
        </Link>)}
      </div>
    </div>
 
    {/*//SECTION: Shop Links */}
    <div>
      <h3 className="col-title-bar text-[10px] tracking-[0.32em] uppercase text-gold-light font-semibold mb-5">
        Shop
      </h3>
      <ul className="flex flex-col gap-2.5">
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">New Arrivals</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Best Sellers</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Collections</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Limited Edition</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Sale</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Gift Cards</a></li>
      </ul>
    </div>
 
    {/*//SECTION: Support Links */}
    <div>
      <h3 className="col-title-bar text-[10px] tracking-[0.32em] uppercase text-gold-light font-semibold mb-5">
        Support
      </h3>
      <ul className="flex flex-col gap-2.5">
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">My Account</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Track Order</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Returns &amp; Exchanges</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Shipping Info</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">FAQs</a></li>
        <li><a href="#" className="link-item flex items-center text-[12.5px] text-gold-dim font-light tracking-wide transition-colors duration-200 hover:text-gold">Contact Us</a></li>
      </ul>
    </div>
 
    {/*//SECTION: Newsletter */}
    <div>
      <h3 className="col-title-bar text-[10px] tracking-[0.32em] uppercase text-gold-light font-semibold mb-5">
        Exclusive Access
      </h3>
      <p className="text-[12px] text-gold-dim font-light leading-[1.85] mb-4">
        Join our inner circle. Receive early access to new collections, private sales, and curated style guides.
      </p>
      <div className="flex border border-gold/25 overflow-hidden">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 bg-luxury-dark border-none outline-none px-3.5 py-2.5
                 font-sans text-[11px] text-gold tracking-wide
                 placeholder:text-[#4e4538] placeholder:tracking-widest placeholder:text-[10px]"
        />
        <button
          aria-label="Subscribe"
          className="bg-gold px-4 py-2.5 text-luxury-black text-[15px]
                 transition-colors duration-200 hover:bg-gold">
          <i className="ti ti-arrow-right"></i>
        </button>
      </div>
      <p className="text-[10px] text-gold-deep mt-2.5 tracking-wide">
        By subscribing you agree to our Privacy Policy.
      </p>
    </div>
 
  </div>

  {/*//SECTION: footer-top*/}
  <div className="px-8 md:px-12 py-5 flex flex-wrap md:flex-nowrap border-b border-gold/10">
    {promises.map((promise) => <div key={promise.title} className="flex items-center gap-3.5 flex-1 basis-1/2 md:basis-0 px-0 md:px-6 py-2 md:py-0 md:border-r border-gold/10">
      {promise.icon}
      <div>
        <p className="text-[11px] font-semibold text-gold-light uppercase tracking-[0.08em]">{promise.title}</p>
        <p className="text-[10.5px] text-gold-darker font-light mt-0.5">{promise.description}</p>
      </div>
    </div>)}
  </div>

  {/* //SECTION: footer-bottom */}
  <div className="px-8 md:px-12 py-5 flex flex-wrap items-center justify-between gap-3">
    <p className="text-[11px] text-gold-deep tracking-[0.08em]">
      © 2026 <span className="text-gold/60">Ezzyshop</span>. All rights reserved.
    </p>
 
    <nav className="flex gap-6" aria-label="Legal">
      {policies.map((policy) =><Link href={policy.url} key={policy.title} className="text-[10.5px] text-gold-deep uppercase tracking-widest transition-colors duration-200 hover:text-gold-light">{policy.title}</Link>)}
    </nav>
 
    <div className="flex gap-2 items-center" aria-label="Accepted payment methods">
      {paymentCards.map((card) =><span key={card.cardName} className="bg-luxury-card border border-gold/15 px-2.5 py-1 text-[9px] text-gold-dim font-semibold uppercase tracking-[0.12em]">{card.cardName}</span>)}
    </div>
  </div>
</footer>
  )
}
