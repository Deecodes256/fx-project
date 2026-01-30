let fxlongterm = [{name : 'Get a propfirm account',deadline : '10-6-25',result : null}]
let checked = 0;
function renderfxlongterm(){
    let allgoals = ''
    fxlongterm.forEach((fxgoals,i)=>{
        const {name,deadline,result} = fxgoals;
        let goalshtml = `<div  class = "text ${fxgoals.result ===  'win' ? 'check' : ''}" data-index ="${i}">${name} </div>
                          <div>${deadline}  </div>
                         <button onclick = "done(${i})" class = "done-button">Done</button>
                         <button onclick = "deletegoal(${i})">Delete</button>
                          `
    allgoals+= goalshtml;
    })
    document.querySelector('.goal-list').innerHTML = allgoals
   
}
function checkgoal(){
    checked = 0
    fxlongterm.forEach((fxgoals)=>{
        if(fxgoals.result === 'win') {checked ++}

    })
      
}
function addgoals(){
const usertext = document.querySelector('.user-input')
const trimmedext = usertext.value.trim()
const userdate = document.querySelector('.deadline-date')
const trimmeddate = userdate.value.trim()
if(trimmedext === ''|| trimmeddate === '') {alert("Type in a goal and select deadline") 
return}

fxlongterm.push({name : trimmedext,deadline:trimmeddate,result:null})
usertext.value = ''
userdate.value = ''

    checkgoal()
     updatedom()
    storegoals()
    renderfxlongterm()
  
}

function done(i){
    fxlongterm[i].result =
    fxlongterm[i].result === 'win' ? null : 'win';
    checkgoal()
    updatedom()
    storegoals()
    renderfxlongterm()
}
function deletegoal(i){
    fxlongterm.splice(i,1);
    checkgoal()
    updatedom()
    storegoals()
    renderfxlongterm()
}
function storegoals(){
  localStorage.setItem('fxlongterm',JSON.stringify(fxlongterm))
}
function showstorage(){
    const savedgoals = localStorage.getItem('fxlongterm')
    if(savedgoals) fxlongterm = JSON.parse(savedgoals)
}
function updatedom(){
    const total = fxlongterm.length
    document.querySelector('.goals-achieved').textContent = `Total goals achieved = ${checked} out of ${total}`;
    
}

showstorage()
checkgoal()
renderfxlongterm()
updatedom()