import {BASE_URL, API_KEY} from "../src/apiConfig.js";

function treatHTTPResponseACB(response){ 
    /*TODO throw when the HTTP response is not 200, otherwise return response.json()*/
    if(response.status !== 200) throw new Error("API problem "+response.status);  // 200--> okej!
    return response.json(); 
 }

function getQuestions(searchParams){
    return fetch('https://trivia8.p.rapidapi.com/questions?'+new URLSearchParams(searchParams), {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0ba596d58dmshd52325f6e61ac3bp12c081jsncce51346ba85',
            'X-RapidAPI-Host': 'trivia8.p.rapidapi.com'
        }
    }).then(treatHTTPResponseACB); 
}

export {getQuestions}