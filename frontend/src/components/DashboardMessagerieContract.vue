<template>
    <div class="bg-white p-6 rounded max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-4">Proposer un contrat</h2>
      <form @submit.prevent="generatePDF" class="space-y-4">
        <div>
          <label for="startingDate" class="block text-sm font-medium text-gray-700">Date d’arrivée*</label>
          <input v-model="formData.startingDate" type="date" id="startingDate" name="startingDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        
        <div>
          <label for="contractDuration" class="block text-sm font-medium text-gray-700">Dureé de contrat*</label>
          <input v-model="formData.contractDuration" type="number" id="contractDuration" name="contractDuration" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
  
        <div>
          <label for="rentAmount" class="block text-sm font-medium text-gray-700">Montant du loyer*</label>
          <input v-model="formData.rentAmount" type="number" id="rentAmount" name="rentAmount" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
  
        <div>
          <label for="rentTaxesAmount" class="block text-sm font-medium text-gray-700">Montant des charges*</label>
          <input v-model="formData.rentTaxesAmount" type="number" id="rentTaxesAmount" name="rentTaxesAmount" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
  
        <div class="flex justify-between">
          <button type="submit" class="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">Envoyer</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import html2pdf from 'html2pdf.js';
  import { ref } from 'vue';
  
  export default {
    props: ['studentId', 'housePublicationId'],
    setup(props) {

      const studentId = ref(props.studentId);
      const housePublicationId = ref(props.housePublicationId);
      const formData = ref({
        studentId: '',
        housePublicationId: '',
        startingDate: '',
        contractDuration: '',
        rentAmount: '',
        rentTaxesAmount: '',
      });
      const host = import.meta.env.VITE_APP_HOST || 'localhost';
      const generatePDF = () => {
        if (studentId.value !== null) {
          formData.value.studentId = studentId.value;
        }
        if (housePublicationId.value !== null) {
          formData.value.housePublicationId = housePublicationId.value;
        }
        console.log('formData:', formData.value);
        // Send the data to the server to generate PDF
        axios.post(`http://${host}/api/messagerie/contract`, formData.value)
          .then(response => {
            const contractData = response.data.contractData;

            const pdfContent = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Contract</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2 {
            text-align: center;
        }
        .page-break {
            page-break-before: always;
        }
        /* Customize the styles as needed */
    </style>
</head>
<body>
    <p>&nbsp;</p>
    <img src="/logo@2x.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
<h1><span style="color: #3366ff;">CONTRAT DE LOCATION / COLOCATION</span></h1>
<p><strong>D&Eacute;SIGNATION DES PARTIES</strong></p>
<p>Le pr&eacute;sent contrat est conclu entre les soussign&eacute;s :</p>
<p><strong>Nom et pr&eacute;nom, ou d&eacute;nomination du bailleur :</strong> ${contractData.ownerName} ${contractData.ownerLastName}</p>
<p><strong>Domicile ou si&egrave;ge social du bailleur:</strong> ${contractData.ownerAddress}, ${contractData.ownerPostalCode} ${contractData.ownerCity}</p>
<!-- Add the rest of the information for the landlord -->
<p><strong>Qualit&eacute; du bailleur:</strong> Personne physique</p>
<!-- Add other relevant information for the landlord -->
<p><strong>Nom et adresse du garant:</strong> ${contractData.guarantorName}, ${contractData.guarantorAddress}, ${contractData.guarantorPostalCode} ${contractData.guarantorCity}</p>
<!-- Add any other relevant information for the guarantor -->
<p><strong>Locataire:</strong> ${contractData.studentName} ${contractData.studentLastName}</p>
<p><strong>Adresse:</strong> ${contractData.studentAddress}, ${contractData.studentPostalCode} ${contractData.studentCity}</p>
<!-- Add the rest of the information for the tenant -->
<p><strong>Adresse email du locataire (facultatif):</strong> ${contractData.studentEmail}</p>
<!-- Add other relevant information for the tenant -->
<p></p>
<!-- Add information about the rented property -->
<p><strong>Objet du contrat:</strong> La location d&rsquo;un logement ainsi d&eacute;termin&eacute;</p>
<p><strong>Consistance du logement:</strong></p>
<p><strong>Adresse du logement:</strong> ${contractData.houseAddress}, ${contractData.housePostalCode} ${contractData.houseCity}</p>
<!-- Add other relevant information about the property -->
<p><strong>Surface habitable (en m2):</strong> ${contractData.houseSurface}</p>
<p><strong>Nombre de pi&egrave;ces principales:</strong> ${contractData.houseRooms}</p>
<p><strong>Logement meubl&eacute;:</strong> ${contractData.houseFurnished}</p>
<p>&nbsp;</p>
<p>La consommation d&rsquo;&eacute;nergie finale et le niveau de performance du logement sont d&eacute;termin&eacute;s selon la m&eacute;thode du diagnostic de<br />performance &eacute;nerg&eacute;tique mentionn&eacute; &agrave; l&rsquo;article L. 126-26 du code de la construction et de l&rsquo;habitation. &raquo;</p>
<p>&nbsp;</p>
<!-- Add other relevant information about the property -->
<p><strong>Niveau de performance &eacute;nerg&eacute;tique du logement:</strong> ${contractData.housePerformanceEnergetique}</p>
<p><strong>Niveau des &eacute;missions de gaz a effet de serre:</strong> ${contractData.housePollutionEnergetique}</p>
<p><strong>Autres options :</strong> ${contractData.houseOptions}</p>
<p>&nbsp;</p>
<p>&laquo; Rappel : un logement d&eacute;cent doit respecter les crit&egrave;res minimaux de performance suivants :<br />A) En France m&eacute;tropolitaine :<br />A.1) A compter du 1er janvier 2025, le niveau de performance minimal du logement correspond &agrave; la classe F du DPE ;<br />A.2) A compter du 1er janvier 2028, le niveau de performance minimal du logement correspond &agrave; la classe E du DPE ;<br />A.3) A compter du 1er janvier 2034, le niveau de performance minimal du logement correspond &agrave; la classe D du DPE.<br />B) En Guadeloupe, en Martinique, en Guyane, &agrave; La R&eacute;union et &agrave; Mayotte :<br />B.1) A compter du 1er janvier 2028, le niveau de performance minimal du logement correspond &agrave; la classe F du DPE ;<br />B.2) A compter du 1er janvier 2031, le niveau de performance minimal du logement correspond &agrave; la classe E du DPE.</p>
<p>&nbsp;</p>
<!-- Add other relevant information about energy performance -->
<p class="page-break"><strong>DATE DE PRISE D&rsquo;EFFET ET DUR&Eacute;E DU CONTRAT</strong></p>
<p><strong>Prised&rsquo;effetdu contrat:</strong> ${contractData.startingDate}</p>
<p><strong>Dur&eacute;e du contrat:</strong> ${contractData.contractDuration} ans</p>
<p>&nbsp;</p>
<p>A l&rsquo;exception des locations consenties &agrave; un &eacute;tudiant pour une dur&eacute;e de 9 mois, les contrats de location de logements<br />meubl&eacute;s sont reconduits tacitement &agrave; leur terme pour une dur&eacute;e d&rsquo;un an et dans les m&ecirc;mes conditions. Le locataire peut<br />mettre fin au bail &agrave; tout moment, apr&egrave;s avoir donn&eacute; cong&eacute;. Le bailleur peut, quant &agrave; lui, mettre fin au bail &agrave; son &eacute;ch&eacute;ance<br />et apr&egrave;s avoir donn&eacute; cong&eacute;, soit pour reprendre le logement en vue de l&rsquo;occuper lui-m&ecirc;me ou une personne de sa famille,<br />soit pour le vendre, soit pour un motif s&eacute;rieux et l&eacute;gitime. Les contrats de locations meubl&eacute;es consenties &agrave; un &eacute;tudiant<br />pour une dur&eacute;e de 9 mois ne sont pas reconduits tacitement &agrave; leur terme et le locataire peut mettre fin au bail &agrave; tout<br />moment, apr&egrave;s avoir donn&eacute; cong&eacute;. Le bailleur peut, quant &agrave; lui, mettre fin au bail &agrave; son &eacute;ch&eacute;ance et apr&egrave;s avoir donn&eacute; cong&eacute;.</p>
<p>&nbsp;</p>
<p><strong>CONDITIONS FINANCI&Egrave;RES</strong></p>
<p><strong>a) Loyer:</strong> ${contractData.rentAmount} &euro; par mois</p>
<p>b) Le cas &eacute;chant, modalit&eacute;s particuli&egrave;res de fixation initiale du loyer applicables dans certaines zones tendues :<br />Zones d&rsquo;urbanisation continue de plus de 50 000 habitants o&ugrave; il existe un d&eacute;s&eacute;quilibre marqu&eacute; entre l&rsquo;offre et la demande de<br />logements, entra&icirc;nant des difficult&eacute;s s&eacute;rieuses d&rsquo;acc&egrave;s au logement sur l&rsquo;ensemble du parc r&eacute;sidentiel telles que d&eacute;finies par d&eacute;cret.</p>
<!-- Add the rest of the information for rent and charges -->
<p><strong>Les charges:</strong> ${contractData.rentTaxesAmount} &euro; par mois</p>
<p><strong>TRAVAUX</strong></p>
<!-- Add information about any works if applicable -->
<p><strong>Travaux effectu&eacute;s depuis la fin du dernier contrat de location ou depuis le dernier renouvellement:</strong></p>
<p>${contractData.worksDescription ?? 0} &euro;</p>
<!-- Add other relevant information about works -->
<p></p>
<!-- If applicable, add information about recent improvement works -->
<p><strong>Montant des travaux d'am&eacute;lioration effectu&eacute;s au cours des six derniers mois:</strong> ${contractData.improvementWorksAmount ?? 0} &euro;</p>
<!-- Add other relevant information about improvement works -->
<p></p>
<!-- If applicable, add information about rent increase due to improvement works -->
<p><strong>Majoration du loyer en cours de bail cons&eacute;cutive &agrave; des travaux d'am&eacute;lioration entrepris par le bailleur:</strong></p>
<p>${contractData.rentIncreaseDescription ?? `pas de majoration`}</p>
<p><strong>Montant de la majoration du loyer:</strong> ${contractData.rentIncreaseAmount ?? 0} &euro;</p>
<!-- Add other relevant information about rent increase due to improvement works -->
<p></p>
<!-- If applicable, add information about rent decrease due to tenant-initiated works -->
<p><strong>Diminution de loyer en cours de bail cons&eacute;cutive &agrave; des travaux entrepris par le locataire:</strong></p>
<p>${contractData.tenantWorksDescription ?? `pas de majoration`}</p>
<p><strong>Montant de la diminution du loyer:</strong> ${contractData.tenantWorksDecreaseAmount ?? 0} &euro;</p>
<p><strong>Dur&eacute;e de la diminution du loyer:</strong> ${contractData.tenantWorksDecreaseDuration ?? 0} mois</p>
<!-- Add other relevant information about rent decrease due to tenant-initiated works -->
<p class="page-break"><strong>GARANTIES</strong></p>
<p><strong>D&eacute;p&ocirc;t de garantie:</strong> ${contractData.houseCautionTotal} &euro;</p>
<!-- Add the rest of the information for guarantees -->
<p><strong>CLAUSE DE SOLIDARIT&Eacute;</strong></p>
<p>Pour l&rsquo;ex&eacute;cution de toutes les obligations du pr&eacute;sent contrat en cas de pluralit&eacute; de locataires, il y aura solidarit&eacute; et indivisibilit&eacute; entre eux.</p>
<p><strong>CLAUSE R&Eacute;SOLUTOIRE</strong></p>
<p>Le pr&eacute;sent contrat sera r&eacute;sili&eacute; de plein droit :<br />- en cas de d&eacute;faut de paiement du loyer, des provisions de charge, ou de la r&eacute;gularisation annuelle de charge<br />- en cas de d&eacute;faut de versement du d&eacute;p&ocirc;t de garantie<br />- en cas de d&eacute;faut d&rsquo;assurance des risques locatifs par le locataire (sauf si le bailleur a souscrit une assurance pour<br />le locataire)<br />- en cas de trouble de voisinage constat&eacute; par une d&eacute;cision de justice</p>
<!-- Add information about termination clauses -->
<p><strong>CLAUSE R&Eacute;SOLUTOIRE</strong></p>
<p>Le pr&eacute;sent contrat sera r&eacute;sili&eacute; de plein droit :</p>
<ul>
<li>en cas de d&eacute;faut de paiement du loyer, des provisions de charge, ou de la r&eacute;gularisation annuelle de charge</li>
<li>en cas de d&eacute;faut de versement du d&eacute;p&ocirc;t de garantie</li>
<li>en cas de d&eacute;faut d'assurance des risques locatifs par le locataire (sauf si le bailleur a souscrit une assurance pour le locataire)</li>
<li>en cas de trouble de voisinage constat&eacute; par une d&eacute;cision de justice</li>
</ul>
<!-- If applicable, add information about other termination clauses -->
<p><strong>Autres clauses de r&eacute;siliation:</strong></p>
<!-- Add other relevant information about termination clauses -->
<p><strong>LE CAS &Eacute;CH&Eacute;ANT, HONORAIRES DE LOCATION</strong></p>
<p>A mentionner lorsque le contrat de location est conclu avec le concours d&rsquo;une personne mandat&eacute;e et r&eacute;mun&eacute;r&eacute;e &agrave; cette fin.</p>
<p><strong>Dispositions applicables :</strong></p>
<p>Il est rappel&eacute; les dispositions du I de l&rsquo;article 5 (I) de la loi du 6 juillet 1989, alin&eacute;as 1 &agrave; 3 :</p>
<p>La r&eacute;mun&eacute;ration des personnes mandat&eacute;es pour se livrer ou pr&ecirc;ter leur concours &agrave; l&rsquo;entremise ou &agrave; la n&eacute;gociation d&rsquo;une mise en location d&rsquo;un logement, tel que d&eacute;fini aux articles 2 et 25-3, est &agrave; la charge exclusive du bailleur, &agrave; l&rsquo;exception des honoraires li&eacute;s aux prestations mentionn&eacute;es aux deuxi&egrave;me et troisi&egrave;me alin&eacute;as du pr&eacute;sent I. Les honoraires des personnes mandat&eacute;es pour effectuer la visite du preneur, constituer son dossier et r&eacute;diger un bail sont partag&eacute;s entre le bailleur et le preneur. Le montant toutes taxes comprises imput&eacute; au preneur pour ces prestations ne peut exc&eacute;der celui imput&eacute; au bailleur et demeure inf&eacute;rieur ou &eacute;gal &agrave; un plafond par m&egrave;tre carr&eacute; de surface habitable de la chose lou&eacute;e fix&eacute; par voie r&eacute;glementaire et r&eacute;visable chaque ann&eacute;e, dans des conditions d&eacute;finies par d&eacute;cret. Ces honoraires sont dus &agrave; la signature du bail.</p>
<p>Les honoraires des personnes mandat&eacute;es pour r&eacute;aliser un &eacute;tat des lieux sont partag&eacute;s entre le bailleur et le preneur. Le montant toutes taxes comprises imput&eacute; au locataire pour cette prestation ne peut exc&eacute;der celui imput&eacute; au bailleur et demeure inf&eacute;rieur ou &eacute;gal &agrave; un plafond par m&egrave;tre carr&eacute; de surface habitable de la chose lou&eacute;e fix&eacute; par voie r&eacute;glementaire et r&eacute;visable chaque ann&eacute;e, dans des conditions d&eacute;finies par d&eacute;cret. Ces honoraires sont dus &agrave; compter de la r&eacute;alisation de la prestation.</p>
<p><strong>Plafonds applicables &agrave; ces honoraires :</strong></p>
<p>Montant du plafond des honoraires imputables aux locataires en mati&egrave;re de prestation de visite du preneur, de constitution de son dossier et de r&eacute;daction de bail : {visitAndLeaseManagementFeeCeiling} &euro;/m2 de surface habitable ;</p>
<p>Montant du plafond des honoraires imputables aux locataires en mati&egrave;re d&rsquo;&eacute;tablissement de l&rsquo;&eacute;tat des lieux d&rsquo;entr&eacute;e : {entryConditionFeeCeiling} &euro;/m2 de surface habitable.</p>
<!-- If applicable, add details and distribution of fees -->
<p><strong>D&eacute;tail et r&eacute;partition des honoraires :</strong></p>
<p><strong>Honoraires &agrave; la charge du bailleur :</strong></p>
<p>prestations de visite du preneur, de constitution de son dossier et de r&eacute;daction de bail (indiquez le d&eacute;tail des prestations effectivement r&eacute;alis&eacute;es et le montant des honoraires toutes taxes comprises dus &agrave; la signature du bail) : {landlordFeeDetails}</p>
<p>le cas &eacute;ch&eacute;ant, prestation de r&eacute;alisation de l&rsquo;&eacute;tat des lieux d&rsquo;entr&eacute;e (pr&eacute;cisez le montant des honoraires toutes taxes comprises dus &agrave; compter de la r&eacute;alisation de la prestation) : {entryConditionFeeLandlordDetails}</p>
<p><strong>Honoraires &agrave; la charge du locataire :</strong></p>
<p>prestations de visite du preneur, de constitution de son dossier et de r&eacute;daction de bail (pr&eacute;cisez le d&eacute;tail des prestations effectivement r&eacute;alis&eacute;es et le montant des honoraires toutes taxes comprises dus &agrave; la signature du bail) : {tenantFeeDetails}</p>
<p>le cas &eacute;ch&eacute;ant, prestation de r&eacute;alisation de l&rsquo;&eacute;tat des lieux d&rsquo;entr&eacute;e (pr&eacute;cisez le montant des honoraires toutes taxes comprises dus &agrave; compter de la r&eacute;alisation de la prestation) : {entryConditionFeeTenantDetails}</p>
<p><strong>ANNEXES</strong></p>
<p>Sont annex&eacute;es et jointes au contrat de location les pi&egrave;ces suivantes :</p>
<ul>
<li>Le cas &eacute;ch&eacute;ant, un extrait du r&egrave;glement concernant la destination de l&rsquo;immeuble, la jouissance et l&rsquo;usage des parties privatives et communes et pr&eacute;cisant la quote-part aff&eacute;rente au lot lou&eacute; dans chacune des cat&eacute;gories de charges.</li>
<li>Un dossier de diagnostic technique comprenant :</li>
<ul>
<li>un diagnostic de performance &eacute;nerg&eacute;tique ;</li>
<li>un constat de risque d&rsquo;exposition au plomb pour les immeubles construits avant le 1er janvier 1949 ;</li>
<li>le cas &eacute;ch&eacute;ant, une copie d&rsquo;un &eacute;tat mentionnant l&rsquo;absence ou la pr&eacute;sence de mat&eacute;riaux ou de produits de la construction contenant de l&rsquo;amiante ;</li>
<li>le cas &eacute;ch&eacute;ant, un &eacute;tat de l&rsquo;installation int&eacute;rieure d&rsquo;&eacute;lectricit&eacute; et de gaz, dont l&rsquo;objet est d&rsquo;&eacute;valuer les risques pouvant porter atteinte &agrave; la s&eacute;curit&eacute; des personnes ;</li>
<li>le cas &eacute;ch&eacute;ant, un &eacute;tat des risques naturels et technologiques pour les zones couvertes par un plan de pr&eacute;vention des risques technologiques ou par un plan de pr&eacute;vention des risques naturels pr&eacute;visibles, prescrit ou approuv&eacute;, ou dans des zones de sismicit&eacute;.</li>
</ul>
<li>Une notice d&rsquo;information relative aux droits et obligations des locataires et des bailleurs.</li>
<li>Un &eacute;tat des lieux, un inventaire et un &eacute;tat d&eacute;taill&eacute; du mobilier (&eacute;tablis lors de la remise des cl&eacute;s, dont la date ne peut &ecirc;tre ult&eacute;rieure &agrave; celle de la conclusion du contrat).</li>
<li>Le cas &eacute;ch&eacute;ant, une autorisation pr&eacute;alable de mise en location.</li>
<li>Le cas &eacute;ch&eacute;ant, les r&eacute;f&eacute;rences aux loyers habituellement constat&eacute;s dans le voisinage pour des logements comparables.</li>
</ul>
<p>&nbsp;</p>
<p>Le ${new Date().toLocaleDateString()}, &agrave; ${new Date().toTimeString().split(' ')[0] } <br />Signature du bailleur (ou de son mandataire,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signature du locataire<br />le cas &eacute;ch&eacute;ant)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signature(s) pr&eacute;c&eacute;d&eacute;e(s) de la mention</p>
<p>&laquo; Lu et approuv&eacute; &raquo; :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &laquo; Lu et approuv&eacute; &raquo; :</p>
<p><br /><br /></p>
</body>
</html>

            `;

            const pdfOptions = {
                margin: 5,
                filename: `${studentId.value}${housePublicationId.value}-contrat-de-location.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            html2pdf(pdfContent, pdfOptions);
          })
          .catch(error => console.error('Error generating PDF:', error));
      };
  
      return {
        formData,
        generatePDF,
        studentId,
        housePublicationId,
      };
    },
  };
  </script>
  