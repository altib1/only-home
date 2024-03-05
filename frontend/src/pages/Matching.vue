<template>
    <button @click="Homes()">
        test
    </button>
</template>
<script>
import axios from 'axios';
import { computed, onMounted } from 'vue';

export default {
    name: 'matching',
    setup(){
        const Homes = async () => {
            const response = await axios.get(`http://localhost/api/match/match`);
            console.log(response);
        }

        onMounted(() => {
            Homes();
        });

        return { Homes}
    }
    }
</script>