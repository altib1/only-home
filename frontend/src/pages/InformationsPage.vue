<template>
    <section>
      <div class="fixed top-0 w-full h-12 flex items-center justify-center">
        <img class="h-6" src="/logo@2x.png" alt="Your Logo">
      </div>
    </section>

    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">INFORMATIONS - Page en construction</h1>
        <p class="text-xl">Nous travaillons dur pour vous offrir une meilleure expérience. Revenez bientôt!</p>
      </div>
    </div>
    <MobileNavigation />
  </template>
  
  <script>
  import MobileNavigation from '../components/MobileNavigation.vue';
  export default {
    components: {
    MobileNavigation,
  },
    name: 'UnderConstruction',
  }
  </script>
  
  <style scoped>
  h1 {
    color: #3c4b64;
  }
  
  p {
    color: #526582;
  }
  </style>