import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Menu, 
  X, 
  BarChart3, 
  Droplets, 
  Thermometer, 
  Sun, 
  Wind, 
  Cloud, 
  User, 
  LogOut,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Eye,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Zap,
  CloudRain,
  WifiOff,
  DropletsIcon,
  ShoppingBag,
  Radio,
  Sprout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalPlants: 1247,
    healthyPlants: 1189,
    alerts: 12,
    moisture: 78,
    temperature: 24,
    humidity: 65,
    light: 850,
    windSpeed: 12
  });

  const [recentActivity] = useState([
    { id: 1, type: 'alert', message: 'Low moisture detected in Zone A', time: '2 min ago', severity: 'high' },
    { id: 2, type: 'info', message: 'Temperature optimal in Zone B', time: '15 min ago', severity: 'low' },
    { id: 3, type: 'success', message: 'Irrigation completed in Zone C', time: '1 hour ago', severity: 'low' },
    { id: 4, type: 'warning', message: 'High humidity in Zone D', time: '2 hours ago', severity: 'medium' }
  ]);

  const [plantData] = useState([
    { id: 1, name: 'Tomato Plant A1', status: 'healthy', moisture: 82, temperature: 23, growth: 85 },
    { id: 2, name: 'Lettuce B2', status: 'healthy', moisture: 78, temperature: 24, growth: 92 },
    { id: 3, name: 'Pepper C3', status: 'warning', moisture: 45, temperature: 26, growth: 67 },
    { id: 4, name: 'Basil D4', status: 'healthy', moisture: 89, temperature: 22, growth: 78 }
  ]);


  // Smart recommendations data
  const [recommendations] = useState([
    {
      id: 1,
      title: 'Optimal Irrigation Time',
      status: 'high',
      description: 'Best time to water is in early morning (6-8 AM) to reduce evaporation',
      action: 'Schedule irrigation',
      icon: DropletsIcon
    },
    {
      id: 2,
      title: 'Soil Moisture Level',
      status: 'medium',
      description: 'Soil moisture is optimal',
      action: 'Check sensors',
      icon: Activity
    },
    {
      id: 3,
      title: 'Weather Alert',
      status: 'medium',
      description: 'Rain expected in 2 days, adjust irrigation schedule accordingly',
      action: 'Update schedule',
      icon: CloudRain
    }
  ]);

  // Weather data
  const [weatherData] = useState({
    location: 'Addis Ababa',
    temperature: 24,
    condition: 'Clear Sky',
    humidity: 67,
    isOnline: false
  });

  useEffect(() => {
    // Simulate real-time updates - reduced frequency to prevent shaking
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        moisture: Math.max(0, Math.min(100, prev.moisture + (Math.random() - 0.5) * 1)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 0.2)),
        humidity: Math.max(20, Math.min(90, prev.humidity + (Math.random() - 0.5) * 0.5))
      }));
    }, 10000); // Increased from 3000ms to 10000ms

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, unit, trend, color }: any) => (
    <div className="stat-card">
      <div className="stat-header">
        <div className={`stat-icon ${color}`}>
          <Icon size={24} />
        </div>
        <div className="stat-trend">
          {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className={trend > 0 ? 'positive' : 'negative'}>{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="stat-content">
        <h3>{value}{unit}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }: any) => (
    <div className={`activity-item ${activity.severity}`}>
      <div className="activity-icon">
        {activity.type === 'alert' && <AlertTriangle size={16} />}
        {activity.type === 'info' && <Activity size={16} />}
        {activity.type === 'success' && <CheckCircle size={16} />}
        {activity.type === 'warning' && <AlertTriangle size={16} />}
      </div>
      <div className="activity-content">
        <p>{activity.message}</p>
        <span>{activity.time}</span>
      </div>
    </div>
  );

  const PlantCard = ({ plant }: any) => (
    <div className={`plant-card ${plant.status}`}>
      <div className="plant-header">
        <h4>{plant.name}</h4>
        <div className={`status-indicator ${plant.status}`}></div>
      </div>
      <div className="plant-metrics">
        <div className="metric">
          <Droplets size={16} />
          <span>{plant.moisture}%</span>
        </div>
        <div className="metric">
          <Thermometer size={16} />
          <span>{plant.temperature}°C</span>
        </div>
        <div className="metric">
          <TrendingUp size={16} />
          <span>{plant.growth}%</span>
        </div>
      </div>
    </div>
  );

  const RecommendationCard = ({ recommendation }: any) => (
    <div className={`recommendation-card ${recommendation.status}`}>
      <div className="recommendation-header">
        <div className="recommendation-title">
          <recommendation.icon size={16} />
          <span>{recommendation.title}</span>
        </div>
        <div className={`status-badge ${recommendation.status}`}>
          {recommendation.status}
        </div>
      </div>
      <p className="recommendation-description">{recommendation.description}</p>
      <button className="recommendation-action">
        {recommendation.action}
      </button>
    </div>
  );

  const ChartCard = () => (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <TrendingUp size={20} />
          <span>24-Hour Trends</span>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color moisture"></div>
            <span>Moisture</span>
          </div>
          <div className="legend-item">
            <div className="legend-color temperature"></div>
            <span>Temperature</span>
          </div>
          <div className="legend-item">
            <div className="legend-color humidity"></div>
            <span>Humidity</span>
          </div>
        </div>
        <div className="chart-area">
          <svg viewBox="0 0 400 200" className="area-chart">
            <defs>
              <linearGradient id="moistureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="temperatureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <path 
              d="M 0,150 Q 50,140 100,135 Q 150,130 200,125 Q 250,120 300,115 Q 350,110 400,105 L 400,200 L 0,200 Z" 
              fill="url(#moistureGradient)"
            />
            <path 
              d="M 0,160 Q 50,155 100,150 Q 150,145 200,140 Q 250,135 300,130 Q 350,125 400,120 L 400,200 L 0,200 Z" 
              fill="url(#temperatureGradient)"
            />
            <path 
              d="M 0,170 Q 50,165 100,160 Q 150,155 200,150 Q 250,145 300,140 Q 350,135 400,130 L 400,200 L 0,200 Z" 
              fill="url(#humidityGradient)"
            />
          </svg>
        </div>
        <div className="chart-axis">
          <div className="y-axis">
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );

  const WeatherCard = () => (
    <div className="weather-card">
      <div className="weather-header">
        <h3>Weather Forecast</h3>
      </div>
      <div className="weather-content">
        <div className="weather-location">
          <span>Weather in {weatherData.location}</span>
          {!weatherData.isOnline && <span className="offline-badge">(Offline)</span>}
        </div>
        <div className="weather-main">
          <div className="weather-temp">
            <span className="temperature">{weatherData.temperature}°C</span>
            <span className="condition">{weatherData.condition}</span>
          </div>
          <div className="weather-icon">
            <Sun size={40} />
          </div>
        </div>
        <div className="weather-details">
          <div className="humidity-info">
            <span>Humidity:</span>
            <div className="offline-indicator">
              <WifiOff size={16} />
              <span>Offline Mode</span>
            </div>
          </div>
          <div className="humidity-value">{weatherData.humidity}%</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-container">
              <Leaf className="logo-icon" />
            </div>
            <div className="brand-info">
              <span className="brand-name">Caxora</span>
              <div className="tagline">
                <span>Smart Agriculture</span>
                <Sprout size={12} className="plant-icon" />
              </div>
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
            <nav className="sidebar-nav">
              <motion.button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 size={20} />
                <span>Dashboard</span>
                {activeTab === 'dashboard' && <div className="active-indicator"></div>}
              </motion.button>
              
              <motion.button
                className={`nav-item ${activeTab === 'marketplace' ? 'active' : ''}`}
                onClick={() => setActiveTab('marketplace')}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                <span>Marketplace</span>
              </motion.button>
              
              <motion.button
                className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 size={20} />
                <span>Analytics</span>
              </motion.button>
              
              <motion.button
                className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                onClick={() => setActiveTab('calendar')}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={20} />
                <span>Crop Calendar</span>
              </motion.button>
              
              <motion.button
                className={`nav-item ${activeTab === 'sensors' ? 'active' : ''}`}
                onClick={() => setActiveTab('sensors')}
                whileTap={{ scale: 0.95 }}
              >
                <Radio size={20} />
                <span>Sensors</span>
              </motion.button>
            </nav>
        
        <div className="sidebar-footer">
          <motion.button
            className="logout-btn"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <motion.header
          className="dashboard-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-left">
            <motion.button
              className="menu-btn"
              onClick={() => setSidebarOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
            <div className="header-title">
              <h1>Dashboard</h1>
              <p>Welcome back! Here's what's happening with your plants.</p>
            </div>
          </div>
          
          <div className="header-right">
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </motion.button>
            
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>Export</span>
            </motion.button>
            
            <div className="user-profile">
              <User size={24} />
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            <StatCard
              icon={BarChart3}
              title="Total Plants"
              value={stats.totalPlants}
              unit=""
              trend={5.2}
              color="blue"
            />
            <StatCard
              icon={CheckCircle}
              title="Healthy Plants"
              value={stats.healthyPlants}
              unit=""
              trend={2.1}
              color="green"
            />
            <StatCard
              icon={AlertTriangle}
              title="Active Alerts"
              value={stats.alerts}
              unit=""
              trend={-15.3}
              color="orange"
            />
            <StatCard
              icon={Droplets}
              title="Avg Moisture"
              value={stats.moisture.toFixed(1)}
              unit="%"
              trend={1.8}
              color="blue"
            />
            <StatCard
              icon={Thermometer}
              title="Temperature"
              value={stats.temperature.toFixed(1)}
              unit="°C"
              trend={-0.5}
              color="red"
            />
            <StatCard
              icon={Cloud}
              title="Humidity"
              value={stats.humidity.toFixed(1)}
              unit="%"
              trend={3.2}
              color="purple"
            />
          </div>

          {/* Main Dashboard Area */}
          <div className="dashboard-grid">
            {/* Plant Status */}
            <div className="dashboard-card plants-card">
              <div className="card-header">
                <h3>Plant Status</h3>
                <div className="card-actions">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Filter size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>
              <div className="plants-grid">
                {plantData.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card activity-card">
              <div className="card-header">
                <h3>Recent Activity</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={16} />
                </motion.button>
              </div>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Environmental Data */}
            <div className="dashboard-card environment-card">
              <div className="card-header">
                <h3>Environmental Conditions</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Calendar size={16} />
                </motion.button>
              </div>
              <div className="environment-grid">
                <div className="env-item">
                  <Sun size={24} />
                  <div className="env-data">
                    <h4>{stats.light}</h4>
                    <p>Light (lux)</p>
                  </div>
                </div>
                <div className="env-item">
                  <Wind size={24} />
                  <div className="env-data">
                    <h4>{stats.windSpeed}</h4>
                    <p>Wind (km/h)</p>
                  </div>
                </div>
                <div className="env-item">
                  <MapPin size={24} />
                  <div className="env-data">
                    <h4>Zone A</h4>
                    <p>Location</p>
                  </div>
                </div>
                <div className="env-item">
                  <Zap size={24} />
                  <div className="env-data">
                    <h4>Optimal</h4>
                    <p>Overall Health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Weather Section */}
          <div className="charts-weather-grid">
            <ChartCard />
            <WeatherCard />
          </div>

          {/* Smart Recommendations Section */}
          <div className="recommendations-section">
            <div className="recommendations-header">
              <div className="recommendations-title">
                <Zap size={20} />
                <span>Smart Recommendations</span>
              </div>
            </div>
            <div className="recommendations-grid">
              {recommendations.map((recommendation) => (
                <RecommendationCard 
                  key={recommendation.id} 
                  recommendation={recommendation} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
