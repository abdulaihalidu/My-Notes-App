import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:5000/notes')
        let data = await response.json()

        setNotes(data)
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782;Notes</h2>
                <p className="notes-count">Total notes: {notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                <ListItem key={index} note={note}/>
            ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesPage
