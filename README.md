# Oasis: All Platform Gaming Social Hub 🎮

Oasis is a desktop gaming companion application designed to combine game discovery, library management, and social features into a single lightweight interface.

The application aims to reduce the fragmentation between game launchers and social applications by providing a unified environment where users can browse games, manage their collection, and interact with friends.

Developed for the **Semester 4 Software Engineering AOL Project** at Binus University.

---

## 📌 Overview

- **Name**: Oasis
- **Type**: Gaming Social Hub Desktop Application
- **Platform**: Desktop Application
- **Framework**: Electron + React
- **Project Focus**:
  - Game library management
  - Game discovery
  - User authentication
  - Social hub interface
  - Local data persistence

---

# 🎯 Problem

Modern gamers often need multiple applications:

- Game launchers
- Store platforms
- Chat applications
- Community platforms

Managing different applications creates unnecessary complexity.

Oasis provides a centralized interface that combines essential gaming utilities into one application.

---

# 🔥 Features

## 🎮 Game Library Management

- Browse game catalog
- View game details
- Save games into personal library
- Track game information
- Manage owned games

---

## 🛒 Game Store / Discovery

- Browse available games
- View game metadata
- Discover trending games
- Find free-to-play and discounted games

Powered by:

- RAWG API

---

## 👤 Authentication System

- Local registration
- Login system
- Session handling
- User management

---

## 💬 Social Hub

Social interface for managing gaming connections.

Current implementation includes:

- Friend management interface
- User status display
- Social interaction flow

Real-time communication and networking are planned for future development.

---

## 💾 Local Persistence

Application data is stored locally using:

- LocalStorage
- JSON-based data structure

Stored data includes:

- User information
- Library data
- Application state

---

# 🖥️ Application Preview

## Login / Register Page

<p align="center">
  <img src="https://ik.imagekit.io/xtqs8k6di/3.png" width="700">
</p>

---

## Game Store

<p align="center">
  <img src="https://ik.imagekit.io/xtqs8k6di/4.png" width="700">
</p>

---

## Game Details

<p align="center">
  <img src="https://ik.imagekit.io/xtqs8k6di/5.png" width="700">
</p>

---

## Game Library

<p align="center">
  <img src="https://ik.imagekit.io/xtqs8k6di/6.png" width="700">
</p>

---

## Social Hub

<p align="center">
  <img src="https://ik.imagekit.io/xtqs8k6di/7.png" width="700">
</p>

---

# 🏗 Architecture

Oasis uses a layered Electron architecture:

```text
Renderer Layer
(React + HTML + CSS)
        |
Application Logic
(Services)
        |
Security Layer
(preload.js + IPC)
        |
OS Layer
(main.js)

        |
Local Storage
(Data Persistence)
```

---

# ⚙ Technology Stack

## Core Technologies

- Electron
- HTML
- JavaScript ES6+
- CSS

---

# 🚀 How To Run

## Requirements

- Node.js 18+
- Git

---

## Installation

```bash
git clone https://github.com/Elbrtt/SE_Project.git

cd SE_Project

npm install
```

---

## Start Application

```bash
npm start
```

---

# ⚠ Limitations

- No direct game downloading feature from external platforms.
- Steam/Epic integration is limited because third-party installation access is restricted.
- Social features currently focus on interface and application flow.
- No cloud database integration.

---

# 📅 Future Development

- Backend database integration
- Online authentication
- Real-time communication
- Integration with more gaming platforms

---

# 👥 Team

- Elbrtt
- Zhvny
