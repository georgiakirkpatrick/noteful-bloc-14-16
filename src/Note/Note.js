import React from 'react'
import NotefulContext from '../NotefulContext.js'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import './Note.css'

function deleteNote(noteId, callBack) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
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
  .then(data => {
      console.log(callBack)
      callBack(noteId)
      window.location.href='/'
  })
  .catch(error => {
    console.error(error)
  })
}

export default function Note(props) {
  return (
    <NotefulContext.Consumer>
      {(context) => (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${props.id}`}>
              {props.name}
            </Link>
          </h2>
          <button className='Note__delete' type='button' onClick={() => 
            {deleteNote(props.id, context.mainDelete)}
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
                {format(props.modified, 'Do MMM YYYY')}
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
}

Note.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string,
    id: PropTypes.string.isRequired
  }))
}