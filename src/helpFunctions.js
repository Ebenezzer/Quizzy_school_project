function shuffleArray(array){
    function randomValueCB(answer){
      return {sort: Math.random(), value: answer}
    }
    function randomSortCB(a,b){
      return a.sort-b.sort
    }
    function returnToArrayCB(object){
      return object.value
    }
    return (array
      .map(randomValueCB).sort(randomSortCB).map(returnToArrayCB))
  }

export {shuffleArray}