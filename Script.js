// For generate random number
var uid = new ShortUniqueId();
// Returns the first element that is a descendant of node that matches selectors.
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const textArea = document.querySelector(".text-area-cont");
const removeBtn = document.querySelector(".fa-xmark");

const allPriorityColors = document.querySelectorAll(".priority-color");
// console.log(allPriorityColors);
// console.log(modalCont);
// console.log(addBtn);
// console.log(removeBtn);


const colors =["lightpink","lightgreen","lightblue","black"];
let modalPriorityColor = colors.at(-1); //black
// console.log(modalPriorityColor);
const mainConst = document.querySelector(".main-cont");
const toolBoxColors = document.querySelectorAll(".toolbox-color-cont > *");
// console.log(toolBoxColors);
let ticketArr = [];

var isModalPresent = false;
addBtn.addEventListener("click",function (event) {

    // case 1 -> if screen is empty
    //     then display modal
    // console.log(event);
    if(isModalPresent == false)
    {
        // display modal
        modalCont.style.display = "flex";

    }

    // case 2 -> if modal is Present
    //     then hide Modal
    else
    {
        // hide Modal -> display none 
        modalCont.style.display = "none";
    }

    isModalPresent = !isModalPresent;
    
});

// To make the ticket
modalCont.addEventListener("keydown",function(event){
    // console.log(event);
    if(event.key == "Shift")
    {
        // 1.createTicket()
        // console.log(textArea.value);
        createTicket(modalPriorityColor,textArea.value); 
        // 2. Alter display and update isModalPresent
        modalCont.style.display = "none";
        isModalPresent = false;
        // clear the text area
        textArea.value = "";
    }
}); 

 function createTicket(ticketColor,data,ticketId)
 {
    // generate Id 
    let id = ticketId ||  uid();

    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">${id}</div>
        <div class="task-area">${data}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>

    `;
     mainConst.appendChild(ticketCont);


    // If ticket is being generated for the first time,
    // save it in local storage
    if(!ticketId)
    {
        ticketArr.push({
            ticketId : id,  
            ticketColor,
            ticketTask : data
        });  
        localStorage.setItem("tickets",JSON.stringify(ticketArr)); 
    }
    handleRemoval(ticketCont,id);
 }

 // Getting data from local storage for re-rendering of ticket
 if(localStorage.getItem("tickets"))
 {
     ticketArr = JSON.parse(localStorage.getItem("tickets"));
     ticketArr.forEach(ticketObj => createTicket(
         ticketObj.ticketColor,
         ticketObj.ticketTask,
         ticketObj.ticketId));
 }  

 allPriorityColors.forEach(colorElement => {
    colorElement.addEventListener("click",function(){
        allPriorityColors.forEach(el => {
            el.classList.remove("active");
        });
        colorElement.classList.add("active");
        modalPriorityColor = colorElement.classList[0];
    }) 
 });

// getting on the basis of ticketColor
toolBoxColors.forEach(element => {
    // Single Click
    element.addEventListener("click",function(){
        let currColor = element.classList[0];
        // console.log(currColor);
        let filteredTickets = ticketArr.filter(ticketObj => ticketObj.ticketColor == currColor);
        // console.log(filteredTickets);

        // remove All tickets
        let allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach(ticket => ticket.remove());
        // console.log(allTickets);

        // Display filtered tickets
        filteredTickets.forEach(ticket => createTicket(ticket.ticketColor,ticket.ticketTask,ticket.ticketId)); 
    })
    // Double Click
    element.addEventListener("dblclick",function(){
        // remove tickets of specific color from UI
        let allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach(ticket => ticket.remove());
        
        // Display All ticket
        ticketArr.forEach(ticket => createTicket(ticket.ticketColor,ticket.ticketTask,ticket.ticketId))
    })
});

var isRemoveBtnActive = false; 
removeBtn.addEventListener("click",function(){

        // case 1 -> if removeBtn is not active
        //     then make it active i.e red Color
        if(!isRemoveBtnActive)
        {
            // console.log("inside inactive");
            // removeBtn.style.Color = "red";
            removeBtn.style.color = "red";

        }
    
        // if removeBtn is active
        //     then make it inactive i.e white Color
        else
         {
            removeBtn.style.color = "white";
            
        }
    
        isRemoveBtnActive = !isRemoveBtnActive;
});

function handleRemoval(ticketCont,id)
{
    ticketArr.forEach(ticket => {
        ticketCont.addEventListener("click",function(){
            if(!isRemoveBtnActive) return;
            // else
    
             // remove from ticketArr
            let idx = getTicketIndex(id);
            console.log(idx);
            ticketArr.splice(idx,1);
            console.log(ticketArr);
            // set in local storage
            localStorage.setItem("tickets",JSON.stringify(ticketArr)); 
            // remove from UI
            ticketCont.remove();
        })
    });
}
function getTicketIndex(id)
{
    let idx = ticketArr.findIndex(ticketObj =>{
        return ticketObj.ticketId == id;
    })
    return idx;
}

    
    
    
    // Hovering on toolbox-color-cont
    
  
//  append vs appendChild
// let div = document.createElement("div");
// let p = document.createElement("p");
// let a = document.createElement("a");
// let img = document.createElement("img");
// div.append("hello");
// div.append(p,a,img);
// <div>
//     <p></p>
//     <a></a>
//     <img></img>
// </div>
// div.appendChild(p,a,img); // only paragraph tag will be appended,rest will be ignored


