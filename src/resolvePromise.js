function resolvePromise(promise, promiseState, notify){
    promiseState.promise=promise;
    promiseState.data= null;         
    promiseState.error= null;
    if(notify){     // if a 3rd parameter was sent, we expect it to be a function (ACB)!
        notify();   // so we can call it to notify every time promise, data, or error change
    }  

    function saveDataACB(result){ 
        if(promiseState.promise !== promise) return;
        promiseState.data = result;  // solves race condition: only change state if promise hasn't changed = know that no later promise has already resolved and changed state
        if (notify){notify()};
    } 
    function saveErrorACB(err){ 
        if(promiseState.promise !== promise) return;
        promiseState.error = err;  
        if (notify){notify()};
    }
    if (promise){
        promise.then(saveDataACB).catch(saveErrorACB);
    }    
}

export {resolvePromise};
export default resolvePromise;