<template>
  <div class="bg-gray-300 py-4 my-3">
    <h1 class="text-gray-900 text-2xl text-center font-semibold">
      Choose category
    </h1>

    <ul
      class="mt-6 mx-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8"
    >
      <li v-for="item in CATEGORIS_LIST" :key="item.id">
        <button
          @click="handleCategory(item.id, item.name)"
          class="bg-violet-400 text-white rounded-md px-5 py-2.5"
        >
          <img :src="item.image" :alt="item.name" />
          <h2>{{ item.name }}</h2>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userProductsApi } from "../stores/products-api-store";

const CATEGORIS_LIST = [
  {
    id: 1,
    name: "Clothes",
    image:
      "https://w0.peakpx.com/wallpaper/870/294/HD-wallpaper-anime-kamen-rider.jpg",
    creationAt: "2024-01-07T22:28:40.000Z",
    updatedAt: "2024-01-08T00:27:26.000Z",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://i.imgur.com/ZANVnHE.jpeg",
    creationAt: "2024-01-07T22:28:40.000Z",
    updatedAt: "2024-01-07T22:28:40.000Z",
  },
  {
    id: 3,
    name: "Furniture",
    image: "https://i.imgur.com/Qphac99.jpeg",
    creationAt: "2024-01-07T22:28:40.000Z",
    updatedAt: "2024-01-07T22:28:40.000Z",
  },
  {
    id: 4,
    name: "Shoes",
    image: "https://i.imgur.com/qNOjJje.jpeg",
    creationAt: "2024-01-07T22:28:40.000Z",
    updatedAt: "2024-01-07T22:28:40.000Z",
  },
  {
    id: 5,
    name: "Miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
    creationAt: "2024-01-07T22:28:40.000Z",
    updatedAt: "2024-01-07T22:28:40.000Z",
  },
];

const router = useRouter(),
  storeCategoryId = userProductsApi(),
  { getProductsByCategory } = storeCategoryId;

const handleCategory = (id, name) => {
  router.push({ path: `/category/${name}` });

  getProductsByCategory(name);
  saveCategoryToLocalStorage(name);
};

const saveCategoryToLocalStorage = (name) => {
  localStorage.setItem("category", name);
};
</script>
