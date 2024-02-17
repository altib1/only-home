<template>
          <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-5">
                <b class="text-[2.25rem] w-[27rem] text-center" >
                  <span class="text-[#EF282F]">Trouvez</span>
                  <span class="text-[#19347D]"> votre logement et </span>
                  <span class="text-[#EF282F]">gagnez</span>
                  <span class="text-[#19347D]"> du temps</span>
                </b>
                <div class="text-bleu-900 w-[32.56rem] text-left mt-5 " >
                  Avec OnlyHome, vous pouvez déposer vos annonces avec une garantie de
                  sécurité et ne plus passer du temps sur l’administratif.
                </div>
                <div class="mt-10 rounded-8xs [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border text-white" >
                  <button>Commencer dès maintenant</button>
                </div>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-7 lg:flex">
                <div class="inline-block w-100">
                  <img class=" object-cover" alt="" src="/macbook-pro-16@2x.png"/>
                  <img class="absolute right-5 top-[250px] w-auto h-[300px] " alt="" src="/iphone-15@2x.png" />
                </div>
            </div>                
        </div>
  </template>
  
  <script>
    import { defineComponent } from "vue";
  
      export default defineComponent({
          name: "HomePageHero",
      });
  </script>