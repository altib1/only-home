<template>
        <div class="fixed top-0 w-full h-12 flex items-center justify-center">
        <img class="h-6" src="/logo@2x.png" alt="Your Logo">
      </div>
  <div class="swipe-page">
    <div v-if="housings.length === 0" class="no-houses-message">
      Aucune annonce disponible
    </div>
    <SwipeCard
      v-for="(housing, index) in housings"
      :key="index"
      :housing="housing"
      @swiped="onSwiped"
      ref="addCard"
      v-show="index >= currentIndex && !noMoreCards"
      :style="{ zIndex: housings.length - index }"
    />
    <div v-if="endOfCards === 'noMoreCards'" class="end-of-cards">
      Plus de nouvelles publications ici
    </div>
    <div v-else-if="endOfCards === 'ad'" class="ad">
      Publicité
    </div>
    <div v-if="housings.length > 0" class="buttons">
      <button @click="swipe('left')"><img src="/reject.png" alt="Icon 2" class="nav-icon" /></button>
      <button @click="swipe('right')"><img src="/like.png" alt="Icon 2" class="nav-icon" /></button>
    </div>
  </div>
  <MobileNavigation />
</template>


<script>
import SwipeCard from '../components/SwipeCard.vue';
import MobileNavigation from '../components/MobileNavigation.vue';
import { ref, onMounted, nextTick, toRefs } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { useRouter } from 'vue-router';

export default {
  components: {
    SwipeCard,
    MobileNavigation,
  },
  emits: ['swiped'],
  setup() {
  const host = import.meta.env.VITE_APP_HOST || 'localhost';
  const authToken = VueCookies.get('access_token');
  const housings = ref([]);
  const swipeCard = ref(null);
  const error = ref(null);
  const route = useRouter();
  const currentIndex = ref(0);
  const swipeCards = ref([]);
  const noMoreCards = ref(false);
  const endOfCards = ref(null);

  const setEndOfCards = () => {
    endOfCards.value = Math.random() < 0.5 ? 'noMoreCards' : 'ad';
  };

    
  onMounted(() => {
    axios.get(`http://${host}/api/match/locations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Une erreur s'est produite lors du chargement des données. Veuillez réessayer.");
        }

        housings.value = response.data;
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          error.value = "Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous connecter et réessayer.";
          setTimeout(() => {
            route.push('/sign-in');
          }, 5000);
        } else {
          error.value = err.message || "Une erreur s'est produite lors du chargement des données. Veuillez réessayer.";
        }
        console.error(err);

        // Make the error message disappear after 3 seconds
        setTimeout(() => {
          error.value = null;
        }, 3000);
      });
  });


const addCard = (el) => {
  if (el) {
    swipeCards.value.push(el);
  }
};

const onSwiped = async (direction) => {
  currentIndex.value++;
  if (currentIndex.value >= housings.value.length) {
        setEndOfCards();
      }
  if (direction === 'right') {
    try {
      const likedHouse = housings.value[currentIndex.value - 1];
      if (currentIndex.value >= housings.value.length) {
        noMoreCards.value = true;
      }
      const response = await axios.post(`http://${host}/api/match/liked`, { housePublicationId: likedHouse.id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
};

const swipe = async (direction) => {
  currentIndex.value++;

  if (currentIndex.value >= housings.value.length) {
    noMoreCards.value = true;
    setEndOfCards();
  }
  // Trigger the swipe on the active card
  const activeCard = swipeCards.value[currentIndex.value];
  if (activeCard) {
    activeCard.swipe(direction);
  }
  if (direction === 'right') {
    try {
      const likedHouse = housings.value[currentIndex.value - 1];
      const response = await axios.post(`http://${host}/api/match/liked`, { housePublicationId: likedHouse.id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
};

  return { housings, onSwiped, swipe, SwipeCard, currentIndex, addCard, noMoreCards, error, endOfCards };
},
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.swipe-page {
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  background: #FFFFFF;
  height: 700px;
  min-height: 500px;
  min-width: 325px;
}

@media (max-width: 325px) {
  .swipe-page {
    min-width: 100%;
  }
}

@media (max-height: 500px) {
  .swipe-page {
    min-height: 100%;
  }
}

.swipe-page > * {
  position: absolute;
}

.buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: auto;
  padding: 0;
  padding-bottom: 100px;
  z-index: 1000; /* Ensure buttons are above the cards */
}

.buttons button {
  display: flex; /* Enable flexbox for buttons */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  width: 70px;
  height: 70px;
  margin: 0 10px; /* Add space between buttons */
  padding: 0; /* Remove default padding */
  border-radius: 50%;
  background: #ffffff;
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.end-of-cards, .ad {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Adjust button size and position for smaller screens */
@media (max-width: 600px) {
  .buttons {
    bottom: 10px;
  }

  .buttons button {
    width: 50px;
    height: 50px;
    padding: 10px;
  }
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 4px; /* Adjust as needed */
}
</style>