<template>
    <div class="flex">
        <DashboardSidebar />
        <div class="container mx-auto mt-12 w-full">
          <div class="container mx-auto mt-12 w-full">
        <!-- Default content if no option is selected -->
          <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
            <h2 class="text-lg font-semibold text-[#19347D]">Content messagerie</h2>
          </div>
        </div>
    </div>
    </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from "vue";
import DashboardSidebar from '../../components/DashboardSidebar.vue';



export default {
  name: 'DashboardPage',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const isOpen = ref(false);
    return {
      user,
    };
  },
  components: {
    DashboardSidebar,
  },
};
</script>