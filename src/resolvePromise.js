function resolvePromise(promise, promiseState, notify){
    promiseState.promise=promise;
    promiseState.data= null;         
    promiseState.error= null;
    if(notify){     
        notify();   
    }  

    function saveDataACB(result){ 
        if(promiseState.promise !== promise) return;
        promiseState.data = result;  
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