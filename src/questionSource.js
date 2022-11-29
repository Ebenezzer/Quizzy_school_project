import {BASE_URL, API_KEY} from "../src/apiConfig.js";

function treatHTTPResponseACB(response){ 
    /*TODO throw when the HTTP response is not 200, otherwise return response.json()*/
    if(response.status !== 200) throw new Error("API problem "+response.status);  // 200--> okej!
    return response.json(); 
 }

function getQuestions(limit, categories){
    return fetch(BASE_URL + 'questions', {
        method: 'GET',
        params: {limit: limit, categories: categories},
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'trivia8.p.rapidapi.com'
        }
    }).then(treatHTTPResponseACB); 
}

export {getQuestions}