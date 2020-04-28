import React from 'react'
import Note from '../Note/Note'
// import NotefulContext from '../NotefulContext'
import './NotePageMain.css'

export default function NotePageMain(props) {
  return (
    // <NotefulContext.Consumer>
      /* {(context) => ( */
            <section className='NotePageMain'>
              <Note
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
              />
              <div className='NotePageMain__content'>
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                  <p key={i}>{para}</p>
                )}
              </div>
            </section>
        /* )} */
    // </NotefulContext.Consumer>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
