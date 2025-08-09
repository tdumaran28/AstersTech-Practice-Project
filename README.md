# 🌟 AstersTech Week 2 - Starting your projects!

This walkthrough will help you:

✅ Set up a project in Next.js  
✅ Install and configure Tailwind CSS  
✅ Use Firebase for user **registration**, **login**, and **authentication**  
✅ Redirect users to a **protected page** after login  

---

## ✅ Step 0: Fork the Starter Repository

1. You will receive a link to the starter repo, for example:  
   `https://github.com/AstersTech/AstersTech-Week2-Demo-HW1`

2. Open the link in your browser.

3. Click the **Fork** button at the top-right corner of the page.  
   This creates a copy of the repository in your own GitHub account.

4. Your forked repo URL will look like:  
   `https://github.com/your-username/wAstersTech-Week2-Demo-HW1`

---

## ✅ Step 1: Open the Forked Repo in GitHub Codespaces

1. Navigate to your forked repo page on GitHub.

2. Click the green **Code** button.

3. Select the **Codespaces** tab.

4. Click **Create codespace on main**.

5. Wait a minute or two for Codespaces to launch your cloud IDE.

---

## ✅ Step 2: Set Up Next.js in Codespaces

Inside Codespaces, run these:

```bash
npx create-next-app@latest project --use-npm
```
Next,
```bash
cd project
```
Then start your project:

```bash
npm run dev
```
## ✅ Step 3: Set Up Firebase

Go to https://console.firebase.google.com

Click Add Project, name it something like AstersAuthApp

Then click through all the buttons (filling in what's needed) and create your project.

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
Run:
```bash
npm install firebase
```

## ✅ Step 4: Create firebase.js
In your root folder (NOT inside your app folder, but the folder that contains your app folder), create a new file called firebase.js

Next, copy the code from the firebase website and paste it into this file

Next add these two lines of code, one at the absolute top of your file (inside your code) and one at the bottom

Top:
```js
import { getAuth } from "firebase/auth";
```
Bottom:
```js
export const auth = getAuth(app);
```
## ✅ Step 5: Update Home Page
Click on the folder called app on the left-hand side of your screen. Next, without clicking/opening any other folders click on the file called "page.tsx"

Next, within that page delete the code from lines 5 all the way to 101. This should leave you with a function and an empty return.

Now, copy the code below and past it in on line 5. This code should be within the return statement.

```tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the App</h1>

      <nav style={{ marginTop: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link href="/register">Go to Registration</Link>
          </li>
          <li>
            <Link href="/register-protected">
              Go to Protected Registration
            </Link>
          </li>
          <li>
            <Link href="/login">Go to Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
```
## ✅ Step 6: Create Registration Page
Make a folder called register inside your app folder.
Then inside it, create page.tsx:

```jsx
// -------------------------
// This page lets new users create an account
// -------------------------

// Import React's useState function to store and update form input values
'use client'

import { useState } from "react";

// Import Firebase's "create account" function
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import the `auth` service we made in firebase.js
import { auth } from "@/firebase";

// Import the tool that lets us change pages in Next.js
import { useRouter } from "next/navigation";

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
## ✅ Step 7: Create Login Page
Make a folder called login inside your app folder.
Then inside it, create page.tsx:

```jsx
// -------------------------
// This page lets existing users log into their account
// -------------------------
'use client'

import { useState } from "react"; // for storing what the user types
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase login function
import { auth } from "@/firebase"; // our Firebase Auth instance
import { useRouter } from "next/navigation"; // for redirecting

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
## ✅ Step 8: Create Protected Page
Make a folder called protected inside your app folder.
Then inside it, create page.js:
```jsx
// -------------------------
// This is a page only logged-in users can see
// If you are not logged in, you will be sent to the Login page
// -------------------------
'use client'

import { useEffect, useState } from "react"; // for tracking state and side effects
import { auth } from "@/firebase"; // our Firebase Auth instance
import { onAuthStateChanged } from "firebase/auth"; // detects if user logs in/out
import { useRouter } from "next/navigation"; // for redirecting

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
## ✅ Step 9: Run Your App
Start your development server:

```bash
npm run dev
```

Try it out:
Type /register after your url (the one that you open from ports) → and create a new account

Go to /login (replace register with login) → log in

You’ll be redirected to /protected automatically
