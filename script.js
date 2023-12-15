document.addEventListener("DOMContentLoaded", loadDish);

let btn = document.querySelector("#btn");

let table1 = document.querySelector(".table1");
let table2 = document.querySelector(".table2");
let table3 = document.querySelector(".table3");

let url = "https://crudcrud.com/api/bea6d40d9ef04f8b9f7af4d7f2867e6f/orders";

btn.addEventListener("click", addItem);

function addItem() {
  let price = document.querySelector("#price").value;
  let dish = document.querySelector("#dish").value;
  let table = document.querySelector("#table").value;

  let myDish = {
    price,
    dish,
    table,
  };

  axios
    .post(url, myDish)
    .then((response) => {
      console.log(response);
      loadDish(); // Reload the orders after adding a new one
    })
    .catch((error) => {
      console.log(error);
    });
}

function loadDish() {
  axios
    .get(url)
    .then((response) => {
      let items = response.data;
      // Clear the existing lists
      table1.innerHTML = "";
      table2.innerHTML = "";
      table3.innerHTML = "";
      // Populate the lists based on the table property
      items.forEach((item) => {
        responseOrder(item);
      });
    })
    .catch((error) => console.log(error));
}

function removeFromServer(li) {
  axios
    .delete(`${url}/${li.dataset.id}`)
    .then((response) => {
      li.parentElement.removeChild(li);
    })
    .catch((error) => {
      console.log(error);
    });
}

function responseOrder(data) {
  let li = document.createElement("li");
  li.dataset.id = data._id;
  li.dataset.price = data.price;
  li.dataset.dish = data.dish;
  li.dataset.table = data.table;

  let textNode = document.createTextNode(
    `${data.price} - ${data.dish} - ${data.table}`
  );
  li.appendChild(textNode);

  let delBtn = document.createElement("button");
  delBtn.classList = "delete";
  delBtn.appendChild(document.createTextNode("Delete Order"));
  delBtn.addEventListener("click", removeItem);

  li.appendChild(delBtn);

  // Append the order to the respective table list
  if (data.table === "table1") {
    table1.appendChild(li);
  } else if (data.table === "table2") {
    table2.appendChild(li);
  } else if (data.table === "table3") {
    table3.appendChild(li);
  }
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      let li = e.target.parentElement;
      removeFromServer(li);
    }
  }
}
