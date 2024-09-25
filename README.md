# Scenery change Detection Frontend

This repository is the frontend of an application created as part of a diploma thesis, the topic of which is **"Detection of scenery changes in time in pictures"**.

The application was created at the **Faculty of Computer Science of the Białystok University of Technology**.

## Requirements

To build and run this application you need:
- **Node.js v20.17.0**

## How to build and run this aplication

### Prerequisites

Make sure you have the following installed on your machine:
1. **Node.js** (at least version 20.17.0):
    
    You can download it from [Node.js official website](https://nodejs.org/en)

2. **npm** (Node Package Manager):

    npm is included with Node.js. Check if it's installed by running:
    ```bash
    node -v
    npm-v
    ```
### 1. Clone the Repository

First clone the repository:

```bash
git clone https://github.com/szymongasiewski/scenery-change-detection-frontend.git
cd scenery-change-detection-frontend
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```
### 3. Running the Application

To run the application in develpment mode, use the following:

```bash
npm run dev
```

By default appliaction will be served at **`http://localhost:5173/`**.

### 4. Building the Application for Production

To create an optimized build for production, use the following command:

```bash
npm run build
```
This will generate a production-ready version of application inside `dist/` folder.

After building, you can serve the build locally to test it by using preview command:

```bash
npm run preview
```

This will start a local static server to serve the built files at **`http://localhost:4173/`**.

### 5. Enviroment Variables

Application uses `.env` files to manage environment variables. You can create a `.env` file in the root of the project and define variables as follows:

```.env
VITE_API_URL=http://api.example.com
```
