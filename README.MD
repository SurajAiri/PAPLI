# PAPLI - Personal Assistant Physical Layer Integration
**A bridge between your device and all your AI Models.**

> A universal interface that lets any AI agent speak, alert, or remind users on their personal devices — like Twilio for voice-driven assistant actions.

## 🎯 Overview

PAPLI is a lightweight, multi-device assistant system that exposes APIs for third-party AI agents (LLMs, bots, etc.) to trigger real-world actions like speaking aloud, setting reminders, or activating alarms on user devices in real time.

## ✨ Core Features

- **Real-time Action Routing**: WebSocket-based communication for instant command delivery
- **Multi-Device Support**: Handle multiple devices per user seamlessly
- **Offline Queue & Retry Logic**: Commands are queued and synced when devices come online
- **Universal API Interface**: Works with any AI agent type (LLMs, bots, apps)
- **Minimal Server Load**: Optimized for text-based commands
- **Clear Separation**: Clean distinction between agent input and device execution

## 🚀 MVP Features (Current)

- ✅ API endpoints for AI agent commands (`/speak`, `/reminder`, `/alarm`)
- ✅ WebSocket support for real-time device communication
- ✅ FCM integration for offline device notifications
- ✅ Device polling and startup sync for missed tasks
- ✅ Lightweight authentication via `userId` + `deviceId`

## 📋 Roadmap

### 🧪 Phase 2
- `/unstoppableAlarm` - Looped alarms
- `/displayText` - Text display on devices
- `/vibrate` - Device vibration
- `/cancel` - Stop running commands

### 🚀 Phase 3 (Advanced + IoT)
- `/runShortcut` - Execute Siri/Android shortcuts
- `/openApp` - Launch specific applications
- `/sendSMS` - SMS integration via Twilio
- `/notifyWithImage` - Rich notifications with images/GIFs
- `/geoAlert` - Location-based triggers

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Process Manager**: Nodemon for development
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
PAPLI/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware
│   │   └── response.middlewares.js
│   ├── models/          # Database schemas
│   │   ├── apiKey.models.js
│   │   ├── developer.models.js
│   │   ├── project.models.js
│   │   ├── user.models.js
│   │   └── userDeveloper.models.js
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── tests/               # Test suites
├── index.js            # Application entry point
├── package.json        # Dependencies and scripts
└── README.md
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PAPLI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Required Environment Variables**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/papli
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```http
GET /
```
Response:
```json
{
  "statusCode": 200,
  "data": {
    "message": "Health Check for 'PAPLI' APIs."
  },
  "message": "Success"
}
```

## 🗃️ Database Models

### User
- `name`: User's display name
- `email`: Unique email address
- `password`: Encrypted password
- `role`: `admin` | `user`
- `googleId`: Optional Google OAuth ID

### Developer
- `name`: Developer's name
- `email`: Unique developer email
- `password`: Encrypted password
- `role`: `admin` | `developer`

### Project
- `title`: Project name
- `logo`: Project logo URL
- `shortDesc`: Brief description
- `description`: Detailed description
- `developerId`: Reference to developer

### API Key
- `token`: Unique API key
- `developerId`: Associated developer
- `projectId`: Associated project

### UserDeveloper
- `devId`: Developer reference
- `userId`: User reference
- `projectId`: Project reference

## 🔐 Authentication

The API uses a lightweight authentication system based on:
- `userId`: Unique user identifier
- `deviceId`: Unique device identifier
- `API Key`: Project-specific authentication token

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for the AI community**