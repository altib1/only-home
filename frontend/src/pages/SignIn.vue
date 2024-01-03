<template>
  <div class="flex flex-col items-center">
    <!-- Titre "Se connecter" -->
    <h1 class="font-Bahnschrift text-4xl font-bold mt-8 mb-10 text-center" style="color: #19347D;">Se connecter</h1>

    <form class="flex flex-col items-center w-full max-w-screen-md" @submit.prevent="handleSubmit">
      <!-- Champ Email -->
      <div class="w-full mb-3">
        <label for="email" class="sr-only">Adresse Email</label>
        <input
          v-model="formData.email"
          id="email"
          class="border-2 border-gray-300 rounded-md p-2 w-full"
          type="text"
          placeholder="Saisissez votre adresse email"
        >
      </div>

      <!-- Champ Mot de passe -->
      <div class="w-full mb-3">
        <label for="password" class="sr-only">Mot de passe</label>
        <input
          v-model="formData.password"
          id="password"
          class="border-2 border-gray-300 rounded-md p-2 w-full"
          type="password"
          placeholder="Saisissez votre mot de passe"
        >
      </div>

      <!-- Bouton Se connecter -->
      <button
        :disabled="loading"
        class="w-full h-12 mt-6 text-white font-bold rounded-lg"
        style="
          width: 328px;
          height: 39px;
          padding: 10px 100px;
          border-radius: 5px;
          background: linear-gradient(90.85deg, rgba(239, 40, 46, 0.74) 0%, #EF282E 100%);
        "
      >
        {{ loading ? 'chargement' : 'Se connecter' }}
      </button>
    </form>

    <!-- Ligne horizontale et le texte "ou" -->
    <div class="flex items-center mt-6 w-full max-w-screen-md">
      <hr class="flex-grow border-t-2 border-gray-300">
      <span class="mx-4 text-gray-600 font-bold">OU</span>
      <hr class="flex-grow border-t-2 border-gray-300">
    </div>

    <!-- Bouton OAuth -->
    <OAuth />

    <!-- Lien "S'inscrire" -->
    <a href="/sign-up" class="text-blue-500 mt-4">S'inscrire</a>

    <!-- Texte "Vous avez oublié votre mot de passe, Cliquez ici" avec les styles -->
    <p class="text-sm mt-2 font-Bahnschrift text-gray-700">
      Vous avez oublié votre mot de passe,
      <a href="#" class="text-blue-500">Cliquez ici</a>
    </p>
  </div>
</template>

  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import OAuth from '../components/OAuth.vue';

  export default {
    name: 'SignIn',
  components: {
    OAuth,
    // other components
  },
    setup() {
      const formData = ref({});
      const route = useRouter();

      let loading = false;
      let error = null;

      const handleChange = (e) => {
        formData.value = { ...formData.value, [e.target.id]: e.target.value };
      };

      const handleSubmit = async () => {
        try {
          loading = true;
          const res = await fetch('http://localhost/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData.value),
          });
          const data = await res.json();
          if (data.success === false) {
            error = data.message;
            loading = false;
            return;
          }
          loading = false;
          // Navigating to home route '/'
          route.push('/');
        } catch (err) {
          error = err.message;
          loading = false;
        }
      };

      return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
      };
    },
  };
  </script>