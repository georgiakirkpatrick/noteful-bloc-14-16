import React from 'react'
import NotefulContext from '../NotefulContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'

export default function NoteListMain(props) {
  console.log('props', props)
  return (
    <NotefulContext.Consumer>
      {(context) => (
        <section className='NoteListMain'>
          <ul>
            {props.notes.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      )}
    </NotefulContext.Consumer> 
  )
}

NoteListMain.defaultProps = {
  notes: [],
}
