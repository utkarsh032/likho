import React from 'react'
import { Link } from 'react-router-dom'
import { FaFeather } from "react-icons/fa";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center group">
      <div className="flex items-center transition-transform duration-200">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600">
          <FaFeather size={20} />
        </div>
        <div className="ml-1 flex items-baseline">
          <span className="font-bold text-2xl text-primary-600">L</span>
          <span className="font-semibold text-lg text-gray-800">ikho.in</span>
        </div>
      </div>
    </Link>
  )
}
