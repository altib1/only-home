<template>
    <div class="flex flex-col items-center">
      <h1 class="font-Bahnschrift text-4xl font-bold mt-8 mb-10 text-center" style="color: #19347D;">Demande de Réinitialisation de Mot de Passe</h1>
      <p class="text-center mb-10" style="color: #19347D;">Veuillez saisir votre adresse e-mail. Vous recevrez un lien pour créer un nouveau mot de passe par e-mail.</p>
      <form class="flex flex-col items-center w-full max-w-screen-md" @submit.prevent="handleReset">
        <div class="w-full mb-3" style="width: 328px;">
          <label for="email" class="sr-only">Email</label>
          <input v-model="email" type="email" class="border-2 border-gray-300 rounded-md p-2 w-full" placeholder="Saisissez votre email" required>
        </div>
        <button type="submit" class="w-full h-12 mt-6 text-white font-bold rounded-lg" style="width: 328px; padding: 10px 100px; border-radius: 5px; background: linear-gradient(90.85deg, rgba(239, 40, 46, 0.74) 0%, #EF282E 100%);">
          Envoyer
        </button>
      </form>
      <p v-if="successMessage" class="text-green-600 mt-2 font-Bahnschrift text-sm">
        <div
            class="mb-3 inline-flex w-full items-center rounded-lg bg-success-100 px-6 py-5 text-base text-success-700"
            role="alert">
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd" />
              </svg>
          </span>
          {{ successMessage }}
        </div>
        </p>
      <p v-if="errorMessage" class="text-red-600 mt-2 font-Bahnschrift text-sm">
        <div
          class="mb-3 inline-flex w-full items-center rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
          role="alert">
          <span class="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clip-rule="evenodd" />
            </svg>
          </span>
          {{ errorMessage }}
        </div>
        </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async handleReset() {
        const host = import.meta.env.VITE_APP_HOST || 'localhost';
        try {
          const response = await fetch(`http://${host}/api/auth/request-password-reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.email })
          });
          const data = await response.json();
          if (response.ok) {
            this.successMessage = data.message;
          } else {
            this.errorMessage = data.message;
          }
        } catch (error) {
          this.errorMessage = 'An error occurred while processing your request.';
          console.error(error);
        }
      }
    }
  };
  </script>
  