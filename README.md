# 🌾 AgriWise - Crop Advisory Platform

<<<<<<< HEAD
Smart India Hackathon 2025 · Collaborative Crop Advisory & Market Intelligence Portal

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://agriwise-sih.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

AgriWise is a next-generation, role-based decision support system that empowers farmers, agricultural experts, and policy stakeholders with actionable intelligence. It blends agronomic expertise, AI-powered insights, and real-time market intelligence into a cohesive experience built for India’s diverse farming communities.

---

## 🎯 Problem Statement

Indian agriculture faces persistent structural challenges:

- **Information asymmetry** leading to suboptimal crop planning and input usage.
- **Delayed pest & disease detection** causing crop loss and excessive pesticide use.
- **Volatile market prices** preventing farmers from realizing fair value.
- **Digital and linguistic divide** that limits adoption of existing digital tools.

## 🌱 Our Solution

AgriWise offers modular dashboards tailored to each stakeholder, delivering:

- Personalized crop, soil, and risk advisories.
- AI-assisted pest and disease detection with expert validation loops.
- Real-time market intelligence with configurable alerts and forecasting.
- Inclusive, multilingual, and voice-enabled interfaces for frictionless adoption.

---

## 🧭 System Architecture

```mermaid
graph TD
    Farmer((Farmer App)) -->|Soil, Crop, Image Data| FarmerDashboard
    FarmerDashboard --> AdvisoryEngine
    FarmerDashboard --> PestModule
    FarmerDashboard --> MarketModule
    AdvisoryEngine -->|Context-aware insights| FarmerDashboard
    PestModule --> VisionAI
    VisionAI --> KnowledgeBase
    MarketModule --> MarketDataAPI
    Expert((Agri Expert)) --> ExpertWorkspace
    ExpertWorkspace --> AdvisoryEngine
    Government((Agri Dept.)) --> PolicyDashboard
    PolicyDashboard --> MarketModule
    Notifications((Voice & SMS Gateway)) --> FarmerDashboard
    Notifications --> ExpertWorkspace
```

### Platform Layers

- **Experience Layer**: Farmer dashboard, expert workspace, and policy dashboard with responsive UI and accessibility enhancements.
- **Intelligence Layer**: AI/ML models for pest detection, recommendation engines, and rule-based advisory flows.
- **Data Layer**: Soil datasets, weather feeds, satellite imagery, and market price APIs.
- **Integration Layer**: Secure APIs, webhooks, and messaging for alerts and collaborative workflows.

## 🔄 End-to-End Data Flow

```mermaid
sequenceDiagram
    participant Farmer as Farmer
    participant App as AgriWise App
    participant AI as AI Services
    participant Expert as Expert Portal
    participant Market as Market APIs

    Farmer->>App: Submit soil details & pest images
    App->>AI: Analyze soil and detect pests
    AI-->>App: Insights, risk flags, treatment options
    App-->>Farmer: Personalized advisory dashboard
    App->>Expert: Escalate complex cases for review
    Expert-->>App: Validated recommendations & follow-up plan
    Market->>App: Real-time commodity prices
    App-->>Farmer: Alerts, forecasts, and selling guidance
```

## 🧩 Feature Suite

| Persona | Experience Highlights | Value Delivered |
| --- | --- | --- |
| **Farmers** | Voice-enabled navigation, localized language support, AI pest detection, market alerts | Reduced crop risk and higher profitability |
| **Experts** | Collaborative case management, treatment libraries, dynamic reporting | Faster advisory turnaround and knowledge sharing |
| **Government/Policy** | Macro dashboards, regional heatmaps, alert systems | Data-driven policy actions and targeted interventions |

---

## 📸 Visual Walkthrough

![AgriWise Farmer Dashboard](public/placeholder.jpg)
*Figure: Farmer cockpit combining crop health, weather, and market intelligence.*

![AgriWise Market Module](public/placeholder.svg)
*Figure: Real-time price tracking with AI-powered recommendations.*

