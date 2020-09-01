const add_user = document.getElementById('add-user');
const main = document.getElementById('main');
const doubles = document.getElementById('double');
const sorts = document.getElementById('sort');

const calculate_wealth= document.getElementById('calculate-wealth')
const show_millionaires = document.getElementById('show-millionaires')

let data =[];

addLoadEvent();
function addLoadEvent(){
  add_user.addEventListener('click',getRandomUser);
  doubles.addEventListener('click',dubleMony);
  sorts.addEventListener('click',sortMoney);
  show_millionaires.addEventListener('click',showMillions);
  calculate_wealth.addEventListener('click',claculates)
}



async function getRandomUser(){

  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user =data.results[0];
  const newUser ={
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addUserToDom(newUser )
  
}


function addUserToDom(user){

  data.push(user);
  updateDOM();
}

/*double money*/
function dubleMony(){
data= data.map(item=>{
    return {...item,money:item.money*2};
  })
  console.log(data)

updateDOM()

}

function sortMoney(){

 data= data.sort((a,b)=>a.money - b.money);
 updateDOM();
}


function showMillions(){
   data= data.filter(item=>item.money>1000000);
   updateDOM();
}


function claculates(){
  const walth = data.reduce((acc,curr)=>{
    return acc += curr.money;
  },0);
  console.log(walth)
  const div = document.createElement('div');

  div.className = 'total';

  div.innerHTML = ` total is: ${formatMoney(walth)}$`;
  main.appendChild(div)
}

function updateDOM( prevData= data){

  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  prevData.forEach(item=>{
    const ele = document.createElement('div');
    ele.classList.add('person');
    ele.innerHTML = `<strong>${item.name}</strong>$
    ${formatMoney(item.money)}`;
    main.appendChild(ele);

  });

}



function formatMoney(num){
return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}






