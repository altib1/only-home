<template>
    <p v-if="error" class="text-red-600 mt-2 font-Bahnschrift text-sm">
      <div v-show="errorVisible" role="alert">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Erreur
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.</p>
        </div>
      </div>
    </p>
    <div class="flex items-center justify-center">

      <!-- Content Card -->
      <div class="card p-2 ml-2 h-[30rem] w-[480px] overflow-y-auto flex flex-col justify-between">
          <form >
              <div>
                <label class="text-[#19347D] text-sm">Sélectionnez le type de logement*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.housingType && error }">
                    <div class="flex items-center">
                        <input type="radio"    id="Appartement" value="Appartement" v-model="formData.housingType" />
                        <label for="Appartement" class=" text-sm">Appartement</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio"    id="Studio" value="Studio" v-model="formData.housingType" />
                        <label for="Studio" class=" text-sm">Studio</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio"    id="Maison" value="Maison" v-model="formData.housingType" />
                        <label for="Maison" class=" text-sm">Maison</label>
                    </div>
                </div>
              </div>
              <div>
                <label class="text-[#19347D] text-sm">Sélectionnez le type de location*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.rentingType && error }">
                    <div class="flex items-center">
                        <input type="radio"    id="Location" value="Location" v-model="formData.rentingType" />
                        <label for="Location" class=" text-sm">Location</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio"    id="Colocation" value="Colocation" v-model="formData.rentingType" />
                        <label for="Colocation" class=" text-sm">Colocation</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio"    id="Chambre chez l’habitant" value="Chambre chez l’habitant" v-model="formData.rentingType" />
                        <label for="Chambre chez l’habitant" class=" text-sm">Chambre chez l’habitant</label>
                    </div>
                </div>
              </div>
              <div>
                <label class="text-[#19347D] text-sm">Le logement est il meublé ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.furnished && error }">
                    <div class="flex items-center">
                        <input type="radio"    id="furnished-oui" value="Oui" v-model="formData.furnished" />
                        <label for="furnished-oui" class=" text-sm">Oui</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio"    id="furnished-non" value="Non" v-model="formData.furnished" />
                        <label for="furnished-non" class=" text-sm">Non</label>
                    </div>
                </div>
              </div>
              <div>
                  <label for="housingAddress" class="text-[#19347D] text-sm">Adresse du logement*</label>
                  <div class="w-full">
                    <input type="text" id="housingAddress" :class="{ 'error-border': !formData.housingAddress && error }" v-model="formData.housingAddress"   class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="postalCode" class="text-[#19347D] text-sm">Code postal*</label>
                  <div class="w-full">
                    <input type="text" id="postalCode" :class="{ 'error-border': !formData.postalCode && error }" v-model="formData.postalCode"   class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="city" class="text-[#19347D] text-sm">Ville*</label>
                  <div class="w-full">
                    <input type="text" id="city" :class="{ 'error-border': !formData.city && error }" v-model="formData.city"   class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="surfaceSize" class="text-[#19347D] text-sm">Superficie du logement*(en metres carré)</label>
                  <div class="w-full">
                    <input type="number" id="surfaceSize"    :class="{ 'error-border': !formData.surfaceSize && error }" v-model="formData.surfaceSize" class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div class="flex items-center gap-x-4">
                <label for="number-of-rooms" class="text-sm">Nombre de pièces :</label>
                <select id="number-of-rooms" v-model="formData.numberOfRooms">
                    <option v-for="i in 5" :key="i" :value="i">{{i + " pièces" }}</option>
                </select>
              </div>
              <div>
                  <label for="OwnerJustification" :class="{ 'error-border': !formData.OwnerJustification && error }" class="text-[#19347D] text-sm">Justificatif de propriété*</label>
                  <input type="file" accept=".png, .jpg, .jpeg .pdf"    id="OwnerJustification" @change="handleFileChange($event, 'OwnerJustification')" class="border p-0 rounded-md w-full" />
              </div>

              <div>
                  <label for="description" class="text-[#19347D] text-sm">Description du logement</label>
                  <div class="w-full">
                    <input  type="text" id="description"  v-model="formData.description" class="block p-4 border rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 w-25" />
                  </div>
              </div>
              <div class="">
                <label class="text-[#19347D] text-sm">Sélectionnez les caractéristiques de votre logement*</label>
                <div class="flex flex-col items-center gap-x-4 " :class="{ 'error-border': !formData.housingOptions && error }">
                  <div class="flex items-center">
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsFibre" value="Fibre" v-model="formData.housingOptions" />
                        <label for="housingOptionsFibre" class="text-sm">Fibre</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsBalcon" value="Balcon" v-model="formData.housingOptions" />
                        <label for="housingOptionsBalcon" class="text-sm">Balcon</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsJacuzzi" value="Jacuzzi" v-model="formData.housingOptions" />
                        <label for="housingOptionsJacuzzi" class="text-sm">Jacuzzi</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsPiscine" value="Piscine" v-model="formData.housingOptions" />
                        <label for="housingOptionsPiscine" class="text-sm">Piscine</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsFitnes" value="Salle de sport" v-model="formData.housingOptions" />
                        <label for="housingOptionsFitnes" class="text-sm">Salle de sport</label>
                    </div>
                    </div>
                    <div class="flex items-center" >
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsBarbecue" value="Barbecue" v-model="formData.housingOptions" />
                        <label for="housingOptionsBarbecue" class="text-sm">Barbecue</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsPlancha" value="Plancha" v-model="formData.housingOptions" />
                        <label for="housingOptionsPlancha" class="text-sm">Plancha</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsPrivateParking" value="Parking privé" v-model="formData.housingOptions" />
                        <label for="housingOptionsPrivateParking" class="text-sm">Parking privé</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsPublicParking" value="Parking public" v-model="formData.housingOptions" />
                        <label for="housingOptionsPublicParking" class="text-sm">Parking public</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsSDBSeaparated" value="Salle de bain privative" v-model="formData.housingOptions" />
                        <label for="housingOptionsSDBSeaparated" class="text-sm">Salle de bain privative</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="housingOptionsWCSeparated" value="WC privatif" v-model="formData.housingOptions" />
                        <label for="housingOptionsWCSeparated" class="text-sm">WC privatif</label>
                    </div>
                    </div>
                </div>
              </div>
              <div class="">
                <label class="text-[#19347D] text-sm">Sélectionnez le diagnostic de performance énergétique*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.energyPerformance && error }">
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceA"    value="A" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceA" class=" text-sm">A</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceB"    value="B" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceB" class=" text-sm">B</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceC"    value="C" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceC" class=" text-sm">C</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceD"    value="D" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceD" class=" text-sm">D</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceE"    value="E" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceE" class=" text-sm">E</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceF"    value="F" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceF" class=" text-sm">F</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="energyPerformanceG"    value="G" v-model="formData.energyPerformance" />
                    <label for="energyPerformanceG" class=" text-sm">G</label>
                  </div>
                </div>
              </div>
              <div class="">
                <label class="text-[#19347D] text-sm">Sélectionnez l’indice d'émission de gaz à effet de serre*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.pollutionPerformance && error }">
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceA"    value="A" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceA" class=" text-sm">A</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceB"    value="B" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceB" class=" text-sm">B</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceC"    value="C" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceC" class=" text-sm">C</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceD"    value="D" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceD" class=" text-sm">D</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceE"    value="E" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceE" class=" text-sm">E</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceF"    value="F" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceF" class=" text-sm">F</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="pollutionPerformanceG"    value="G" v-model="formData.pollutionPerformance" />
                    <label for="pollutionPerformanceG" class=" text-sm">G</label>
                  </div>
                </div>
              </div>

              <div class="bg-slate-200 rounded-md my-2 p-2">
                <p>Afin de réduire le temps d’échange et les surprise lors des visites, merci de mettre un maximum de 5 photos du logement.</p>
                <!-- Display image input fields only if image paths are present in formData -->
                <div v-for="index in 5" :key="index">
                  <div v-if="formData[`image${index}`]" class="m-5">
                    <img :src="formData[`image${index}`]" :alt="`Image ${index}`" class="w-20 h-20 object-cover" />
                    <input type="file" accept=".png, .jpg, .jpeg" :id="`image${index}`" @change="handleFileChange($event, `image${index}`)" class="border p-0 rounded-md w-full" />
                  </div>
                </div>

              </div>

              <div>
                  <label for="monthlyCosts" class="text-[#19347D] text-sm">Montant du loyer mensuel*</label>
                  <div class="w-full">
                    <input type="number" id="monthlyCosts"    :class="{ 'error-border': !formData.monthlyCosts && error }" v-model="formData.monthlyCosts" class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="otherCosts" class="text-[#19347D] text-sm">Montant des charges*</label>
                  <div class="w-full">
                    <input type="number" id="otherCosts"    :class="{ 'error-border': !formData.otherCosts && error }" v-model="formData.otherCosts" class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="garatysCosts" class="text-[#19347D] text-sm">Montant de la caution*</label>
                  <div class="w-full">
                    <input type="number" id="garatysCosts"    :class="{ 'error-border': !formData.garatysCosts && error }" v-model="formData.garatysCosts" class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div class="mt-10 flex justify-between items-end h-20">
                <button type="button" class="btnEffect rounded-5 [background:linear-gradient(-89.1deg,_#19347d,_rgba(25,_52,_125,_0.85))] w-[16.06rem] flex items-center justify-center py-[0.63rem] px-[0rem] box-border cursor-pointer text-white" @click="submitForm()">
                  Modifier mon annonce
                </button>

                <!-- Delete button with modal trigger -->
                <button type="button" @click="openDeleteModal" class="m-3 text-red-600">
                  Supprimer l'annonce
                </button>
              </div>
          </form>
                       <!-- Delete Modal -->
          <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-8 rounded-md max-w-md mx-auto">
              <p class="text-lg">Êtes-vous sûr de vouloir supprimer cette annonce?</p>
              <div class="mt-4 flex justify-end">
                <button @click="deleteAnnouncement" class="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Oui</button>
                <button @click="closeDeleteModal" class="bg-gray-300 px-4 py-2 rounded-md">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies'

