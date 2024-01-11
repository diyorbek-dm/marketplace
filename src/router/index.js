import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/log-in",
      component: () => import("../pages/LogIn.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("../pages/SignIn.vue"),
    },
    {
      path: "/add-product",
      component: () => import("../pages/AddProduct.vue"),
    },
    {
      path: "/product/:id",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/category/:id",
      component: () => import("../pages/ProductsByCategory.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../pages/404.vue"),
    },
  ],
});

export default router;
