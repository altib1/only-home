<template>
  <div class="flex">
    <DashboardSidebar />
    <div class="container mx-auto mt-12 w-full">
      <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 class="text-lg font-semibold text-[#19347D]">Les propositions</h2>

        <div v-if="likedStudents.length > 0">
          <!-- Display liked students as cards -->
          <div v-for="like in likedStudents" :key="like.id" class="mt-4 p-4 bg-gray-100 rounded-md flex flex-row">
            <h3 class=" m-2 text-lg font-semibold">L'étudiant : {{ like.student.user.firstName }}</h3>
            <p class="m-2">{{ like.housePublication.house.type }} - {{ like.housePublication.house.totalAreaSize }} m² {{ like.housePublication.house.rentIncludingTax }}€/mois</p>
            
            <!-- Buttons for actions -->
            <button @click="viewStudentInfo(like.student.id)" class=" m-2 p-2 rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] flex items-center justify-center box-border cursor-pointer text-white">Verifier les informations de l'étudiant</button>
            <button @click="proposeContract(like.student.id, like.housePublication.id)" class="m-2 p-2 rounded-5 bg-green-500 text-white px-2 py-1 mt-2">Proposer un Contrat de location</button>
          </div>
        </div>

        <div v-else>
          <p>Oups, pas encore de propositions!</p>
        </div>
        <div v-if="likedStudents && likedStudents.length > 0" class="mt-4 text-white flex justify-center items-center">
          <button class="m-5 p-2 rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))]" @click="prevPage" :disabled="page === 1">Page précédente</button>
          <span class="text-slate-400">Page {{ page }}</span>
          <button :disabled="isLastPage" class="m-5 p-2 rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))]" @click="nextPage">Suivant</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Student Info Modal -->
  <div v-if="showStudentInfoModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
        Informations de l'étudiant
      </h3>
      <div class="mt-2" v-if="selectedStudent && selectedStudent.student && selectedStudent.student.user">
        <p class="text-sm text-gray-500">
          Nom: {{ selectedStudent.student.user.firstName }} {{ selectedStudent.student.user.lastName }}
        </p>
        <p class="text-sm text-gray-500">
          Email: {{ selectedStudent.student.user.email }}
        </p>
        <p class="text-sm text-gray-500">
          Date de naissance: {{ selectedStudent.student.user.birthDay }}
        </p>
        <p class="text-sm text-gray-500">
          Numéro de téléphone: {{ selectedStudent.student.user.phoneNumber }}
        </p>
        <p class="text-sm text-gray-500">
          Genre: {{ selectedStudent.student.user.gender }}
        </p>
        <p class="text-sm text-gray-500">
          Genre: {{ selectedStudent.student.user.gender }}
        </p>
      </div>
    </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="showStudentInfoModal = false" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>

<!-- Student Contract Modal -->
<div v-if="showContractModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="bg-white p-8 rounded-md max-w-md mx-auto relative">
    <DashboardMessagerieContract :studentId="studentId" :housePublicationId="housePublicationId" />
    <a @click="closeLocationContractPopup" class="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </a>
  </div>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from "vue";
import DashboardSidebar from '../../components/DashboardSidebar.vue';
import DashboardMessagerieContract from '../../components/DashboardMessagerieContract.vue';

export default {
  name: 'DashboardPage',
  data() {
    return {
      likedStudents: [],
      page: 1,
      totalPages: 0,
      showStudentInfoModal: false,
      selectedStudent: null,
      error: null,
      loading: false,
      showContractModal: false,
      studentId: null,
      housePublicationId: null,
    };
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const host = import.meta.env.VITE_APP_HOST || 'localhost';
    const likedStudents = ref([]);
    const ownerId = computed(() => user.value.id);
    const page = ref(1);
    const totalPages = ref(0);
    const isLastPage = computed(() => page.value >= totalPages.value);
    const showStudentInfoModal = ref(false);
    const selectedStudent = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const route = useRouter();
    const showContractModal = ref(false);
    const studentId = ref(null);
    const housePublicationId = ref(null);

    const fetchLikedStudents = async () => {
      try {
        // Replace with the actual API endpoint for fetching liked students
        const response = await axios.get(`http://${host}/api/messagerie/owner/${ownerId.value}?page=${page.value}`);
        console.log('Liked students:', response.data.likedStudents);
        likedStudents.value = response.data.likedStudents; 
        totalPages.value = Math.ceil(response.data.totalLikedStudents / 2);
      } catch (err) {
        if (err.response && err.response.status === 401) {
        error.value = "Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous connecter et réessayer.";
        setTimeout(() => {
          route.push('/sign-in');
        }, 5000);
      } else {
        error.value = err.message || "Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.";
      }
      loading.value = false;
      setTimeout(() => {
        error.value = null;
      }, 5000);
      }
    };

    const closeLocationContractPopup = () => {
      showContractModal.value = false;
    };

    const viewStudentInfo = (studentId) => {
      selectedStudent.value = likedStudents.value.find(student => student.id === studentId);
      showStudentInfoModal.value = true;
    };

    const proposeContract = (id, publicationId) => {
      studentId.value = id;
      housePublicationId.value = publicationId;
      showContractModal.value = true;
    }

    const nextPage = () => {
      if (page.value < totalPages.value) {
        page.value++;
        fetchLikedStudents();
      }
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        fetchLikedStudents();
      }
    };
    
    onMounted(() => {
      fetchLikedStudents();
    });

    return {
      user,
      likedStudents,
      fetchLikedStudents,
      nextPage,
      prevPage,
      page,
      totalPages,
      isLastPage,
      showStudentInfoModal,
      selectedStudent,
      viewStudentInfo,
      proposeContract,
      showContractModal,
      closeLocationContractPopup,
      studentId,
      housePublicationId,
    };
  },
  components: {
    DashboardSidebar,
    DashboardMessagerieContract,
  },
};
</script>
