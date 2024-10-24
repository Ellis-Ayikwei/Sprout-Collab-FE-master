import { auth, googleProvider, signInWithPopup } from "./firebaseAuthConfig";

const handleGoogleLogin = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;
		const token = await user.getIdToken();
		await fetch("/api/verify-token", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});
	} catch (error) {
		console.error("Error during Google sign-in", error);
	}
};

export default handleGoogleLogin;
