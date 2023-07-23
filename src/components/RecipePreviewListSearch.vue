<template>
    <b-container>
      <h3 style="text-align: left;">
        <span v-if="title">{{ title }}:</span>
      </h3>
      <div v-if="recipes.length>0">
        <b-row :cols="colLen/5" >
          <b-col v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
          </b-col>
        </b-row>
      </div>
      <div v-else>
        Apologies, but the search did not yield any results. Please attempt another search.
        <br/>
      </div>
    </b-container>
  </template>
  
  <script>
  import RecipePreview from "./RecipePreview.vue";
  export default {
    name: "RecipePreviewListSearch",
    components: {
      RecipePreview
    },
    props: {
      recipes:{
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: false
      },
      colLen: {
        type: Number,
        required: true
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    min-height: 400px;
  }
  </style>
  