Replace the placeholders above with actual screenshots before submission.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI/UX**: Tailwind CSS, Shadcn/UI, Lucide Icons, Framer Motion
- **Data & Analytics**: Recharts, custom hooks, modular state management
- **AI Integrations**: Image classification pipeline, rule-based advisory engine (extensible)
- **Infrastructure**: Deployed on Vercel with edge-ready optimizations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation & Development

1. Clone the repository:

   ```bash
   git clone https://github.com/debdyuti005/AgriWise.git
   cd AgriWise
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the local development server:

   ```bash
   pnpm dev
   ```

4. Visit the app at:

   ```text
   http://localhost:3000
   ```

### Production Deployment

The project is continuously deployed on Vercel: [https://agriwise-sih.vercel.app/](https://agriwise-sih.vercel.app/)

---

## 📅 Roadmap Highlights

- [ ] Integrate satellite-derived vegetation indices (NDVI) for early stress detection.
- [ ] Add offline-first progressive web app (PWA) support for low-connectivity regions.
- [ ] Expand language coverage to 12+ Indian languages with regional voice packs.
- [ ] Integrate market linkage APIs for direct procurement channels.
- [ ] Release mobile companion app for Android devices.

---

## 👤 Maintainer

- **Debdyuti Mondal** — [GitHub](https://github.com/debdyuti005)

## 📄 License

This project is released under the MIT License. See [LICENSE](LICENSE) for full terms.

=======
<div align="center">

**A next-generation, role-based crop advisory platform empowering farmers, experts, and stakeholders with intelligent, collaborative decision support.**

*Built for Smart India Hackathon (SIH) 2025*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/debdyuti-mondals-projects/agriwise)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://vercel.com/debdyuti-mondals-projects/agriwise) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/debdyuti005/Crop-Advisory/issues) • [💡 Feature Request](https://github.com/debdyuti005/Crop-Advisory/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Roles & Dashboards](#user-roles--dashboards)
- [Features Overview](#features-overview)
- [API Reference](#api-reference)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Support & Contact](#support--contact)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About the Project

AgriWise is a comprehensive **Collaborative Crop Advisory & Market Intelligence Portal** designed to revolutionize agricultural decision-making in India. Built as part of Smart India Hackathon 2025, this platform bridges the gap between farmers and agricultural experts through intelligent, data-driven solutions.

### 🌟 Vision
To create an accessible, multilingual, and AI-powered agricultural ecosystem that empowers farmers with real-time insights, expert guidance, and market intelligence for sustainable farming practices.

### 🎯 Mission
- **Empower Farmers**: Provide easy-to-use tools for crop management, pest detection, and market insights
- **Enable Collaboration**: Connect farmers with agricultural experts and government officials
- **Promote Accessibility**: Break language and literacy barriers with multilingual and voice support
- **Drive Intelligence**: Leverage AI and real-time data for actionable agricultural insights

---

## ✨ Key Features

### 🎭 **Role-Based Access Control**
- **Farmers**: Comprehensive crop advisory, pest detection, market tracking
- **Agricultural Officers**: Field monitoring, advisory management, resource allocation
- **Government Officials**: Policy insights, regional analytics, scheme management
- **NGOs**: Community outreach, training programs, impact tracking
- **Startups**: Innovation partnerships, technology integration

### 🤖 **AI-Powered Intelligence**
- **Smart Pest & Disease Detection**: Upload crop images for instant AI analysis
- **Market Price Predictions**: AI-driven price forecasting and trend analysis
- **Personalized Recommendations**: Customized advisory based on location, crop type, and season
- **Yield Optimization**: Data-driven suggestions for maximizing crop productivity

### 🌐 **Accessibility & Inclusion**
- **Multilingual Support**: Interface available in multiple Indian languages
- **Voice Commands**: Voice-enabled navigation and input for enhanced accessibility
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Offline Capabilities**: Essential features work without internet connectivity

### 📊 **Real-Time Analytics**
- **Weather Integration**: Live weather data and alerts
- **Market Price Tracking**: Real-time commodity prices from major markets
- **Crop Health Monitoring**: Satellite imagery and IoT sensor integration
- **Performance Dashboards**: Comprehensive analytics for all stakeholders

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 14, TypeScript, React 18 |
| **Styling** | Tailwind CSS, Shadcn/UI, Framer Motion |
| **UI Components** | Radix UI, Lucide Icons, React Hook Form |
| **Charts & Visualization** | Recharts, Chart.js |
| **State Management** | React Context, Zustand |
| **Authentication** | NextAuth.js, JWT |
| **Database** | Prisma, PostgreSQL |
| **File Storage** | Cloudinary, AWS S3 |
| **Deployment** | Vercel, Docker |
| **Monitoring** | Vercel Analytics, Sentry |

</div>

---

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

```bash
Node.js 18.x or higher
pnpm, npm, or yarn
Git
```

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/debdyuti005/Crop-Advisory.git
   cd Crop-Advisory
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   # Add other environment variables as needed
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### 🐳 Docker Setup (Optional)

```bash
# Build the Docker image
docker build -t agriwise .

