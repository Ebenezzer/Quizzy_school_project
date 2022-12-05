class QuizModel{
    constructor(){
        this.observers = [];
    }

    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        function checkCallbackCB(observerCallback){
            return callback !== observerCallback;
        }
        this.observers = this.observers.filter(checkCallbackCB);
    }
    notifyObservers(payload){
        try{
            this.observers.forEach(function invokeObserverCB(observer){observer(payload)}); //will invoke all observers
        }catch(err){console.error(err);}
    }
}

export default QuizModel;
