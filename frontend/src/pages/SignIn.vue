<template>
  <div class="flex flex-col items-center">
    <!-- Titre "Se connecter" -->
    <h1 class="font-Bahnschrift text-4xl font-bold mt-8 mb-10 text-center" style="color: #19347D;">Se connecter</h1>

    <form class="flex flex-col items-center w-full max-w-screen-md" @submit.prevent="handleSubmit">
      <!-- Champ Email -->
      <div class="w-full mb-3" style="width: 328px;">
        <label for="email" class="sr-only">Adresse Email</label>
        <input
          v-model="formData.email"
          id="email"
          class="border-2 border-gray-300 rounded-md p-2 w-full"
          type="text"
          placeholder="Saisissez votre adresse email"
          style="width: 328px;"
          required
        >
      </div>

      <!-- Champ Mot de passe -->
      <div class="w-full mb-3" style="width: 328px;">
        <label for="password" class="sr-only">Mot de passe</label>
        <input
          v-model="formData.password"
          id="password"
          class="border-2 border-gray-300 rounded-md p-2 w-full"
          type="password"
          placeholder="Saisissez votre mot de passe"
          style="width: 328px;"
          required
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

    <!-- Error display -->
    <p v-if="error" class="text-red-600 mt-2 font-Bahnschrift text-sm">
      <div role="alert">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Erreur
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>Email ou mot de passe incorrect</p>
        </div>
      </div>
    </p>
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
      <router-link to="/password-reset-request">
        <a href="#" class="text-blue-500">Cliquez ici</a>
      </router-link>
    </p>
  </div>
</template>

  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import OAuth from '../components/OAuth.vue';
  import VueCookies from 'vue-cookies'
  import { useStore } from 'vuex';

  export default {
    name: 'SignIn',
  components: {
    OAuth,
    // other components
  },
    setup() {
      const formData = ref({
        email:'',
        password:'',
      });
      const route = useRouter();
      const store = useStore();
      const loading = ref(false);
      const error = ref(null);

      const handleChange = (e) => {
        formData.value = { ...formData.value, [e.target.id]: e.target.value };
        error.value = null;
      };

      const handleSubmit = async () => {
        try {
          loading.value = true;

          // Effectuer la requête de connexion normale
          const res = await fetch('http://localhost/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData.value),
          });

          const data = await res.json();
          
          if (data.success === false) {
            error.value = data.message;
            loading.value = false;
            store.dispatch('logout');
            return;
          }
          const token = data.access_token;
          const user = data.user;
          await store.dispatch('login', { token, user });
          console.log(store.getters.isAuthenticated);
          VueCookies.set('access_token', token, '1h', null, null, true);
          loading.value = false;
          // Navigating to home route '/'
          route.push('/');
          location.reload();

          loading.value = false;
        } catch (err) {
          error.value = err.message;
          loading.value = false;
          store.dispatch('logout');
        }
      };


      const checkDatabaseAccessibility = async () => {
        // Simuler la vérification de l'état de la base de données (peut être un appel à un endpoint dédié)
        // Ici, nous renvoyons toujours true pour la démonstration
        return false;
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