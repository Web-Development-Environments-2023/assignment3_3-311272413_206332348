<template>
  <div class="results">
    <div class="group of recipes">
      <RecipePreviewList
        class="RecipesPreview"
        :recipes="fullRecipes.slice(retSize * 5, retSize * 5 + 5)"
        :title="title"
        :colLen="fullRecipes.length"
      ></RecipePreviewList>
      {{ retSize }}/{{ maxPageF }}
    </div>
    <div class="buttons">
      <b-button
        variant="dark"
        class="prevButton"
        @click="prev"
        :disabled="prevDisabled"
      >
        Previous
      </b-button>
      <b-button
        variant="dark"
        class="nextButton"
        @click="next"
        :disabled="nextDis"
      >
        Next
      </b-button>
    </div>
  </div>
</template>
<script>
import RecipePreviewList from "./RecipePreviewList.vue";
export default {
  name: "ShowenRecipes",
  components: {
    RecipePreviewList,
  },
  props: {
    fullRecipes: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    colLen: {
      type: Number,
      required: true,
    },
    pageStartSearch: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      fiveRecipes: this.fullRecipes.slice(this.page * 5, this.page * 5 + 5),
      page: 0,
      maxPage: Math.ceil(this.fullRecipes.length / 5) - 1,
      prevDisabled: true,
      nextDisabled: this.nextDis,
      searchClickNow: this.pageStartSearch,
    };
  },
  computed: {
    retSize() {
      if (this.searchClickNow === 0) {
        return 0;
      } else {
        return this.page;
      }
    },
    maxPageF() {
      return Math.ceil(this.fullRecipes.length / 5) - 1;
    },
    nextDis() {
      if (this.maxPageF > 0 && this.page < this.maxPageF) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    console.log("mounted, this.fiveRecipes", this.fiveRecipes);
    this.maxPage = Math.ceil(this.fullRecipes.length / 5) - 1;
    if (this.maxPageF > 0 && this.page < this.maxPageF) {
      this.nextDisabled = false;
    } else {
      this.nextDisabled = true;
    }

    this.searchClickNow = this.pageStartSearch;
    this.page = 0;
  },
  methods: {
    next() {
      this.searchClickNow = 1;

      if (this.page < this.maxPageF) {
        this.page++;
        this.fiveRecipes = this.fullRecipes.slice(
          this.page * 5,
          this.page * 5 + 5
        );
        this.prevDisabled = false;
      }
      if (this.page == this.maxPageF) {
        this.nextDisabled = true;
      }
      return this.fiveRecipes;
    },
    prev() {
      if (this.page > 0) {
        this.page--;
        this.fiveRecipes = this.fullRecipes.slice(
          this.page * 5,
          this.page * 5 + 5
        );
        this.nextDisabled = false;
      }
      if (this.page === 0) {
        this.prevDisabled = true;
      }
      return this.fiveRecipes;
    },
  },
};
</script>
