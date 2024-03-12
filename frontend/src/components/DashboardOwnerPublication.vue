<template>
  <div>
    <h2 class="text-lg font-semibold text-[#19347D]">
      Vos annonces
    </h2>
    <div v-if="loading">
      <!-- Show loading indicator or message -->
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-if="ownerPublications && ownerPublications.length > 0" class="grid grid-cols-4 gap-4 mt-4">
        <!-- Loop through ownerPublications and display each publication -->
        <div v-for="publication in ownerPublications" :key="publication.id">
          <!-- Your house publication display component goes here -->
          <div class="border p-4 rounded-lg shadow">
            <div v-for="image in publication.house.documents" :key="image">
              <div v-if="image.libelle === 'Image 1'">
                <img :src="`${buildImageUrl(image.filePath)}`" alt="Publication Image" class="w-full h-32 object-cover mb-2">
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ publication.house.type }}-{{ publication.house.totalAreaSize }} m²</h3>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ publication.house.rentIncludingTax }} €</h3>
            <button @click="editPublication(publication.id)" class=" rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-full flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white">
              Modifier
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Vous n'avez pas encore d'annonce.</p>
      </div>
    <!-- Pagination controls -->
    <div v-if="ownerPublications && ownerPublications.length > 0" class="mt-4 text-white flex justify-center items-center">
      <button class="m-5 p-2 rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))]" @click="prevPage" :disabled="page === 1">Page précedente</button>
      <span class="text-slate-400">Page {{ page }}</span>
      <button class="m-5 p-2 rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))]" @click="nextPage">Suivant</button>
    </div>
      <!-- Modal Container -->
      <div v-if="selectedPublicationId !== null" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="fixed inset-0 flex items-center justify-center">
          <div class="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div class="bg-white p-6 rounded-lg shadow-md w-auto max-h-screen overflow-y-auto relative">
              <!-- Your modal content goes here -->
              <DashboardLocationsEdit :publicationId="selectedPublicationId" @closePopup="closeLocationPopup" />
    
              <!-- Close button -->
              <a @click="closeLocationPopup" class="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
import DashboardLocationsEdit from './DashboardLocationsEdit.vue';

export default {
  name: 'DashboardOwnerPublications',
  setup() {
    const page = ref(1);
    const totalPages = ref(0);
    const route = useRouter();
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const ownerPublications = ref(null);
    const publicationImageLink = ref(null);
    const loading = ref(true);
    const selectedPublicationId = ref(null);
    const isModalOpen = ref(false); // Modal state
    const host = ref(import.meta.env.VITE_APP_HOST || 'localhost');

    const ownerId = computed(() => user.value.id);

    const fetchOwnerPublications = async () => {
      try {
        const response = await axios.get(`http://${host.value}/api/locations/owner/${ownerId.value}?page=${page.value}`);
        ownerPublications.value = response.data.publications;
        totalPages.value = Math.ceil(response.data.totalPublications / 8);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          route.push('/sign-in');
        }
        console.error('Error fetching owner publications:', error);
      } finally {
        loading.value = false;
      }
    };

    const nextPage = () => {
      if (page.value < totalPages.value) {
        page.value++;
        fetchOwnerPublications();
      }
    };

    const buildImageUrl = (filePath) => {
      return `http://${host.value}/${filePath}`;
    };


    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        fetchOwnerPublications();
      }
    };

    const editPublication = (publicationId) => {
      selectedPublicationId.value = publicationId;
      isModalOpen.value = true; // Open the modal
    };

    onMounted(() => {
      fetchOwnerPublications();
    });

    const closeLocationPopup = () => {
      selectedPublicationId.value = null;
      isModalOpen.value = false;
      fetchOwnerPublications();
    };

    return {
      ownerPublications,
      loading,
      editPublication,
      selectedPublicationId,
      closeLocationPopup,
      isModalOpen,
      page,
      nextPage,
      prevPage,
      buildImageUrl,
    };
  },
  components: { DashboardLocationsEdit },
};
</script>
