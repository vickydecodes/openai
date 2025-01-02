# ChatGPT Clone

This is a simple ChatGPT clone built with React and Firebase. The application allows users to sign in, interact with a chatbot, and view their previous chat history, all stored locally. The project demonstrates how to use Firebase for authentication and React for building an interactive chat interface.

## Features

- **User Authentication**: Secure sign-in using Firebase Authentication (email/password).
- **Chat Interface**: A real-time interactive chat window where users can communicate with a chatbot.
- **Chat History**: The chat history is stored in the local state and saved in local storage for persistence.
- **Responsive Design**: The user interface is designed to be mobile-friendly and responsive.
- **Firebase Integration**: Uses Firebase for authentication and local storage management.

## Tech Stack

- **Frontend**: React, JSX, CSS
- **Backend**: Firebase Authentication (passwordless sign-in)
- **State Management**: React State and Local Storage
- **Other Libraries**: Axios, Firebase SDK, React Router

## Installation

### Prerequisites

- **Node.js**: Ensure Node.js and npm are installed. If not, you can download and install them from [Node.js Official Website](https://nodejs.org/).
- **Firebase Account**: You need a Firebase project for authentication. Visit [Firebase Console](https://console.firebase.google.com/) to create a project.

### Steps to Run the Project

#### 1. Clone the repository:

```bash
git clone https://github.com/vickydecodess/openai.git
```

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the `openai` directory and configure the firebase:

```env
VITE_OPENAI_API_KEY
VITE_GEMINI_AI_API_KEY
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

### Project Structure:

```
├── src
│   ├── app
│   ├── context
│   ├── assets
│   ├── pages
│   └── scripts
├── env
├── public
└── package.json
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Inspired by the original **ChatGPT** application.
