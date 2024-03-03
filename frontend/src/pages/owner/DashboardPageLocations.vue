<template>
  <div class="flex">
    <DashboardSidebar />
    <div class="container mx-auto mt-12 w-full">
      <!-- Default content if no option is selected -->
      <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 class="text-lg font-semibold text-[#19347D]">
          Vous n’avez pas encore d’annonce, vous pouvez la créer dès maintenant !
        </h2>
        <button
          @click="openLocationPopup"
          class="btnEffect rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white"
        >
          créer une annonce
        </button>
        <DashboardOwnerPublications />
      </div>
    </div>
  </div>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    v-if="isLocationPopupOpen"
    @click="closeLocationPopup"
  >
    <div class="bg-white p-8 rounded-lg position-relative" @click.stop>
      <button @click="closeLocationPopup" class="absolute right-0 pr-8 text-gray-600" type="button">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <DashboardLocationsCreate />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import DashboardSidebar from '../../components/DashboardSidebar.vue';
import DashboardLocationsCreate from '../../components/DashboardLocationsCreate.vue';
import DashboardOwnerPublications from '../../components/DashboardOwnerPublication.vue';

export default {
  name: 'DashboardPage',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const isLocationPopupOpen = ref(false);

    return {
      user,
      isLocationPopupOpen,
    };
  },
  components: {
    DashboardSidebar,
    DashboardLocationsCreate,
    DashboardOwnerPublications,
  },
  methods: {
    openLocationPopup() {
      this.isLocationPopupOpen = true;
    },
    closeLocationPopup() {
      this.isLocationPopupOpen = false;
    },
  },
};
</script>
