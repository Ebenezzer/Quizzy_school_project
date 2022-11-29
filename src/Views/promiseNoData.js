function promiseNoData(promiseState){
    if (!promiseState.promise) {return(<div>No Data</div>)}
    if (promiseState.promise && !promiseState.error && !promiseState.data){return <img src="https://www.google.com/search?q=loading+image+animated+gif&oq=loading+image+animated+gif" className="Loading" />}
    if (promiseState.promise && promiseState.error && !promiseState.data){return <div className="ErrorMSG" >{promiseState.error.error}</div>}
    if (promiseState.promise && !promiseState.error && promiseState.data) {return false}
}

export default promiseNoData