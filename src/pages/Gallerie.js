import React, { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./Gallerie.css";

const Gallerie = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openModal = (url) => {
    setSelectedImage(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery-container">
      {user && (
        <div className="upload-container">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>Upload Image</button>
        </div>
      )}
      <div className="image-gallery">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="gallery"
            onClick={() => openModal(url)} // Öffne das Modal beim Klick auf ein Bild
          />
        ))}
      </div>
      {modalOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-content">
            <img src={selectedImage} alt="Enlarged view" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallerie;
