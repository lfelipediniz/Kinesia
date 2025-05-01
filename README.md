# Kinesia
<p align="center">
  <img src="/public/kinesia-logo.svg" alt="Kinesia Logo" width="150">
</p>
A minimalist mobile application that uses smartphone hardware and artificial intelligence to analyze movement, correct posture, prevent injuries and track performance during resistance training: delivering real-time feedback with no external sensors.

## Table of Contents
- [Kinesia](#kinesia)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [How to Run](#how-to-run)
    - [Development Server](#development-server)
    - [Capacitor Build for Android](#capacitor-build-for-android)
  - [APK Build](#apk-build)
  - [Environment Variables](#environment-variables)

## Introduction

Kinesia is a mobile-first fitness application that leverages smartphone hardware (accelerometers, gyroscopes) and artificial intelligence to analyze motion and provide real-time feedback during resistance exercises. Its goal is to help users train more safely and efficiently by automatically detecting posture deviations, identifying execution quality, and offering corrective suggestions — without the need for wearables or cameras.

Built with React and deployed as a native app using Capacitor, Kinesia features a streamlined, black-and-white minimalist interface optimized for clarity and focus.


## Requirements

- [Node.js (v18+ recommended)](https://nodejs.org/)
- [pnpm (preferred) or npm](https://pnpm.io/installation)
- [Java 17 (OpenJDK)](https://openjdk.org/projects/jdk/17/)
- [Android SDK (via Android Studio or command line)](https://developer.android.com/studio)
- [Capacitor CLI](https://capacitorjs.com/): installed via npm


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seu-usuario/kinesia.git
   cd kinesia
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the web app:
   ```bash
   pnpm run build
   ```

4. Initialize Capacitor (if not already done):
   ```bash
   npx cap init
   ```

   Use an app name like:
   - Name: Kinesia
   - App ID: com.kinesia.app


## How to Run

### Development Server

To run the React app locally (web preview):

```bash
pnpm dev
```

### Capacitor Build for Android

1. Add the Android platform (only once):
   ```bash
   npx cap add android
   ```

2. Sync the web build with Android:
   ```bash
   npx cap sync
   ```

3. Open Android Studio (optional, for visual editing):
   ```bash
   npx cap open android
   ```

## APK Build

You can generate the APK directly via terminal, no Android Studio required.

1. Go to the android folder:
   ```bash
   cd android
   ```

2. (One time only) Confirm Java 17 is being used:
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. (Optional) Force Java 17 for Gradle in gradle.properties:
   ```properties
   org.gradle.java.home=/usr/lib/jvm/java-17-openjdk-amd64
   ```

4. Clean and build APK:
   ```bash
   ./gradlew clean
   ./gradlew assembleDebug
   ```

5. Your APK will be at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Environment Variables

If needed, create a .env file in the root folder:

```env
# API base URL (for local testing)
VITE_API_BASE_URL=http://localhost:8000/api
```

📱 To install the APK on a connected Android device:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

Train smarter with Kinesia — powered by your phone, driven by AI. 📱🧠💪  
