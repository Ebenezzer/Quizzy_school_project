//if window.location.hash is not #summary or #details, set it to #search
if(window.location.hash !== "#gameResult" && window.location.hash !== "#game" && window.location.hash !== "#category"){
    window.location.hash = "#home";
}