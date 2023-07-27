window.onload = () => {
  let x = localStorage.getItem("dark");

  let dark;
  dark = x === "true" ? true : false;
  const root = document.querySelector(":root");
  const darktogbtn = document.getElementById("dark");
  const container = document.getElementById("container");
  let border = "";
  const data = JSON.parse(localStorage.getItem("target-country"));
  darktogbtn.addEventListener("click", () => {
    togglerDark(root);
  });

  function togglerDark(root) {
    if (dark) {
      dark = false;
      root.style.setProperty("--element-color", "hsl(0, 0%, 95%)");
      root.style.setProperty("--bg-color", "white");
      root.style.setProperty("--text-color", "hsl(200, 15%, 8%)");
      darktoggler.innerHTML = `<i class="fa-regular fa-moon"></i>Dark  Mood`;
    } else {
      dark = true;
      root.style.setProperty("--element-color", "hsl(209, 23%, 22%)");
      root.style.setProperty("--bg-color", "hsl(207, 26%, 17%)");
      root.style.setProperty("--text-color", "white");
      darktoggler.innerHTML = `<i class="fa-regular fa-moon"></i>Light  Mood`;
    }
  }
  showData(data, container);
  function showData(data, container) {
    container.innerHTML = `
    <div class="image">
    <img src="${data.flags.png}" alt="" />
  </div>
  <div class="details">
    <h2>${data.name}</h2>
    <ul>
      <li>
        Native name: <span>${data.nativeName}</span>
      </li>
      <li>
        Population: <span>${data.population.toLocaleString("us")}</span>
      </li>
      <li>
        Region: <span>${data.region}</span>
      </li>
      <li>
        Sub Region: <span>${data.subregion}</span>
      </li>
      <li>
        Capital: <span>${data.capital}</span>
      </li>
      <li>
        Top Level Domain: <span>${data.topLevelDomain}</span>
      </li>
      <li>
        Currncies: <span>${(data.currencies || []).map(
          (e) => e.name + "\t"
        )}</span>
      </li>
      <li>
        Languages: <span>${(data.languages || []).map(
          (e) => e.name + "\t"
        )}</span>
      </li>
    </ul>
    <span class="border" style="max-width:200px">
      Border Countries:${(data.borders || []).map((element) => {
        return border + "<span>" + element + "</span>";
      })}
    </span>
  </div>
    `;
  }
};
