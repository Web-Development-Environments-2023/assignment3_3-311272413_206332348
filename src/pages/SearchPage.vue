<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="searchFunc" @reset.prevent="resetForm">
      <div class="formQ">
        <b-form-group id="query">
          <b-form-input
            v-model="form.query"
            id="queryInput"
            name="query"
            type="text"
            class="formControl"
            placeholder="Enter key words here"
          ></b-form-input>
        </b-form-group>
      </div>
      <b-row class="dropDownForm">
        <div class="cuisineD">
          <b-dropdown
            id="cuisine"
            text="Cuisine"
            variant="primary"
            class="ml-3"
          >
            <b-dropdown-item
              href="#"
              v-for="cuisine in cuisinesOptions"
              :value="cuisine"
              :key="cuisine"
              @click="addFilterFunc('cuisine', cuisine)"
            >
              <option>
                {{ cuisine }}
              </option>
            </b-dropdown-item>
          </b-dropdown>
          <ul class="ulFilter">
            <li v-for="val in this.form.cuisine" :key="val">{{ val }}</li>
          </ul>
        </div>
        <div class="dietD">
          <b-dropdown id="diet" text="Diet" variant="primary" class="ml-3 ">
            <b-dropdown-item
              href="#"
              v-for="diet in dietsOptions"
              :value="diet"
              :key="diet"
              @click="addFilterFunc('diet', diet)"
            >
              <option>
                {{ diet }}
              </option>
            </b-dropdown-item>
          </b-dropdown>
          <ul class="ulFilter">
            <li v-for="val in this.form.diet" :key="val">{{ val }}</li>
          </ul>
        </div>
        <div class="intoleranceD">
          <b-dropdown
            id="intolerance"
            text="Intolerance"
            variant="primary"
            class="ml-3"
          >
            <b-dropdown-item
              href="#"
              v-for="intolerance in intolerancesOptions"
              :value="intolerance"
              :key="intolerance"
              @click="addFilterFunc('intolerance', intolerance)"
            >
              <option>
                {{ intolerance }}
              </option>
            </b-dropdown-item>
          </b-dropdown>
          <ul class="ulFilter">
            <li v-for="val in this.form.intolerance" :key="val">{{ val }}</li>
          </ul>
        </div>
      </b-row>
      <div class="formResNum">
        <b-form-select
          class="form-control"
          id="number"
          text="Enter number of results"
          v-model="form.number"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </b-form-select>
      </div>
      <div class="btnResAndSwarch">
        <b-button class="buttenReset" type="reset" variant="danger"
          >Reset</b-button
        >
        <b-button
          type="submit"
          variant="primary"
          class="ml-3 w-30"
          :disabled="resetDisabled"
        >
          Search
        </b-button>
      </div>
    </b-form>
    <div class="searchRes">
      <b-row>
        <b-col>
          <div>
            <div id="searchResults" v-if="!arrIsEmpty">
              <div class="filterRes">
                <label>Sort Results: </label>&nbsp;
                <select
                  name="sorts"
                  id="sort"
                  @change="sortResults($event)"
                  class="form-control"
                  v-model="selectedStatus"
                >
                  <option selected disabled value="0">Select option</option>
                  <option value="likes">Recipe's Popularity</option>
                  <option value="time">Preparation Time</option>
                </select>
              </div>
              <ShowenRecipes
                class="Search Results"
                :fullRecipes="recipes"
                title="Search Results"
                :colLen="recipes.length"
                :pageStartSearch="pageSearch"
              ></ShowenRecipes>
            </div>
            <div v-else>
              <h2>Search Results:</h2>
              <h6>
                <strong
                  >Please enter recipe parameters to the search line
                </strong>
              </h6>
              <h6><strong>and press on theSearch button. </strong></h6>
            </div>
          </div>
        </b-col>

        <b-col>
          <div v-if="lastRecipesRestore != null">
            <p class="lastSearchForm">
              <strong>Past Query: </strong> {{ this.lastestSearch }}<br />
              <strong>Diet: </strong> {{ this.lastestDietFilter }}<br />
              <strong>Cuisine: </strong> {{ this.lastestCuisineFilter }}<br />
              <strong>intolerance: </strong> {{ this.lastestIntoleranceFilter
              }}<br />
            </p>

            <ShowenRecipes
              class="last Results"
              :fullRecipes="lastRecipesRestore"
              title="Yout last searched recipes"
              :colLen="recipes.length"
              :pageStartSearch="pageSearch"
            ></ShowenRecipes>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import RecipePreviewListSearch from "../components/RecipePreviewListSearch";
import ShowenRecipes from "../components/ShowenRecipes";

