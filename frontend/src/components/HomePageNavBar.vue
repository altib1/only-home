<template>
  <nav class="bg-white px-4 lg:px-6 py-2.5">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <a href="#" class="flex items-center ml-10">
        <img src="/logo@2x.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      </a>
      <div class="flex items-center lg:order-2">
        <!-- Condition pour afficher le bouton de connexion ou le bouton de profil -->
        <button
          v-if="!isLoggedIn"
          @click="openSignInPopup"
          class="btnEffect rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white"
        >
          Se connecter ou s’inscrire
        </button>
        <button
          v-else
          @click="openProfilePopup"
          class="rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white"
        >
          <i class="fa fa-user mr-2"></i> Profil
        </button>
        <!-- Fin de la condition -->
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 "
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="pl-40 hidden pl-100 justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
        >
          <li class="w-50"></li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-black-700"
              aria-current="page"
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-black-700 "
            >
              Fonctionnement
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-black-700"
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="isSignInPopupOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click="closeSignInPopup"
    >
      <div class="bg-white p-8 rounded-lg position-relative" @click.stop>
        <button @click="closeSignInPopup" class="absolute right-0 pr-8 text-gray-600">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <SignIn />
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import SignIn from "../pages/SignIn.vue";

export default defineComponent({
  name: "HomePageNavBar",
  components: {
    SignIn,
  },
  data() {
    return {
      isMenuOpen: false,
      isSignInPopupOpen: false,
      isLoggedIn: false, // Ajout d'une variable pour gérer l'état de connexion
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    openSignInPopup() {
      this.isSignInPopupOpen = true;
    },
    closeSignInPopup() {
      this.isSignInPopupOpen = false;
    },
    openProfilePopup() {
      // Implémentez la logique pour ouvrir la modale du profil ici
    },
  },
});
</script>
