import {
  query,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref } from "vue";
import { defineStore } from "pinia";
import { db } from "../db/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const userProductsApi = defineStore("products-api", () => {
  let products = ref([]),
    productsByCaregory = ref([]),
    loading = ref(false);

  // * Get all products
  const getProducts = async () => {
    try {
      loading.value = true;
      const q = query(collection(db, "products")),
        querySnap = await getDocs(q);

      products.value = [];

      querySnap.forEach((doc) => {
        let product = doc.data();
        product.doc_id = doc.id;

        products.value.push(product);
      });
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // * Add new product
  const addNewProduct = async (newProduct) => {
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      await updateDoc(docRef, { doc_id: docRef.id });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // * Update product
  const updateProduct = async (docId, newProduct) => {
    try {
      const docRef = doc(db, "products", docId);
      await updateDoc(docRef, newProduct);
      alert("Updated!");
    } catch (error) {
      console.error("Ошибка при обновлении документа:", error);
    }
  };

  // * Delete product
  const deleteProduct = async (docId) => {
    try {
      const docRef = doc(db, "products", docId);
      await deleteDoc(docRef);
      console.log("Продукт успешно удален");
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  // * Get products by category
  const getProductsByCategory = async (categoryId) => {
    try {
      loading.value = true;

      await getProducts();

      const filteredProducts = products.value.filter((el) => {
        return el.category.name === categoryId;
      });

      productsByCaregory.value = filteredProducts;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // * Register new user
  const registerUser = async (email, password) => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    }
  };

  return {
    products,
    productsByCaregory,
    loading,
    updateProduct,
    deleteProduct,
    registerUser,
    getProducts,
    addNewProduct,
    getProductsByCategory,
  };
});

// const BASE_URL = "https://api.escuelajs.co/api/v1/products";
