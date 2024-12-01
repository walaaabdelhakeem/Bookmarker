var inputName = document.getElementById("sitename");
var inputUrl = document.getElementById("site-url");
var sites = [];
sites = JSON.parse(localStorage.getItem("site")) || [];
displaySites();
var regname = /^[a-zA-Z0-9]{3,}/;

inputName.addEventListener("input", function () {
  if (regname.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
  }
});
inputUrl.addEventListener("input", function () {
  if (isValidUrl(inputUrl.value)) {
    inputUrl.classList.add("is-valid");
    inputUrl.classList.remove("is-invalid");
  } else {
    inputUrl.classList.add("is-invalid");
    inputUrl.classList.remove("is-valid");
  }
});

function addInput() {
  var site = {
    namesite: inputName.value,
    Url: inputUrl.value,
  };
  var index = sites.findIndex(function (params) {
    return (
      params.namesite === inputName.value ||
      params.namesite.toUpperCase() === inputName.value.toUpperCase()
    );
  });
  var validurl = isValidUrl(site.Url);
  if (index === -1) {
    if (validurl) {
      sites.push(site);
      localStorage.setItem("site", JSON.stringify(sites));
      displaySites();
      clearInputsValue();
      Swal.fire({
        title: "Success!",
        html: 'Your <span class="fw-bold">Bookmark</span> Is Added successfully.',
        icon: "success",
      });
    } else {
      swal(
        "URL OF Site strated  http:// or https:// and address like this example.com and path like this  /path/to/page"
      );
    }
  } else {
    alert("Site Name already exists!");
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
  inputName.classList.remove("is-valid");
  inputUrl.classList.remove("is-valid");
}

function deletedItem(param) {
  sites.splice(param, 1);
  displaySites();
  localStorage.setItem("site", JSON.stringify(sites));
}
