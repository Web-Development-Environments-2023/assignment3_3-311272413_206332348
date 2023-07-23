<template>
  <div class="recipe-preview">
    <b-container class="recipe-body">
      <b-row>
        <b-col>
          <div class="recipe-footer">
            <div class="recipe-title" :title="recipe.title">
              <h5>{{ recipe.title }}</h5>
            </div>
            <ul class="recipe-overview">
              <b-col>
                <b-row>
                  <li>
                    <img class="imageLogo" src="../assets/clockLogo.jpg" alt="Clock Icon" />
                  </li>
                </b-row>
                <li>{{ recipe.readyInMinutes }} minutes</li>
              </b-col>
              <b-col>
                <b-row>
                  <li>
                    <img class="imageLogo" src="../assets/favoriteLogo.png" alt="Favorite Icon" />
                  </li>
                </b-row>
                <b-row>
                  <li>{{ recipe.aggregateLikes }} likes</li>
                </b-row>
              </b-col>
            </ul>
            <ul class="recipe-overview">
              <b-col v-if="recipe.vegetarian">
                <b-row>
                  <li>
                    <img class="imageLogo" src="../assets/vegetrarian.jpg" />
                  </li>
                </b-row>
                <b-row>
                  <li>vegetarian</li>
                </b-row>
              </b-col>
            </ul>
          </div>
        </b-col>
        <b-col>
          <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
            <img v-if="recipe.image" :src="recipe.image" class="recipe-image" alt="Recipe Image" />
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px;
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin: auto;
  display: block;
  width: 98%;
  height: 200px;
  object-fit: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  width: 20%;
  text-align: center;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px;
  width: 100%;
  font-size: 14pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.imageLogo {
  height: 25px;
  width: auto;
  margin-top: 10px;
}

.recipe-preview .recipe-footer ul.recipe-diets-overview li {
  width: 20%;
  text-align: center;
}
</style>
