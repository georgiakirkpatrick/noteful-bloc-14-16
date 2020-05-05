import React from 'react'
import Note from '../Note/Note'
import PropTypes from 'prop-types'
import './NotePageMain.css'

export default function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <Note
        note={props.note}
        history={props.history}
      />
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    name: '',
    modified: '',
    folderId: '',
    id: '',
    content: ''
  },
  history: {push: () => {}}
}

NotePageMain.propTypes = {
  note: PropTypes.shape({
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  history: PropTypes.object
}