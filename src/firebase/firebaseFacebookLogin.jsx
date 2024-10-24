import { auth, facebookProvider, signInWithPopup } from './firebaseAuthConfig';


const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      const token = await user.getIdToken();
      await fetch('/api/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error("Error during Facebook sign-in", error);
    }
    };
  
  export default handleFacebookLogin;