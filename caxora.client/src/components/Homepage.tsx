import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  ArrowLeft, 
  ArrowRight, 
  Bell, 
  Droplets,
  Thermometer,
  DropletsIcon,
  Calendar,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Cloud,
  Sprout,
  BarChart3,
  Trash2,
  Plus,
  Check,
  Smartphone,
  Download
} from 'lucide-react';
import './Homepage.css';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseaseRisk, setDiseaseRisk] = useState('High');
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const diseaseRiskData = [
    { date: 'Mon 10th', risk: 'High', color: '#ef4444' },
    { date: 'Wed 12th', risk: 'High', color: '#ef4444' },
    { date: 'Fri 14th', risk: 'High', color: '#ef4444' },
    { date: 'Mon 17th', risk: 'Medium', color: '#f59e0b' },
    { date: 'Wed 19th', risk: 'Low', color: '#10b981' },
  ];

  const fieldData = {
    temperature: 15.1,
    humidity: 79.0,
    soilTemp5cm: 14.0,
    soilTemp20cm: 13.5,
    lastSpray: '2 days ago',
    nextSpray: 'Tomorrow'
  };

  return (
    <div className="dashboard-container">
      {/* Background Field Image */}
      <div className="field-background">
        <div className="field-overlay" />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Header */}
        <motion.header 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-left">
            <div 
              className="logo"
              onClick={() => navigate('/signup')}
              style={{ cursor: 'pointer' }}
            >
              <Leaf className="logo-icon" />
              <span>Caxora</span>
            </div>
          </div>
          <div className="header-right">
            <motion.button 
              className="login-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>
            <motion.button 
              className="try-free-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
            >
              Try now for free
            </motion.button>
            <button className="menu-btn">
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </motion.header>

        {/* Main Message Section */}
        <motion.div 
          className="main-message"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="main-title">
            <span className="title-white">The time is</span>
            <span className="title-green">now</span>
          </h1>
          <p className="main-description">
            Keep your plants healthy by always monitoring at the right time and with effective means. 
            You're on edge, Caxora puts you on the spot.
          </p>
          <motion.button 
            className="package-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See which package suits you best
          </motion.button>
        </motion.div>

        {/* Mobile Interface Overlay */}
        <motion.div 
          className="mobile-interface"
          initial={{ opacity: 0, x: 50, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1, type: "spring" }}
        >
          <div className="phone-frame">
            {/* Phone Header */}
            <div className="phone-header">
              <ArrowLeft className="header-icon" />
              <div className="phone-logo">
                <Leaf className="phone-logo-icon" />
                <span>Caxora</span>
              </div>
              <ArrowRight className="header-icon" />
            </div>

            {/* Disease Risk Card */}
            <div className="disease-risk-card">
              <h3>Disease Risk</h3>
              <div className="risk-level">
                <span className="risk-text">High</span>
                <span className="risk-subtitle">Phy Danger</span>
              </div>
              <div className="risk-indicators">
                {diseaseRiskData.slice(0, 3).map((item, index) => (
                  <motion.div 
                    key={index}
                    className="risk-dot"
                    style={{ backgroundColor: item.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Notification */}
            <AnimatePresence>
              {showNotification && (
                <motion.div 
                  className="notification"
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ delay: 0.8 }}
                >
                  <Bell className="notification-icon" />
                  <div className="notification-content">
                    <p className="notification-title">Caxora Today a higher disease risk</p>
                    <p className="notification-time">{formatTime(currentTime)}</p>
                  </div>
                  <button className="fungicide-btn">Fungicide</button>
                  <button 
                    className="close-notification"
                    onClick={() => setShowNotification(false)}
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timeline */}
            <div className="timeline">
              <div className="timeline-header">
                <Calendar className="timeline-icon" />
                <span>Spray Schedule</span>
              </div>
              <div className="timeline-items">
                {diseaseRiskData.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="timeline-dot" style={{ backgroundColor: item.color }} />
                    <span className="timeline-date">{item.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Data Fields */}
            <div className="data-fields">
              <div className="data-field">
                <h4>Data Field</h4>
                <p>{formatDate(selectedDate)}</p>
              </div>
              
              <div className="data-field">
                <h4>Crop Climate</h4>
                <div className="climate-data">
                  <div className="climate-item">
                    <Thermometer className="climate-icon" />
                    <span>{fieldData.temperature}°C Temperature</span>
                  </div>
                  <div className="climate-item">
                    <Droplets className="climate-icon" />
                    <span>{fieldData.humidity}% Relative humidity</span>
                  </div>
                </div>
              </div>

              <div className="data-field">
                <h4>Soil</h4>
                <div className="soil-data">
                  <div className="soil-item">
                    <Thermometer className="soil-icon" />
                    <span>{fieldData.soilTemp5cm}°C Temperature at -5 cm</span>
                  </div>
                  <div className="soil-item">
                    <Thermometer className="soil-icon" />
                    <span>{fieldData.soilTemp20cm}°C Temperature at -20 cm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Button */}
          <motion.div 
            className="floating-btn"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span>Try now for free</span>
          </motion.div>
        </motion.div>

        {/* Running Figure Animation */}
        <motion.div 
          className="running-figure"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="runner">
            <div className="runner-body">
              <div className="runner-number">1</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Functionalities Section */}
      <motion.section 
        className="functionalities-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Caxora functionalities</h2>
            <p className="section-subtitle">
              Decision support tools to help you make better choices on your farm.
            </p>
          </motion.div>

          <div className="features-grid">
            {/* Disease Pressure Warning System */}
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">
                <div className="warning-icon">
                  <AlertTriangle className="warning-triangle" />
                </div>
                <div className="microorganism-icon">
                  <div className="micro-body">
                    <div className="micro-center"></div>
                    <div className="micro-spikes">
                      <div className="spike"></div>
                      <div className="spike"></div>
                      <div className="spike"></div>
                      <div className="spike"></div>
                      <div className="spike"></div>
                      <div className="spike"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="feature-title">Disease pressure warning system</h3>
              <p className="feature-description">
                Get insight into disease pressure trends on your field and be well prepared to best protect your crop.
              </p>
            </motion.div>

            {/* SprayEffect Tool */}
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">
                <div className="shield-icon">
                  <Shield className="shield" />
                </div>
                <div className="plants-icon">
                  <Sprout className="plant-1" />
                  <Sprout className="plant-2" />
                  <Sprout className="plant-3" />
                  <div className="soil-base"></div>
                </div>
              </div>
              <h3 className="feature-title">SprayEffect tool</h3>
              <p className="feature-description">
                SprayEffect gives you advice to optimize your crop protection. By spraying at the best time, you can save about 25-30% on your costs.
              </p>
            </motion.div>

            {/* Virtual Weather Station */}
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">
                <div className="weather-station-icon">
                  <div className="station-tower">
                    <div className="station-level">
                      <Leaf className="station-leaf" />
                      <Leaf className="station-leaf" />
                      <Leaf className="station-leaf" />
                    </div>
                    <div className="station-level">
                      <Leaf className="station-leaf" />
                      <Leaf className="station-leaf" />
                      <Leaf className="station-leaf" />
                    </div>
                    <div className="station-level">
                      <Leaf className="station-leaf" />
                      <Leaf className="station-leaf" />
                      <Leaf className="station-leaf" />
                    </div>
                  </div>
                  <div className="station-base">
                    <Plus className="base-plus" />
                  </div>
                </div>
              </div>
              <h3 className="feature-title">Virtual weather station</h3>
              <p className="feature-description">
                Caxora's virtual weather station is an innovative solution that harnesses the power of technology to provide growers like you with crucial, hyper-local weather data. Without hardware, without worry and extremely precise.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Chart Section */}
      <motion.section 
        className="chart-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="chart-container">
          <div className="chart-content">
            <motion.div 
              className="chart-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="chart-title">24/7 insight. 24/7 security. For all growers and crops.</h2>
              <p className="chart-description">
                Caxora suitable for any grower regardless of size or cropping plan. Check out the package that best suits your farm.
              </p>
              <motion.button 
                className="packages-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
              >
                Packages
              </motion.button>
            </motion.div>

            <motion.div 
              className="chart-mockup"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="chart-phone">
                {/* Phone Header */}
                <div className="chart-phone-header">
                  <div className="chart-app-header">
                    <Leaf className="chart-logo" />
                    <span>Caxora</span>
                  </div>
                  <Trash2 className="chart-trash" />
                </div>

                {/* Tabs */}
                <div className="chart-tabs">
                  <div className="tab active">Details</div>
                  <div className="tab">Overview</div>
                </div>

                {/* Effect and Circumstances */}
                <div className="effect-circumstances">
                  <div className="effect-row">
                    <div className="color-square orange"></div>
                    <div className="color-square green"></div>
                    <div className="color-square red"></div>
                    <div className="color-square red"></div>
                    <span className="label">Effect</span>
                  </div>
                  <div className="circumstances-row">
                    <div className="tractor-icon green"></div>
                    <div className="tractor-icon green"></div>
                    <div className="tractor-icon orange"></div>
                    <div className="tractor-icon red"></div>
                    <span className="label">Circumstances</span>
                  </div>
                </div>

                {/* Notification */}
                <div className="chart-notification">
                  <Leaf className="notification-leaf" />
                  <div className="notification-content">
                    <span className="notification-app">Caxora</span>
                    <span className="notification-time">9:41 AM</span>
                  </div>
                  <p className="notification-message">Higher disease pressure today</p>
                </div>

                {/* Chart */}
                <div className="chart-visualization">
                  <div className="chart-bars">
                    {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4].map((hour, index) => (
                      <div 
                        key={index}
                        className={`chart-bar ${hour >= 14 && hour <= 21 ? 'blue' : hour === 22 ? 'green' : hour === 23 ? 'orange' : 'red'}`}
                        style={{ height: `${Math.random() * 60 + 20}px` }}
                      />
                    ))}
                  </div>
                  <div className="chart-tractors">
                    {[23, 0, 1, 2, 3, 4].map((hour, index) => (
                      <div key={index} className="chart-tractor red" />
                    ))}
                  </div>
                  <div className="chart-x-axis">
                    {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4].map((hour, index) => (
                      <span key={index} className="axis-label">
                        {hour}
                        {hour === 0 && <span className="week-label">WE</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Labels */}
                <div className="bottom-labels">
                  <div className="bottom-item">
                    <span>FLIPPER</span>
                    <Trash2 className="item-trash" />
                  </div>
                  <div className="bottom-item">
                    <span>Biostimulants</span>
                    <Trash2 className="item-trash" />
                  </div>
                </div>
              </div>

              {/* Floating Try Now Button */}
              <motion.button 
                className="chart-try-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/signup')}
              >
                Try now for free
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        className="pricing-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="pricing-container">
          <motion.div 
            className="pricing-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="pricing-title">
              Choose the package <span className="highlight">that suits</span> you
            </h2>
            <p className="pricing-subtitle">
              How many plots do you want to manage with Caxora? Thanks to Caxora's flexible packages, there is always one suitable for your farm! As low as €14.99 per month.
            </p>
          </motion.div>

          <div className="pricing-cards">
            {/* Small Farm */}
            <motion.div 
              className="pricing-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="package-title">Small farm</h3>
              <div className="package-price">€14.99 <span>/per month</span></div>
              <motion.button 
                className="package-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
              >
                Getting Started
              </motion.button>
              <div className="package-features">
                <div className="feature-item">
                  <Check className="feature-check" />
                  <span>All the functionalities of the Caxora platform for 1 plot</span>
                </div>
              </div>
            </motion.div>

            {/* Standard Farm - Most Popular */}
            <motion.div 
              className="pricing-card popular"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="popular-badge">Most popular</div>
              <h3 className="package-title">Standard farm</h3>
              <div className="package-price">€29.99 <span>/per month</span></div>
              <motion.button 
                className="package-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
              >
                Getting Started
              </motion.button>
              <div className="package-features">
                <div className="feature-item">
                  <Check className="feature-check" />
                  <span>All functionalities of Caxora for up to 5 plots</span>
                </div>
              </div>
            </motion.div>

            {/* Large Farm */}
            <motion.div 
              className="pricing-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="package-title">Large farm</h3>
              <div className="package-price">€49.99 <span>/per month</span></div>
              <motion.button 
                className="package-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
              >
                Getting Started
              </motion.button>
              <div className="package-features">
                <div className="feature-item">
                  <Check className="feature-check" />
                  <span>All functionalities of Caxora for unlimited plots</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="features-container">
          <motion.h2 
            className="features-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Included in each package
          </motion.h2>

          <div className="features-grid">
            {/* Virtual Weather Station */}
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-top">
                  <BarChart3 className="icon" />
                </div>
                <div className="feature-icon-bottom">
                  <Cloud className="icon" />
                </div>
              </div>
              <h3 className="feature-name">Virtual weather station</h3>
              <p className="feature-desc">Accurate weather data (Temperature/RH/ precipitation, leaf wet periods, etc) at plot level.</p>
            </motion.div>

            {/* Sprayer Planner */}
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-top">
                  <Calendar className="icon" />
                </div>
                <div className="feature-icon-bottom">
                  <Activity className="icon" />
                </div>
              </div>
              <h3 className="feature-name">Sprayer planner</h3>
              <p className="feature-desc">Integrated spray planner for optimal spraying effect.</p>
            </motion.div>

            {/* Sensors */}
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-top">
                  <Check className="icon" />
                </div>
                <div className="feature-icon-bottom">
                  <Thermometer className="icon" />
                </div>
              </div>
              <h3 className="feature-name">Sensors</h3>
              <p className="feature-desc">Easily links to weather stations (FieldMate, Sencrop, Agroexact, et al.).</p>
            </motion.div>

            {/* Disease Pressure */}
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-top">
                  <AlertTriangle className="icon" />
                </div>
                <div className="feature-icon-bottom">
                  <div className="microorganism-icon">
                    <div className="micro-body">
                      <div className="micro-center"></div>
                      <div className="micro-spikes">
                        <div className="spike"></div>
                        <div className="spike"></div>
                        <div className="spike"></div>
                        <div className="spike"></div>
                        <div className="spike"></div>
                        <div className="spike"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="feature-name">Disease pressure</h3>
              <p className="feature-desc">Disease warning system for more than 65 crops and 165 different diseases.</p>
            </motion.div>

            {/* SmartFarm App */}
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-top">
                  <Check className="icon" />
                </div>
                <div className="feature-icon-bottom">
                  <Smartphone className="icon" />
                </div>
              </div>
              <h3 className="feature-name">Caxora app for Android, iOS and web</h3>
              <p className="feature-desc">Quick and easy to use anywhere.</p>
            </motion.div>

            {/* Alerts */}
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-top">
                  <AlertTriangle className="icon" />
                </div>
                <div className="feature-icon-bottom">
                  <Bell className="icon" />
                </div>
              </div>
              <h3 className="feature-name">Alerts</h3>
              <p className="feature-desc">Set alerts and get automatic updates when a parameter reaches your set value.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer 
        className="footer-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-header">
              <div className="footer-logo">
                <Leaf className="footer-logo-icon" />
                <span>Caxora</span>
              </div>
              <p className="footer-tagline">Healthy fields, better yields</p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-title">Solutions</h4>
                <ul className="footer-list">
                  <li><a href="#">To measure is to know</a></li>
                  <li><a href="#">Drought and the agricultural sector</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-title">Products</h4>
                <ul className="footer-list">
                  <li><a href="#">Platform</a></li>
                  <li><a href="#">Spray Effect</a></li>
                  <li><a href="#">Disease alert system</a></li>
                  <li><a href="#">Virtual weather station</a></li>
                  <li><a href="#">Caxora Sensor</a></li>
                  <li><a href="#">Caxora App</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-title">Knowledge center</h4>
                <ul className="footer-list">
                  <li><a href="#">Knowledge Center</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-title">Stay informed and sign up for our newsletter</h4>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="E-mail*" 
                    className="newsletter-input"
                  />
                  <motion.button 
                    className="newsletter-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="download-section">
                <h4 className="download-title">Download the app</h4>
                <div className="app-badges">
                  <div className="app-badge">
                    <Download className="badge-icon" />
                    <div className="badge-text">
                      <span className="badge-small">Download on the</span>
                      <span className="badge-large">App Store</span>
                    </div>
                  </div>
                  <div className="app-badge">
                    <Download className="badge-icon" />
                    <div className="badge-text">
                      <span className="badge-small">GET IT ON</span>
                      <span className="badge-large">Google Play</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Homepage;
