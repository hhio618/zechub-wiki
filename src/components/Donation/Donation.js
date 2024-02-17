'use client';
import './donation.css';
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const DonationComp = () => {
  const [donationAmount, setDonationAmount] = useState(1); // Default donation amount in ZEC
  const [memo, setMemo] = useState(''); // Optional memo for the donation

  const predefinedAmounts = [0.25, 0.5, 1.0, 2.5, 5];

  const handleSelectAmount = (amount) => {
    setDonationAmount(amount);
    setMemo(''); // Clear memo when a predefined amount is selected
  };

  const handleChangeAmount = (event) => {
    const value = event.target.value;
    setDonationAmount(value);
    setMemo(value); // Synchronize memo with donation amount
  };

  const handleChangeMemo = (event) => {
    setMemo(event.target.value);
    setDonationAmount(event.target.value); // Synchronize donation amount with memo
  };

  const generateDonationLink = () => {
    const formattedAmount = parseFloat(donationAmount).toFixed(4); // Format amount to four decimal places
    const zcashAddress = 'zcash:u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89'; // Replace 'your_zcash_address_here' with your actual Zcash address
    const zcashDonationLink = `${zcashAddress}?amount=${formattedAmount}&memo=${encodeURIComponent(memo)}`;
    return zcashDonationLink;
  };

  const copyToClipboard = () => {
    const donationLink = generateDonationLink();
    navigator.clipboard.writeText(donationLink).then(() => {
      alert('Donation link copied to clipboard!'); // Optional: Provide feedback to the user that the link has been copied.
    }, (err) => {
      console.error('Could not copy text: ', err); // Optional: Provide error feedback.
    });
  };

  const handleDonateClick = () => {
    const donationLink = generateDonationLink();
    window.location.href = donationLink; // Attempt to open the link with the default wallet application
  };

  return (
    <div className='donation-container'>
      <div className='zcash-image'>
        <img src="../../../../donate.gif" alt="Zcash Donation" />
      </div>

      <div style={{ width: '300px', margin: '20px auto', textAlign: 'center' }}> {/* Adjust the width, margin, and alignment as needed */}
        <QRCode value={generateDonationLink()} size={280} /> {/* Adjust the size as needed */}
        <button onClick={copyToClipboard} style={{ marginTop: '10px', marginRight: '5px' }}>Copy Donation Link</button> {/* Button for copying the link */}
        <button onClick={handleDonateClick} style={{ marginTop: '10px' }}>Open Wallet</button> {/* Button for opening the wallet */}
      </div>

      <div className='donation-slider'>
        <div className='donation-header'>
          <h1>Donate Now</h1>
          <p>The goal of ZecHub is to provide an educational platform where community members can work together on creating, validating, and promoting content that supports the Zcash & Privacy technology ecosystems.</p>
          
          <div className='input-range'>
            <label>Choose your donation amount (ZEC):</label>
            <input
              type="range"
              min="0.25"
              max="5"
              step="0.05"
              value={donationAmount}
              onChange={handleChangeAmount}
              className="slider"
            />
          </div>

          <div className='amount'>
            <p>Amount: {donationAmount} ZEC</p>
          </div>

          <div className='amount-buttons'>
            {predefinedAmounts.map((amount, index) => (
              <button key={index} onClick={() => handleSelectAmount(amount)}>
                {amount} 
              </button>
            ))}
          </div>
          
          <div className='input-number'>
            <label>Enter Amount (ZEC):</label>
            <input
              type="number"
              value={memo}
              placeholder="Enter Amount in ZEC"
              onChange={handleChangeMemo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationComp;