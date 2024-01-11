<template>
  <nav
    class="flex justify-center items-center text-white text-xl font-semibold bg-slate-400 w-full h-16"
  >
    <div class="ml-auto">
      <router-link to="/" class="mr-5 hover:text-gray-500">Home</router-link>
      <router-link to="/add-product" class="mr-5 hover:text-gray-500"
        >Add Product</router-link
      >
    </div>

    <div class="ml-auto mr-10">
      <router-link to="/log-in">Log in</router-link>
      <span> | </span>
      <router-link to="/sign-in">Sign in</router-link>
    </div>
  </nav>

  <Categories />

  <router-view />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

// Components
import Categories from "./components/Categories.vue";
</script>
