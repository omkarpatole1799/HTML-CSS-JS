"use strict";
const form = document.getElementById("work-out-form");
const workoutType = document.getElementById("work-out-type");
const closeForm = document.getElementsByClassName("close-work-out-form-btn");
const time = document.getElementById("time");
const workoutItems = document.querySelector(".workout-items");

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

    // prettier-ignore
    this.months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                    "Aug", "Sept", "Oct", "Nov", "Dec", ];

    this.day = this.date.getDate();
    this.month = this.months[this.date.getMonth()];
  }

  _workoutDescription() {
    // prettier-ignore
    let workOutName = this.type[0].toUpperCase() + this.type.slice(1);
    this.description = `${workOutName} on ${this.month} ${this.day}`;
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
    return this.pace.toFixed(1);
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
    return this.speed.toFixed(1);
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
    form.style.display = "none";
    form.classList.add("hidden");
    form.reset();
    setTimeout(() => (form.style.display = "flex"), 500);
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
    this._saveToLoalStorage();
    console.log(workout, "-workout");

    this._hideWorkoutForm();
    this._renderWorkoutMarker(workout);
    this._renderWorkout();
  }

  _saveToLoalStorage() {
    let workouts = this.#workouts;
    let oldWorkouts = JSON.parse(localStorage.getItem("workouts"));
    if (oldWorkouts == null) oldWorkouts = workouts;
    else {
      oldWorkouts = [...workouts, ...oldWorkouts];
    }

    localStorage.setItem("workouts", JSON.stringify(oldWorkouts));
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

  _renderWorkout() {
    // prettier-ignore
    let _html = this.#workouts.map(workout => {
        return `
          <li class="workout-item workout--${workout.type.toLowerCase()}">
            <p class="workout-title">Running on ${workout.month} ${workout.day}</p>
            <div class="workout-details">
              <span>🏃‍♀️ ${workout.distance} KM</span>
              <span>🕒 ${workout.duration} MIN</span>
              <span>🚶 ${
                workout.type.toLowerCase() === "running"
                  ? workout.pace + "KM/H"
                  : workout.speed + "MIN/KM"
              }</span>
              <span>🚶 ${
                workout.type.toLowerCase() === "running"
                  ? workout.cadence + "SPM"
                  : workout.elevation + "M"
              }</span>
            </div>
          </li>`;
      })
      .join(" ");

    workoutItems.innerHTML = _html;
  }
}

let app = new App();
