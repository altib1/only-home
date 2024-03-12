<template>
  <div
    class="card"
    ref="draggableElement"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    v-if="housing"
  >
    <img :src="`${buildImageUrl(housing)}`" alt="Photo du logement" class="housing-image">
    <div class="housing-info">
      <p>{{ housing.address }} {{ housing.city }} {{ housing.postalCode }} </p>
      <p>{{ housing.type }} - {{ housing.rent }}€</p>
    </div>
  </div>
  <div v-else-if="showAd.value" class="card">
    <!-- Advertisement card content -->
    <p>Publicité</p>
  </div>
  <div v-else class="card">
    <!-- No more publications message -->
    <p>Plus de nouvelles publications ici</p>
  </div>
</template>

<script>
import { h, ref } from 'vue';

export default {
  props: {
    housing: {
      type: Object,
      required: true,
    },
  },

  setup(_, { emit }) {
    const draggableElement = ref(null);
    let touchStartX = 0;
    let isSwiping = false;
    const host = import.meta.env.VITE_APP_HOST || 'localhost';
    // Randomly decide whether to show an ad when there are no more publications
    const showAd = Math.random() < 0.5;

    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].clientX;
      isSwiping = true;
    };

    const handleTouchMove = (event) => {
      if (!isSwiping) return;

      const touchEndX = event.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      // Move and rotate the card based on the swipe gesture
      const rotation = deltaX * 0.2; // Adjust this value to change the rotation amount
      draggableElement.value.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
    };

    const buildImageUrl = (housing) => {
      let imagePath = getImageUrl(housing);
      return `http://${host}/${imagePath}`;
    };

    const handleTouchEnd = () => {
      if (!isSwiping) return;

      const deltaX = parseInt(draggableElement.value.style.transform.split('(')[1]);
      touchStartX = 0;

      // If the swipe distance is greater than a threshold, transition the card off the screen
      if (deltaX > 150) {
        draggableElement.value.style.transition = 'transform 0.5s ease-out';
        draggableElement.value.style.transform = `translateX(100%) rotate(20deg)`;
        emit('swiped', 'right');
      } else if (deltaX < -150) {
        draggableElement.value.style.transition = 'transform 0.5s ease-out';
        draggableElement.value.style.transform = `translateX(-100%) rotate(-20deg)`;
        emit('swiped', 'left');
      } else {
        // Otherwise, reset the card position and rotation
        draggableElement.value.style.transition = 'transform 0.5s ease-out';
        draggableElement.value.style.transform = '';
      }

      isSwiping = false;
    };

    const reset = () => {
      draggableElement.value.style.transition = '';
      draggableElement.value.style.transform = '';
    };

    const getImageUrl = (housing) => {
  const imageDocument = housing.documents.find(doc => doc.libelle === 'Image 1');
  return imageDocument ? imageDocument.filePath : 'default-image-url';
};

    return {
      draggableElement,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      reset,
      getImageUrl,
      showAd,
      buildImageUrl
    };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  border: 1px solid #ddd;
  margin: 10px auto;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px; /* Add margin between cards */
  min-width: clamp(350px, 50vw, 800px); /* Min, Ideal, Max */
  max-width: 80vw; 
}

.card:hover { /* Add hover effect for interactivity */
  transform: scale(1.02); /* Slight zoom on hover */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3); /* Increased shadow on hover */
}

.housing-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.housing-info {
  border-left: solid 5px rgb(25 52 125);
  position: absolute;
  bottom: 20%;
  left: 0;
  margin-left: 7px;
  width: 100%;
  /* Adjust the padding and background as needed */
  padding: 10px;
  font-size: 24px;
  color: white;
}

.housing-info p {
  margin: 8px;
  font-family: Bahnschrift;
  font-size: 18px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
}

</style>