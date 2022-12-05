import loadingGif from "../../Assets/Images/loadingGif.gif";
import "./promiseNoData.css"

function promiseNoData(promiseState){
    if (!promiseState.promise) {return(<div>No Data</div>)}
    if (promiseState.promise && !promiseState.error && !promiseState.data){return <img src={loadingGif} className="Loading" />}
    if (promiseState.promise && promiseState.error && !promiseState.data){return <div className="ErrorMSG" >{promiseState.error.error}</div>}
    if (promiseState.promise && !promiseState.error && promiseState.data) {return false}
}

export default promiseNoData