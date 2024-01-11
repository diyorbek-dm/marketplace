<template>
  <form class="w-full h-full m-auto my-10" @submit.prevent="createUser">
    <div
      class="w-4/6 m-auto p-5 flex flex-col justify-center items-center border-2 border-gray-500 rounded-lg"
    >
      <h1 class="text-2xl font-semibold">Log in</h1>

      <div class="form-item flex flex-col">
        <div class="form-item">
          <label for="title">Your name</label>
          <input
            class="form-input w-96"
            v-model="userName"
            type="text"
            placeholder="Enter name"
          />
        </div>

        <div class="form-item">
          <label for="description">Your Email</label>
          <input
            v-model="userEmail"
            type="email"
            placeholder="Enter your email"
            class="form-input"
          />
        </div>

        <div class="form-item">
          <label for="price">Store name</label>
          <input
            class="form-input"
            v-model="userStoreName"
            type="number"
            placeholder="Enter your store name"
          />
        </div>

        <div class="form-item">
          <label for="description">Password</label>
          <input
            v-model="userPassword"
            type="text"
            placeholder="Come up with a password"
            class="form-input"
          />
        </div>

        <div class="form-item">
          <label for="images">Choose your profile image</label>
          <input @change="handleFile" type="file" multiple />
        </div>

        <button class="py-2 px-4 text-white bg-indigo-600">Submit</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { uploadFileToStorage, imageURL } from "../db/upload-images";
import { userProductsApi } from "../stores/products-api-store";
import { storeToRefs } from "pinia";

const store = userProductsApi(),
  { registerUser } = store;

let userName = ref(""),
  userEmail = ref(""),
  userStoreName = ref(""),
  userPassword = ref("");

const handleFile = (event) => {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    uploadFileToStorage(files[i]);
  }
};

const createUser = () => {
  registerUser(userEmail.value, userPassword.value);
  console.log(userEmail.value);
  console.log(userPassword.value);

  // saveUserToLocalStorage();
};

const saveUserToLocalStorage = () => {
  localStorage.setItem("user", {
    name: userName,
    email: userEmail,
    store_name: userStoreName,
    password: userPassword,
  });
};
</script>
