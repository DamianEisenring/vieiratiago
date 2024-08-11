import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Überwache den Authentifizierungsstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login erfolgreich');
    } catch (error) {
      console.error('Login Fehler', error);
      alert('Login fehlgeschlagen');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout erfolgreich');
    } catch (error) {
      console.error('Logout Fehler', error);
      alert('Logout fehlgeschlagen');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Willkommen, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
