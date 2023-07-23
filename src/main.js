import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
axios.defaults.withCredentials = true;

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: "https://grammy-recipe.cs.bgu.ac.il"
  // baseURL: "http://localhost:80",
});

const shared_data = {
  username: localStorage.username,
  server_domain: "https://grammy-recipe.cs.bgu.ac.il",
  // server_domain: "http://localhost:80",

  watchedRecipes: [],
  favoritesRecipes: [],

  async login(username) {
    let response = await axios.get(
      shared_data.server_domain + "/users/watchedRecipe"
    );

    this.watchedRecipes = [
      parseInt(response.data.recipeID_1),
      parseInt(response.data.recipeID_2),
      parseInt(response.data.recipeID_3),
    ];

    localStorage.setItem("username", username);
    this.username = username;

    const response_2 = await axios.get(
      shared_data.server_domain + "/users/favorites"
    );
    console.log("response_2", response_2);

    const favoriteRecipeIds = response_2.data.map((recipe) => recipe.id);
    shared_data.setFavoritesRecipes(favoriteRecipeIds);
  },

  /* --------------------------------------watched-------------------------------------- */
  setWatchedRecipes(recipes) {
    recipes.map((recipe) => {
      this.watchedRecipes.push(recipe.id);
    });
  },
  addToWatchedRecipes(recipe) {
    if (this.watchedRecipes) {
      this.watchedRecipes.unshift(recipe.id);
    }
  },
  isWatchedRecipesContainRecipe(recipeId) {
    var flag = false;
    this.watchedRecipes.map((recipe) => {
      if (recipe == recipeId) flag = true;
    });
    return flag;
  },
  removeFromWatchedRecipes(recipe) {
    if (this.watchedRecipes)
      var index = this.watchedRecipes.indexOf(recipe.id);
    this.watchedRecipes.splice(index, 1);
  },
  getWatchedRecipesIds() {
    return this.watchedRecipes;
  },
  async updateWatched() {
    try {
      if (shared_data.watchedRecipes.length === 0) return;
      const response = await axios.post(
        shared_data.server_domain + "/users/watchedRecipe",
        {
          recipe_ids: shared_data.watchedRecipes,
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  /* --------------------------------------Favorites-------------------------------------- */
  setFavoritesRecipes(recipes) {
    this.favoritesRecipes = recipes;
  },
  addToFavoritesRecipes(recipe) {
    if (this.favoritesRecipes) {
      this.favoritesRecipes.unshift(recipe.id);
    }
  },
  removeFromFavoritesRecipes(recipe) {
    if (this.favoritesRecipes)
      var index = this.favoritesRecipes.indexOf(recipe.id);
    this.favoritesRecipes.splice(index, 1);
  },
  isFavoritesRecipesContainRecipe(recipeId) {
    return this.favoritesRecipes?.indexOf(recipeId) != -1 || false;
  },
  getFavoritesRecipesIds() {
    let favoritesRecipesIds = [];

    let len = this.favoritesRecipes.length;
    while (len > 0 && favoritesRecipesIds.length < 3) {
      var recipe = this.watchfavoritesRecipesdRecipes[len - 1];
      favoritesRecipesIds.push(recipe.toString());
      len -= 1;
    }
    return favoritesRecipesIds;
  },

  /* --------------------------------------Favorites-------------------------------------- */
  logout() {
    localStorage.removeItem("username");
    this.username = undefined;
    this.updateWatched();
    this.watchedRecipes = [];
    this.favoritesRecipes = [];
    localStorage.setItem("favoritesRecipes", null);
    localStorage.setItem("watchedRecipes", null);
    localStorage.setItem("lastestSearch", null);
    localStorage.setItem("lastestDietFilter", null);
    localStorage.setItem("lastestCuisineFilter", null);
    localStorage.setItem("lastestIntoleranceFilter", null);
    localStorage.setItem("lastRecipesRestore", null);
    localStorage.setItem("selectedRecipe", null);
  },
};

new Vue({
  router,
  data() {
    return {
      store: shared_data,
      apiRequest: apiInstance,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
