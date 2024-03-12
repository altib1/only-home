<template>
    <div class="bottom-navbar">
      <router-link to="/filters" class="nav-item" :class="{ active: currentRoute === '/filters' }">
        <img src="/navbar1.png" alt="Icon 1" class="nav-icon" />
        <span class="nav-label">Filtres</span>
      </router-link>
  
      <router-link to="/informations" class="nav-item" :class="{ active: currentRoute === '/informations' }">
        <img src="/navbar2.png" alt="Icon 2" class="nav-icon" />
        <span class="nav-label">Informations</span>
      </router-link>
  
      <router-link to="/swipe" class="nav-item" :class="{ active: currentRoute === '/swipe' }">
        <img src="/navbar4.png" alt="Icon 4" class="nav-icon" />
        <span class="nav-label">Match</span>
      </router-link>
  
      <router-link to="/chats" class="nav-item" :class="{ active: currentRoute === '/chats' }">
        <img src="/navbar3.png" alt="Icon 3" class="nav-icon" />
        <span class="nav-label">Chats</span>
      </router-link>
  
      <router-link to="/locations-student" class="nav-item" :class="{ active: currentRoute === '/locations-student' }">
        <img src="/navbar5.png" alt="Icon 5" class="nav-icon" />
        <span class="nav-label">Locations</span>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentRoute: this.$route.path,
      };
    },
    watch: {
      $route(to, from) {
        this.currentRoute = to.path;
      },
    },
  };
  </script>
  
  <style scoped>
  .bottom-navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 12px 0;
  }
  
  .nav-item {
    text-align: center;
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .nav-item.active {
    color: #19347D;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
    margin-bottom: 4px; /* Adjust as needed */
  }
  
  .nav-label {
    font-family: 'Inter', sans-serif;
    font-size: 8px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0em;
    text-align: center;
    display: block;
  }
  </style>
  