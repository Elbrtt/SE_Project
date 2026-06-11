<p align="center">
  <img src="src/assets/se-logo.png" width="180" alt="Oasis Project Logo">
</p>

<h1 align="center">Oasis: Unified Social Gaming Platform</h1>

<p align="center">
  <strong>A High-Performance Desktop Integration of Communication and Game Management</strong><br>
  Developed for the Semester 4 Software Engineering AOL Project at Binus University.
</p>

<p align="center">
  <a href="#project-description">Description</a> •
  <a href="#core-functionalities">Features</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#technical-specifications">Specifications</a> •
  <a href="#installation-and-setup">Setup</a> •
  <a href="#directory-structure">Structure</a> •
  <a href="#testing-protocols">Testing</a>
</p>

---

## Project Description

Oasis is a specialized desktop application designed to bridge the gap between social communication platforms and game library management systems. By integrating Discord-style real-time interaction with Steam-style game tracking, Oasis provides a singular, lightweight environment for gamers to manage their digital assets and social circles.

The project prioritizes system performance, minimal resource consumption, and real-time responsiveness. It is built to support systems with limited resources (8GB RAM) while maintaining a premium, "tactical" aesthetic suitable for modern gaming standards.

---

## Core Functionalities

### Gaming Management Layer
*   **Automated Game Detection:** System-level scanning for installed applications with manual override capabilities.
*   **Rich Presence System:** Dynamic status updates including current game, playtime duration, and specific in-game state via WebSocket synchronization.
*   **Playtime Analytics:** Precise tracking of session data and historical usage patterns.
*   **Immersive Detail Views:** High-fidelity game pages featuring localized metadata, custom backgrounds, and activity logs.

### Social Interaction Layer
*   **Real-time Communication:** Low-latency text messaging (DMs and Group Chats) and high-quality voice channels.
*   **Presence Management:** Globally synchronized user states (Online, Idle, Do Not Disturb, Offline).
*   **Relationship Management:** Robust friends system including request handling, block lists, and mutual activity tracking.
*   **Notification Engine:** Event-driven alerts for mentions, invitations, and system updates.

### Community and Infrastructure
*   **Modular Servers:** Support for dedicated community hubs with hierarchical role and permission structures.
*   **Event Coordination:** Integrated scheduling for gaming sessions and community gatherings.
*   **Cross-Platform Sync:** Real-time synchronization of settings and presence across the network.

---

## System Architecture

Oasis follows a Modular Clean Architecture to ensure maintainability and performance.

### Frontend Layer (React & Electron)
*   **View Layer:** Built with React, utilizing isolated component states and memoization to prevent unnecessary re-renders.
*   **State Management:** Powered by Zustand for lightweight global state synchronization without the overhead of heavy stores.
*   **Electron Integration:** Secure IPC communication with mandatory context isolation and minimal preload scripts to ensure system integrity.

### Backend Layer (Node.js)
*   **Communication:** A WebSocket-first architecture for real-time events, supplemented by RESTful endpoints for non-real-time data.
*   **Logic Flow:** Adheres to a strict Route -> Service -> Repository pattern, avoiding nested manager abstractions or "wrapper hell."

### Persistence Layer (PostgreSQL)
*   **Database:** PostgreSQL handles all social, library, and community data.
*   **Optimization:** Implementation of paginated queries and lazy-loading patterns to ensure fast response times even with large datasets.

---

## Technical Specifications

### Performance Constraints
*   **Startup Time:** Cold launch target of less than 2 seconds.
*   **Memory Usage:** Idle RAM consumption targeted at less than 500MB.
*   **Rendering:** Stable FPS with virtualization for large lists and asset lazy-loading.

### Security Protocols
*   **IPC Security:** Strict enforcement of context isolation and restricted IPC access.
*   **Packet Validation:** Mandatory validation and rate-limiting for all WebSocket packets.
*   **Data Integrity:** Client-side presence data is treated as untrusted and validated by the backend service.

---

## Installation and Setup

### Prerequisites
*   Node.js (Version 18.0.0 or higher)
*   PostgreSQL (Version 14 or higher)
*   Git

### Local Environment Setup
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Elbrtt/SE_Project.git
    cd SE_Project
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Database Configuration:**
    *   Initialize a PostgreSQL database named `se_project`.
    *   Configure the `.env` file in the root directory with your database credentials:
        ```env
        DB_HOST=localhost
        DB_USER=your_username
        DB_PASS=your_password
        DB_NAME=se_project
        PORT=3000
        ```

4.  **Launch Application:**
    ```bash
    npm start
    ```

---

## Directory Structure

```text
SE_Project/
├── src/
│   ├── assets/         # Static visual resources and locales
│   ├── components/     # Reusable UI components (React)
│   ├── pages/          # Application views and HTML templates
│   ├── services/       # Business logic and external service adapters
│   └── styles/         # CSS architecture (Base, Components, Layout)
├── tests/
│   ├── e2e/            # End-to-end testing (Playwright)
│   ├── unit/           # Unit testing (Jest)
│   └── audit/          # Stability and performance audits
├── docs/               # Technical documentation and Maestro plans
├── main.js             # Electron main process
└── preload.js          # Secure Electron bridge
```

---

## Testing Protocols

Stability is ensured through a multi-tier testing strategy:

*   **End-to-End (E2E):** Validates full user flows and IPC controls using Playwright.
    ```bash
    npm run test:e2e
    ```
*   **Unit Testing:** Verifies isolated service logic and utility functions using Jest.
    ```bash
    npm run test:unit
    ```
*   **Stability Audits:** Regular checks for memory leaks, WebSocket reconnection loops, and rapid navigation stress tests.

---

## Contributors

**Project Developed by:**
*   **Binus University Students** (Semester 4 - Software Engineering AOL)
*   **Lead Developer:** [Kimchiigu / Elbrtt](https://github.com/Elbrtt)

---
<p align="center">
  Oasis Project - Focused on Simplicity, Performance, and Reliability.
</p>
