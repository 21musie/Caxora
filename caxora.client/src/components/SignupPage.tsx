import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Monitor, 
  Smartphone, 
  CreditCard, 
  ArrowRight, 
  Check,
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle
} from 'lucide-react';
import { authService, SignupRequest } from '../services/authService';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const signupData: SignupRequest = {
        email: email.trim(),
        password: password.trim()
      };

      const response = await authService.signup(signupData);
      
      if (response.success) {
        setIsSuccess(true);
        // Reset form
        setEmail('');
        setPassword('');
        
            // Redirect to dashboard after success
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
      } else {
        setError(response.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      icon: Monitor,
      title: "Create your account",
      description: "Try our platform free for 10 days.",
      color: "#10b981"
    },
    {
      icon: Smartphone,
      title: "Download the app",
      description: "Get started directly",
      color: "#3b82f6"
    },
    {
      icon: CreditCard,
      title: "Decide after 10 days",
      description: "Convinced? Only then you select a payment plan!",
      color: "#8b5cf6"
    }
  ];

  return (
    <div className="signup-container">
      <motion.div 
        className="signup-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Leaf className="logo-icon" />
            <span>Caxora</span>
          </motion.div>
        </motion.div>

        <div className="signup-content">
          {/* Left Side - Form */}
          <motion.div 
            className="form-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div 
              className="banner"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="banner-text">10 days free</span>
            </motion.div>

            <motion.h1 
              className="form-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Create your free account to get started
            </motion.h1>

            <motion.p 
              className="form-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Just like that, you can get started right away with your 10-day free trial!
            </motion.p>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  className="signup-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {error && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="error-icon" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  <motion.div 
                    className="input-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="input-wrapper">
                      <Mail className="input-icon" />
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="input-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <div className="input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Choose your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        className="loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        Start your trial period
                        <ArrowRight className="button-icon" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="success-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <Check />
                  </motion.div>
                  <h3>Welcome to Caxora!</h3>
                  <p>Your plant health monitoring account has been created successfully. You can now start your 10-day free trial!</p>
                </motion.div>
              )}
            </AnimatePresence>

                  <motion.p
                    className="login-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                  >
                    Do you already have an account? <a href="/login" className="link">Login</a>
                  </motion.p>
            
            <motion.div 
              className="demo-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <button 
                className="demo-btn"
                onClick={() => navigate('/')}
              >
                Back to Homepage
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Steps */}
          <motion.div 
            className="steps-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.h2 
              className="steps-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Start your free trial period
            </motion.h2>

            <div className="steps-list">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="step-item"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <motion.div 
                      className="step-icon"
                      style={{ backgroundColor: step.color }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent />
                    </motion.div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background decorations */}
      <motion.div 
        className="bg-decoration bg-decoration-1"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="bg-decoration bg-decoration-2"
        animate={{ 
          rotate: -360,
          scale: [1.1, 1, 1.1]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
};

export default SignupPage;
