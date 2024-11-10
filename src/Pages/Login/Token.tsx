import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";


const Token = () => {

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (otp.length !== 6) {
        setError('OTP must be 6 digits');
      } else {
        setError('');
        console.log('OTP submitted:', otp);
        // Navigate to the dashboard after OTP submission
        navigate('/dashboard');
      }
    };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-400">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
      <p className="text-center text-gray-600 mb-6">
        Please enter the 6-digit OTP sent to your phone or email.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="password"
            maxLength={6}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : ''
            }`}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-slate-600"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  )
}

export default Token
