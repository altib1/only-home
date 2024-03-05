<template>
    <div
      class="card"
      v-touch:swipe.left="swipe('left')"
      v-touch:swipe.right="swipe('right')"
      v-touch:swipe.up="swipe('up')"
    >
      <img :src="housing.image" alt="Photo du logement" class="housing-image">
      <div class="housing-info">
        <h2>{{ housing.title }}</h2>
        <p>{{ housing.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      housing: {
        type: Object,
        required: true,
      },
    },
    methods: {
      swipe(direction) {
        this.$emit('swiped', direction);
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .housing-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .housing-info {
    padding: 16px;
  }
  </style>
  