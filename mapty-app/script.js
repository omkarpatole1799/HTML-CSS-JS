"use strict";
const form = document.getElementById("work-out-form");
const closeForm = document.getElementsByClassName("close-work-out-form-btn");

const time = document.getElementById("time");

class ValidateInputs {
  constructor() {}

  isAlpha(value) {
    console.log(value, "-in isAlpha");
    return true;
  }

  isNumeric() {}

  isAlphaNumeric() {}
}

let validation = new ValidateInputs();

class App {
  #map;
  #mapE;

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._addNewWorkout.bind(this));
    closeForm[0].addEventListener("click", this._hideWorkoutForm.bind(this));

    // time.addEventListener("keyup", this._validateTime);
  }

  _validateTime() {
    let isValid = validation.isAlpha(time.value);
    console.log(isValid);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
        alert("Cannot get position please allow GPS")
      );
  }

  _loadMap(position) {
    let { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showWorkoutForm.bind(this));
  }

  _showWorkoutForm(mapEvent) {
    this.#mapE = mapEvent;
    form.classList.remove("hidden");
    time.focus();
  }

  _hideWorkoutForm() {
    form.classList.add("hidden");
  }

  _addNewWorkout(e) {
    e.preventDefault();

    let formData = new FormData(form);

    for (let [key, value] of formData) {
      if (value == "") alert(`Please fill ${key}`);
    }
  }
}

let app = new App();

// L.marker(mapEvent.latlng)
//   .addTo(map)
//   .bindPopup(
//     L.popup({
//       maxWidth: 250,
//       minWidth: 100,
//       autoClose: false,
//       closeOnClick: false,
//       className: `leaflet-popup`,
//     })
//   )
//   .setPopupContent(`HI popup`)
// .openPopup();
