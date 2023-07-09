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
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/myRecepies",
    name: "userrecepies",
    component: () => import("./pages/UserRecepiesPage"),
  },
  {
    path: "/user/familyRecepies",
    name: "familyrecepies",
    component: () => import("./pages/FamilyRecepiesPage"),
  },
  {
    path: "/user/favoritesRecepies",
    name: "favoritesrecepies",
    component: () => import("./pages/FavoritesRecepiesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
