<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-Bahnschrift font-semibold my-7 mx-7 text-blue-900">S'Inscrire</h1>
    <form class="flex flex-col items-center" @submit.prevent="handleSubmit">
      <input v-model="formData.firstName" class="border-2 border-gray-300 rounded-md p-2 w-80 mb-3" type="text" placeholder="Saisissez votre Prénom">
      <input v-model="formData.lastName" class="border-2 border-gray-300 rounded-md p-2 w-80 mb-3" type="text" placeholder="Saisissez votre Nom">
      <input v-model="formData.email" class="border-2 border-gray-300 rounded-md p-2 w-80 mb-3" type="text" placeholder="Saisissez votre adresse email">
      <input v-model="formData.password" class="border-2 border-gray-300 rounded-md p-2 w-80 mb-3" type="password" placeholder="Saisissez votre Mot de passe">
      <button :disabled="loading"         class="w-full h-12 mt-6 text-white font-bold rounded-lg"
        style="
          width: 328px;
          height: 39px;
          padding: 10px 100px;
          border-radius: 5px;
          background: linear-gradient(90.85deg, rgba(239, 40, 46, 0.74) 0%, #EF282E 100%);
        " 
        @click="handleSignUp"> {{ loading ? 'chargement' : "S'inscrire" }} </button>
    </form>

        <!-- Ligne horizontale et le texte "ou" -->
    <div class="flex items-center mt-6 w-full max-w-screen-md">
      <hr class="flex-grow border-t-2 border-gray-300">
      <span class="mx-4 text-gray-600 font-bold">OU</span>
      <hr class="flex-grow border-t-2 border-gray-300">
    </div>

    <OAuth />

    <div class="flex flex-row justify-center items-center gap-2 mt-5 text-center">
      <router-link to="/sign-in">
        <span class="text-blue-700">Se Connecter</span>
      </router-link>
    </div>
    <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
  </div>
</template>

  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import OAuth from '../components/OAuth.vue';

  export default {
    name: 'SignUp',
  components: {
    OAuth,
    // other components
  },
    setup() {
      const formData = ref({});
      const route = useRouter();

      let error = null;
      let loading = false;

      const handleChange = (e) => {
        formData.value = { ...formData.value, [e.target.id]: e.target.value };
      };

      const handleSubmit = async () => {
        try {
          loading = true;
          const res = await fetch('http://localhost/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData.value),
          });
          const data = await res.json();
          if (data.success === false) {
            loading = false;
            error = data.message;
            return;
          }
          loading = false;
          error = null;
          route.push('/sign-in');
        } catch (err) {
          loading = false;
          error = err.message;
        }
      };

      return {
        formData,
        error,
        loading,
        handleChange,
        handleSubmit,
      };
    },
  };
  </script>