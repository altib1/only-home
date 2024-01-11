<template>
<div>
    <div class="container mx-auto">
      <ul class="flex justify-center space-x-2 text-white">
        <li>
          <button
            @click="activeTabOne"
            class="inline-block px-4 py-2 bg-white text-[#19347D] font-[banchrift] font-size-[24px] uppercase"
          >
            Propriétaire
          </button>
        </li>
        <li>
          <button
            @click="activeTabTwo"
            class="inline-block px-4 py-2 bg-white text-[#19347D] font-[banchrift] font-size-[24px] uppercase "
          >
            étuidant
          </button>
        </li>
      </ul>
      <div class="p-3 mt-6 bg-white">
        <div v-show="tab === 1">
          <div class="row flex">
            <div class="max-w-sm rounded overflow-hidden border-0 text-center flex flex-col items-center">
              <div class="w-16 h-16 center border-2 border-red-500 rounded-full flex items-center justify-center text-red-500">
                1
             </div>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-[#19347D]">Inscription ou connexion</div>
                <p class="text-gray-700 text-base">
                  Pour commencer à poster vos annonces, vous devez vous connecter ou vous inscrire. Une carte d’identité vous sera demandé afin de garantir la sécurité de la plateforme.                </p>
              </div>
            </div>

            <div class="max-w-sm rounded overflow-hidden border-0 text-center flex flex-col items-center">
              <div class="w-16 h-16 text-center border-2 border-red-500 rounded-full flex items-center justify-center text-red-500">
                2
             </div>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-[#19347D]">Création des annonces</div>
                <p class="text-gray-700 text-base">
                  Vous pouvez créer autant d’annonces que vous souhaitez. Il vous faudra pour cela un maximum de photos réel du bien et une description avec des caractéristiques.                </p>
              </div>
            </div>

            <div class="max-w-sm rounded overflow-hidden border-0 text-center flex flex-col items-center">
              <div class="w-16 h-16 text-center border-2 border-red-500 rounded-full flex items-center justify-center text-red-500">
                3
             </div>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-[#19347D]">Attente de match</div>
                <p class="text-gray-700 text-base">
                  Les étudiants peuvent liker ou non votre annonce. Si vous recevez un like, vous avez accès au dossier de l’étudiant et vous pouvez à votre tour matcher* ou refuser.                </p>
              </div>
            </div>

            <div class="max-w-sm rounded overflow-hidden border-0 text-center flex flex-col items-center">
              <div class="w-16 h-16 text-center border-2 border-red-500 rounded-full flex items-center justify-center text-red-500">
                4
             </div>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-[#19347D]">Signature</div>
                <p class="text-gray-700 text-base">
                  L’ensemble des documents sont générés automatiquement et envoyés par signature électroniques. Les quittances de loyers sont également comprises.                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="tab === 2">
          A faire ........
        </div>
      </div>
    </div>
    <p class="text-center">* Le match n’est en rien un engagement définitif. Cela vous permet ensuite d’échanger avec l’étudiant pour en savoir plus</p>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "HomePageAbout",
    
  data() {
    return {
      tab: 1,
    };
  },
  methods: {
    activeTabOne() {
      this.tab = 1;
    },
    activeTabTwo() {
      this.tab = 2;
    },
    activeTabThree() {
      this.tab = 3;
    },
  }
  });

</script>