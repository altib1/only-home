<template>
    <div class="swipe-page">
      <SwipeCard 
        v-for="(housing, index) in housings"
        :key="index"
        :housing="housing"
        @swiped="onSwiped"
      />
    </div>
  </template>
  
  <script>
  import SwipeCard from '@/components/SwipeCard.vue';
  
  export default {
    components: {
      SwipeCard
    },
    data() {
      return {
        housings: [
          { id: 1, title: 'Joli appartement', description: '2 pièces lumineux et bien situé', image: 'https://example.com/appart1.jpg' },
          { id: 2, title: 'Studio moderne', description: 'Parfait pour étudiants', image: 'https://example.com/studio.jpg' },
          // Ajoutez d'autres logements ici...
        ]
      }
    },
    methods: {
      onSwiped(housing, direction) {
        console.log(`Logement ${housing.id} swiped ${direction}`);
        // Implémentez ici la logique à effectuer après un swipe
      }
    }
  }
  </script>
  
  <style scoped>
  .swipe-page {
    display: flex;
    justify-content: center;
    padding: 20px;
    background: red;
    height: 500px;
  }
  </style>
  