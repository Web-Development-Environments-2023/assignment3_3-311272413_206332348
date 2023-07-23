<template>
  <label :class="heartClass" @click="onClick">
    <input
      class="favorite__checkbox"
      type="checkbox"
      :name="name"
      :checked="computedValue"
      :disabled="disabled"
    />
    &#9829;
  </label>
</template>
<script>
export default {
  name: "FavoriteButton",
  props: {
    name: {
      type: String,
      default: "favoriteBtn",
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    heartClass() {
      return {
        favorite__heart: true,
        favorite__heart__selected: this.computedValue,
        "is-disabled": this.disabled,
      };
    },
    computedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    onClick() {
      this.computedValue = !this.computedValue;
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
.favoriting {
  display: inline-block;
}

.favorite__heart {
  display: inline-block;
  padding: 0px 5px;
  vertical-align: middle;
  font-size: 20px;
  color: #ababab;
  cursor: pointer;
  transition: color 0.2s ease-out;
  margin: 0;
}

.favorite__heart.is-disabled:hover {
  cursor: default;
}

.favorite__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: 0;
}

.favorite__heart__selected {
  color: #df470b;
}
</style>
