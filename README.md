# 🚀 CodeAlpha_StudySprint

StudySprint is a modern productivity and study management web application designed to help students organize tasks, manage study schedules, and improve productivity through a clean and interactive user experience.

This project was further enhanced with DevOps practices as part of the CodeAlpha DevOps Internship Program, including Docker containerization and Jenkins-based Continuous Integration (CI) automation.

---

# 📌 Project Overview

StudySprint helps students:

* Manage daily study tasks
* Organize learning schedules
* Improve productivity
* Track study progress
* Maintain consistency through sprint-based planning

The project was developed using modern frontend technologies and later integrated with DevOps tools to automate build and deployment workflows.

---

# ✨ Features

* 📋 Task Management
* 🎯 Study Sprint Planning
* 🌙 Dark Mode Support
* 📱 Responsive Design
* ⚡ Fast User Interface
* 🎨 Modern UI/UX
* 🔄 CI Build Automation
* 🐳 Dockerized Application

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

## DevOps & Tools

* Docker
* Docker Compose
* Jenkins
* GitHub
* Node.js
* npm

---

# 🏗️ Project Architecture

```text
User
 │
 ▼
StudySprint Application
 │
 ▼
GitHub Repository
 │
 ▼
Jenkins CI Pipeline
 │
 ▼
Docker Container
 │
 ▼
Deployment Environment
```

---

# 🐳 Task 4: Web Server Using Docker

## Objective

Containerize the StudySprint application and manage it using Docker.

## Implementation

### Dockerfile

Created a Dockerfile to:

* Package the application
* Install dependencies
* Build the project
* Run the application in an isolated container

### Docker Image

Built a reusable Docker image for consistent execution across different environments.

### Docker Container

Executed and managed application containers using Docker commands.

### Docker Compose

Configured Docker Compose to simplify deployment and container management.

---

## Docker Commands

### Build Docker Image

```bash
docker build -t studysprint .
```

### Run Docker Container

```bash
docker run -p 5173:5173 studysprint
```

### Docker Compose

```bash
docker compose up
```

---

# ⚙️ Task 2: Jenkins Remoting Project

## Objective

Implement Continuous Integration using Jenkins and understand Jenkins Remoting architecture.

## Jenkins Setup

The following components were configured:

* Jenkins Installation using Docker
* GitHub Repository Integration
* Build Automation
* Node.js Environment Setup
* Jenkins Job Configuration

## Jenkins CI Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Source Code Checkout
    │
    ├── npm install
    │
    ├── npm run build
    │
    ▼
Build Validation
```

---

## Automated Build Commands

Jenkins executes:

```bash
npm install
npm run build
```

This ensures every build is automatically validated before deployment.

---

## Jenkins Remoting Learning Outcomes

During implementation, the following concepts were explored:

* Jenkins Controller Architecture
* Jenkins Agent Architecture
* Jenkins Remoting
* Docker Networking
* Node Isolation
* Remote Build Execution
* Java Runtime Compatibility
* WebSocket Agent Communication

---

# 📂 Project Structure

```text
CodeAlpha_StudySprint
│
├── public/
├── src/
├── Dockerfile
├── compose.yaml
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

# 🚀 Installation Guide

## Clone Repository

```bash
git clone https://github.com/harshi010905/CodeAlpha_StudySprint.git
cd CodeAlpha_StudySprint
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# 🧪 Build Project

```bash
npm run build
```

Build files are generated inside the dist directory.

---

# 📸 Screenshots

## Application Dashboard

(Add Screenshot)

## Docker Container Running

(Add Screenshot)

## Jenkins Successful Build

(Add Screenshot)

## Jenkins Console Output

(Add Screenshot)

---

# 🎯 Learning Outcomes

Through this project, the following skills were developed:

* Docker Containerization
* Docker Compose Configuration
* Jenkins Installation & Configuration
* GitHub Integration
* Continuous Integration (CI)
* Jenkins Remoting Concepts
* Automated Build Pipelines
* DevOps Fundamentals
* Build Automation

---

# 📜 Internship Tasks Completed

### ✅ Task 2: Jenkins Remoting Project

* Jenkins Setup
* GitHub Integration
* Automated Builds
* Jenkins Remoting Concepts
* Remote Build Architecture Understanding

### ✅ Task 4: Web Server Using Docker

* Docker Containerization
* Docker Image Creation
* Docker Compose Configuration
* Container Lifecycle Management

---

# 👩‍💻 Author

**Harshitha Pasupureddy**

B.Tech - Computer Science Engineering

Interests:

* Web Development
* DevOps
* Cloud Computing
* Artificial Intelligence

---

# ⭐ Acknowledgement

This project was completed as part of the **CodeAlpha DevOps Internship Program**, focusing on practical implementation of Docker and Jenkins-based DevOps workflows.
