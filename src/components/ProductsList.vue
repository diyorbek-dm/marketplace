<template>
  <div
    class="my-6 mx-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
  >
    <h1 v-show="loading" class="font-bold m-2">Loading...</h1>

    <div v-for="product in products">
      <div
        @click="
          openProductView({
            id: product.doc_id,
            title: product.title,
            price: product.price,
            images: product.images,
            description: product.description,
            category: product.category.name,
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

        <div class="flex flex-col justify-start">
          <h1 class="mb-1">{{ product.title }}</h1>
          <span class="font-medium">${{ product.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { userProductsApi } from "../stores/products-api-store";
import { storeToRefs } from "pinia";

const router = useRouter(),
  modules = [Pagination],
  store = userProductsApi(),
  { products, loading } = storeToRefs(store),
  { getProducts } = store;

function openProductView({ id, title, price, images, description, category }) {
  router.push({ path: `/product/${title}` });

  // * Open Product in new Window
  // window.open(`/product/${id}`, "_blank");

  console.log(category);

  localStorage.setItem(
    "product_obj",
    JSON.stringify({ id, title, price, images, description, category })
  );
}

onMounted(() => {
  getProducts();
});
</script>
