import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Agenda.css';

const Agenda = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Überprüfe den Authentifizierungsstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Daten von Firestore abrufen
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'pages', 'agenda');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvents(docSnap.data().events || []);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  // Daten in Firestore speichern
  const saveData = async () => {
    const docRef = doc(db, 'pages', 'agenda');
    await setDoc(docRef, {
      events,
    });
    setIsEditing(false);
  };

  // Neues Event hinzufügen
  const addEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ date: '', name: '' });
  };

  // Änderungen an einem Event verarbeiten
  const handleEventChange = (index, event) => {
    const updatedEvents = events.map((evt, i) =>
      i === index ? { ...evt, [event.target.name]: event.target.value } : evt
    );
    setEvents(updatedEvents);
  };

  // Ein Event entfernen
  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className="agenda-container">
      <h2>Agenda</h2>
      {isEditing && user ? (
        <div className="agenda-content agenda-editing">
          {events.map((event, index) => (
            <div key={index} className="event-field-container">
              <input
                type="date"
                name="date"
                value={event.date}
                onChange={(e) => handleEventChange(index, e)}
              />
              <input
                type="text"
                name="name"
                placeholder="Name des Events"
                value={event.name}
                onChange={(e) => handleEventChange(index, e)}
              />
              <button onClick={() => removeEvent(index)}>Löschen</button>
            </div>
          ))}
          <button onClick={addEvent}>Neues Event hinzufügen</button>
          <button onClick={saveData}>Speichern</button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">
            Abbrechen
          </button>
        </div>
      ) : (
        <div className="agenda-content">
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.date}:</strong> {event.name}
              </li>
            ))}
          </ul>
          {user && <button onClick={() => setIsEditing(true)}>Bearbeiten</button>}
        </div>
      )}
    </div>
  );
};

export default Agenda;
