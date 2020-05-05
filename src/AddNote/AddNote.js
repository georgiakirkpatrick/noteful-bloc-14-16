import React from 'react'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'


export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteName: {
                value: '',
                touched: false
            },
            noteContent: {
                value: '',
                touched: false
            },
            noteFolder: {
                value: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
                touched: false
            }
        }
    }

    handleNewNote(event) {
        event.preventDefault();        
        const { noteName, noteContent, noteFolder } = this.state
        const newNoteInputs = {
            name: noteName.value,
            modified: dayjs().format(),
            folderId: noteFolder.value,
            content: noteContent.value
        }

        fetch(`http://localhost:9090/notes/`, {
          method: 'POST',
          body: JSON.stringify(newNoteInputs),
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(
            window.location.href='/'
        )
        .catch(error => {
            console.error(error)
        })
    }

    updateNoteName(noteName) {
        this.setState({
            noteName: {value: noteName, touched: true}})
    }
    updateNoteContent(noteContent) {
        this.setState({
            noteContent: {value: noteContent, touched: true}})
    }
    updateNoteFolder(noteFolder) {
        this.setState({
            noteFolder: {value: noteFolder, touched: true}})
    }

    validateNoteName() {
        const noteName = this.state.noteName.value.trim()
        if (noteName.length === 0) {
            return 'Please enter a name for your new note.'
        }
    }
    
    render() {
        return (
            <form className='form-AddNote' onSubmit={e => this.handleNewNote(e)}  action='http://localhost:9090' method='POST'>
                <h2>Add Note</h2>

                <div className="form-hint">* required field</div>

                <div className='form-section-input'>
                    <label htmlFor='note-name'>Name *</label>
                    <input 
                        className='form-input'
                        type='text' 
                        name='note-name' 
                        htmlFor='note-name' 
                        id='note-name' 
                        onChange={e => this.updateNoteName(e.target.value)} 
                    />
                    {this.state.noteName.touched && (
                        <ValidationError message={this.validateNoteName()} />
                    )}
                </div>

                <div className='form-section-input'>
                    <label htmlFor='content'>Content</label>
                    <input 
                        className='form-input' 
                        type='text' 
                        name='content' 
                        htmlFor='content' 
                        id='content' 
                        onChange={e => this.updateNoteContent(e.target.value)}
                    />
                </div>

                <div className='form-section-input'>
                    <label htmlFor='folder'>Folder</label>
                    <select 
                        className='form-input' 
                        type='text' 
                        name='folder' 
                        htmlFor='folder' 
                        id='folder' 
                        onChange={e => this.updateNoteFolder(e.target.value)}
                    >
                        {this.props.folders.map(folder => (
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-button-section'>
                    <button type='reset' className='form-button'>Cancel</button>
                    <button
                        type='submit' 
                        className='form-button'
                        disabled={
                            this.validateNoteName()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>

        )
    }
}

AddNote.defaultProps = {
    folders: []
}
  
AddNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }))
}