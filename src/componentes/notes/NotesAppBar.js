import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { saveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch= useDispatch();
    const {active} = useSelector(state => state.notes);
    

    const handleSave=()=>{
        dispatch(saveNote(active))

    }

    const handlePictureClick=()=>{
        document.querySelector('#fileSelector').click();
    }

    /*const fecha = new Date();
    const hoy= fecha.getUTCDate()+'/'+  fecha.getMonth()+1+'/'+ fecha.getFullYear() + '/'
    const newDate = moment(hoy);*/

    const dateActual = Date.now();
    const newDate = moment(dateActual);




    const handleFileChangue=(e)=>{
        const file = e.target.files[0];
                   

       if(file){
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes__apbar">
            <span><i className="fas fa-hockey-puck    "></i></span>{newDate.format('Do MMMM YYYY')}
            <input id="fileSelector"type="file" name="file"style={{display:'none'}} onChange={handleFileChangue}/>
            <div>
                <button className="btn" onClick={handlePictureClick} >Picture</button>
                 <button onClick={handleSave} className="btn">Save</button>

            </div>
            
        </div>
    )
}
