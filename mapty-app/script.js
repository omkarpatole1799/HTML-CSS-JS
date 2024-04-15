"use strict";
const form = document.getElementById("work-out-form");
const workoutType = document.getElementById("work-out-type");
const closeForm = document.getElementsByClassName("close-work-out-form-btn");
const time = document.getElementById("time");

const _numeric = document.querySelectorAll("._numeric");

class ValidateInputs {
  constructor() {
    _numeric.forEach(el => {
      el.addEventListener("keyup", e => this._isNumeric(el));
    });
  }

  _isAlpha() {}

  _isNumeric(element) {
    console.log("here");
    console.log(element);
    let regEx = /[^0-9]/g;
    element.value = element.value.replace(regEx, "");
  }

  _isAlphaNumeric() {}
}

let validation = new ValidateInputs();

class App {
  #map;
  #mapE;

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._addNewWorkout.bind(this));
    closeForm[0].addEventListener("click", this._hideWorkoutForm.bind(this));
    workoutType.addEventListener("change", this._toggleElevationField);

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

  _toggleElevationField() {
    console.log("changed");
    document
      .querySelectorAll(".toggle-type")
      .forEach(el => el.classList.toggle("hidden"));
  }

  _showWorkoutForm(mapEvent) {
    this.#mapE = mapEvent;
    form.classList.remove("hidden");
    time.focus();
  }

  _hideWorkoutForm() {
    form.classList.add("hidden");
    form.reset();
  }

  _addNewWorkout(e) {
    e.preventDefault();

    let formData = new FormData(form);

    // for (let [key, value] of formData) {
    //   if (value == "") return alert(`Please fill ${key}`);
    // }

    this._renderWorkoutMarker();
    this._hideWorkoutForm();
  }

  _renderWorkoutMarker() {
    const { lat, lng } = this.#mapE.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `leaflet-popup`,
        })
      )
      .setPopupContent(`HI popup`)
      .openPopup();
  }
}

let app = new App();
