import React from 'react'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'
import idGenerator, { setPrefix } from 'react-id-generator'
import './AddFolder.css'

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folderName: {
                value: '',
                touched: false
            }
        }
    }

    updateFolderName(folderName) {
        this.setState({folderName: {value: folderName, touched: true}})
    }

    handleNewFolder = event => {
        event.preventDefault();

        setPrefix('folder-id-')

        const { folderName } = this.state
        const uniqueId = idGenerator()
        const newFolderInputs = {
            id: uniqueId,
            name: folderName.value
        }

        console.log('newFolderInputs', newFolderInputs)
    
        fetch(`http://localhost:9090/folders/`, {
          method: 'POST',
          body: JSON.stringify(newFolderInputs),
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(() => {
            this.props.updateStateFolders(newFolderInputs)
        })
        .then(() => {
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
            alert('Something went wrong.  Could not create folder.')
        })
    }

    validateFolderName() {
        const folderName = this.state.folderName.value.trim()
        if (folderName.length === 0) {
            return 'Please enter a name for your new folder'
        }
    }

    render() {
        return (
            <form className='form-AddFolder' onSubmit={e => this.handleNewFolder(e)}>
                <h2>Add Folder</h2>

                <div className="form-hint">* required field</div>

                <div className='form-section-input'>
                    <label htmlFor='folder-name'>Name *</label>
                    <input className='form-input' type='text' name='folder-name' htmlFor='folder-name' id='folder-name' onChange={e => this.updateFolderName(e.target.value)}/>
                    {this.state.folderName.touched && (
                        <ValidationError message={this.validateFolderName()} />
                    )}
                </div>

                <div className='form-section-input'>
                    <button type='reset' className='form-button'>Cancel</button>
                    <button 
                        type='submit' 
                        className='form-button'
                        disabled={
                            this.validateFolderName()
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

AddFolder.defaultProps = {
    history: {push: () => {}},
    updateStateFolders: () => {}
}
  
AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
    updateStateFolders: PropTypes.func
}