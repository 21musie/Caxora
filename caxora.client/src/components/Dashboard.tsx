import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <motion.div
          className="dashboard-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-left">
            <div className="logo">
              <Leaf className="logo-icon" />
              <span>Caxora</span>
            </div>
          </div>
          <div className="header-right">
            <motion.button 
              className="back-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="back-icon" />
              Back to Home
            </motion.button>
            <motion.button 
              className="logout-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="coming-soon-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="coming-soon-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <Clock size={80} />
          </motion.div>
          
          <motion.h1
            className="coming-soon-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Dashboard Coming Soon
          </motion.h1>
          
          <motion.p
            className="coming-soon-description"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            We're working hard to bring you an amazing plant monitoring dashboard. 
            Stay tuned for updates on your smart farming journey!
          </motion.p>

          <motion.div
            className="features-preview"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h3>What to expect:</h3>
            <div className="features-grid">
              <motion.div
                className="feature-preview"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="feature-icon">📊</div>
                <h4>Real-time Analytics</h4>
                <p>Monitor your plants with live data and insights</p>
              </motion.div>
              
              <motion.div
                className="feature-preview"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <div className="feature-icon">🌱</div>
                <h4>Plant Health</h4>
                <p>Track growth, health, and environmental conditions</p>
              </motion.div>
              
              <motion.div
                className="feature-preview"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <div className="feature-icon">🔔</div>
                <h4>Smart Alerts</h4>
                <p>Get notified about important changes and recommendations</p>
              </motion.div>
              
              <motion.div
                className="feature-preview"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <div className="feature-icon">📱</div>
                <h4>Mobile Access</h4>
                <p>Monitor your farm from anywhere with our mobile app</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="newsletter-signup"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <h3>Get notified when it's ready!</h3>
            <div className="signup-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="email-input"
              />
              <motion.button
                className="notify-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Notify Me
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
