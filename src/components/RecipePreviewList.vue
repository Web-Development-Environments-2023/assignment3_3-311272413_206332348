<template>
  <div>
    <b-container class="title">
      <h3>
        {{ title }}
        <slot></slot>
      </h3>
    </b-container>
    <b-container v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
    </b-container>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
    colLen: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.recipePreview {
  padding-bottom: 5px;
  padding-left: 0;
  padding-right: 0;
}
</style>
