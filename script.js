let allFilters = document.querySelectorAll(".filter div");
let modalVisible = false;
let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");
let colors = {
  pink: "#d595aa",
  blue: "#5ecdde",
  green: "#91e6c7",
  black: "black",
};


addBtn.addEventListener("click", function(){
  if(modalVisible) return;

  let modal = document.createElement("div");

  modal.classList.add("modal-container");
  modal.setAttribute("click-first", true);
  modal.innerHTML =  `<div class="writing-area" contenteditable> Enter Your Task</div>
      <div class="filter-area">
        <div class="modal-filter pink"></div>
        <div class="modal-filter blue"></div>
        <div class="modal-filter green"></div>
        <div class="modal-filter black active-modal-filter"></div>
      </div>`;

  let allModalFilters = modal.querySelectorAll(".modal-filter")
  
  for(let i=0; i < allModalFilters.length; i++){
    allModalFilters[i].addEventListener("click", function(e){
      for(let j=0; j < allModalFilters.length; j++){
        allModalFilters[j].classList.remove("active-modal-filter");
      }
      e.currentTarget.classList.add("active-modal-filter");
    })
  }

  let wa = modal.querySelector(".writing-area");
  wa.addEventListener("click", function(e){
    if(modal.getAttribute("click-first") == "true"){
      wa.innerHTML = "";
      modal.setAttribute("click-first", false);
    }
  });
  wa.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
      let task = e.currentTarget.innerText
      let selectModalFilter = document.querySelector(".active-modal-filter");
      let color = selectModalFilter.classList[1];
      let ticket = document.createElement("div")
      ticket.classList.add("ticket")
      ticket.innerHTML = `<div class="ticket-color ${color}"></div>
          <div class="ticket-id"></div>
          <div class="ticket-box" contenteditable>${task}</div>
        </div>`;

      grid.appendChild(ticket)
      modal.remove()
      modalVisible = false
    }
  })

  body.appendChild(modal);
  modalVisible = true;
});

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", function (e) {
    let color = e.currentTarget.classList[0].split("-")[0];
    grid.style.backgroundColor = colors[color];
  });
}
