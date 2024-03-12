<template>

  <section>
    <div class="fixed top-0 w-full h-12 flex items-center justify-center">
      <img class="h-6" src="/logo@2x.png" alt="Your Logo">
    </div>
  </section>

    <p v-if="error" class="text-red-600 mt-2 font-Bahnschrift text-sm">
      <div v-show="error" role="alert">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Erreur
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{{ error }}</p>
        </div>
      </div>
    </p>
    <div class="filters-container">
    <form @submit.prevent="submitFilters" class="w-full max-w-md mx-auto sm:px-6 lg:px-8">
        <div class="mb-4">
          <label for="type" class="block text-gray-700 font-bold mb-2">Type de logement</label>
          <select v-model="selectedType" id="type" name="type" class="w-full p-2 border rounded">
            <option value="Appartement">Appartement</option>
            <option value="Maison">Maison</option>
            <option value="Studio">Studio</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="location" class="block text-gray-700 font-bold mb-2">Type de location</label>
          <select v-model="selectedLocation" id="location" name="location" class="w-full p-2 border rounded">
            <option value="Location">Location</option>
            <option value="Colocation">Colocation</option>
            <option value="Chambre chez l'étudiant">Chambre chez l'étudiant</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label for="city" class="block text-gray-700 font-bold mb-2">Ville</label>
          <input v-model="selectedCity" type="text" id="city" name="city" class="w-full p-2 border rounded">
        </div>
  
        <div class="mb-4 flex">
          <div class="mr-2">
            <label for="minPrice" class="block text-gray-700 font-bold mb-2">Prix min</label>
            <input v-model="minPrice" type="number" id="minPrice" name="minPrice" class="w-full p-2 border rounded">
          </div>
          <div>
            <label for="maxPrice" class="block text-gray-700 font-bold mb-2">Prix max</label>
            <input v-model="maxPrice" type="number" id="maxPrice" name="maxPrice" class="w-full p-2 border rounded">
          </div>
        </div>
  
        <div>
            <button type="submit" class="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))]">Appliquer les filtres</button>
        </div>
    </form>
    </div>
    <MobileNavigation />
</template>
  
<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { useRouter } from 'vue-router';
import MobileNavigation from '../components/MobileNavigation.vue';

export default {
  components: {
    MobileNavigation,
  },
  setup() {
    const selectedType = ref(null);
    const selectedLocation = ref(null);
    const selectedCity = ref("");
    const minPrice = ref(null);
    const maxPrice = ref(null);
    const error = ref(null);
    const route = useRouter();


    const transformedCity = computed(() => {
      if (selectedCity.value) {
        let lowerCaseCity = selectedCity.value.toLowerCase();
        return lowerCaseCity.charAt(0).toUpperCase() + lowerCaseCity.slice(1);
      }
      return "";
    });

    const fetchData = async () => {
      const host = import.meta.env.VITE_APP_HOST || 'localhost';
      const authToken = VueCookies.get('access_token');

      try {
        const response = await axios.get(`http://${host}/api/match/get-filter`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          const filterData = response.data;
          selectedType.value = filterData.houseType || null;
          selectedLocation.value = filterData.rentType || null;
          selectedCity.value = filterData.city || "";
          minPrice.value = filterData.rentmin || null;
          maxPrice.value = filterData.rentmax || null;
        }
      } catch (err) {
        console.error(err);
      }
    };

    const submitFilters = async () => {
      const host = import.meta.env.VITE_APP_HOST || 'localhost';
      const authToken = VueCookies.get('access_token');

      const data = {
        houseType: selectedType.value,
        rentType: selectedLocation.value,
        city: transformedCity.value,
        rentmin: minPrice.value,
        rentmax: maxPrice.value
        };

      try {
        const response = await axios.post(`http://${host}/api/match/set-filter`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.");
        }

        route.push('/swipe');
      } catch (err) { // Rename error to err
        if (err.response && err.response.status === 401) {
            error.value = "Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous connecter et réessayer.";
            setTimeout(() => {
                route.push('/sign-in');
            }, 5000);
        } else {
            error.value = err.message || "Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.";
        }
        console.error(err);

        // Make the error message disappear after 3 seconds
        setTimeout(() => {
            error.value = null;
        }, 3000);
    }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      selectedType,
      selectedLocation,
      selectedCity,
      minPrice,
      maxPrice,
      error,
      submitFilters,
      fetchData,
      transformedCity
    };
  },
};
</script>

<style scoped>
.filters-container {
  margin: 20px;
  margin-top: 70px;
}
</style>