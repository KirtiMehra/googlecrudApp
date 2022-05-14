let form  = document.getElementById("form");
let textInput = document.getElementById("textInput");
let date = document.getElementById("date");
let desc = document.getElementById("desc");
let tasks = document.getElementById("tasks");
let addSubmit = document.getElementById('addSubmit')
let msg = document.getElementById("msg");
let msg_date = document.getElementById("msg-date");
let msg_desc = document.getElementById("msg-desc");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
formValidation();
  
})

// formValidation
const formValidation = (e) =>{
    if(textInput.value === "" || date.value === "" ||  desc.value === "" ){
        alert("Validation is Failed");
        // msg.innerHTML = "please enter a Task ";

    }else{
        // alert("Validation is Success");
        dataAccept();
     
  

        (()=>{
            addSubmit.setAttribute("data-bs-dismiss", "modal");
            addSubmit.click();
        })
    }
}

//accept data 

let data =[];  //create empty obj  convert into array [{o}]

const dataAccept = () =>{
    data.push({
        text: textInput.value,   //store value in data obj 
        date : date.value,
        textarea :desc.value,
    })
    console.log(data);
    createData();
    localStorage.setItem("data",JSON.stringify(data));

}



//create Task 

const createData = () => {
    tasks.innerHTML = "";
    data.map((o,i)=>{
        return   tasks.innerHTML += ` <div id=${i} class="task-item fw-bold  m-3">
        <b><span class="task-id" id="title" >  ${o['text']}</span> </b> <br>
        <span class="p-3 task-date" id="date">${o['date']}</span> <br>
        <span class="p-3" id="desc">${o['textarea']}</span> <br>
        <div class="options ">
        <button  class=" fa-solid fa-pen-to-square  mr-3" onclick="editData(this)"  data-bs-toggle="modal" data-bs-target="form"> </button>
          <button  class="fa-solid fa-trash mr-3" onclick="removeData(this)"></button>
        </div>
      </div>`;
    })
  
}

const removeData = (e) =>{
     e.parentElement.parentElement.remove();

     data.splice(e.parentElement.parentElement.id,1)
     localStorage.setItem("data",JSON.stringify(data));

    //  textInput.value = "";
    //  date.value = "";
    //  desc.value = "";
}



let editData = (e) =>{

    let editInput =  e.parentElement.parentElement; //target parent element 
    textInput.value = editInput.children[0].innerHTML;
    date.value =  editInput.children[2].innerHTML;
    desc.value =  editInput.children[1].innerHTML;
    removeData(e);
   
}

(()=>{
    data = JSON.parse(localStorage.getItem("data"));
    createData();
})();
