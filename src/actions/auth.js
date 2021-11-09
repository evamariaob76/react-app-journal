import {  googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { getAuth, updateProfile , signOut ,signInWithEmailAndPassword , createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { noteLogout } from "./notes";




const auth = getAuth();


export const  startLoginEmailPassword=(email,password)=>{

    return (dispatch)=>{
        dispatch(startLoading());

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
             dispatch(login(user.uid, user.displayName));
             dispatch(finishLoading());

            console.log(user)
        })
        .catch((error) => {
           // const errorCode = error.code;
            //const errorMessage = error.message;
            dispatch(finishLoading());
            Swal.fire('Error', error.message,'error')

        });
    }
}

export const startRegisterEmailPasswordEmail=(email, password,name)=>{

    return (dispatch)=>{
        createUserWithEmailAndPassword(auth, email,password)
        .then(async({user}) =>{
           await updateProfile(auth.currentUser, {
            displayName: name
            })
           console.log(user)
            dispatch(login(user.uid, user.displayName))
            })
            .catch(e=>{
                console.log(e);
                Swal.fire('Error', e.message,'error')

            })
    }
}

export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login =(uid, displayName)=>{
    return{
        type:types.login,
        payload:{
            uid,
            displayName
        }
    }
}

export const startLogout =()=>{
    return async (dispatch)=>{
        await signOut(auth);
        dispatch( logout());
        dispatch(noteLogout());
  }
}

export const logout=()=>({
    type:types.logout
})
