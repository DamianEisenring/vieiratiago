import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Portrait = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [additionalFields, setAdditionalFields] = useState([]); // Zustand für zusätzliche Felder
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
        setAdditionalFields(docSnap.data().additionalFields || []); // Zusätzliche Felder laden, falls vorhanden
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
      content,
      additionalFields, // Zusätzliche Felder speichern
    });
    setIsEditing(false);
  };

  // Neues zusätzliches Feld hinzufügen
  const addField = () => {
    setAdditionalFields([...additionalFields, { label: '', value: '' }]);
  };

  // Änderungen an einem zusätzlichen Feld verarbeiten
  const handleFieldChange = (index, event) => {
    const updatedFields = additionalFields.map((field, i) =>
      i === index ? { ...field, [event.target.name]: event.target.value } : field
    );
    setAdditionalFields(updatedFields);
  };

  // Ein zusätzliches Feld entfernen
  const removeField = (index) => {
    const updatedFields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(updatedFields);
  };

  return (
    <div>
      {isEditing && user ? ( // Nur eingeloggte Benutzer können bearbeiten
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
          {additionalFields.map((field, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                name="label"
                placeholder="Feldname"
                value={field.label}
                onChange={(e) => handleFieldChange(index, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Feldwert"
                value={field.value}
                onChange={(e) => handleFieldChange(index, e)}
              />
              <button onClick={() => removeField(index)} style={{ marginLeft: '10px' }}>
                Löschen
              </button>
            </div>
          ))}
          <button onClick={addField}>Neues Feld hinzufügen</button>
          <button onClick={saveData}>Speichern</button>
          <button onClick={() => setIsEditing(false)}>Abbrechen</button>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
          {additionalFields.map((field, index) => (
            <p key={index}><strong>{field.label}:</strong> {field.value}</p>
          ))}
          {user && <button onClick={() => setIsEditing(true)}>Bearbeiten</button>}
        </div>
      )}
    </div>
  );
};

export default Portrait;
