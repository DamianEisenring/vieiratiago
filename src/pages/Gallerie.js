import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Gallerie = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Authentifizierungsstatus überwachen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image && user) {
      const imageRef = ref(storage, `images/${image.name}-${Date.now()}`);
      try {
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        await addDoc(collection(db, 'Gallerie'), { imageUrl: url });
        alert('Bild erfolgreich hochgeladen!');
        fetchImages();
      } catch (error) {
        console.error('Fehler beim Hochladen', error);
        alert('Fehler beim Hochladen des Bildes');
      }
    } else if (!user) {
      alert('Bitte melden Sie sich an, um ein Bild hochzuladen');
    } else {
      alert('Bitte wählen Sie ein Bild aus');
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'Gallerie'));
    const imagesList = [];
    querySnapshot.forEach((doc) => {
      imagesList.push(doc.data().imageUrl);
    });
    setImages(imagesList);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h2>Bild hochladen</h2>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Bild hochladen</button>
        </>
      ) : (
        <p>Bitte melden Sie sich an, um Bilder hochzuladen.</p>
      )}

      <h2>Galerie</h2>
      {loading ? (
        <p>Lade Bilder...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((url, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img src={url} alt={`Bild ${index}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallerie;
