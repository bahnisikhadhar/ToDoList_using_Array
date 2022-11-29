const inputDetail=document.querySelector(".input_detail");
const inputTask=document.querySelector(".input_task");
const formPriority=document.querySelector(".priority");
const addButton=document.querySelector(".add_btn");
const error=document.querySelector(".error");
const filterButtons=document.querySelector(".filter_buttons");
const outputList=document.querySelector(".output_list")
let toDoArr=[];
let count=0;
let completed=false;
let listSpan;
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
   addButton.value="Add";
// update the array
toDoArr.forEach((ele,index)=>{
   if(listSpan.parentNode.parentNode.id==ele.id){
      console.log(ele)
      ele.text=inputText;
      ele.priority=priority;//if priority is also updated
      console.log(priority)
   }
})
reset();
}
//--------------------------------------------FILTER TASK--------------------------------------------------------
function filterTask(event)
{
   console.log(event.target.dataset.filter)
   outputList.innerHTML = "";
   let temp;
   if(event.target.dataset.filter != "All"){
       temp = toDoArr.filter(elem => elem.priority == event.target.dataset.filter)
   }else{
       temp = toDoArr;
   }
   temp.forEach(ele=>{
       createListElement(ele);
   })
   console.log(outputList)

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
   // else if(event.target.classList.contains("done"))
   // {
   //    completList(event);
   // }
   console.log(toDoArr)
})

filterButtons.addEventListener("click",(event)=>{
   console.log(event);
  if(event.target.classList.contains("btn"))
  {
   filterTask(event);
  }
})