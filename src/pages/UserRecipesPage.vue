<template>
    <div>
      <h1>User Recipes</h1>
      <b-container>
        <b-row>
          <b-col>
            <div v-for="r in recipes" :key="r.id">
              <RecipePreview :recipe="r" />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import RecipePreview from "../components/RecipePreview.vue";
  
  export default {
    name: "userRecipesPage",
    components: {
      RecipePreview,
    },
    data() {
      return {
        recipes: [],
      };
    },
    methods: {
      fetchMyRecipes() {
        return this.axios.get(
          this.$root.store.server_domain + "/users/userRecipes",
          { withCredentials: true }
        );
      },
    },
    async mounted() {
      try {
        const response = await this.fetchMyRecipes();
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
  
        localStorage.setItem("flag", JSON.stringify(true));
      } catch (error) {
        console.log(error);
      }
    },
  };
  </script>
  
  <style scoped></style>
  