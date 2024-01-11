<template>
  <div class="relative flex space-x-5 m-2">
    <div class="w-3/5">
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
    </div>

    <div class="w-2/5 flex flex-col space-y-10">
      <div class="">
        <h1 class="text-2xl">{{ product.title }}</h1>
        <h2 class="font-bold">${{ product.price }}</h2>
        <p>{{ product.description }}</p>
      </div>

      <div class="flex space-x-3">
        <button
          class="border rounded-lg bg-indigo-500 py-2 px-5 text-white"
          @click="openModalUpdate"
        >
          Update
        </button>

        <button
          class="border rounded-lg bg-red-500 py-2 px-5 text-white"
          @click="deleteProductFunc"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Modal Update -->
    <form v-show="update" @submit.prevent="updateProductFunc">
      <div
        class="w-2/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border-2 bg-slate-300 border-gray-500 p-5 rounded-lg"
      >
        <h1 class="text-2xl font-semibold">Update Product</h1>

        <div class="mt-6 flex flex-col space-y-5">
          <div class="form-item">
            <label for="image">Cahnge image</label>

            <img class="w-full h-96" :src="productImages" alt="" />

            <!-- <swiper
            :loop="true"
            :modules="modules"
            :pagination="{ clickable: true }"
            :space-between="50"
          >
            <swiper-slide v-for="image in images">
              <img
                class="w-16 object-cover object-center mx-auto mb-3"
                :src="image"
                :alt="title"
              />
            </swiper-slide>
          </swiper> -->
          </div>

          <div class="form-item">
            <label for="title">Title</label>
            <input
              v-model="productTitle"
              class="form-input"
              type="text"
              placeholder="Enter new Title: "
            />

            <span>{{ product.id }}</span>
          </div>

          <div class="form-item">
            <label for="description">Description</label>
            <textarea
              v-model="productDescription"
              type="text"
              placeholder="Enter new Description"
              class="form-input w-full resize-none"
              rows="4"
            ></textarea>
          </div>

          <div class="form-item">
            <label for="price">Price</label>
            <input
              v-model="productPrice"
              class="form-input"
              type="number"
              placeholder="Enter new Price: "
            />
          </div>

          <div class="form-item">
            <label for="category">Choose category</label>
            <select v-model="productCategory">
              <option value="Closthes">Closthes</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Shoes">Shoes</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Computers">Computers</option>
            </select>
          </div>

          <button
            class="border rounded-lg bg-indigo-500 py-2 px-5 text-white"
            @click="updateProductFunc"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { userProductsApi } from "../stores/products-api-store";

const router = useRouter(),
  modules = [Pagination],
  product = JSON.parse(localStorage.getItem("product_obj")),
  store = userProductsApi(),
  { updateProduct, deleteProduct } = store;

let productTitle = ref(product.title),
  productDescription = ref(product.description),
  productPrice = ref(product.price),
  productImages = ref([product.images]),
  productCategory = ref(product.category),
  update = ref(false);

const openModalUpdate = () => {
  update.value = true;

  console.log(productCategory.value);
};

const updateProductFunc = () => {
  updateProduct(product.id, {
    title: productTitle.value,
    description: productDescription.value,
    price: productPrice.value,
    // images: [productImages],
    category: productCategory.value,
  });

  console.log("Updated");
};

const deleteProductFunc = () => {
  // * TODO: The router will goes to the seller's account
  router.push("/");

  // * TODO: Show modal to be sure: Are you sure to delete this product? Yes/No
  deleteProduct(product.id);
  localStorage.removeItem("product_obj");
};
</script>
