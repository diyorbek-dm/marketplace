<template>
  <div
    class="my-6 mx-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
  >
    <h1 v-show="loading" class="font-bold m-2">Loading...</h1>

    <div v-for="product in productsByCaregory">
      <div
        @click="
          openProductView({
            id: product.id,
            title: product.title,
            price: product.price,
            images: product.images,
            description: product.description,
          })
        "
        class="cursor-pointer border-2 border-purple-700 rounded-xl p-3"
      >
        <swiper
          :loop="true"
          :modules="modules"
          :pagination="{ clickable: true }"
          :space-between="50"
        >
          <swiper-slide v-for="image in product.images">
            <img
              class="object-cover object-center mx-auto mb-3"
              :src="image"
              :alt="product.title"
            />
          </swiper-slide>
        </swiper>

        <h1 class="mb-1">{{ product.title }}</h1>
        <span class="font-medium">${{ product.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { userProductsApi } from "../stores/products-api-store";
import { storeToRefs } from "pinia";

const router = useRouter(),
  modules = [Pagination],
  store = userProductsApi(),
  { productsByCaregory, loading } = storeToRefs(store),
  { getProductsByCategory } = store;

let categoryId = ref(localStorage.getItem("category"));

function openProductView({ id, title, description, images, price }) {
  router.push({ path: `/product/${title}` });

  localStorage.setItem(
    "product_obj",
    JSON.stringify({ title, description, images, price })
  );
}

watch(categoryId, (newCategoryId, oldCategoryId) => {
  if (newCategoryId !== oldCategoryId) {
    console.log(`Категория изменена: ${newCategoryId}`);
    getProductsByCategory(newCategoryId);
  }
});

onMounted(() => {
  getProductsByCategory(categoryId.value);
});
</script>
