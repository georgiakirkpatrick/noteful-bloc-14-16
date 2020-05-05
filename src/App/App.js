import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NotefulContext from '../NotefulContext.js'
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

const notefulApi = [
    'http://localhost:9090/folders',
    'http://localhost:9090/notes'
];

async function fetchNotefulData() {
    const promises = notefulApi.map(api =>
        fetch(api)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
    )
    
    try {
        return Promise.all(promises);
    }
    catch (err) {
        alert(`Something went wrong: ${err.message}`);
    }
}

export default class App extends Component {
        state = {
            notes: [],
            folders: []
        };
    
    mainDelete = noteId => {
        const newNotes = this.state.notes.filter(note =>
            note.id !== noteId
        )
        this.setState({
            notes: newNotes
        })
    }

    componentDidMount() {
        fetchNotefulData()
            .then((notefulData) => {
                const newFolders = notefulData[0]
                const newNotes = notefulData[1]

                this.setState({
                    folders: newFolders,
                    notes: newNotes
                })
            })
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (<NoteListNav {...routeProps} />)}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route
                    path="/add-folder"
                    render={routeProps => {
                        const folder = {
                            'id': 'add-folder',
                            'name': 'Add*Folder'
                        }
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route 
                    path="/add-note" 
                    render={routeProps => {
                        const folder ={
                            'id': 'add-note',
                            'name': 'Add*Note'
                        }
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain notes={notesForFolder} />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
                <Route 
                    path="/add-folder" 
                    render={routeProps => {
                        return <AddFolder {...routeProps}  />;
                    }}
                />
                <Route 
                    path="/add-note" 
                    render={routeProps => {
                        return <AddNote {...routeProps} folders={folders}/>;
                    }}
                />
            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            mainDelete: this.mainDelete,
            notePageDelete: this.notePageDelete
        }
        
        return (
            <NotefulContext.Provider value={contextValue}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </NotefulContext.Provider>
            
        );
    }
}