import React, { Component } from 'react';
import './NoteError.css'

export default class NoteError extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='NoteError__note-link'>
                    <h2 className='NoteError__title'>
                        Could not display note
                    </h2>
                </div>
            )
        }

        return this.props.children
    }
}    