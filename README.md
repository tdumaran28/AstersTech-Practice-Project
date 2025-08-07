# 🌟 AstersTech Week 2 - Homework 1: Firebase Auth + Protected Pages

This walkthrough will help you:

✅ Set up a project in Next.js  
✅ Install and configure Tailwind CSS  
✅ Use Firebase for user **registration**, **login**, and **authentication**  
✅ Redirect users to a **protected page** after login  

---

## ✅ Step 1: Create a GitHub Repository

1. Go to [https://github.com](https://github.com)
2. Create a new repository named:
```bash
yourname-AstersTech-Project
```

3. Open it using **GitHub Codespaces** (green “Code” button → “Open with Codespaces”).

---

## ✅ Step 2: Set Up Next.js in Codespaces

Inside Codespaces, run these:

```bash
npx create-next-app@latest yourname --use-npm
cd yourname
```
Then start your project:

```bash
npm run dev
```
✅ Step 3: Install Tailwind CSS
Run:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Edit tailwind.config.js like this:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Update your styles/globals.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

✅ You can now use Tailwind in your pages.

✅ Step 4: Install Firebase SDK
Run:
```bash
npm install firebase
```
✅ Step 5: Set Up Firebase

Go to https://console.firebase.google.com

Click Add Project, name it something like AstersAuthApp

Click Web App (</>), register it, and get your Firebase config:

```js
// Example only – yours could be different
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```
✅ Step 6: Create firebase.js
In your root folder (NOT inside your app folder, but the folder that contains your app folder), create a new file called firebase.js:

```js
// -------------------------
// This file connects your app to Firebase
// Think of Firebase like the "brain" that stores accounts, data, etc.
// -------------------------

// Import the function that lets us "start" Firebase in our app
import { initializeApp } from "firebase/app";

// Import the function that lets us use Firebase's "Authentication" service
import { getAuth } from "firebase/auth";

// -------------------------
// This is your Firebase project's unique info (like a key to your personal safe)
// You will get this info from your Firebase console when you create a project
// Replace the placeholder text with your actual Firebase config details
// -------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                  // Secret key for your project
  authDomain: "yourproject.firebaseapp.com", // Website domain for auth
  projectId: "yourproject",                  // Your project's ID
  storageBucket: "yourproject.appspot.com",  // Storage space for files
  messagingSenderId: "SENDER_ID",            // ID for sending messages
  appId: "APP_ID"                            // App's unique ID
};

// -------------------------
// Start (initialize) Firebase using the info above
// -------------------------
const app = initializeApp(firebaseConfig);

// -------------------------
// Prepare and "export" the Authentication service
// Exporting means we can use `auth` in other files
// -------------------------
export const auth = getAuth(app);
```
✅ Step 7: Create Registration Page
Make a folder called register inside your app folder.
Then inside it, create page.js:

```jsx
// -------------------------
// This page lets new users create an account
// -------------------------

// Import React's useState function to store and update form input values
import { useState } from "react";

// Import Firebase's "create account" function
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import the `auth` service we made in firebase.js
import { auth } from "../firebase";

// Import the tool that lets us change pages in Next.js
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter(); // lets us redirect to other pages

  // Create variables to store what the user types in the form
  const [email, setEmail] = useState("");       // user's email
  const [password, setPassword] = useState(""); // user's password
  const [message, setMessage] = useState("");   // message for success or errors

  // This runs when the user clicks "Sign Up"
  const handleRegister = async (e) => {
    e.preventDefault(); // stop page from refreshing
    try {
      // Create the account in Firebase
      await createUserWithEmailAndPassword(auth, email, password);

      // Show success message
      setMessage("✅ Registration successful!");

      // Redirect user to the protected page after signing up
      router.push("/protected");
    } catch (err) {
      // If there's an error, show the error message
      setMessage("❌ " + err.message);
    }
  };

  return (
    // Outer container that centers the form on the page
    <div className="flex justify-center items-center h-screen bg-gray-100">
      
      {/* The form box */}
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
        
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email} // current email value
          onChange={(e) => setEmail(e.target.value)} // update email
        />

        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password} // current password value
          onChange={(e) => setPassword(e.target.value)} // update password
        />

        {/* Sign Up button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        {/* Message box for errors or success */}
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```
✅ Step 8: Create Login Page
Make a folder called login inside your app folder.
Then inside it, create page.js:

```jsx
// -------------------------
// This page lets existing users log into their account
// -------------------------

import { useState } from "react"; // for storing what the user types
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase login function
import { auth } from "../firebase"; // our Firebase Auth instance
import { useRouter } from "next/router"; // for redirecting

export default function Login() {
  const router = useRouter();

  // Store form input
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState("");   

  // Runs when user clicks "Login"
  const handleLogin = async (e) => {
    e.preventDefault(); // stop refresh
    try {
      // Try to log the user in
      await signInWithEmailAndPassword(auth, email, password);

      // Show success message
      setMessage("✅ Login successful!");

      // Redirect to protected page
      router.push("/protected");
    } catch (err) {
      // Show error if login fails
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        {/* Show message */}
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```
✅ Step 9: Create Protected Page
Make a folder called protected inside your app folder.
Then inside it, create page.js:
```jsx
// -------------------------
// This is a page only logged-in users can see
// If you are not logged in, you will be sent to the Login page
// -------------------------

import { useEffect, useState } from "react"; // for tracking state and side effects
import { auth } from "../firebase"; // our Firebase Auth instance
import { onAuthStateChanged } from "firebase/auth"; // detects if user logs in/out
import { useRouter } from "next/router"; // for redirecting

export default function Protected() {
  const router = useRouter();

  // Store logged-in user info
  const [user, setUser] = useState(null);

  // Runs when page loads
  useEffect(() => {
    // This function watches the login state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // If no one is logged in, send to Login page
        router.push("/login");
      } else {
        // If logged in, save user info
        setUser(currentUser);
      }
    });

    // Cleanup listener when leaving the page
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-xl font-bold mb-2">🔒 Protected Page</h1>
        {/* Show user email if logged in */}
        {user && <p>Welcome, <strong>{user.email}</strong>!</p>}
      </div>
    </div>
  );
}
```
✅ Step 10: Run Your App
Start your development server:

```bash
npm run dev
```

Try it out:
Type /register after your url (the one that you open from ports) → and create a new account

Go to /login (replace register with login) → log in

You’ll be redirected to /protected automatically
