import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as vueRef } from "vue";

let imageURL = vueRef([]);

const uploadFileToStorage = (images) => {
  const storage = getStorage(),
    storageRef = ref(storage, `product-images/${images.name}`),
    bytes = new Uint8Array([
      0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64,
      0x21,
    ]);

  uploadBytes(storageRef, bytes);

  // * Get image file URL
  const uploadTask = uploadBytesResumable(storageRef, images);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        imageURL.value.push(downloadURL);
      });
    }
  );
};

export { uploadFileToStorage, imageURL };
