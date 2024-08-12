// src/components/Gallery.js
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Gallerie = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [user, setUser] = useState(null);

  // Überwache den Authentifizierungsstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const uploadImage = () => {
    if (imageUpload == null || !user) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    const listImages = async () => {
      const imagesListRef = ref(storage, "images/");
      const response = await listAll(imagesListRef);
      const urls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      );
      setImageUrls(urls);
    };
    listImages();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>Upload Image</button>
        </div>
      ) : (
        <p></p>
      )}
      <div className="image-gallery">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt="gallery" style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default Gallerie;
