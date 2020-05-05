import React from 'react'
import NotefulContext from '../NotefulContext.js'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import './Note.css'

function deleteNote(note, history, callBack) {
  fetch(`http://localhost:9090/notes/${note.id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
  .then(response => {
    if (response.ok) {
        return response.json()
    }
  })
  .then(() => {
      callBack(note.id)
      history.push(`/folder/${note.folderId}`)
  })
  .catch(error => {
    console.error(error)
    alert('Something went wrong.  Could not delete note.')
  })
}

export default function Note(props) {
  return (
    <NotefulContext.Consumer>
      {(context) => (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${props.note.id}`}>
              {props.note.name}
            </Link>
          </h2>
          <button className='Note__delete' type='button' onClick={() => 
            {deleteNote(props.note, props.history, context.mainDelete)}
            }>
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified 
              {' '}
              <span className='Date'>
                {format(props.note.modified, 'Do MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
      )}
    </NotefulContext.Consumer>
      
  )
}

Note.defaultProps = {
  notes: [],
  history: {push: () => {}}
}

Note.propTypes = {
  note: PropTypes.shape({
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string,
    id: PropTypes.string.isRequired
  }),
  history: PropTypes.object
}