<template>
            <div
    :class="isOpen ? 'w-40' : 'w-60'"
    class="flex flex-col h-screen p-3 duration-300 bg-[#19347D] shadow jus"
  >
    <div class="space-y-3 flex-1">
      <div class="flex items-center justify-center mb-5">
        <img src="/logo-footer.png" class="h-9" alt="Flowbite Logo" />
      </div>
      <ul class="pt-2 pb-4 space-y-1 text-sm">
        <li class="rounded-full mb-4">
          <router-link
            to="/dashboard/locations"
            class="flex items-center p-2 space-x-3 rounded-full"
            :class="{ 'bg-white text-[#19347D]': $route.name === 'DashboardPageLocations', 'text-gray-100': $route.name !== 'DashboardPageLocations' }"
          >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    :stroke="($route.name === 'DashboardPageLocations') ? '#19347D' : 'currentColor'"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>

                                <span :class="{ 'text-[#19347D]': $route.name === 'DashboardPageLocations', 'text-gray-100': $route.name !== 'DashboardPageLocations' }">Locations</span>
                            </router-link>
        </li>
        <li class="rounded-full mb-4">
          <router-link
            to="/dashboard/messagerie"
            class="flex items-center p-2 space-x-3 rounded-full"
            :class="{ 'bg-white text-[#19347D]': $route.name === 'DashboardPageMessagerie', 'text-gray-100': $route.name !== 'DashboardPageMessagerie' }"
          >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    :stroke="($route.name === 'DashboardPageMessagerie') ? '#19347D' : 'currentColor'"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                                    />
                                </svg>

                                <span :class="{ 'text-[#19347D]': $route.name === 'DashboardPageMessagerie', 'text-gray-100': $route.name !== 'DashboardPageMessagerie' }">Messagerie</span>
                            </router-link>
        </li>
        <li class="rounded-full mb-4">
          <router-link
            to="/dashboard/mon-compte"
            class="flex items-center p-2 space-x-3 rounded-full"
            :class="{ 'bg-white': $route.name === 'DashboardPageMonCompte' }"
          >
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    :stroke="($route.name === 'DashboardPageMonCompte') ? '#19347D' : 'currentColor'"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span :class="{ 'text-[#19347D]': $route.name === 'DashboardPageMonCompte', 'text-gray-100': $route.name !== 'DashboardPageMonCompte' }"> Mon compte </span>
                            </router-link>
        </li>
        <li class="rounded-full mb-4">
          <router-link
            to="/dashboard/aide"
            class="flex items-center p-2 space-x-3 rounded-full"
            :class="{ 'bg-white': $route.name === 'DashboardPageAide' }"
          >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    :stroke="($route.name === 'DashboardPageAide') ? '#19347D' : 'currentColor'"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span :class="{ 'text-[#19347D]': $route.name === 'DashboardPageAide', 'text-gray-100': $route.name !== 'DashboardPageAide' }"> Aide </span>
                            </router-link>
        </li>
      </ul>
      <div class="mt-auto">
        <button
          @click="handleLogout"
          class="flex items-center justify-center w-full py-2 text-sm font-medium text-[#19347D] bg-[#EAEEFB] rounded-full"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import VueCookies from 'vue-cookies'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const isOpen = ref(false);
        const store = useStore();
        const route = useRouter();

        const handleLogout = () => {
          store.dispatch('logout');
          VueCookies.remove('access_token');
          route.push('/sign-in');
        };


        return {
            isOpen,
            handleLogout,
        };
    },
};
</script>