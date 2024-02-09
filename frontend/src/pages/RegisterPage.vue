<template>
    <section>
      <div class="fixed top-0 w-full h-12 bg-[#19347D] flex items-center justify-center">
        <img class="h-6" src="/logo-footer.png" alt="Your Logo">
      </div>
    </section>
    <!-- Error message container -->
    <p v-if="error" class="text-red-600 mt-20 text-center font-Bahnschrift text-sm">
      <div
        v-show="errorVisible"
        class="mb-3 inline-flex w-full items-center rounded-lg text-center bg-danger-100 px-6 py-5 text-base text-danger-700"
        role="alert"
      >
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.
      </div>
    </p>
    <div class="flex items-center justify-center min-h-screen">
      <!-- Stepper Card -->
      <div class="card p-4 h-[30rem] w-[20rem]">
        <!-- Stepper -->
        <div class="flex flex-col mt-11 mb-11">
          <div v-for="(step, index) in steps" :key="step.index" class="flex flex-col items-start">
            <div class="flex items-center gap-x-2">
              <div class="step inline-flex items-center">
                <div :class="stepClasses(step)">
                  <span class="text-xs text-white">{{ (step.index === 6) ? "2" : step.index }}</span>
                </div>
                <span class="text-sm font-medium text-[#19347D]">{{ step.label }}</span>
              </div>
            </div>
            <div class="separator ml-2.5">
              <!-- Add separator after each step except the last one -->
              <div v-if="index !== steps.length - 1" :class="separatorClasses(step)"></div>
            </div>
          </div>
        </div>
        <!-- End Stepper -->
      </div>

      <!-- Content Card -->
      <div class="card p-2 ml-2 h-[30rem] w-[480px] overflow-y-auto flex flex-col justify-between">
        <!-- Stepper Content -->
        <div v-for="(step, index) in steps" :key="step.index" v-show="currentStep === step.index" :class="stepContentClasses(step)">
          <form >
            <div class="h-80">
            <div v-if="step.index === 1">
              <h1 class="text-left text-[#19347D] font-bold text-xl">{{ step.label }}</h1>
              <div>
                  <label for="firstName" class="text-[#19347D] text-sm">Prénom*</label>
                  <div class="w-full">
                    <input type="text" id="firstName" :class="{ 'error-border': !formData.firstName && error }" v-model="formData.firstName"   class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="lastName" class="text-[#19347D] text-sm">Nom*</label>
                  <div class="w-full">
                    <input type="text" id="lastName" :class="{ 'error-border': !formData.lastName && error }" v-model="formData.lastName"   class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                <label for="birthDay" class="text-[#19347D] text-sm">Date de naissance*</label>
                <div class="w-full">
                  <input type="date" id="birthDay"    v-model="formData.birthDay" :class="{ 'error-border': !formData.birthDay && error }" class="border p-0 rounded-md w-25" />
                </div>
              </div>
              <div>
                <label class="text-[#19347D] text-sm">Quel est votre genre ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.gender && error }">
                    <div class="flex items-center">
                        <input type="radio"    id="homme" value="homme" v-model="formData.gender" />
                        <label for="homme" class=" text-sm">Homme</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio"    id="femme" value="femme" v-model="formData.gender" />
                        <label for="femme" class=" text-sm">Femme</label>
                    </div>
                </div>
              </div>
              <div>
                  <label for="phoneNumber" class="text-[#19347D] text-sm">Numéro de téléphone*</label>
                  <div class="w-full">
                    <input type="number" id="phoneNumber"    :class="{ 'error-border': !formData.phoneNumber && error }" v-model="formData.phoneNumber" class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label class="text-[#19347D] text-sm">Quel est votre statut ?*</label>
                  <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.status && error }">
                    <div class="flex items-center">
                        <input type="radio" id="etudiant"   value="etudiant" @click="handleStatusStudent" v-model="formData.status" />
                        <label for="etudiant" class="text-sm">Étudiant</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="proprietaire"   value="proprietaire" @click="handleStatusOwner" v-model="formData.status" />
                        <label for="proprietaire" class="text-sm">Propriétaire</label>
                    </div>
                  </div>
              </div>
              <div>
                  <label for="identityDocument" :class="{ 'error-border': !formData.identityDocument && error }" class="text-[#19347D] text-sm">Document d’identité*</label>
                  <input type="file" accept=".png, .jpg, .jpeg .pdf"    id="identityDocument" @change="handleFileChange($event, 'identityDocument')" class="border p-0 rounded-md w-full" />
              </div>
            </div>
            <div v-if="step.index === 2">
              <h1 class="text-left text-[#19347D] font-bold text-xl">{{ step.label }}</h1>
              <div>
                <label for="schoolName" class="text-[#19347D] text-sm">Nom de votre établissement*</label>
                <div class="w-full">
                  <input type="text" id="schoolName"    :class="{ 'error-border': !formData.schoolName && error }" v-model="formData.schoolName" class="border p-0 rounded-md w-25" />
                </div>
              </div>
              <div>
                  <label for="schoolStatus" class="text-[#19347D] text-sm">Statut scolaire*</label>
                  <div class="w-full">
                    <input type="text" id="schoolStatus"    :class="{ 'error-border': !formData.schoolStatus && error }" v-model="formData.schoolStatus" class="border p-0 rounded-md w-25" />
                  </div>
              </div>
              <div>
                  <label for="schoolCertificate" class="text-[#19347D] text-sm">Justificatif étudiant*</label>
                  <input type="file" accept=".png, .jpg, .jpeg .pdf"    id="schoolCertificate" :class="{ 'error-border': !formData.schoolCertificate && error }" @change="handleFileChange($event, 'schoolCertificate')" class="border p-0 rounded-md w-full" />
              </div>
            </div>
            <div v-if="step.index === 3">
              <h1 class="text-left text-[#19347D] font-bold text-xl">{{ step.label }}</h1>
              <div class="">
                <label class="text-[#19347D] text-sm">Combien avez-vous de garants ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.warrantyPeople && error }">
                  <div class="flex items-center">
                    <input type="radio" id="warrantyPeople1"    value="1" v-model="formData.warrantyPeople" />
                    <label for="warrantyPeople1" class=" text-sm">1</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="warrantyPeople2"    value="2" v-model="formData.warrantyPeople" />
                    <label for="warrantyPeople2" class=" text-sm">2</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="warrantyPeopleVisale"    value="Visale" v-model="formData.warrantyPeople" />
                    <label for="warrantyPeopleVisale" class=" text-sm">Visale</label>
                  </div>
                </div>
              </div>
              <div class="bg-slate-200 rounded-md my-2 p-2">
                <p><b>Seulement si</b> vous avez des garants!</p>
                <div>
                  <label for="identityDocumentGuarantor" class="text-[#19347D] text-sm">Document d’identité du/des garants*</label>
                  <input type="file" accept=".png, .jpg, .jpeg .pdf"    id="identityDocumentGuarantor" @change="handleFileChange($event, 'identityDocumentGuarantor')" class="border p-0 rounded-md w-full" />
                </div>
                <div>
                  <label for="guarantorIncomeJustification" class="text-[#19347D] text-sm">Justificatif de ressources du/des garants*</label>
                  <input type="file" accept=".png, .jpg, .jpeg .pdf"    id="guarantorIncomeJustification" @change="handleFileChange($event, 'guarantorIncomeJustification')" class="border p-0 rounded-md w-full" />
                </div>
                <div>
                  <label for="addressJustificationGuarantor" class="text-[#19347D] text-sm">Justificatif de domicile du/des garants*</label>
                  <input type="file" accept=".png, .jpg, .jpeg .pdf"    id="addressJustificationGuarantor" @change="handleFileChange($event, 'addressJustificationGuarantor')" class="border p-0 rounded-md w-full" />
                </div>
              </div>
              <div class="bg-slate-200 rounded-md my-2 p-2">
                <p><b>Seulement si</b> vous avez visale!</p>
                <div>
                  <label for="visaleDocument" class="text-[#19347D] text-sm">Justificatif Visale*</label>
                  <input type="file" accept=".png, .jpg, .jpeg"    id="visaleDocument" @change="handleFileChange($event, 'visaleDocument')" class="border p-0 rounded-md w-full" />
                </div>
              </div>
            </div>
            <div v-if="step.index === 4">
              <h1 class="text-left text-[#19347D] font-bold text-xl">{{ step.label }}</h1>
              <div class="">
                <label class="text-[#19347D] text-sm">Avez vous des animaux de compagnies ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.hasPets && error }">
                  <div class="flex items-center">
                    <input type="radio" id="hasPetsYes" value="Oui"    v-model="formData.hasPets" />
                    <label for="hasPetsYes" class=" text-sm">Oui</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="hasPetsNo" value="Non"    v-model="formData.hasPets" />
                    <label for="hasPetsNo" class=" text-sm">Non</label>
                  </div>
                </div>
                <label class="text-[#19347D] text-sm">Êtes vous fumeur ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.smokingHabit && error }">
                    <div class="flex items-center">
                        <input type="radio" id="smokerYes" value="yes"    v-model="formData.smokingHabit" />
                        <label for="smokerYes" class=" text-sm">Oui</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="smokerOcasionaly"    value="ocasionaly" v-model="formData.smokingHabit" />
                        <label for="smokerOcasionaly" class=" text-sm">Occasionnellement</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="smokerNo"    value="no" v-model="formData.smokingHabit" />
                        <label for="smokerNo" class=" text-sm">Non</label>
                    </div>
                </div>
                <label class="text-[#19347D] text-sm">Quels types de logement préférez vous ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.preferredHousing && error }">
                  <div class="flex items-center">
                    <input type="radio" id="preferredHousingQuiet"    value="Calme" v-model="formData.preferredHousing" />
                    <label for="preferredHousingQuiet" class=" text-sm">Calme</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="preferredHousingLively"    value="Animé" v-model="formData.preferredHousing" />
                    <label for="preferredHousingLively" class=" text-sm">Animé</label>
                  </div>
                </div>
                <div>
                  <label for="hobbiesAndInterests" class="text-[#19347D] text-sm">Quels sont vos hobbies et intérêts ?</label>
                  <div class="w-full">
                    <input  type="text" id="hobbiesAndInterests"  v-model="formData.hobbiesAndInterests" class="block p-4 border rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 w-25" />
                  </div>
              </div>
              </div>
            </div>
            <div v-if="step.index === 5">
              <h1 class="text-left text-[#19347D] font-bold text-xl">{{ step.label }}</h1>
              <div class="">
                <label class="text-[#19347D] text-sm">Quels type de logement cherchez-vous ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.housingType && error }">
                  <div class="flex items-center">
                    <input type="radio" id="housingTypeApartment"    value="Appartement" v-model="formData.housingType" />
                    <label for="housingTypeApartment" class=" text-sm">Appartement</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="housingTypeStudio"    value="Studio" v-model="formData.housingType" />
                    <label for="housingTypeStudio" class=" text-sm">Studio</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="housingTypeHouse"    value="Maison" v-model="formData.housingType" />
                    <label for="housingTypeHouse" class=" text-sm">Maison</label>
                  </div>
                </div>
                <label class="text-[#19347D] text-sm">Quels type de location cherchez-vous ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.searchType && error }">
                  <div class="flex items-center">
                    <input type="radio" id="searchTypeRent"    value="Location" v-model="formData.searchType" />
                    <label for="searchTypeRent" class=" text-sm">Location</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="searchTypeColocation"    value="Colocation" v-model="formData.searchType" />
                    <label for="searchTypeColocation" class=" text-sm">Colocation</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="searchTypeHomestay"    value="Chambre chez l’habitant" v-model="formData.searchType" />
                    <label for="searchTypeHomestay" class=" text-sm">Chambre chez l’habitant</label>
                  </div>
                </div>
                <div>
                  <label for="budget" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Quel est votre budget ?*(en euro, par exemple pour 1500 euro mettre 1500!)</label>
                  <input type="number" id="budget"    v-model="formData.budget" :class="{ 'error-border': !formData.budget && error }" class="border p-0 rounded-md w-25" />
                </div>
              </div>
            </div>
            <div v-if="step.index === 6" class="">
              <h1 class="text-left text-[#19347D] font-bold text-xl">{{ step.label }}</h1>
              <div class="">
                <label class="text-[#19347D] text-sm">Acceptez vous les animaux ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.ownerAnimalAcceptance && error }">
                  <div class="flex items-center">
                    <input type="radio" id="ownerAnimalAcceptanceOui"    value="oui" v-model="formData.ownerAnimalAcceptance" />
                    <label for="ownerAnimalAcceptanceOui" class=" text-sm">Oui</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="ownerAnimalAcceptanceNon"    value="non" v-model="formData.ownerAnimalAcceptance" />
                    <label for="ownerAnimalAcceptanceNon" class=" text-sm">Non</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="ownerAnimalAcceptanceWhatever"    value="peu importe" v-model="formData.ownerAnimalAcceptance" />
                    <label for="ownerAnimalAcceptanceWhatever" class=" text-sm">Peu importe</label>
                  </div>
                </div>
                <label class="text-[#19347D] text-sm">Acceptez vous les fumeurs ?*</label>
                <div class="flex items-center gap-x-4" :class="{ 'error-border': !formData.ownerSmokeAcceptance && error }">
                  <div class="flex items-center">
                    <input type="radio" id="ownerSmokeAcceptanceOui"    value="oui" v-model="formData.ownerSmokeAcceptance" />
                    <label for="ownerSmokeAcceptanceOui" class=" text-sm">Oui</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="ownerSmokeAcceptanceNon"    value="non" v-model="formData.ownerSmokeAcceptance" />
                    <label for="ownerSmokeAcceptanceNon" class=" text-sm">Non</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="ownerSmokeAcceptanceWhatever"    value="peu importe" v-model="formData.ownerSmokeAcceptance" />
                    <label for="ownerSmokeAcceptanceWhatever" class=" text-sm">Peu importe</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="mt-10 flex justify-between items-end h-20">
              <button type="button" class="mr-5" @click="goToPreviousStep" :class="buttonClasses('previous')" :disabled="currentStep === 1">Précédent</button>
              <button type="button" class="ml-5" @click="(currentStep === steps.length || currentStep === 6) ? submitForm() : goToNextStep()" :class="buttonClasses('next')">
                {{ (currentStep === steps.length || currentStep === 6) ? 'Valider mon inscription' : 'Suivant' }}
              </button>
            </div>
          </form>
        </div>
        <!-- End Stepper Content -->
      </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies'

