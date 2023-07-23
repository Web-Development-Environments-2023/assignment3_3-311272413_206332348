import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/getRecipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/myrecipes",
    name: "userrecipes",
    component: () => import("./pages/UserRecipesPage"),
  },

  {
    path: "/user/familyrecipes",
    name: "familyrecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/user/favorites",
    name: "favoritesrecipes",
    component: () => import("./pages/FavoritesRecipesPage"),
  },

  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
