// Add relevant imports here 
import React from "react"
import resolvePromise from "./resolvePromise"
import { firebaseModelPromise } from "./firebase/firebaseModel"
import App from "./App"
import promiseNoData from "./Views/promiseNoData/promiseNoData"
import { updateFirebaseFromModel } from "./firebase/firebaseModel"
import { updateModelFromFirebase } from "./firebase/firebaseModel"

// Define the ReactRoot component
function ReactRoot(){

    const [promiseState] = React.useState({})
    const [,reRender] = React.useState();

    function rootComponent(){
    resolvePromise(firebaseModelPromise(),promiseState, notifyACB);
    }
    React.useEffect(rootComponent, []);

    function notifyACB(){    
        function updateFirebaseBothWaysACB(){
            if(promiseState.data){
                updateFirebaseFromModel(promiseState.data)
                updateModelFromFirebase(promiseState.data)
        }
    }
        reRender(new Object())
        updateFirebaseBothWaysACB(promiseState.data)
    }
        
    return promiseNoData(promiseState) || <App model={promiseState.data}/>

}

// Export the ReactRoot component
export default ReactRoot;