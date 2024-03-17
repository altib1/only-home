<template>
          <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-5">
                <b class="text-[2.25rem] lg:w-[27rem] w-full text-center" >
                  <span class="text-[#EF282F]">Trouvez</span>
                  <span class="text-[#19347D]"> votre logement et </span>
                  <span class="text-[#EF282F]">gagnez</span>
                  <span class="text-[#19347D]"> du temps</span>
                </b>
                <div class="text-bleu-900 lg:w-[32.56rem] w-full text-left mt-5 " >
                  Avec OnlyHome, vous pouvez déposer vos annonces avec une garantie de
                  sécurité et ne plus passer du temps sur l’administratif.
                </div>
                <button
                  v-if="!isLoggedIn"
                  @click="openSignInPopup"
                  class="btnEffect mt-5 mb-5 rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white center-on-mobile"
                >
                  <p>Commencer dès maintenant</p>
                </button>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-7 lg:flex relative">
              <div class="inline-block w-100">
              <img class="object-cover" alt="" src="/macbook-pro-16@2x.png"/>
              <img class="absolute right-1 top-[250px] lg:top-[200px] w-auto h-[300px] z-10" alt="" src="/iphone-15@2x.png" />
            </div>
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
  </template>
  
  <script>
    import { defineComponent, ref } from "vue";
    import SignIn from "../pages/SignIn.vue";
    import { useRouter } from 'vue-router';
  
      export default defineComponent({
          name: "HomePageHero",
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
  <style scoped>
@media (max-width: 600px) {
  .center-on-mobile {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%; /* Adjust this value as needed */
  }
}
  </style>