# Run the container
docker run -p 3000:3000 agriwise
```

---

## 📁 Project Structure

```
Crop-Advisory/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Authentication routes
│   ├── 📁 dashboard/                # Role-based dashboards
│   │   ├── 📁 farmer/               # Farmer dashboard
│   │   ├── 📁 govt/                 # Government dashboard
│   │   ├── 📁 ngo/                  # NGO dashboard
│   │   ├── 📁 officer/              # Officer dashboard
│   │   └── 📁 startup/              # Startup dashboard
│   ├── 📁 analytics/                # Analytics pages
│   ├── 📁 chatbot/                  # AI Chatbot interface
│   ├── 📁 market-price/             # Market price tracking
│   ├── 📁 pest-detection/           # Pest detection module
│   ├── 📁 soil-health/              # Soil health analysis
│   ├── 📁 weather/                  # Weather information
│   └── 📄 layout.tsx                # Root layout
├── 📁 components/                   # React components
│   ├── 📁 ui/                       # Reusable UI components
│   ├── 📁 dashboard/                # Dashboard components
│   ├── 📁 auth/                     # Authentication components
│   └── 📁 [feature]/                # Feature-specific components
├── 📁 lib/                          # Utility functions
├── 📁 hooks/                        # Custom React hooks
├── 📁 styles/                       # Global styles
├── 📁 public/                       # Static assets
└── 📄 package.json                  # Dependencies and scripts
```

---

## 👥 User Roles & Dashboards

### 🧑‍🌾 **Farmer Dashboard**
- **Crop Advisory**: Personalized farming recommendations
- **Pest Detection**: AI-powered image analysis for pest identification
- **Market Prices**: Real-time commodity prices and trends
- **Weather Updates**: Localized weather forecasts and alerts
- **Expert Consultation**: Direct communication with agricultural experts

### 👨‍💼 **Agricultural Officer Dashboard**
- **Field Monitoring**: Regional crop health and progress tracking
- **Resource Management**: Distribution of seeds, fertilizers, and equipment
- **Training Programs**: Schedule and manage farmer education sessions
- **Scheme Implementation**: Government scheme enrollment and monitoring

### 🏛️ **Government Official Dashboard**
- **Policy Analytics**: Data-driven insights for policy formulation
- **Regional Reports**: Comprehensive agricultural statistics
- **Scheme Performance**: Track effectiveness of government initiatives
- **Budget Allocation**: Resource planning and distribution analysis

### 🤝 **NGO Dashboard**
- **Community Outreach**: Farmer engagement and support programs
- **Impact Tracking**: Measure success of intervention programs
- **Training Management**: Educational content and workshop organization
- **Partnership Coordination**: Collaborate with government and startups

### 🚀 **Startup Dashboard**
- **Innovation Hub**: Showcase agricultural technologies
- **Partnership Opportunities**: Connect with farmers and government
- **Technology Integration**: API access for third-party solutions
- **Market Analysis**: Identify opportunities for agricultural innovation

---

## 🔍 Features Overview

### 🐛 **Pest & Disease Detection**
- **AI-Powered Analysis**: Upload crop images for instant pest identification
- **Treatment Recommendations**: Get specific treatment protocols and remedies
- **Detection History**: Track pest occurrences and treatment effectiveness
- **Expert Consultation**: Connect with entomologists for complex cases

### 📈 **Market Price Tracking**
- **Real-Time Prices**: Live commodity prices from major agricultural markets
- **Price Alerts**: Customizable notifications for price changes
- **Trend Analysis**: Historical price data and predictive analytics
- **Profit Calculator**: Estimate profits based on current market rates

### 🌡️ **Weather Intelligence**
- **Hyperlocal Forecasts**: Accurate weather predictions for specific farm locations
- **Agricultural Alerts**: Warnings for adverse weather conditions
- **Irrigation Planning**: Water management recommendations based on weather
- **Seasonal Advisory**: Long-term weather patterns for crop planning

### 💬 **AI Chatbot Support**
- **24/7 Availability**: Round-the-clock agricultural assistance
- **Multilingual Interface**: Support for multiple Indian languages
- **Voice Commands**: Hands-free interaction for better accessibility
- **Context-Aware Responses**: Personalized advice based on user profile

### 📊 **Analytics & Reporting**
- **Crop Performance**: Yield analysis and productivity metrics
- **Financial Tracking**: Income, expenses, and profitability reports
- **Market Insights**: Demand-supply analysis and price predictions
- **Export Capabilities**: Generate and share reports in multiple formats

---

## 🔧 API Reference

### Authentication Endpoints
```bash
POST /api/auth/signin     # User sign in
POST /api/auth/signup     # User registration
POST /api/auth/signout    # User sign out
GET  /api/auth/session    # Get current session
```

### Farmer APIs
```bash
GET    /api/farmer/dashboard      # Get farmer dashboard data
POST   /api/farmer/pest-detect    # Submit pest detection request
GET    /api/farmer/market-prices  # Get current market prices
POST   /api/farmer/crop-advisory  # Get crop recommendations
```

### Analytics APIs
```bash
GET /api/analytics/overview       # Get overview statistics
GET /api/analytics/crops          # Get crop performance data
GET /api/analytics/market-trends  # Get market trend analysis
```

### Weather APIs
```bash
GET /api/weather/current/:location    # Current weather data
GET /api/weather/forecast/:location   # Weather forecast
GET /api/weather/alerts/:location     # Weather alerts
```
---
## 📄 Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Testing (when implemented)
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

---

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AgriWise"

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/agriwise"

# External APIs
WEATHER_API_KEY=your-weather-api-key
MARKET_API_KEY=your-market-data-api-key
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# AI/ML Services
OPENAI_API_KEY=your-openai-key
GOOGLE_VISION_API_KEY=your-google-vision-key

# Analytics
VERCEL_ANALYTICS_ID=your-analytics-id
```
---

## 📧 Support & Contact

### 🤝 Get Help
- 📚 **Documentation**: Check our comprehensive guides
- 🐛 **Bug Reports**: [Issues](https://github.com/debdyuti005/Crop-Advisory/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/debdyuti005/Crop-Advisory/discussions)
- 📧 **Email**: Contact the development team

### 👥 Development Team
- **Project Lead**: [Debdyuti](https://github.com/debdyuti005)
- **Full Stack Development**: Core team
- **UI/UX Design**: Design specialists
- **Quality Assurance**: Testing team

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to:

- **Smart India Hackathon** for providing the platform and opportunity
- **Ministry of Agriculture & Farmers Welfare** for domain expertise and guidance
- **Open Source Community** for the amazing tools and libraries
- **Agricultural Experts** for domain knowledge and validation
- **Farmers** who inspired and motivated this project

---

<div align="center">

**Made with ❤️ for Indian Farmers**

[⭐ Star this repository](https://github.com/debdyuti005/Crop-Advisory) if you found it helpful!

*Empowering Agriculture Through Technology*

</div>
>>>>>>> 12c9f4691980207793319eefbc491c405b421820
