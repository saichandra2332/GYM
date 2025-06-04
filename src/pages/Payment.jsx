import React, { useState } from 'react';
import './Payment.css';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import Footer from '../components/Footer';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [membershipType, setMembershipType] = useState('basic');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
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
      image: 'https://via.placeholder.com/150',
      handler: function (response) {
        setIsLoading(false);
        setPaymentSuccess(true);
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
      price: 999,
      features: ['Access to gym equipment', 'Locker facility', '2 Trainer sessions/month'],
      popular: false
    },
    premium: {
      name: 'Premium',
      price: 1999,
      features: ['All Basic features', 'Unlimited trainer sessions', 'Sauna access', 'Nutrition plan'],
      popular: true
    },
    pro: {
      name: 'Pro',
      price: 2999,
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
              <button 
                className="success-button"
                onClick={() => setPaymentSuccess(false)}
              >
                Back to Membership
              </button>
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