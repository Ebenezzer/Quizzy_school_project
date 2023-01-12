// Relevant imports
import React from "react"
import App from "./App"
import GameModel from "./GameModel"



// Define the ReactRoot component
function ReactRoot(){
    return <App model={new GameModel()}/>
}

// Export the ReactRoot component
export default ReactRoot;