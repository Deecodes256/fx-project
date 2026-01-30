let futurestodo = [
  { name: 'BTC/USDT', launchdate: '2025-10-28', result: null,tradeurl : '' },
  { name: 'HYPE/USDT', launchdate: '2025-10-24', result: null,tradeurl : '',pnl : '' }
];
let futureswins = 0;
let futureslosses = 0;
futuresshowstorage(); // Load from localStorage
futuresrendertodo();

function futuresrendertodo() {
  let futurestodohtml = '';
  futurestodo.forEach((item, i) => {
    const { name, launchdate, result,tradeurl } = item;/**Destructuring,insted of using item.name,item.object to call each object */
    const futureshtml = `
    <div class = "users-class">
      <div>${name}</div>
      <div>${launchdate}</div>
      <button onclick="futuresmarkwin(${i})" class = "win-button">Win</button>
      <button onclick="futuresmarkloss(${i})"  class = "loss-button">Loss</button>
       <input type="text" placeholder="Trading view url for this pair" value = "${tradeurl|| ''}" oninput="futurestradeurl(${i},this.value)" class="trade-url">
               ${/**The purpose of value is to show existing data ,meaning that if trade url already exists then be null,if not then display whatever the user just typed */
          tradeurl
            ? `<a href="${tradeurl}" target="_blank" class = "url-redirect">View Trade</a>`
            : ''/**This means that if tradeurl exists that is if the user pastes the link in the input box then,let the html for link <a> display,the blank in target allows the user to be redirected to another tab   */
        }
      <input type = "text" name = "userpnl"class = "users-pnl" value = "${item.pnl || ''} " placeholder = "Type in pnl">
<button class = "save-pnl" onclick = "userpnl(${i})">Save</button>
<span class = display-pnl>${item.pnl || ''}</span>
      <button onclick="sure(${i})"  class = "delete-button">Delete</button>
         
    </div>
    `;
    futurestodohtml += futureshtml;
  });
document.querySelector('.js-project-list').innerHTML = futurestodohtml;


}
function userpnl(index){
const inputpnl = document.querySelectorAll('.users-pnl')[index];
const trimmedpnl = inputpnl.value.trim();
futurestodo[index].pnl = trimmedpnl;
futuresstored()
futuresrendertodo()
wholeprofit()
}
function wholeprofit(){
  let totalprofit = 0
futurestodo.forEach((item)=>{
const value = Number(item.pnl);
if (!isNaN(value)) {totalprofit+= value}
})
document.querySelector('.total-profit').innerHTML = `$${totalprofit}`

}

function sure(i) {
const proceed = confirm('Are you sure you want to personally delete this pair from your journal?')
if(proceed){
futuresdeletetodo(i)
}
}

function futuresaddtodo() {
  const futuresinput = document.querySelector('.text-todo');
  const futuresusertext = futuresinput.value.trim();
  const futuresdate = document.querySelector('.duedate-js');
  const futuresduedate = futuresdate.value.trim();/**.trim removes unnecessary spacing at the beginning and end of the text in the text input */
  if (futuresusertext === '' || futuresduedate === '') {
    alert('Type in project name and date');
    return;/**so an empty pair wil not be added if the user mistakenly clicks add without typing anything */
  }

futurestodo.push({ name: futuresusertext, launchdate: futuresduedate, result: null,tradeurl:'',pnl : ''});
  futuresrecalculatestats();
futuresstored();
futuresrendertodo();
futuresupdate();
futuresinput.value = '';
futuresdate.value = '';/**so the input box can be empty after the user has finished typing */


}
function futurestradeurl(index,url){/**The first parameter represents the index which could be 0 depending on the number of pairs and links the user has,while the second parameter url takes data from the event listener this.value   */
futurestodo[index].tradeurl = url.trim();/**The purpose of this is to remove any unwanted spacing in the value for the tradeurl object */
  futuresstored();/**save the url */
  futuresrendertodo();/**render it on the page */
}
function futuresstored() {
  localStorage.setItem('futurestodo' , JSON.stringify(futurestodo));/**This converts the values to strings because local storage can only svae strings,so the first futureswins in single quotes is the label given to the what ia to be saved while the value futureswins is the actual value to be saved */
  localStorage.setItem('futureswins', futureswins);
  localStorage.setItem('futureslosses', futureslosses);
}

