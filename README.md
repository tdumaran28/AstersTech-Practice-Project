# AstersTech-Week2-Demo-HW1
---

## **Step 1: Create a GitHub Repository**
1. Go to [github.com](https://github.com) and create a new repository named:
```
yourname-AstersTech-Project
```

This will be the base for your entire project.

---

## **Step 2: Open in Codespaces**
Open the repository in **Codespaces**.

Run these commands to create your Next.js app:
```bash
npx create-next-app@latest "yourname" --use-npm
cd "yourname"
```

You will need to run the second command every time you work on your website.

Start the project:
```bash
npm run dev
```

Open it as you did with your homework.

---

## **Step 3: Install Tailwind CSS**
Run:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Edit `tailwind.config.js` to:
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

Replace `styles/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

✅ Tailwind CSS is now ready to use.

---

## **Step 4: Install Firebase**
Run:
```bash
npm install firebase
```

---

## **Step 5: Set Up Firebase**
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** → Enter a name → Create Project.
3. Click the **Web app** (</>) icon → Register your app.
4. Copy your Firebase config (example):
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

---

## **Step 6: Create `firebase.js`**
Create a file named `firebase.js` in the root folder:
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

---

## **Step 7: Create Registration Page**
Create `pages/register.js`:
```jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Registration successful!");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```

---

## **Step 8: Create Login Page**
Create `pages/login.js`:
```jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login successful!");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
```

---

## **Step 9: Run Your Project**
Run:
```bash
npm run dev
```

Visit:
- `http://localhost:3000/register` → Create an account
- `http://localhost:3000/login` → Log in

---

## ✅ Demo Tips
- Show **Register → Login → Success messages**.
- Explain: **Frontend = Next.js + Tailwind**, **Backend = Firebase Auth**.
- Keep it simple → no route guards or email verification yet.

---
