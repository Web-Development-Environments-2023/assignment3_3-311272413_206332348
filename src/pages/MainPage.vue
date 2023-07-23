<template>
  <div>
    <b-container>
      <b-row class="title-row">
        <b-col>
          <h1 class="title">
            Monica's recipe blog
            <span class="logo">
              <img src="../assets/chickenGif.gif" alt="Logo" />
            </span>
          </h1>
        </b-col>
      </b-row>

      <!-- Left Column -->
      <b-row class="recipes">
        <b-col cols="6" class="randomCol">
          <RecipePreviewList
            class="recipesCol"
            title="Explore these recipes"
            :recipes="this.randomRecipes"
            :colLen="recipeList"
          ></RecipePreviewList>
          <b-button class="refresh" @click="updateRandomRecipes">
            Get new
          </b-button>
        </b-col>

        <!-- Right Column -->
        <b-col v-if="!$root.store.username" cols="6" class="GuestCol">
          <LoginPage />
        </b-col>
        <b-col v-else cols="6">
          <RecipePreviewList
            title="Last watched recipes"
            :recipes="this.lastViewdRecipes"
            :colLen="recipeList"
            :class="{
              recipesCol: true,
              blur: !$root.store.username,
              center: true,
            }"
            disabled
          ></RecipePreviewList>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    LoginPage,
  },
  data() {
    return {
      randomRecipes: [],
      lastViewdRecipes: [],
      recipeList: 3,
    };
  },
  async mounted() {
    this.updateLastViewdRecipes();
    this.updateRandomRecipes();

  },
  watch: {
    "$root.store.username": function(newUsername, oldUsername) {
      if (newUsername !== oldUsername) {
        this.updateLastViewdRecipes();
      }
    },
  },

  methods: {
    async updateRandomRecipes() {
      try {
        const response = await this.$root.apiRequest.get("/recipes/random");
        const recipes = response.data;
        this.randomRecipes = [];
        this.randomRecipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async updateLastViewdRecipes() {
      if (this.$root.store.username) {
        try {
          let watchedRecipesIds = this.$root.store
            .getWatchedRecipesIds()
            .join(",");
          const response = await this.$root.apiRequest.get(
            "/recipes/recipesBulk",
            {
              params: {
                recipesIds: watchedRecipesIds,
              },
            }
          );
          this.lastViewdRecipes = response.data.slice(0, 3);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  text-align: center;
}

.randomCol {
  display: flex;
  flex-direction: column;
}

.refresh {
  display: block;
  margin: auto;
}

.guestRow {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.GuestCol {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-right: 10px;
  margin-left: 20px;
}

.logo img {
  height: 140px;
  width: auto;
}

.recipesCol {
  padding: 0;
  font-family: "Montserrat", sans-serif;
}
</style>
