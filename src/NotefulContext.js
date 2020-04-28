import React from 'react'

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    mainDelete: () => {},
    notePageDelete: () => {}
})

export default NotefulContext