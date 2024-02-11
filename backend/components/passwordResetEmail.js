export const passwordResetEmailHTML = `
<!DOCTYPE html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Réinitialisation du mot de passe</title>
</head>
<body class="font-sans bg-gray-100">
  <table class="w-full max-w-screen-md mx-auto p-8 bg-white rounded-lg shadow-md">
    <tr>
      <td>
        <h1 class="text-4xl font-bold text-center mb-6 text-blue-500">Réinitialisation du mot de passe</h1>
        <p class="text-gray-700 text-lg mb-4">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser :</p>
        <a href="http://localhost:8080/password-reset-confirmation?token=\${resetToken}"
          class="inline-block px-8 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Réinitialiser le mot de passe
        </a>
      </td>
    </tr>
  </table>
</body>
</html>
`;