var inputName = document.getElementById("sitename");
var inputUrl = document.getElementById("site-url");
var sites = [];
sites = JSON.parse(localStorage.getItem("site")) || [];
displaySites();
function addInput() {
  var site = {
    namesite: inputName.value,
    Url: inputUrl.value,
  };
  var index = sites.findIndex(function (params) {
    return params.namesite === inputName.value||params.namesite.toUpperCase()===inputName.value.toUpperCase();
  });
  var validurl = isValidUrl(site.Url);
  if (index === -1) {
    if (validurl) {
      sites.push(site);
      localStorage.setItem("site", JSON.stringify(sites));
      displaySites();
      clearInputsValue();
      inputName.classList.remove("is-invalid");
      inputUrl.classList.remove("is-invalid");

    } else {
      swal(
        "URL OF Site strated  http:// or https:// and address like this example.com and path like this  /path/to/page"
      );
      inputUrl.classList.add("is-invalid");
    }
  } else {
    alert("Site Name already exists!");
    inputName.classList.add("is-invalid");
  }
}
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function displaySites() {
  var cartona = "";
  for (let i = 0; i < sites.length; i++) {
    cartona += `<div class="row bg-white text-center py-2 rerow">
          <div class="col-3 ">
            ${i + 1}
          </div>
          <div class="col-3 ">
          ${sites[i].namesite}
          </div>
          <div class="col-3 ">
            <a class="btn-color-tb btn" href="${
              sites[i].Url
            }" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
          </div>
          <div class="col-3 ">
            <button class="btn-delete btn" onclick="deletedItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
          </div>
        </div>`;
  }
  document.getElementById("demo").innerHTML = cartona;
}
function clearInputsValue() {
  inputName.value = "";
  inputUrl.value = "";
}
function deletedItem(param) {
  sites.splice(param, 1);
  displaySites();
  localStorage.setItem("site", JSON.stringify(sites));
}
