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
    "./pages/**/*.{js,ts,jsx,tsx}",
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
In your root folder(not the app folder, but the folder your app folders in), create firebase.js:

```js
// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
```

✅ Step 7: Create Registration Page
Create a new file: pages/register.js

```jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");       // store email input
  const [password, setPassword] = useState(""); // store password input
  const [message, setMessage] = useState("");   // feedback message

  // When the form is submitted
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Registration successful!");
      router.push("/protected"); // redirect to protected page
    } catch (err) {
      setMessage("❌ " + err.message); // show error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
        
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

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        {/* Feedback message */}
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```
✅ Step 8: Create Login Page
Create a new file: pages/login.js

```jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");       // store email input
  const [password, setPassword] = useState(""); // store password input
  const [message, setMessage] = useState("");   // feedback message

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login successful!");
      router.push("/protected"); // redirect after login
    } catch (err) {
      setMessage("❌ " + err.message); // show error
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

        {/* Feedback message */}
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```
✅ Step 9: Create Protected Page
Create pages/protected.js:

```jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function Protected() {
  const router = useRouter();
  const [user, setUser] = useState(null); // store logged-in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(currentUser); // set user if logged in
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-xl font-bold mb-2">🔒 Protected Page</h1>
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
