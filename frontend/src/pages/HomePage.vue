<template>
<body>
    <header>
        <HomePageNavBar />
    </header>

    <section class="bg-white">
      <HomePageHero />
    </section>

    <section class="bg-white">
        <div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
            <h1 class=" text-[#19347D] mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center md:text-4xl">Comment ça marche ?</h1>
            <HomePageAbout />
        </div>
    </section>

    <section class="bg-[#19347D]">
        <HomePageLiveStats />
    </section>

    <section class="bg-white mt-10">
        <HomePageBlogShowCase />
    </section>

    <section class="bg-white">
        <HomePageMapsShowCase />
    </section>

    <footer class="p-4 sm:p-6 bg-[#19347D] flex flex-col">
        <div name="group-social-icon" class="mx-auto max-w-screen-xl text-center flex item-center">
            <img src="/logo-footer.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        </div>
        <div name="group-social-icon" class="flex text-center self-center mt-5">
            <a href="#"><img src="/facebookfill@2x.png" class="mr-3 h-6 " alt="Flowbite Logo" /></a>
            <a href="#"><img src="/24--symbols--instagram@2x.png" class="mr-3 h-6 " alt="Flowbite Logo" /></a>
            <a href="#"><img src="/linkedinfill@2x.png" class="mr-3 h-6 " alt="Flowbite Logo" /></a>
        </div>
    </footer>
</body>
</template>
  <script>
    import { defineComponent } from "vue";
    import HomePageHero from "../components/HomePageHero.vue";
    import HomePageAbout from "../components/HomePageAbout.vue";
    import HomePageLiveStats from "../components/HomePageLiveStats.vue";
    import HomePageBlogShowCase from "../components/HomePageBlogShowCase.vue";
    import HomePageMapsShowCase from "../components/HomePageMapsShowCase.vue";
    import HomePageNavBar from "../components/HomePageNavBar.vue";
  
    export default defineComponent({
      name: "PageVitrine",
      data() {
        return { isPopupSeConnecterOpen: false };
      },
      components: {HomePageHero, HomePageAbout, 
        HomePageLiveStats, HomePageBlogShowCase, HomePageMapsShowCase, HomePageNavBar },
      methods: {
      },
    });
  </script>
  