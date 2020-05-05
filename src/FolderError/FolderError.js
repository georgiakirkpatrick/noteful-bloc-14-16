import React, { Component } from 'react';
import './FolderError.css'

export default class FolderError extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        console.log('Error:', error)
        return {hasError: true}
    }

    render() {
        const errorCheck = this.state.hasError ? <p className='FolderError__folder-link'>Could not display folder</p> : this.props.children
            return (
            <div >
                {errorCheck}
            </div>
        )
    }
}