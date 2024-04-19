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

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _workoutDescription() {
    // prettier-ignore
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct','Nov', 'Dec']
    let workOutName = this.type[0].toUpperCase() + this.type.slice(1);
    let workoutMonth = months[this.date.getMonth()];
    let workoutDate = this.date.getDate();
    this.description = `${workOutName} on ${workoutMonth} ${workoutDate}`;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this._calcPace();
    this.type = "Running";
  }

  _calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this._calcSpeed();
    this.type = "Cycling";
  }

  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapE;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._addNewWorkout.bind(this));
    closeForm[0].addEventListener("click", this._hideWorkoutForm.bind(this));
    workoutType.addEventListener("change", this._toggleElevationField);
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
    const { lat, lng } = this.#mapE.latlng;
    let isPositive = (...numbers) => numbers.every(number => number > 0);
    let formData = new FormData(form);
    let time = formData.get("time");
    let distance = formData.get("distance");

    let workout;
    if (workoutType.value == "running") {
      let cadence = formData.get("cadence");
      if (!isPositive(time, distance, cadence))
        return alert("Values should not be negative or empty1");
      workout = new Running([lat, lng], distance, time, cadence);
    }

    if (workoutType.value === "cycling") {
      let elevation = formData.get("elevation");
      if (!isPositive(time, distance))
        return alert("Values should not be negative or empty2");
      workout = new Cycling([lat, lng], distance, time, elevation);
    }

    this.#workouts.push(workout);
    console.log(workout, "-workout");

    this._hideWorkoutForm();
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`HI popup`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let _html = `
          <li class="workout-item workout--${workout.type}">
            <p class="workout-title">Running on Apr 30</p>
            <div class="workout-details">
              <span>🏃‍♀️ ${workout.distance} KM</span>
              <span>🕒 ${workout.duration} MIN</span>
              <span>⚡ 1.0 MIN/KM</span>
              <span>🚶 2 SPM</span>
            </div>
          </li>`;
  }
}

let app = new App();