export default defineComponent({
  data() {
    return {
      currentStep: 1,
      showStep2Fields: true,
      proprio: false,
      errorVisible: true,
      formData: {
        // User Information
        firstName: null,
        lastName: null,
        birthDay: null,
        phoneNumber: null,
        address: null,
        postalCode: null,
        city: null,
        gender: "homme",
        status: "etudiant",

        // Student Information
        schoolName: null,
        schoolStatus: null,
        identityDocument: null,

        // Documents
        warrantyPeople: null,
        identityDocumentGuarantor: null,
        guarantorIncomeJustification: null,
        addressJustificationGuarantor: null,
        visaleDocument: null,
        schoolCertificate: null,

        // Personal Preferences
        hasPets: null,
        smokingHabit: null,
        preferredHousing: null,
        hobbiesAndInterests: null,

        // Owner Preferences
        ownerAnimalAcceptance: null,
        ownerSmokeAcceptance: null,


        // Housing Preferences
        housingType: null,
        searchType: null,
        budget: null,
      },
      loading: false,
      error: null,
      steps: [
        { index: 1, label: "Informations personnelles", content: "Collect data" },
        { index: 2, label: "Informations académiques", content: "Collect data" },
        { index: 3, label: "Garantie financière", content: "Collect data" },
        { index: 4, label: "Mode de vie et préférences personnelles", content: "Collect data" },
        { index: 5, label: "Détails sur la recherche de logement", content: "Collect data" },
      ],
    };
  },
  methods: {
    stepClasses(step) {
      return [
        "w-10 h-10 flex justify-center items-center flex-shrink-0 font-medium",
        {
          "bg-[#19347D] text-white rounded-full": this.currentStep >= step.index,
          "bg-gray-300 text-gray-800 rounded-full": this.currentStep < step.index,
        },
      ];
    },
    handleFileChange(event, field) {
        // Access the file using event.target.files[0]
        this.formData[field] = event.target.files[0];
    },
    separatorClasses(step) {
      return [
        "border-2 border-gray-300 h-10 ml-2",
        {
          "border-[#19347D]": this.currentStep >= step.index,
        },
      ];
    },
    stepContentClasses(step) {
      return {
        "success": this.currentStep > step.index,
        "active": this.currentStep === step.index,
      };
    },
    buttonClasses(type) {
      return [
        "py-2 px-4 rounded-md font-medium focus:outline-none",
        {
          "bg-[#19347D] text-white hover:bg-blue-700": type === 'next' || type === 'submit',
          "bg-gray-400 text-gray-800 hover:bg-gray-500": type === 'previous',
        },
      ];
    },
    goToNextStep() {
      if (this.currentStep < this.steps.length && this.proprio === true) {
        this.currentStep += 5;
      }else if (this.currentStep < this.steps.length) {
        this.currentStep += 1;
      }
    },
    goToPreviousStep() {
      if (this.currentStep > 1 && this.proprio === true) {
        this.currentStep -= 5;
      }else{
        this.currentStep -= 1;
      }
    },
    async submitForm() {
      try {
        this.loading = true;
        const formWithFiles = new FormData();
        const route = useRouter();
         // Retrieve the authentication token from the cookie
        const authToken = VueCookies.get('access_token');

        Object.keys(this.formData).forEach((key) => {
          if (this.formData[key] !== null && this.formData[key] !== undefined) {
            if (
              key === 'identityDocument' ||
              key === 'identityDocumentGuarantor' ||
              key === 'guarantorIncomeJustification' ||
              key === 'addressJustificationGuarantor' ||
              key === 'visaleDocument' ||
              key === 'schoolCertificate'
            ) {
              const file = this.formData[key];
              const filename = file.name || 'file';
              formWithFiles.append(key, file, filename);
            } else {
              formWithFiles.append(key, this.formData[key]);
            }
          }
        });
        
        const response = await axios.post('http://localhost/api/account/information/register', formWithFiles, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
          },
        });
      
        const data = response.data;
        console.log(data);
      
        if (data.success) {
          // Redirect to homepage on success
          route.push('/');
        } else {
          this.showError("Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.");
        }
      } catch (err) {
        this.loading = false;
        this.error = err.message;
        this.showError("Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.");
        setTimeout(() => {
            this.errorVisible = false;
          }, 5000);
      }
    },
    handleStatusStudent() {
      this.proprio = false;
      this.steps = [
        { index: 1, label: "Informations personnelles", content: "Collect data" },
        { index: 2, label: "Informations académiques", content: "Collect data" },
        { index: 3, label: "Garantie financière", content: "Collect data" },
        { index: 4, label: "Mode de vie et préférences personnelles", content: "Collect data" },
        { index: 5, label: "Détails sur la recherche de logement", content: "Collect data" },
      ];
    },

    handleStatusOwner() {
      this.proprio = true;
      this.steps = [
        { index: 1, label: "Informations personnelles", content: "Collect data" },
        { index: 6, label: "Vos préférences propriétaire", content: "Collect data" },
      ];
    },
    showError(message) {
      this.error = message;

      // Clear the error after 5 seconds
      setTimeout(() => {
        this.error = null;
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