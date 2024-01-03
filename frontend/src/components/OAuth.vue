<template>
  <button
    type="button"
    class="text-white uppercase hover:opacity-95 m-5 font-Bahnschrift text-base font-normal leading-5 tracking-normal text-center"
    style="
      width: 328px;
      height: 40px;
      padding: 10px 50px;
      border-radius: 5px;
      background: #FFFFFF;
      font-family: Bahnschrift;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: left;
      background: linear-gradient(270.9deg, #19347D 0%, rgba(25, 52, 125, 0.85) 100%);
      white-space: nowrap;
    "
    @click="handleGoogleClick"
  >
    Se connecter avec Google
  </button>
</template>

  <script>
  import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { app } from '../firebase.js';

  export default {
    setup() {
      const router = useRouter();

      const handleGoogleClick = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);
          const result = await signInWithPopup(auth, provider);
          const res = await fetch('http://localhost/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
 name: result.user.displayName,
                 email: result.user.email,
photo: result.user.photoURL,
},
              ),
          });
          const data = await res.json();
          // Handle the data as needed (store in a local variable or state if required)
          // For example, for simplicity, you can log the data
          console.log(data);
          router.push('/');
        } catch (err) {
          console.error(err);
        }
      };

      return {
        handleGoogleClick,
      };
    },
  };
  </script>