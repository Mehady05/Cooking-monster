function show() {
  const value = document.getElementById("input-item").value;
  if (value.length == 0) {
    alert("Write somethings to your input field");
  }
  item(value);
}

function item(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      allItems(data.meals);
    });
}

function allItems(items) {
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const itemAll = document.getElementById("all-item");
    const singleDiv = document.createElement("div");
    singleDiv.className = "single-item";
    const itemDetails = `
            <div onclick="detailsItem(${element.idMeal})">
                <img src=${element.strMealThumb} alt="">
                <p>${element.strMeal}</p>
            </div>
        `;
    singleDiv.innerHTML = itemDetails;
    itemAll.appendChild(singleDiv);
  }
}

function detailsItem(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => allDetails(data.meals[0]));
}

function allDetails(x) {
  console.log(x);
  const upDiv = document.getElementById("details");
  const showAll = `
          <div style="background-color: #fffff;font-size: 18px; width:200px">
              <img style="max-width: 100%; height: auto; border-radius:10px"; src=${x.strMealThumb} alt="">
              <h2>Name:${x.strMeal}</h2>
              <ul>
                  <li>Ingredient : ${x.strIngredient1}</li>
              </ul>
          </div>
      `;
  upDiv.innerHTML = showAll;
}
