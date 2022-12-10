//if window.location.hash is not #summary or #details, set it to #search
if(window.location.hash !== "#gameResult" && window.location.hash !== "#game" && window.location.hash !== "#category" && window.location.hash !== "#login"){
    window.location.hash = "#home";
}

// add default to login page if not logged in