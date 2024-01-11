<template>
  <form
    class="w-full h-full flex justify-center items-center"
    @submit.prevent="addNewPR"
  >
    <div class="bg-gray-100 p-10 my-5 rounded-lg space-y-5">
      <div class="form-item">
        <label for="title">Product Title</label>
        <input
          required
          class="form-input"
          v-model="productTitle"
          type="text"
          placeholder="Enter product title"
        />
      </div>

      <div class="form-item">
        <label for="description">Product Description</label>
        <textarea
          required
          v-model="productDescription"
          type="text"
          placeholder="Enter product description"
          class="form-input w-full resize-none"
          rows="4"
        ></textarea>
      </div>

      <div class="form-item">
        <label for="price">Product Price</label>
        <input
          required
          class="form-input"
          v-model="productprice"
          type="number"
          placeholder="Enter product price"
        />
      </div>

      <div class="form-item">
        <label for="category">Choose category</label>
        <select v-model="productCategory" required>
          <option value="Closthes">Closthes</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Shoes">Shoes</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Computers">Computers</option>
        </select>
      </div>

      <div class="form-item">
        <label for="images">Choose Product images</label>
        <input @change="handleFile" type="file" multiple />
      </div>

      <button class="py-2 px-4 text-white bg-indigo-600">
        Add new product
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { userProductsApi } from "../stores/products-api-store";
import { uploadFileToStorage, imageURL } from "../db/upload-images";

const store = userProductsApi(),
  { addNewProduct } = store,
  randomId = uuidv4();

let productTitle = ref(""),
  productDescription = ref(""),
  productprice = ref(0),
  productCategory = ref(""),
  newProduct = reactive({
    id: randomId,
    title: productTitle,
    description: productDescription,
    price: productprice,
    images: imageURL,
    category: {
      name: productCategory,
    },
  });

function handleFile(event) {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    uploadFileToStorage(files[i]);
  }
}

function addNewPR() {
  addNewProduct(newProduct);

  alert("New Product added successfully!");
}
</script>
