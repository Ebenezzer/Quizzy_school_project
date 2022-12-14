// Add relevant imports here 
import React from "react"
import resolvePromise from "./resolvePromise"
import { firebaseModelPromise } from "./firebase/firebaseModel"
import App from "./App"
import promiseNoData from "./Views/promiseNoData/promiseNoData"
import { updateFirebaseFromModel } from "./firebase/firebaseModel"
import { updateModelFromFirebase } from "./firebase/firebaseModel"
import { authChange, auth } from './firebase/firebaseModel';
import { useNavigate } from 'react-router-dom'



// Define the ReactRoot component
function ReactRoot(){


    const [promiseState] = React.useState({})
    const [,reRender] = React.useState();
    const [user, isUser] = React.useState(false); // React.useState(userCredential)


    authChange(auth) // ?? should it be in ReactRoot.js or App.js
    // i want to be able to have unauth user in Login & Register page but nowhere else

    function rootComponent(){
    resolvePromise(firebaseModelPromise(),promiseState, notifyACB);
    // set up listener to see if usercrendetial exists
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