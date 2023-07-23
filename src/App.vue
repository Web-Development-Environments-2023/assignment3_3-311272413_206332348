<template>
  <div id="app">
    <div id="nav">
      <div class="navbar-left">
        <div class="logo">
          <img src="./assets/logo.png" alt="Logo" />
        </div>
        <router-link :to="{ name: 'main' }"> Recipes</router-link>
        <router-link :to="{ name: 'search' }">Search</router-link>
        <router-link :to="{ name: 'about' }">About</router-link>
      </div>

      <div class="navbar-right">
        <span v-if="!$root.store.username">
          Hello Guest |
          <router-link :to="{ name: 'register' }" class="navbar-link"
            >Register</router-link
          >
          <router-link :to="{ name: 'login' }" class="navbar-link"
            >Login</router-link
          >
        </span>
        <span v-else>
          <img class="userLogo" src="./assets/user.png" />
          <span class="username">{{ $root.store.username }}</span> |

          <div
            class="dropdown"
            @mouseenter="openDropdown"
            @mouseleave="closeDropdown"
          >
            <button class="dropbtn">
              Profile
              <img class="arrowLogo" src="./assets/arrow.png" />
            </button>

            <div class="dropdown-content" v-if="showDropdown">
              <router-link :to="{ name: 'favoritesrecipes' }"
                >Favorites</router-link
              >
              <router-link :to="{ name: 'userrecipes' }"
                >My Recipes</router-link
              >
              <router-link :to="{ name: 'familyrecipes' }"
                >Family Recipes</router-link
              >
              <button class="btn" id="show-modal" @click="showModal = true">
                Create recipe
              </button>
            </div>
          </div>
          <button @click="Logout">Logout</button>
        </span>
      </div>

      <modal :show="showModal" @close="showModal = false"></modal>
    </div>
    <router-view />
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
export default {
  name: "App",
  data() {
    return {
      showDropdown: false,
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  mounted() {
    if (localStorage.getItem("username") !== "undefined") {
      this.$root.store.username = localStorage.getItem("username");
      this.$root.store.watchedRecipes = JSON.parse(localStorage.getItem("watchedRecipes")) || [];
      this.$root.store.favoritesRecipes = JSON.parse(localStorage.getItem("favoritesRecipes")) || [];
    }
  },
  beforeUpdate() {
    if (this.$root.store.username) {
      localStorage.setItem(
        "watchedRecipes",
        JSON.stringify(this.$root.store.watchedRecipes)
      );
      localStorage.setItem(
        "favoritesRecipes",
        JSON.stringify(this.$root.store.favoritesRecipes)
      );
    }
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openDropdown() {
      this.showDropdown = true;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #77659c;
  font-size: 20px;
  color: white;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  margin-right: 10px;
  margin-left: 20px;
}

.logo img {
  height: 60px;
  width: auto;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-left a {
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  text-decoration: none;

  &:hover,
  &.router-link-exact-active {
    background-color: #9a85c5;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
}

.navbar-right a {
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  text-decoration: none;

  &:hover,
  &.router-link-exact-active {
    background-color: #9a85c5;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
}

.navbar-right span {
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

.userLogo {
  padding-bottom: 5px;
  padding-right: 5px;
  padding-left: 5px;
  height: 20px;
}

.arrowLogo {
  padding-bottom: 5px;
  height: 15px;
}

button {
  background-color: #77659c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 20px;

  &:hover {
    background-color: #9a85c5;
    font-weight: bold;
    border-radius: 5px;
  }
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 18px;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  color: black;
  text-decoration: none;
}

.dropbtn {
  background-color: #77659c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  outline: none;
  margin-right: 10px;
  font-size: 20px;

  &:hover,
  &:focus {
    background-color: #9a85c5;
    transform: scale(1.05);
  }
}

.navbar-link {
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover,
  &.router-link-exact-active {
    background-color: #9a85c5;
    font-weight: bold;
    color: white;
  }
}
</style>