export default defineComponent({
  props: ['publicationId'],
  data() {
    return {
      showDeleteModal: false,
      errorVisible: true,
      error: null,
      formData: {
        housingType: null,
        rentingType: null,
        furnished: null,
        housingAddress: null,
        postalCode: null,
        city: null,
        surfaceSize: null,
        numberOfRooms: null,
        OwnerJustification: null,
        description: null,
        housingOptions: [],
        energyPerformance: null,
        pollutionPerformance: null,
        monthlyCosts: null,
        otherCosts: null,
        garatysCosts: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
      },
    };
  },
  setup(props) {
  const route = useRouter();
  const loading = ref(false);
  const error = ref(null);
  const showDeleteModal = ref(false);
  const formData = ref({
    housingType: null,
    rentingType: null,
    furnished: null,
    housingAddress: null,
    postalCode: null,
    city: null,
    surfaceSize: null,
    numberOfRooms: null,
    OwnerJustification: null,
    description: null,
    housingOptions: [],
    energyPerformance: null,
    pollutionPerformance: null,
    monthlyCosts: null,
    otherCosts: null,
    garatysCosts: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const redirectPage = (page) => {
    route.push(page);
  };
  // gettting the announcements of the current owner
  const created = async () => {
      try {
        
        const host = import.meta.env.VITE_APP_HOST || 'localhost';
        // Fetch existing data using an API call or any other method
        const response = await axios.get(`http://${host}/api/locations/${props.publicationId}`);  // Replace with your actual API endpoint
        const housingOptionsArray = response.data.house.housingOptions.split(',');

        // Pre-fill formData with existing data
        formData.value = {
          housingType: response.data.house.type,
          rentingType: response.data.house.rentingType,
          furnished: response.data.house.furnished,
          housingAddress: response.data.house.address,
          postalCode: response.data.house.postalCode,
          city: response.data.house.city,
          surfaceSize: response.data.house.totalAreaSize,
          numberOfRooms: response.data.house.numberOfRooms,
          description: response.data.house.description,
          housingOptions: housingOptionsArray || [],
          energyPerformance: response.data.house.energyPerformance,
          pollutionPerformance: response.data.house.pollutionPerformance,
          monthlyCosts: response.data.house.rent,
          otherCosts: response.data.house.tax,
          garatysCosts: response.data.house.cautionTotal,
        };
        response.data.house.documents.forEach((document, index) => {
          if(document.type === 'owner_justification'){
            formData.value.OwnerJustification = `http://${host}/${document.filePath}`;
          }else{
          // Assuming the document type is "image"
          formData.value[`image${index}`] = `http://${host}/${document.filePath}`;
          }
        });
      } catch (error) {
        throw new Error("Une erreur s'est produite lors de la récuperation de la publication. Veuillez réessayer.");
      }
    };

    onMounted(() => {
      created();
    });
    // updating the announcement
  const submitForm = async () => {
    try {
      loading.value = true;
      const formWithFiles = new FormData();
      const authToken = VueCookies.get('access_token');

      Object.keys(formData.value).forEach((key) => {
      if (formData.value[key] !== null && formData.value[key] !== undefined) {
        if (
          ['OwnerJustification', 'image1', 'image2', 'image3', 'image4', 'image5'].includes(key)
        ) {
          const file = formData.value[key];
          // Check if it's a file, and directly append it
          if (file instanceof File) {
            const filename = file.name || 'file';
            formWithFiles.append(key, file, filename);
          } else {
            // Handle other cases (like base64 strings) appropriately
            formWithFiles.append(key, file.toString());
          }
        } else {
          // Handle other cases (like base64 strings) appropriately
          formWithFiles.append(key, formData.value[key].toString());
        }
      }
    });


      const host = import.meta.env.VITE_APP_HOST || 'localhost';
      const response = await axios.put(`http://${host}/api/locations/update/${props.publicationId}`, formWithFiles, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.");
      }

      location.reload();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        error.value = "Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous connecter et réessayer.";
        setTimeout(() => {
          route.push('/sign-in');
        }, 5000);
      } else {
        error.value = err.message || "Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.";
      }
      loading.value = false;
      setTimeout(() => {
        error.value = null;
      }, 5000);
    }
  };
  // Delete announcement
  const deleteAnnouncement = async () => {
      try {
        const host = import.meta.env.VITE_APP_HOST || 'localhost';
        const authToken = VueCookies.get('access_token');
        const response = await axios.delete(`http://${host}/api/locations/delete/${props.publicationId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        console.log('response', response);

        if (response.status !== 204) {
          throw new Error("Une erreur s'est produite lors de la suppression de l'annonce. Veuillez réessayer.");
        }

        showDeleteModal.value = false;
        location.reload();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          error.value = "Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous connecter et réessayer.";
          setTimeout(() => {
            route.push('/sign-in');
          }, 5000);
        } else {
          error.value = error.message || "Une erreur s'est produite lors de la suppression de l'annonce. Veuillez réessayer.";
        }
      }
    };

    const openDeleteModal = () => {
      showDeleteModal.value = true;
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
    };

  return { route, redirectPage, submitForm, loading, error, formData, deleteAnnouncement, showDeleteModal, openDeleteModal, closeDeleteModal };
},
  methods: {
    handleFileChange(event, field) {
        // Access the file using event.target.files[0]
        this.formData[field] = event.target.files[0];
    },
    showError(message) {
      error.value = message;

      // Clear the error after 5 seconds
      setTimeout(() => {
        error.value = null;
      }, 5000);
    },
  },
});
</script>

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error-border {
  border: 0.5px solid red;
}
</style>