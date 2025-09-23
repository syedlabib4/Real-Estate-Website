import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full" id="Footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Logo + About */}
        <div className="w-full md:w-1/3">
          <img src={assets.logo_dark} alt="Logo" className="mb-4" />
          <p className="text-gray-400">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><a href="#Header" className="hover:text-white">Home</a></li>
            <li><a href="#About" className="hover:text-white">About Us</a></li>
            <li><a href="#Contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Subscribe to our newsletter</h3>
          <p className="text-gray-400 mb-4 max-w-xs">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none flex-1"
            />
            <button className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-500'>
        Copyright 2024 @ Syed Labib. All Right Reserved.
      </div>
    </div>
  )
}

export default Footer
