<template>
  <nav class="fixed top-0 w-full z-50 bg-white px-4 lg:px-6 py-2.5">
    <div class="flex flex-wrap justify-evenly items-center mx-auto">
      <a href="#" class="flex items-center ml-10">
        <img src="/logo@2x.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      </a>
      <div class="flex items-center lg:order-2">
        <button
          @click="toggleMenu"
          type="button"
          class="inline-flex items-center justify-center p-2 ml-1 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          aria-controls="mobile-menu-2"
          :aria-expanded="isMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div 
        :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }" 
        class="pl-100 justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
        >
          <li class="text-center">
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-black-700"
              aria-current="page"
            >
              Accueil
            </a>
          </li>
          <li class="text-center">
            <a
              href="#about"
              class="block py-2 pr-4 pl-3 text-black-700 "
            >
              Fonctionnement
            </a>
          </li>
          <li class="text-center">
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-black-700"
            >
              Blog
            </a>
          </li>
          <li v-if="!isLoggedIn" class="text-center flex justify-center">
            <button
              @click="openSignInPopup"
              class="rounded-5 text-center [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white"
            >
              Se connecter ou s’inscrire
            </button>
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
        <button @click="closeSignInPopup" class="absolute right-0 pr-8 text-gray-600" type="button">
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
    <div
      v-if="isProfilePopupOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click="closeProfilePopup"
    >
      <div class="bg-white p-8 rounded-lg position-relative" @click.stop>
        <button @click="closeProfilePopup" class="absolute right-0 pr-8 text-gray-600" type="button">
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
        <Profile />
      </div>
    </div>
  </nav>
</template>




<script>
import { defineComponent, ref } from "vue";
import SignIn from "../pages/SignIn.vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "HomePageNavBar",
  components: {
    SignIn,
  },
  setup() {
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isSignInPopupOpen = ref(false);
    const isLoggedIn = ref(false); // Ajout d'une variable pour gérer l'état de connexion

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const openSignInPopup = () => {
      if(window.innerWidth <= 600) {
        router.push('/sign-in'); // replace '/sign-in' with your sign-in page route
      } else {
        isSignInPopupOpen.value = true;
      }
    };

    const closeSignInPopup = () => {
      isSignInPopupOpen.value = false;
    };

    const openProfilePopup = () => {
      // Implémentez la logique pour ouvrir la modale du profil ici
    };

    return {
      isMenuOpen,
      isSignInPopupOpen,
      isLoggedIn,
      toggleMenu,
      openSignInPopup,
      closeSignInPopup,
      openProfilePopup
    };
  },
});
</script>

