 let longtermtrading = [{ tradinggoals : 'Make 5 figures before June',deadline:'2026-06-01',result : null}]
 let checkedgoal = 0;
 function renderlongterm(){
 let longtermtrade = '' 
  longtermtrading.forEach((trading,i)=>{
const {tradinggoals,deadline} = trading;
let userdata = `<div class = "long-term-container" >

<div class = "text  ${trading.result === 'win'? 'check':''}" data-index = "${i}">${tradinggoals} </div>
 <div class = "date">${deadline} </div>
<button class="done-button" onclick="done(${i})">Done</button>
<button class="delete-goal" onclick="deletegoal(${i})">Delete goal</button>
</div>
                 `;/**In the html content above,we use data index to select a parameter that js can evaluate,the if condition checks if result is win from done function then create css class check else null don't create any */
     longtermtrade += userdata;
  })
    document.querySelector('.goal-parent').innerHTML = longtermtrade;
}
function finishedgoal(){
    checkedgoal = 0;
    longtermtrading.forEach((trading)=>{
    if (trading.result === 'win') {checkedgoal ++}/**This is responsible for keeping track of how many goals the user has achieved,it first loops through the array then checks if the result is win then adds to the existing wins */
    })
   
}
function longtermupdate() {/**This displays the total goals achieved out of the number of goals created by the user */
    const totalgoals = longtermtrading.length
document.querySelector('.total-goals').textContent =`Total goals achieved: ${checkedgoal} out of ${totalgoals} ` ;
}/**This displays the cheked goals and displays it  */

function addgoal(){
const goaltext = document.querySelector('.longterminput')
const goaltrim = goaltext.value.trim()
const deadline = document.querySelector('.deadline')
const datetrim = deadline.value.trim();
if (goaltrim === ''|| datetrim === '') {alert('Add a trading  goal and date')
  return;
}
longtermtrading.push({tradinggoals : goaltrim ,deadline:datetrim,result :  null})
goaltext.value = '',deadline.value = '';
finishedgoal();
longtermupdate();
storedgoals()
renderlongterm();
}
function storedgoals(){
    localStorage.setItem('longtermtrading',JSON.stringify(longtermtrading))

}

function showgoalstorage() {
   const savedgoals = localStorage.getItem('longtermtrading')
   if (savedgoals) longtermtrading = JSON.parse(savedgoals)
   
}
function deletegoal(i){
longtermtrading.splice(i,1);
finishedgoal();
longtermupdate();
storedgoals()
renderlongterm()
}
function done(i){/**This gets triggered when the user clicks on the don button,the if condition if win exists then be null(toggle on and off) else be win the first line saves the data into the result object */
longtermtrading[i].result =
longtermtrading[i].result === 'win'? null : 'win';
finishedgoal()
storedgoals()
renderlongterm()
longtermupdate()
}
showgoalstorage()
finishedgoal()
renderlongterm()
longtermupdate()


