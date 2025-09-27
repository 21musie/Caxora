# Caxora Client - Plant Health Monitoring Frontend

A beautiful, animated React frontend for the Caxora plant health monitoring system.

## Features

✨ **Modern UI/UX**
- Beautiful gradient backgrounds and glass-morphism effects
- Smooth animations using Framer Motion
- Responsive design that works on all devices
- Professional signup page inspired by modern SaaS applications

🎨 **Animations & Interactions**
- Page load animations with staggered elements
- Hover effects and micro-interactions
- Loading states and success animations
- Rotating background decorations

🔐 **Authentication Integration**
- Signup form with email and password validation
- Integration with Caxora backend API
- Error handling and user feedback
- Success states and form validation

📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interactions
- Adaptive typography and spacing

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **CSS3** - Modern styling with gradients and backdrop filters

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── SignupPage.tsx      # Main signup page component
│   └── SignupPage.css      # Signup page styles
├── services/
│   └── authService.ts      # Backend API integration
├── App.tsx                 # Main app component
├── App.css                 # Global styles
└── main.tsx               # React entry point
```

## Backend Integration

The frontend is configured to connect to the Caxora backend API. Update the `API_BASE_URL` in `src/services/authService.ts` to match your backend server URL.

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile

## Customization

### Colors and Branding

Update the CSS custom properties in `App.css` and `SignupPage.css` to match your brand:

```css
/* Primary colors */
--primary-green: #10b981;
--primary-purple: #8b5cf6;
--primary-blue: #3b82f6;
```

### Animations

Modify animation parameters in `SignupPage.tsx`:

```typescript
// Adjust animation duration and delays
transition={{ duration: 0.8, ease: "easeOut" }}
transition={{ delay: 0.3, duration: 0.8 }}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

### Adding New Features

1. Create new components in the `components/` directory
2. Add styles in corresponding `.css` files
3. Update the main `App.tsx` to include new routes/pages
4. Extend the `authService.ts` for new API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Caxora plant health monitoring system.
