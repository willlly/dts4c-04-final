import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './base';

export const signingIn = async (email, password) => {
    try {
        const userClient = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return userClient.user;
    } catch (err) {
        console.log(err.message);
        return err;
    }
};
