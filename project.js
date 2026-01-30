let todo = [{name : 'Frogardio',launchdate:'2025-10-28',result : null,nftslink:''},
            {name : 'Royal dmt',launchdate:'2025-10-24',result : null,nftslink:''}/**Created an array and gave each objects  */
]
let wins = 0
let losses = 0
showstorage()/**so that it remembers what was saved  after it has been refreshed */
rendertodo()
function rendertodo() {
  let todohtml = '';
  todo.forEach((item, i) => {
    const {name, launchdate, result,nftslink} = item;
    const html = `
    <div class = "users-class">
      <div>${name}</div>
      <div>${launchdate}</div>
      <button onclick="markwin(${i})" class="win-button">Win</button>
      <button onclick="markloss(${i})"class = "loss-button">Loss</button>
 <input type="text" placeholder="X-link of project" value="${nftslink||''}" oninput="linksnfts(${i},this.value)" class="trade-url">
       ${ nftslink?`<p><a href="${nftslink}" class = "url-redirect">Project's x account</a></p> `:''}
      <button onclick="deletetodo(${i})">Delete</button>
    </div>
      `
    ;
    todohtml += html;
  });

  document.querySelector('.js-project-list').innerHTML = todohtml;
  update();
}
function linksnfts(index,xlinks){
todo[index].nftslink = xlinks.trim()
stored()
rendertodo()

}

function addtodo(){
const input = document.querySelector('.text-todo')
const usertext = input.value.trim()
const date = document.querySelector('.duedate-js')
const duedate = date.value.trim()

if (usertext === ''|| duedate === '') {alert('Type in project name and date')    
return/**so that the todo.push won't display an empty string we used return */
}
todo.push({name : usertext ,launchdate : duedate,result : null})
/**we created a new object inside .push to add to the previous array each property value is the .value from the user and the property name is similar to the on initially used in the array */
input.value =''
date.value = ''

rendertodo()
}
function stored(){
    localStorage.setItem('todo',JSON.stringify(todo))
      localStorage.setItem('wins',wins)
    localStorage.setItem('losses',losses)/**the string is a label of the variable losses */
}
function showstorage(){
    const savedtodo = localStorage.getItem('todo')
  const savedwins =  localStorage.getItem('wins')
  const savedlosses = localStorage.getItem('losses')
/**this gets the items saved in storage by using the getitem nd the labels used to save them */
  if (savedtodo) todo = JSON.parse(savedtodo)/**The if statemenet is used to check if the stored value actually exists,because if there's no activity ,i.e a new user,then there's nothing saved hence it'd shoe errors */
    if(savedwins) wins = parseInt(savedwins)
        if(savedlosses) losses = parseInt(savedlosses)/**because the values ofr wins and losses are numbers parseinr converts strings to numbers */
}
function deletetodo(i){
    if (todo[i].result === 'win')wins-- ;
    else if(todo[i].result === 'loss')losses--;/**reduces wins or losses */
    todo.splice(i,1)
 recalculatenft()
stored()
rendertodo()/**we call rendertodo again so the computer knows we've changed or deleted something */
}
function sure(i){
  const proceed = confirm('Are you sure you want to personally delete this project from your journal?') 
  if (proceed) {deletetodo(i)}
}
function markwin(i){
todo[i].result ='win'
recalculatenft()
stored()
rendertodo()

/**The purpose of this code is if the user initially had a loss but wants to change it to a win,we use if win then return meaning ignore every code below it,but if otherwise,then subtract one from losses and  change it to win and add extra 1 to the win*/
}

function markloss(i){
todo[i].result = 'loss'
recalculatenft()
stored()
rendertodo()

/**The purpose of this code is if the user initially had a win but wants to change it to a loss,we use if loss then return meaning ignore every code below it,but if otherwise,then subtract one from lwins and add change it to loss and add extra 1 to the win*/
}

function update(){
    document.getElementById('wins').textContent = `wins : ${wins}`;
    document.getElementById('losses').textContent = `losses: ${losses}`
/**This works like innerhtml and queryselector,it selects the id from the span element and changess it to wins which is from the result */
}

function winrate(){
    stored()
    const total = wins + losses
    if (total === 0)return alert('No wins yet')
    const winrate = ( (wins /total)*100).toFixed(1)/**the tofixed1 means to one decimal place */
        alert(`Your win rate is ${winrate}%,wins :${wins},losses :${losses}`)/**This displays the winrate ,wins and losses
         */
}

function recalculatenft(){
  wins = 0
  losses = 0
  todo.forEach(item=>{
 if(item.result==='win')wins++
 if(item.result ==='loss')losses++
  })
  update()
}
function dark(){
const darkmode = document.querySelector('.body') ;
darkmode.classList.toggle('dark-mode')
document.querySelectorAll(`a`).forEach((link)=>{
  link.classList.toggle('link-color')
}


)
}

