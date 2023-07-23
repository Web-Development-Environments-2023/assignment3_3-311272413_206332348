<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Add Recipe</h3>
          </div>

          <div class="modal-body">
            <form id="contact-form" @submit.prevent="onSubmit" @reset.prevent="resetForm" class="split-form">
              <div class="form-left">
                <div class="form-group">
                  <label for="recipeName">Recipe Name</label>
                  <input id="recipeName" class="form-control" type="text" v-model="title" placeholder="Recipe name" />
                </div>
                <div class="form-group">
                  <label for="ingredients">Ingredient List</label>
                  <textarea class="form-control" id="ingredients" v-model="ingredients" placeholder="Ingredient list" rows="5"></textarea>
                </div>
                <div class="form-group">
                  <label for="instructions">Instructions</label>
                  <textarea class="form-control" id="instructions" v-model="instructions" placeholder="Instructions" rows="5"></textarea>
                </div>
              </div>

              <div class="form-right">
                <div class="form-group">
                  <label for="time">Preparation time
                    <input id="time" type="number" v-model="readyInMinutes" min="1" max="500"></label>
                </div>

                <div class="form-group checkbox-group">
                  <label><strong>Special Diet</strong>
                  <div class="checkbox-container">
                    <div class="checkbox-item">
                      <label for="vegetarian">
                        <input id="vegetarian" type="checkbox" v-model="vegetarian">
                        Vegetarian</label>
                    </div>
                    <div class="checkbox-item">
                      <label for="glutenFree">
                        <input id="glutenFree" type="checkbox" v-model="glutenFree" >
                        Gluten Free</label>
                    </div>
                    <div class="checkbox-item">
                      <label for="vegan">
                        <input id="vegan" type="checkbox" v-model="vegan">
                        Vegan</label>
                    </div>
                  </div>
                </label>
                </div>

                <div class="form-group">
                  <label for="serving">
                  <input id="serving" type="number" v-model="servings" min="1" max="100">
                  Servings</label>
                </div>

                <div class="form-group">
                <label for="imageURL">Recipe Image URL</label>
                <input id="imageURL" class="form-control" type="text" v-model="recipeImageURL" placeholder="Recipe Image URL" />
              </div>
              </div>
              
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>

          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">Close</button>
          </div>

        </div>
      </div>
    </div>
  </transition>


</template>



<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      id: '',
      title: '',
      ingredients: '',
      instructions: '',
      readyInMinutes: 1,
      glutenFree: false,
      vegan: false,
      vegetarian: false,
      servings: 0,
      recipeImageURL: '',
    }
  },
  methods:{
    async onSubmit(){
      console.log(this.$root.store.server_domain + "/users/userRecipes")
      const imageUrl = this.recipeImageURL ? this.recipeImageURL : 'https://spoonacular.com/recipeImages/642259-556x370.jpg%20recipe.image';

      try{
      let fullRecipe = {
        servings: this.servings,
        instructions: this.instructions,
        ingredients: this.ingredients}

      const response = await this.axios.post(
        this.$root.store.server_domain + "/users/userRecipes",
        {
            title: this.title,
            readyInMinutes: this.readyInMinutes,
            image: imageUrl,
            vegan: this.vegan,
            vegetarian: this.vegetarian,
            glutenFree: this.glutenFree,
            fullRecipe: fullRecipe
        }
      );
      this.resetForm()
      } catch(error){
        console.log(error)
        alert("Something went wrong.\nPlease try again.")
      }


    },
    resetForm(){
      this.title= '',
      this.ingredients= '',
      this.instructions= '',
      this.readyInMinutes= 1,
      this.glutenFree= false,
      this.vegan= false,
      this.vegetarian= false,
      this.servings= 0,
      this.image= null
    },
  },
  mounted(){
  }
}

</script>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  color: black;
}

.modal-wrapper {
  width: 90%;
  height: 90%;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: auto;
}

.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.modal-container::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.split-form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.form-left {
  flex: 1;
  padding-right: 10px;
}

.form-right {
  flex: 1;
  padding-left: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.checkbox-container {
  display: flex;
}

.checkbox-item {
  margin-right: 20px;
}

button[type="submit"] {
  margin-top: 10px;
  align-self: center;
}

/* Optional: Adjust the width of specific form elements as needed */
.form-left .form-group,
.form-right .form-group {
  width: 100%;
}

/* Optional: Adjust the width of the form columns for different screen sizes */
@media (min-width: 768px) {
  .form-left {
    flex: 0 0 50%;
    padding-right: 20px;
  }
  .form-right {
    flex: 0 0 50%;
    padding-left: 20px;
  }
}
</style>
