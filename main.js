let form = document.getElementById("form");
let categoryInput = document.getElementById("categoryInput");
let titleInput = document.getElementById("titleInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg_category");
let tasks_todo = document.getElementById("tasks_todo");
let tasks_doing = document.getElementById("tasks_doing");
let tasks_review = document.getElementById("tasks_review");
let add = document.getElementById("add");
// let todo = document.getElementsByClassName("radio-label");
// let doing = document.getElementsByClassName("radio-label");
// let finish = document.getElementsByClass("radio-label");
let timeSave;
let X  ;
//time
function toCurrentDate() {
  let date = new Date();
  let strDate = "";
  switch (date.getMonth() + 1) {
      case 1: strDate += "January "; break;
      case 2: strDate += "February "; break;
      case 3: strDate += "March "; break;
      case 4: strDate += "April "; break;
      case 5: strDate += "May "; break;
      case 6: strDate += "June "; break;
      case 7: strDate += "July "; break;
      case 8: strDate += "August "; break;
      case 9: strDate += "September "; break;
      case 10: strDate += "October "; break;
      case 11: strDate += "November "; break;
      case 12: strDate += "December "; break;
      default: strDate += "wrong date";
  }
  strDate += ("" + date.getDate() + ", " + date.getFullYear());
  return strDate;
}
timeSave = toCurrentDate();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (categoryInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be empty";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};
//push
let data = [{}];


let counterTask;
let acceptData = () => {
  data.push({
    category: categoryInput.value,
    title: titleInput.value,
    description: textarea.value,
    timeSave: toCurrentDate()
  });
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();

};




function choseButton() {
  var radios = document.getElementsByName("radio");
  for (let i = 0; i < radios.length; i++) {
    
    if (radios[i].checked==true) {
      alert(radios[i].value);
    }
  }
}
X = choseButton();
//input false :<<
//Bat dong bo 
if (X === "todo") {
  X = tasks_todo;
}else if (X === "doing") {
  X = tasks_doing;
}else{
  X = tasks_review;
}
let createTasks = () => {
  //Change value column 
  X.innerHTML = "";
  data.map((x, y) => {
    return (X.innerHTML += `
        <div id=${y} >
          <span class="options" style="margin: 0px 0px 0px 300px;">
            <i onClick= "editTasks(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="delTasks(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
          <h2 class="fw-bold">${x.category}</h2>
          <span class="small text-secondary">${x.title}</span>
          <p>${x.description}</p>
          <p>${x.timeSave}</p>
        </div>
    ` );
  });
  resetForm();
};



//button choose 

// document.mainForm.onclick = function(){
//   var radVal = document.mainForm.rads.value;
//   result.innerHTML = 'You selected: '+radVal;
// }


// let clickFunction = function handleFormClick() {
//   // document.mainFrom.onclick = handleFormClick();
//   let radVal = document.mainFrom.radio.value;
//   return radVal;
// }


// document.mainFrom.onclick = handleFormClick();
//count tasks 

// count.innerHTML = document.getElementById("tasks").children.length;

// const box = document.getElementById('box');

// const directChildren = box.childNodes.length;
// console.log(directChildren); // 👉️ 5

// // 👇️ [text, span, text, span, text]
// console.log(box.childNodes);


let delTasks = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

};


let editTasks = (e) => {
  let selectTask = e.parentElement.parentElement;
//Element data 
  categoryInput.value = selectTask.children[1].innerHTML;
  titleInput.value = selectTask.children[2].innerHTML;
  textarea.value = selectTask.children[3].innerHTML;
  delTasks(e);
};

let resetForm = () => {
  categoryInput.value = "";
  titleInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();
