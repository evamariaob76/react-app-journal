import { db } from "../firebase/firebaseConfig";
import { collection, addDoc,updateDoc, doc, deleteDoc  } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote =()=>{
    return async(dispatch, getState)=>{
        const uid=getState().auth.uid;
        const newNote={
            titlle:'',
            body:'',
            date: new Date().getTime()
        }
        //const doc= await db.collection(`${uid}/journal/notes`).add(newNote);

 try {
    const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote))
      
    } catch (e) {
      console.log(e);
    }
    }
};

export const addNewNote=(id,note)=>({
        type: types.notesAddNew,
        payload:{
            id,...note
        }

});

export const activeNote =(id,note)=>({
    type:types.notesActive,
    payload:{
        id,
        ...note
    }
});


export const startLoadingNotes=(uid)=>{
    return async (dispatch)=>{
        const notes= await loadNotes(uid);
         dispatch(setNotes(notes))
    }

}

export const setNotes=(notes)=>({
    type: types.notesLoad,
    payload: notes
    
})
//react-journal

export const saveNote=(note)=>{
   return async(dispatch, getState) => {
       //console.log(note)
 
        const { uid } = getState().auth
        if(!note.url){
            delete note.url
        }
    
 
       const noteToFirestore = { ...note };
        delete noteToFirestore.id
 
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef,noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Guardado', note.titlle,'success')
    }
}

export const refreshNote =(id, note)=>({
    type:types.notesUpdated,
    payload:{
        id, 
        note:{
            id,
            ...note
        }
    }
})

export const startUploading =(file)=>{
    return async(dispatch, getState)=>{
        //const activeNote=getState().notes;
        const{active: activeNote}= getState().notes;
        Swal.fire({
            title:'Cargando...',
            text:' Espere...',
             allowOutsideClick: false,
             showConfirmButton: false,      
             willOpen: () => {         
                 Swal.showLoading();       
            },    
         });
        
        const fileUrl = await fileUpload( file );
        activeNote.url=fileUrl;
        dispatch(saveNote(activeNote));
        Swal.close();
    }

}

export const startDeleting=(id)=>{
    return  async(dispatch,getState)=>{
        const uid=getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`);


        await deleteDoc(noteRef);
        dispatch(deleteNote(id));
        console.log('eliminado')

    }

}
export const deleteNote =(id)=>({
    type:types.notesDelete,
    payload:id
    
})

export const noteLogout=()=>({
    type: types.notesLogoutCleaning,

})