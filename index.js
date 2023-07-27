const contentarea = document.querySelector(".content .container");
const search = document.getElementById("search");
const regions = document.getElementById("fliter-select-box");
const darktoggler = document.getElementById("dark");
const root = document.querySelector(":root");
let dark = true;
darktoggler.addEventListener("click", () => {
  togglerDark(root);
});
function togglerDark(root) {
  if (dark) {
    dark = false;
    root.style.setProperty("--element-color", "hsl(0, 0%, 95%)");
    root.style.setProperty("--bg-color", "white");
    root.style.setProperty("--text-color", "hsl(200, 15%, 8%)");
    localStorage.setItem("dark", false);
    darktoggler.innerHTML = `<i class="fa-regular fa-moon"></i>Dark  Mood`;
  } else {
    dark = true;
    root.style.setProperty("--element-color", "hsl(209, 23%, 22%)");
    root.style.setProperty("--bg-color", "hsl(207, 26%, 17%)");
    root.style.setProperty("--text-color", "white");
    localStorage.setItem("dark", true);
    darktoggler.innerHTML = `<i class="fa-regular fa-moon"></i>Light  Mood`;
  }
}
async function getData() {
  let response = await fetch("./data.json");
  let data = await response.json();
  showData(data);

  search.onkeyup = function () {
    showData(data, regions.value, search.value);
  };

  regions.onchange = function () {
    showData(data, regions.value, search.value);
  };
}

function showData(data, region = "", country = "") {
  contentarea.innerHTML = "";
  if (region === "" && country === "") {
    data = data;
  } else if (region === "" && country !== "") {
    data = data.filter((e) => {
      return e.name.toLowerCase().includes(country.toLowerCase()) ? e : null;
    });
  } else if (region !== "" && country !== "") {
    data = data.filter((e) => {
      return e.name.toLowerCase().includes(country.toLowerCase()) &&
        region === e.region
        ? e
        : null;
    });
  } else if (region !== "" && country === "") {
    data = data.filter((e) => {
      return region === e.region ? e : null;
    });
  }
  data.forEach((ele, index) => {
    if (ele.name === "Israel") {
      ele.name = "طيزي";
      ele.capital = "فش اقلب";
    }
    let card = document.createElement("div");
    card.addEventListener("click", () => {
      localStorage.setItem("target-country", JSON.stringify(ele));
    });
    card.setAttribute("index", index);
    card.className = "card box-shadow";
    card.innerHTML = `
			  <div class="image">
				<a href="country-details.html" target="_self">		<img src="${
          ele.flags.png
        }" alt="" /></a>
    		
  				</div>
  			<div class="text">
				<h3>${ele.name}</h3>
				<div class="population">
								Population: <span>${ele.population.toLocaleString("us")}</span>
				</div>
				<div class="region">
					Region: <span>${ele.region}</span>
				</div>
				<div class="capital">
					Capital: <span>${ele.capital}</span>
				</div>
		  </div>
			`;
    contentarea.appendChild(card);
  });
}
getData();