import diets from "../assets/diets";
import cuisines from "../assets/cuisines";
import intolerances from "../assets/intolerances";
import RecipePreview from "../components/RecipePreview";
import RecipePreviewSearch from "../components/RecipePreviewSearch.vue";
export default {
  name: "SearchPage",
  components: {
    ShowenRecipes,
  },
  data() {
    return {
      form: {
        query: "",
        number: 10,
        cuisine: [],
        diet: [],
        intolerance: [],
      },
      recipes: [],
      cuisinesOptions: cuisines,
      dietsOptions: diets,
      intolerancesOptions: intolerances,
      pageSearch: 0,

      lastestSearch: null,
      lastestDietFilter: null,
      lastestCuisineFilter: null,
      lastestIntoleranceFilter: null,
      lastRecipesRestore: null,

      currentSearch: null,
      currentDietFilter: null,
      currentCuisineFilter: null,
      currentIntoleranceFilter: null,
    };
  },

  mounted() {
    if ("username" in localStorage) {
      if (localStorage.getItem("username") !== "undefined") {
        this.lastestSearch = localStorage.getItem("lastestSearch");
        this.lastestDietFilter = localStorage.getItem("lastestDietFilter");
        this.lastestCuisineFilter = localStorage.getItem(
          "lastestCuisineFilter"
        );
        this.lastestIntoleranceFilter = localStorage.getItem(
          "lastestIntoleranceFilter"
        );
        this.lastRecipesRestore = JSON.parse(
          localStorage.getItem("lastRecipesRestore")
        );
      }
    }
  },
  computed: {
    arrIsEmpty() {
      console.log("this.recipes: ", this.recipes);
      if (Array.isArray(this.recipes) && this.recipes.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    resetDisabled() {
      if (
        this.form.query === null ||
        this.form.query === "" ||
        this.form.query.value === 0
      ) {
        return true;
      }
      return false;
    },
    sortByLikes() {
      function compare(x, y) {
        if (x.popularity < y.popularity) return 1;
        if (x.popularity > y.popularity) return -1;
        return 0;
      }
      return [...this.recipes].sort(compare);
    },
    sortByTime() {
      function compare(x, y) {
        if (x.readyInMinutes < y.readyInMinutes) return -1;
        if (x.readyInMinutes > y.readyInMinutes) return 1;
        return 0;
      }
      return [...this.recipes].sort(compare);
    },
  },

  methods: {
    addFilterFunc(filter, event) {
      let filterArr = this.form[filter];

      if (filterArr.includes(event)) {
        const index = filterArr.indexOf(event);
        if (index > -1) {
          filterArr.splice(index, 1);
        }
      } else {
        this.form[filter].push(event);
      }
      this.form[filter] = filterArr;
    },
    updateLastSearchDetails() {
      if (localStorage.username) {
        if (localStorage.getItem("username") !== "undefined") {
          this.lastestSearch = localStorage.getItem("lastestSearch");
          this.lastestDietFilter = localStorage.getItem("lastestDietFilter");
          this.lastestCuisineFilter = localStorage.getItem(
            "lastestCuisineFilter"
          );
          this.lastestIntoleranceFilter = localStorage.getItem(
            "lastestIntoleranceFilter"
          );
          this.lastRecipesRestore = JSON.parse(
            localStorage.getItem("lastRecipesRestore")
          );
        }
      }
    },
    sortResults(event) {
      if (event.target.value === "likes") {
        this.recipes = this.sortByLikes;
      }
      if (event.target.value === "time") {
        this.recipes = this.sortByTime;
      }
    },

    async searchFunc() {
      try {
        this.selectedStatus = "0";
        this.pageSearch = 0;
        this.updateLastSearchDetails();
        this.currentSearch = this.form.query;
        this.currentDietFilter = this.form.diet;
        this.currentCuisineFilter = this.form.cuisine;
        this.currentIntoleranceFilter = this.form.intolerance;

        const response = await this.axios.get(
          ` ${this.$root.store.server_domain}/recipes/search/query/${this.form.query}?amount=${this.form.number}`,
          {
            params: {
              cuisine: this.currentCuisineFilter.toString(),
              diet: this.currentDietFilter.toString(),
              intolerance: this.currentIntoleranceFilter.toString(),
            },
          }
        );
        if (localStorage.username) {
          if (localStorage.getItem("username") !== "undefined") {
            localStorage.setItem("lastestSearch", this.currentSearch);
            localStorage.setItem("lastestDietFilter", this.currentDietFilter);
            localStorage.setItem(
              "lastestCuisineFilter",
              this.currentCuisineFilter
            );
            localStorage.setItem(
              "lastestIntoleranceFilter",
              this.currentIntoleranceFilter
            );
            localStorage.setItem(
              "lastRecipesRestore",
              JSON.stringify(response.data)
            );
          }
        }
        this.recipes = [];
        this.recipes = response.data;
        console.log("kathy-------: ", this.recipes);
        return this.recipes;
      } catch (err) {
        console.log(err);
      }
    },
    resetForm() {
      this.form = {
        query: "",
        number: 5,
        cuisine: [],
        diet: [],
        intolerance: [],
      };
    },
  },
};
</script>
<style>
.ulFilter {
  list-style: none;
}
.searchRes {
  padding-top: 60px;
}
.btnResAndSwarch {
  padding-top: 15px;
}
.dropDownForm {
  padding-top: 0px;
}
.formResNum {
  width: 14.5%;
}
.lastSearchForm {
  height: 100%;
  width: 100%;
  padding-left: 35.5%;
  padding-right: 35.5%;
  margin-right: 0;
  margin-left: 0;
}
.filterRes {
  height: 100%;
  width: 100%;
  padding-left: 35.5%;
  padding-right: 35.5%;
  padding-top: 5.6%;
  padding-bottom: 5.6%;
  margin-right: 0;
  margin-left: 0;
}
label {
  display: inline-block;
  margin-bottom: 0.63rem;
  font-weight: bold;
  padding-left: 20%;
}
</style>
