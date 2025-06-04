import React, { useState } from 'react';
import './Payment.css';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';
import { jsPDF } from 'jspdf';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [membershipType, setMembershipType] = useState('basic');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 const generateReceipt = async () => {
  // Create new PDF document
  const doc = new jsPDF();

  // Color scheme
  const primaryColor = '#4a6bff';
  const secondaryColor = '#6c757d';
  const lightColor = '#f8f9fa';
  const darkColor = '#343a40';

  try {
    // Load logo from public folder
    const response = await fetch('/Logo Gym.jpg');
    if (!response.ok) throw new Error('Failed to fetch logo');
    const blob = await response.blob();
    const logoData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    
    // Add logo to PDF (positioned before the header)
    doc.addImage(logoData, 'JPEG', 15, 5, 30, 15);
  } catch (error) {
    console.warn('Could not load logo:', error);
    // Continue without logo if there's an error
  }

  // Set document properties
  doc.setProperties({
    title: `Fitness Guru Gym Receipt - ${membershipPlans[membershipType].name} Membership`,
    subject: 'Payment Receipt',
    author: 'Fitness Guru Gym',
    keywords: 'gym, membership, receipt, payment',
    creator: 'Fitness Guru Gym'
  });

  // Add header with background
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('FITNESS GURU GYM', 105, 20, { align: 'center' });

  // Add receipt title
  doc.setFontSize(16);
  doc.setTextColor(darkColor);
  doc.text('MEMBERSHIP PAYMENT RECEIPT', 105, 45, { align: 'center' });

  // Add receipt details section
  doc.setFillColor(lightColor);
  doc.rect(20, 55, 170, 15, 'F');
  doc.setFontSize(12);
  doc.setTextColor(darkColor);
  doc.text('Receipt Details', 25, 65);

  // Member information
  doc.setFontSize(10);
  doc.text(`Member Name: Sai Chandra`, 25, 80);
  doc.text(`Member ID: FG${Math.floor(1000 + Math.random() * 9000)}`, 25, 87);
  doc.text(`Email: sai@example.com`, 25, 94);
  doc.text(`Phone: 9876543210`, 25, 101);
  doc.text(`Joining Date: ${new Date().toLocaleDateString()}`, 25, 108);

  // Add line separator
  doc.setDrawColor(200);
  doc.line(20, 115, 190, 115);

  // Membership details
  doc.setFontSize(12);
  doc.setTextColor(darkColor);
  doc.text('Membership Plan', 25, 125);
  
  doc.setFontSize(10);
  doc.text(`Plan: ${membershipPlans[membershipType].name}`, 25, 133);
  doc.text(`Duration: 1 Month`, 25, 140);
  doc.text(`Activation Date: ${new Date().toLocaleDateString()}`, 25, 147);
  doc.text(`Expiry Date: ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}`, 25, 154);

  // Features included
  doc.setFontSize(12);
  doc.text('Plan Features:', 110, 125);
  doc.setFontSize(10);
  let yPosition = 133;
  membershipPlans[membershipType].features.forEach(feature => {
    doc.text(`✓ ${feature}`, 110, yPosition);
    yPosition += 7;
  });

  // Add line separator
  doc.line(20, 160, 190, 160);

  // Payment summary table
  doc.setFontSize(12);
  doc.setTextColor(darkColor);
  doc.text('Payment Summary', 25, 170);

  // Table header
  doc.setFillColor(primaryColor);
  doc.rect(25, 175, 160, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('Description', 30, 180);
  doc.text('Amount (₹)', 150, 180, { align: 'right' });

  // Base price row
  doc.setFillColor(lightColor);
  doc.rect(25, 183, 160, 8, 'F');
  doc.setTextColor(darkColor);
  doc.text(`${membershipPlans[membershipType].name} Membership Fee`, 30, 188);
  doc.text(membershipPlans[membershipType].price.toFixed(2), 150, 188, { align: 'right' });

  // GST row
  doc.rect(25, 191, 160, 8, 'F');
  doc.text('GST @18%', 30, 196);
  const gst = membershipPlans[membershipType].price * 0.18;
  doc.text(gst.toFixed(2), 150, 196, { align: 'right' });

  // Total row
  doc.setFillColor(secondaryColor);
  doc.rect(25, 199, 160, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('Total Payable', 30, 204);
  const total = membershipPlans[membershipType].price + gst;
  doc.text(total.toFixed(2), 150, 204, { align: 'right' });

  // Payment details
  doc.setFontSize(10);
  doc.setTextColor(darkColor);
  if (paymentDetails) {
    doc.text(`Payment ID: ${paymentDetails.razorpay_payment_id}`, 25, 220);
    doc.text(`Payment Date: ${new Date().toLocaleString()}`, 25, 227);
    doc.text(`Payment Method: Razorpay (Credit/Debit Card)`, 25, 234);
  }

  // Terms and conditions
  doc.setFontSize(8);
  doc.setTextColor(secondaryColor);
  doc.text('Terms & Conditions:', 25, 245);
  doc.text('1. This membership is non-transferable and non-refundable.', 25, 250);
  doc.text('2. Membership will auto-renew unless cancelled 7 days before expiry.', 25, 255);
  doc.text('3. Gym rules and regulations must be followed at all times.', 25, 260);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(primaryColor);
  doc.text('Thank you for choosing Fitness Guru Gym!', 105, 275, { align: 'center' });
  doc.setTextColor(secondaryColor);
  doc.text('For any queries, contact: support@fitnessgurugym.com | Phone: 1800-123-4567', 105, 280, { align: 'center' });
  doc.text('Address: 123 Fitness Street, Hyderabad, Telangana - 500001', 105, 285, { align: 'center' });

  // Save PDF with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  doc.save(`FitnessGuru_Receipt_${membershipPlans[membershipType].name}_${timestamp}.pdf`);
};

  const handlePayment = async () => {
    setIsLoading(true);
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      alert('Razorpay SDK failed to load');
      setIsLoading(false);
      return;
    }

    const amount = membershipPlans[membershipType].price * 100;
    
    const options = {
      key: 'rzp_test_X0ttERlr0afucZ',
      amount: amount,
      currency: 'INR',
      name: 'Fitness Guru Gym',
      description: `${membershipPlans[membershipType].name} Membership Payment`,
      image: '/Logo Gym.jpg',
      handler: function (response) {
        setIsLoading(false);
        setPaymentSuccess(true);
        setPaymentDetails(response);
        generateReceipt(); // Automatically generate and download receipt
        console.log(response);
      },
      prefill: {
        name: 'Sai Chandra',
        email: 'sai@example.com',
        contact: '9876543210',
      },
      notes: {
        address: 'Gym HQ, Hyderabad',
        membership_type: membershipType
      },
      theme: {
        color: '#4a6bff',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      setIsLoading(false);
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp.open();
  };

  const membershipPlans = {
  basic: {
    name: 'Basic',
    price: 999,  // ₹999
    features: ['Access to gym equipment', 'Locker facility', '2 Trainer sessions/month'],
    popular: false
  },
  premium: {
    name: 'Premium',
    price: 1999,  // ₹1999
    features: ['All Basic features', 'Unlimited trainer sessions', 'Sauna access', 'Nutrition plan'],
    popular: true
  },
  pro: {
    name: 'Pro',
    price: 2999,  // ₹2999
    features: ['All Premium features', 'Personal trainer', 'Diet consultation', 'Spa access'],
    popular: false
  }
};
  if (paymentSuccess) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="d-flex flex-grow-1">
          <LeftMenu />
          <div className="container mt-4 flex-grow-1">
            <div className="success-container">
              <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <h2 className="success-title">Payment Successful!</h2>
              <p className="success-message">Welcome to Fitness Guru Gym! Your {membershipPlans[membershipType].name} membership is now active.</p>
              <div className="success-buttons">
                <button 
                  className="success-button"
                  onClick={() => generateReceipt()}
                >
                  Download Receipt Again
                </button>
                <button 
                  className="success-button secondary"
                  onClick={() => setPaymentSuccess(false)}
                >
                  Back to Membership
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-grow-1">
        <LeftMenu />
        <div className="container mt-4 flex-grow-1">
          <div className="payment-container">
            <div className="payment-header">
              <h1 className="payment-title">Join Fitness Guru Gym</h1>
              <p className="payment-subtitle">Transform your body, transform your life</p>
            </div>
            
            <div className="membership-plans">
              {Object.keys(membershipPlans).map((plan) => (
                <div 
                  key={plan} 
                  className={`plan-card ${membershipType === plan ? 'active' : ''} ${membershipPlans[plan].popular ? 'popular' : ''}`}
                  onClick={() => setMembershipType(plan)}
                >
                  {membershipPlans[plan].popular && <div className="popular-badge">Most Popular</div>}
                  <h3 className="plan-name">{membershipPlans[plan].name}</h3>
                  <div className="plan-price">₹{membershipPlans[plan].price}<span>/month</span></div>
                  <ul className="plan-features">
                    {membershipPlans[plan].features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="payment-actions">
              <button 
                onClick={handlePayment} 
                className="payment-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  `Get ${membershipPlans[membershipType].name} Membership`
                )}
              </button>
            </div>
            
            <div className="payment-benefits">
              <h3>Why Choose Fitness Guru Gym?</h3>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">💪</div>
                  <h4>World-Class Equipment</h4>
                  <p>State-of-the-art machines for all your fitness needs</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🧘</div>
                  <h4>Expert Trainers</h4>
                  <p>Certified professionals to guide your fitness journey</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🥗</div>
                  <h4>Nutrition Plans</h4>
                  <p>Customized diet plans to complement your workouts</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🏆</div>
                  <h4>Proven Results</h4>
                  <p>Thousands of success stories from our members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;