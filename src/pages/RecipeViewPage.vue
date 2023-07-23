<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <b-row>
          <b-col><img :src="recipe.image" class="left"/></b-col>
          <b-col>
            <div class="mb-3">
              <b-row>
                <b-col cols="1">
                  <img class="imageLogo" src="../assets/ServingLogo.png" />
                </b-col>
                <b-col> {{ recipe.servings }} Servings </b-col>
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
                <b-col>
                  Gluten Free
                </b-col>
              </b-row>
              <b-row v-if="recipe.vegan">
                <b-col cols="1">
                  <img class="imageLogo" src="../assets/vegan.png" />
                </b-col>
                <b-col>
                  Vegan
                </b-col>
              </b-row>
              <b-row v-if="recipe.vegetarian">
                <b-col cols="1">
                  <img class="imageLogo" src="../assets/vegetrarian.jpg" />
                </b-col>
                <b-col>
                  Vegetarian
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="recipe-body">
        <div>
          <div v-if="localStorageFlag">
            <div class="wrapped">
              <b>Ingredients:</b>
              <ul
                v-if="recipe.ingredients && recipe.ingredients.includes('\n')"
              >
                <li
                  v-for="(ingredient, index) in recipe.ingredients.split('\n')"
                  :key="index"
                >
                  {{ ingredient.trim() }}
                </li>
              </ul>
              <p v-else>
                {{ recipe.ingredients }}
              </p>
            </div>
            <div class="wrapped">
              <b>Instructions:</b>
              <ol
                v-if="recipe.instructions && recipe.instructions.includes('\n')"
              >
                <li
                  v-for="(instruction, index) in recipe.instructions.split(
                    '\n'
                  )"
                  :key="index"
                >
                  {{ instruction.trim() }}
                </li>
              </ol>
              <p v-else>
                {{ recipe.instructions }}
              </p>
            </div>
          </div>

          <div v-else>
            <div class="wrapped">
              <b>Ingredients:</b>
              <ul>
                <li
                  v-for="(r, index) in recipe.ingredients"
                  :key="index + '_' + r.id"
                >
                  {{ r.amount }} {{ r.unit }} {{ r.name }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <b>Instructions:</b>
              <ol
                v-for="(instruction, index) in recipe.analyzedInstructions"
                :key="index"
              >
                <li
                  v-for="(step, stepIndex) in instruction.steps"
                  :key="stepIndex"
                >
                  {{ step.step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      localStorageFlag: false,
    };
  },
  computed: {
    formattedIngredients() {
      if (!this.recipe || !this.recipe.ingredients) return "";

      let formatted = "";

      this.recipe.ingredients.forEach((ingredient, index) => {
        formatted += `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
        if (index !== this.recipe.ingredients.length - 1) {
          formatted += "<br />";
        }
      });

      return formatted;
    },

    formattedInstructions() {
      if (!this.recipe || !this.recipe.analyzedInstructions) return "";

      let formatted = "";
      let stepNumber = 1;

      this.recipe.analyzedInstructions.forEach((instruction) => {
        instruction.steps.forEach((step) => {
          formatted += `${stepNumber}. ${step.step}\n`;
          stepNumber++;
        });
      });

      return formatted;
    },
  },
  async created() {
    const recipeId = this.$route.params.recipeId;

    if (localStorage.getItem("flag") === "true") {
      this.localStorageFlag = true;

      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/userRecipes"
        );

        const recipes = response.data;
        const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
        console.log("selectedRecipe--------------------", selectedRecipe);

        if (selectedRecipe) {
          this.recipe = selectedRecipe;
        }
      } catch (error) {
        console.log(error);
      }

      localStorage.setItem("flag", JSON.stringify(false));
    } else {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/" + recipeId
        );

        this.recipe = response.data;

        if (!this.$root.store.isWatchedRecipesContainRecipe(this.recipe.id)) {
          this.$root.store.addToWatchedRecipes(this.recipe);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  methods: {
    removeTags(html) {
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.imageLogo {
  width: 20px;
  height: auto;
  margin: 0;
}
</style>
