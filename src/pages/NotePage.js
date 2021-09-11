import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import {ReactComponent as LeftArrow} from "../assets/left-arrow.svg"

function NotePage({match, history}) {
    let noteId = match.params.note_id

    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if(noteId === 'new'){
            return
        }
        let response = await fetch(`http://127.0.0.1:5000/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let CreateNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let updateNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'applicaiton/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }

    let handleSubmit = () => {
        if(noteId != 'new' && !note.body){
            deleteNote()
        } else if(noteId !== 'new'){
            updateNote()
        } else if(noteId === 'new' && note !== null){
            CreateNote()
        }
        history.push('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <LeftArrow onClick={handleSubmit}/>
                    </Link>
                </h3>
                {noteId != 'new'? ( 
                <button onClick={deleteNote}> Delete</button>) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
    <textarea onChange={(e) =>{setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
