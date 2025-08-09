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
   `https://github.com/your-username/AstersTech-Week2-Demo-HW1`

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
## ✅ Step 3: Set Up Firebase
Go to Firebase Console: https://console.firebase.google.com

Click "Add Project", and give it a name like AstersAuthApp.

Go through the setup steps (click Next, and choose defaults unless you know otherwise).

Once your project is created, click the Web App icon (looks like </>).

Register your app (give it a nickname, no hosting needed right now).

After you register, Firebase will show you a config object that looks like this:

```js
// Example only – your values will be different!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```
⚠ Don’t close this page yet — you’ll need to copy this exact object into your project.

Install Firebase in your project:

```bash
npm install firebase
```
## ✅ Step 4: Create firebase.js
In your project root folder (the same place as your package.json), create a file called:
```
firebase.js
```
In that file, start by importing Firebase’s initialization functions:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
```
Paste your firebaseConfig object from Firebase right here (replace the placeholder values with yours):

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```
Initialize Firebase and export auth so you can use it anywhere in your app:

```js
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
```
✅ Now you have a firebase.js file that looks like this:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
```
## ✅ Step 5: Update Home Page
Click on the folder called app on the left-hand side of your screen. Next, without clicking/opening any other folders click on the file called "page.tsx"

Next, within that page delete all the code. Finally, paste the code below into your file (it should be the only thing in it)

```tsx
import Image from "next/image";
import Link from "next/link";

export default function Home(){
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```
## ✅ Step 6: Create Registration Page
Make a folder called 'register' inside your app folder.
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
Again, Make a folder called 'login' inside your app folder.
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
import Link from "next/link";

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
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        <Link href="/register" className="block mt-4 text-blue-400 hover:underline text-center">
          Go to Registration
        </Link>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```
## ✅ Step 8: Create Protected Page
Make a folder called 'protected' inside your app folder.
Then inside it, create page.tsx:
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
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded shadow-lg text-center">
        <h1 className="text-xl font-bold mb-2">🔒 Protected Page</h1>
        {user && <p>Welcome, <strong>{user.email}</strong>!</p>}
      </div>
    </div>
  );
}
```
## ✅ Step 9: Run Your App
Enter your project file in your terminal if you need to:
```bash
cd project
```

Start your development server by running this code into the terminal:

```bash
npm run dev
```

Try it out:
Type /register after your url (the one that you open from ports) → and create a new account

Go to /login (replace register with login) → log in
## ✅ Step 10: Commit Changes in GitHub Codespaces
Open the terminal in Codespaces.

Stage all your changes

```bash
git add .
```
Commit with a clear message
```bash
git commit -m "Completed app setup and tested register/login/protected routes"
```
Push to your GitHub repository

```bash
git push
```
Verify on GitHub

Go to your repository in GitHub’s web interface.

Check that your latest commit is listed and your files are updated.

If you haven’t set your Git username/email in Codespaces yet, Git might ask you to run:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Then repeat the commit and push commands.


You’ll be redirected to /protected automatically

## ✅ Step 10: Commit Changes

