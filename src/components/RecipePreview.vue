<template>
  <b-container class="preview">
    <b-row class="head" align-h="start">
      <b-col class="recipe-title">
        <router-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
          class="recipe-preview"
        >
          {{ recipe.title }}
        </router-link>
      </b-col>
      <b-col v-if="this.$root.store.username" cols="1.5">
        <svg
          v-if="this.isWatched"
          class="viewdLogo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"
          />
        </svg>
        <FavoriteButton
          name="favoriteBtn"
          :value="this.isLiked"
          @click="changeFavorite"
        />
      </b-col>
    </b-row>
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <b-row align-h="start">
        <b-col cols="5">
          <img :src="recipe.image" class="recipe-image" />
        </b-col>
        <b-col class="recipe-body-overview">
          <b-row>
            <b-col cols="1">
              <svg
                class="imageLogo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"
                />
              </svg>
            </b-col>
            <b-col>{{ recipe.readyInMinutes }} Minutes </b-col>
          </b-row>
          <b-row>
            <b-col cols="1">
              <svg
                class="imageLogo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z"
                />
              </svg>
            </b-col>
            <b-col> {{ recipe.popularity }} Likes </b-col>
          </b-row>

          <b-row v-if="recipe.glutenFree">
            <b-col cols="1">
              <img class="imageLogo" src="../assets/GlutenFree.jpg" />
            </b-col>
            <b-col> Gluten Free </b-col>
          </b-row>
          <b-row v-if="recipe.vegan">
            <b-col cols="1">
              <img class="imageLogo" src="../assets/vegan.png" />
            </b-col>
            <b-col> Vegan </b-col>
          </b-row>
          <b-row v-if="recipe.vegetarian">
            <b-col cols="1">
              <img class="imageLogo" src="../assets/vegetrarian.jpg" />
            </b-col>
            <b-col> Vegetarian </b-col>
          </b-row>
        </b-col>
      </b-row>
    </router-link>
  </b-container>
</template>

<script>
import FavoriteButton from "./FavoriteButton.vue";
export default {
  name: "RecipePreview",
  components: {
    FavoriteButton,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isWatched: false,
      isLiked: false,
    };
  },
  created() {
    if (this.$root.store.isFavoritesRecipesContainRecipe(this.recipe.id))
      this.isLiked = true;
    if (this.$root.store.isWatchedRecipesContainRecipe(this.recipe.id))
      this.isWatched = true;
  },
  methods: {
    async changeFavorite() {
      try {
        console.log("changeFavorite");
        const recipeId = this.recipe.id;

        if (!this.isLiked) {
          console.log("else", this.recipe);
          const response = await this.$root.apiRequest.post(
            "/users/favorites/",
            {
              recipe_id: this.recipe.id,
            }
          );
        }

        this.isLiked = !this.isLiked;
        console.log(
          `Changed recipe ${recipeId} favorite tag to ${this.isLiked}`
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
}
a:hover {
  color: #42b983;
  text-decoration: none;
}

.container:hover {
  color: #42b983;
}
.recipe-preview {
  margin: 0;
}
.head {
  padding-bottom: 0px;
  border-top: 1px solid black;
  align-items: center;
  line-height: 1.5;
}

.recipe-title {
  font-weight: bold;
}

.viewdLogo {
  width: 15px;
  height: auto;
  margin: 0;
}

.imageLogo {
  width: 15px;
  height: auto;
  margin: 0;
}

ul {
  padding-inline-start: 0;
  list-style-type: none;
}

.recipe-image {
  width: 80%;
}
</style>
