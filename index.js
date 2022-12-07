const inputDetail=document.querySelector(".input_detail");
const inputTask=document.querySelector(".input_task");
const formPriority=document.querySelector(".priority");
const addButton=document.querySelector(".add_btn");
const error=document.querySelector(".error");
const filterButtons=document.querySelector(".filter_buttons");
const outputList=document.querySelector(".output_list")
let toDoArr=JSON.parse(localStorage.getItem("todo"))||[];
// toDoArr=[];
let count=0;
let completed=false;
let listSpan;

//--------------------------------------DISPLAY FROM LOCAL STORAGE EVEN AFTER REFRESHING--------------------------------

toDoArr.map((ele)=>{
   createListElement(ele);
})
//----------------------------------------TO RESET INPUT AND ERROR FIELD---------------------------------

function reset()
{
   inputTask.value="";
   error.innerText="";
}

//-------------------------------CREATE LIST ELEMENT------------------------------------------------------------

function createListElement(toDoObj)
{
   const listEle=document.createElement("li");
   listEle.setAttribute("id",toDoObj.id);
   listEle.setAttribute("class","li_decoration");
   listEle.innerHTML= `<div class="${toDoObj.priority}"><span>${toDoObj.text}</span><button class="output_btn done">Done</button><button class="output_btn edit">Edit</button><button class="output_btn delete">Delete</button></div>`;
   if(toDoObj.priority=="High")
   listEle.classList.add("high");
   else if(toDoObj.priority=="Moderate")
   listEle.classList.add("moderate");
   else if(toDoObj.priority=="Low")
   listEle.classList.add("low")
  
  
   outputList.appendChild(listEle);
   
}

//--------------------------------ADD TASK-OBJECT-ARRAY & SHOW ERROR MESSAGE-------------------------------------- 


function addTask(event){
event.preventDefault();
if(event.target.value=="Save")
{
   SaveUpdate(event,inputTask.value,formPriority.value);
}else{
if(inputTask.value=="")
{
   error.innerText="Enter Task Details";
   setTimeout(()=>error.innerText="",2000);
}
else 
{
   const toDoObj={
      text:inputTask.value,
      id:count++,
      priority:formPriority.value,
      completed:false
   };
   toDoArr.push(toDoObj);
   localStorage.setItem("todo",JSON.stringify(toDoArr));
   createListElement(toDoObj);
   reset();
}
}
}
//------------------------------------------TO DELETE------------------------------------------------------------

function deleteList(event){
// event.target.parentNode.parentNode.remove();//event.target is delete button,it's parent is div,div's parent is li
// or
event.path[2].remove(); // console.log(event)->path->in 2nd index li is present which we need to delete
console.log(toDoArr);

// delete from the array
toDoArr.forEach((ele,index)=>{
   if(parseInt(event.path[2].id)==ele.id){
      toDoArr.splice(index,1);
   }
})
localStorage.setItem("todo",JSON.stringify(toDoArr));
}
//-------------------------------------------TO EDIT--------------------------------------------------------------

function editList(event){
   listSpan=event.path[1].firstElementChild;
   inputTask.value=listSpan.textContent; //innertext of span is transfered to input task
   addButton.value="Save";
}

// -------------------------------------------TO SAVE UPDATED VALUE----------------------------------------------

function SaveUpdate(event,inputText,priority)
{
   listSpan.textContent=inputText;
   // console.log(priority)
   // console.log(listSpan.parentElement.parentElement)
   
   // for update in priority,change background color
   if(priority=="High")
   listSpan.parentElement.parentElement.classList.add("high");
   else if(priority=="Moderate")
   listSpan.parentElement.parentElement.classList.add("moderate");
   else if(priority=="Low")
   listSpan.parentElement.parentElement.classList.add("low");

   addButton.value="Add";

// update the array
toDoArr.forEach((ele,index)=>{
   if(listSpan.parentNode.parentNode.id==ele.id){
      ele.text=inputText;
      ele.priority=priority;//if priority is also updated
      console.log(ele)
   }
})
localStorage.setItem("todo",JSON.stringify(toDoArr));
reset();
}
// --------------------------------------------COMPLETED TASK--------------------------------------------------

function completList(event){
   
   // let a=event.target.parentNode.firstElementChild;
   // a.classList.toggle("checked");
   event.path[1].firstChild.classList.add("checked")

   toDoArr.forEach((ele)=>{
    if(parseInt(event.path[2].id)==ele.id){
        ele.text=event.path[1].firstChild.innerText;
         ele.completed=true;
      }
   })
   console.log(toDoArr);
   localStorage.setItem("todo",JSON.stringify(toDoArr));
   }
//--------------------------------------------FILTER TASK--------------------------------------------------------

function filterTask(event)
{
   console.log(event.target.dataset.filter)
   outputList.innerHTML = "";
   let temp;
   if(event.target.dataset.filter=="High" || event.target.dataset.filter=="Moderate" || event.target.dataset.filter=="Low"){
       temp = toDoArr.filter(elem => elem.priority == event.target.dataset.filter && elem.completed==false)
   }else if(event.target.dataset.filter=="Completed"){
      temp=toDoArr.filter(elem=>elem.completed==true)
   }
   else if(event.target.dataset.filter=="NotCompleted"){
      temp=toDoArr.filter(elem=>elem.completed==false)
   }
   else if(event.target.dataset.filter=="All"){
       temp = toDoArr;
   }
   temp.forEach(ele=>{
       createListElement(ele);
   })
   
}

//---------------------------------------------------ADD EVENT LISTNERS-------------------------------------------

addButton.addEventListener("click",addTask);

outputList.addEventListener("click",(event)=>{
console.log(event)
   if(event.target.classList.contains("delete"))
   {
      deleteList(event);
   }
   else if(event.target.classList.contains("edit"))
   {
      editList(event);
   }
   else if(event.target.classList.contains("done"))
   {
      completList(event);
   }
   
})

filterButtons.addEventListener("click",(event)=>{
   console.log(event);
  if(event.target.classList.contains("btn"))
  {
   filterTask(event);
  }
})