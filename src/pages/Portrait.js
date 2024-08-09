import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Portrait = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Überprüfe den Authentifizierungsstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Daten von Firestore abrufen
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'pages', 'portrait');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setContent(docSnap.data().content);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  // Daten in Firestore speichern
  const saveData = async () => {
    const docRef = doc(db, 'pages', 'portrait');
    await setDoc(docRef, {
      title,
      content
    });
    setIsEditing(false);
    
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={saveData}>Speichern</button>
          <button onClick={() => setIsEditing(false)}>Abbrechen</button>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
          {user && <button onClick={() => setIsEditing(true)}>Bearbeiten</button>}
        </div>
      )}
    </div>
  );
};

export default Portrait;
