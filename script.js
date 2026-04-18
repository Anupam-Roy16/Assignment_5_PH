const loadjson = (id) => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((object) =>{
      console.log(object);
       displaycards(object.data, id)});
    remove_active(id);
};
const remove_active = (id) => {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
const displaycards = (data, id) => {
  console.log(data);
  const container = document.getElementById("card_container");
  container.innerHTML = "";

  for (info of data) {
    // console.log(info.status,id);
    if ((id !== "button_all") && (info.status !== id)) {
      continue;
    }
    // console.log(info);
    const card = document.createElement("div");
    let badges = info.labels
      .map((label) => {
        return `
            <div class="badge badge-soft badge-primary">${label}</div>`;
      })
      .join("");
    let status_img =
      info.status === "open"
        ? "<img src='assets/Open-Status.png'>"
        : "<img src='assets/Closed- Status .png'>";
    let border_col = 
      info.status === "open"
        ? "border-green-500"
        : "border-purple-500";

    let badge_class = 
      info.priority === "high"
        ? "text-red-600 badge-secondary"
        : info.priority === "medium"
        ? "text-orange-500 badge-warning": "text-purple-500 badge-primary";
       
    card.innerHTML = `
      <div id = "card" onclick="loadjson_id(${info.id})" class="border-t-4 ${border_col} h-full card bg-base-100 shadow-xl">
        <div class="card-body">
        <div class="flex justify-between">
        <div>
        ${status_img}  
        </div>
        <div class="badge badge-soft ${badge_class}">${info.priority.toUpperCase()}</div>
        </div>
          <h2 class="card-title">${info.title}</h2>
          <p>${info.description}</p>
            <div class="flex gap-2">
            ${badges}
            </div>
            <p class="mt-3">#1${info.author}</p>
            <p>${info.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  }
  document.getElementById("card_count").innerText = (container.childElementCount)
};

loadjson("button_all");

const loadjson_id = (id) => {
  console.log(id)
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((response) => response.json())
    .then((object) => showdetail(object.data));
    // remove_active(id);
};
const showdetail = (object) => {
  let status = object.status === "open" ? "opened": "closed";
  let badges = object.labels
      .map((label) => {
        return `
            <div class="mt-2 badge badge-soft badge-primary">${label}</div>`;
      })
      .join("");  
  document.getElementById("details_container").innerHTML = `
  <div>
    <h1 class = "text-1xl font-bold">${object.title}</h1>
    <div class="flex gap-2 items-center">
      <div class="badge badge-primary">${status}</div>
      <div class="bg-purple-500 w-2 h-2 rounded-full"></div>
      <p>${status} by ${object.author}</p> 
      <div class="bg-purple-500 w-2 h-2 rounded-full"></div>
      <p>${object.createdAt.slice(0, 10)}</p>
    </div>
    ${badges}
    <p>${object.description}</p>
    <div class="mt-8 flex gap-30">
      <div>
        <p>Assignee:</p>
        <p class="font-bold">${object.assignee}</p>
      </div>
      <div>
        <p>priority:</p>
        <div class="bg-red-500 rounded-full text-white flex justify-center items-center w-23 h-8 mt-1">
          ${object.priority.toUpperCase()}
        </div>
        
      </div>
    </div>
  </div>
  `;
  my_modal_1.showModal();
};
document.getElementById("search_btn").addEventListener("click", function () {
  const input_text = document.getElementById("search_input").value;
  console.log(input_text);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input_text}`)
    .then((response) => response.json())
    .then((object) => {
      console.log(object);
      displaycards(object.data,"button_all")}
    );
});