function futuresshowstorage() {/**This enables the futiurestodo,wins and losses code functions to be variables  */
  const futuressavedtodo = localStorage.getItem('futurestodo');
  const futuressavedwins = localStorage.getItem('futureswins');
  const futuressavedlosses = localStorage.getItem('futureslosses');
/**This condition means that if the variables exists,then convert them back to reusuable code in the original variable */
  if (futuressavedtodo) futurestodo = JSON.parse(futuressavedtodo);
  if (futuressavedwins) futureswins = parseInt(futuressavedwins);
  if (futuressavedlosses) futureslosses = parseInt(futuressavedlosses);
}

function futuresdeletetodo(i) {
  if (futurestodo[i].result === 'win') futureswins--;
  else if (futurestodo[i].result === 'loss') futureslosses--;
  futurestodo.splice(i, 1);
  if (futurestodo.length === 0) {
    futureswins = 0;
    futureslosses = 0;
  localStorage.removeItem('futureswins')
localStorage.removeItem('futureslosses')}
futuresrecalculatestats();
futuresstored()
futuresrendertodo();
futuresupdate();
}

function futuresmarkwin(i) {/**This means that if the result is the user clicks win then invalidate every other code below it,but if the user tries to change it from a loss to win ,then subtract one from the losses and change the value of the result object to win and add oen to the existing wins then store it,add it to the list and recalculate it */

  futurestodo[i].result = 'win';
futuresrecalculatestats();
futuresstored();
futuresrendertodo();
futuresupdate();
}

function futuresmarkloss(i) {
  futurestodo[i].result = 'loss';
futuresrecalculatestats();
futuresstored()
futuresrendertodo();
futuresupdate();
}

function futuresupdate() {
  document.getElementById('futureswins').textContent = `Wins: ${futureswins}`;
  document.getElementById('futureslosses').textContent = `Losses: ${futureslosses}`;

}

function futureswinrate() {
  futuresstored();
  const total = futureswins + futureslosses;
  if (total === 0) return alert('No wins yet');
  const rate = ((futureswins / total) * 100).toFixed(1);
  alert(`Your win rate is ${rate}%, Wins: ${futureswins}, Losses: ${futureslosses}`);
  futuresrecalculatestats()

}
function futuresrecalculatestats(){
  futureswins = 0;
  futureslosses = 0;
  futurestodo.forEach(item =>{/**The itemm is  a paramter,a call back function,this parameter holds the value from the array especiallyy the result which is why we loop ,the rsult object specifically,could be written as function recalculatestats.forEach(funcion (item) */
    if(item.result === 'win')futureswins++
    if(item.result === 'loss')futureslosses++
  }
)

/**With this the computer only gets the source of truth from the array,it assigns zero to wins and losses,then runs a loop to determine if the result for anything is win or loss then it adds one  */
}

function futuresdarkmode() {
  const body = document.querySelector('.futuresbody');
  body.classList.toggle('dark-mode');
   document.querySelectorAll(`a`).forEach((link)=>{
  link.classList.toggle('link-color')
  })

}

function capital (){
const userscapital = document.querySelector('.futures-input-capital')
const trimmedcapital = userscapital.value.trim();
document.querySelector('.futures-capital-display').innerHTML = `$${trimmedcapital}`;
localStorage.setItem('trimmedcapital',JSON.stringify(trimmedcapital))
userscapital.value = ''
}
function showcapital(){
const getcapital = localStorage.getItem('trimmedcapital')
if (getcapital) {document.querySelector('.futures-capital-display').innerHTML = `$${(JSON.parse(getcapital))}`

}


}


futuresshowstorage()
futuresrecalculatestats()
futuresrendertodo()
futuresupdate()
showcapital()
wholeprofit()
