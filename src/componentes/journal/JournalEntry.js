import React from 'react';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({id, date, titlle, body, url}) => {
    const dispatch= useDispatch();


    const newDate = moment(date);

    const handleEntryClick=()=>{
       dispatch (activeNote(id,{
           date,titlle,body,url
       }));
    };
    

    
    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }
        >
            
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { titlle }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span> { newDate.format('dddd') } </span>
                <h4> { newDate.format('Do') } </h4>
            </div>

        </div>
    )
}
