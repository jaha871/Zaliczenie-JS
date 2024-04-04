document.addEventListener("keypress", onKeyPress);
document.getElementById("record").addEventListener("click", startRecording);
document.getElementById("stop").addEventListener("click", stopRecording);
document.getElementById("play").addEventListener("click", playRecording);
document.getElementById("addTrack").addEventListener("click", addTrack);

const metronomeOnBtn = document.getElementById("metronomeOn");
const metronomeOffBtn = document.getElementById("metronomeOff");
const bpmInput = document.getElementById("bpm");
let metronomeInterval;

metronomeOnBtn.addEventListener("click", startMetronome);
metronomeOffBtn.addEventListener("click", stopMetronome);

function startMetronome() {
  const bpm = parseInt(bpmInput.value, 10);
  if (!isNaN(bpm) && bpm > 0) {
    const intervalMs = 60000 / bpm;
    metronomeInterval = setInterval(() => playMetronomeClick(), intervalMs);
  }
}

function stopMetronome() {
  clearInterval(metronomeInterval);
}

const metronomeClickSound = new Audio("./sounds/tink.wav");
function playMetronomeClick() {
  metronomeClickSound.currentTime = 0;
  metronomeClickSound.play();
}

const trackCheckboxes = document.querySelectorAll(".trackCheckbox");
trackCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", onTrackChange)
);

const KeyToSound = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
  f: document.querySelector("#s4"),
  g: document.querySelector("#s5"),
  h: document.querySelector("#s6"),
  j: document.querySelector("#s7"),
  k: document.querySelector("#s8"),
  l: document.querySelector("#s9"),
};

let recording = false;
let currentTrack = 1;
let recordedTracks = {
  1: [],
  2: [],
};
let startTime;
let recordedSounds = [];

function onTrackChange() {
  const checkedTrack = document.querySelector(".trackCheckbox:checked");
  if (checkedTrack) {
    currentTrack = parseInt(checkedTrack.getAttribute("data-track"), 10);
  } else {
    currentTrack = null;
  }
}

function startRecording() {
  if (!recording && currentTrack !== null) {
    recording = true;
    startTime = Date.now();
    recordedTracks[currentTrack] = [];
    recordedSounds = [];
  }
}

function stopRecording() {
  if (recording) {
    recording = false;
  }
}

function playRecording() {
  const checkedTracks = document.querySelectorAll(".trackCheckbox:checked");
  const tracksToPlay = Array.from(checkedTracks).map((checkbox) =>
    parseInt(checkbox.getAttribute("data-track"), 10)
  );

  if (tracksToPlay.length > 0) {
    tracksToPlay.forEach((track) => {
      const soundsToPlay = recordedTracks[track];
      if (soundsToPlay.length > 0) {
        soundsToPlay.forEach((event) => {
          setTimeout(() => {
            playSound(event.key);
          }, event.time);
        });
      }
    });
  }
}

function playRecordedSound(sound) {
  const audio = new Audio(sound.src);
  audio.play();
}

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  if (sound) playSound(sound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();

  if (recording && currentTrack !== null) {
    recordedTracks[currentTrack].push({
      key: sound,
      time: Date.now() - startTime,
    });
  }
}

function addTrack() {
  const trackNumber = Object.keys(recordedTracks).length + 1;
  recordedTracks[trackNumber] = [];
  const tracksContainer = document.querySelector(".tracks");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("trackCheckbox");
  checkbox.setAttribute("data-track", trackNumber);
  checkbox.checked = true;
  checkbox.addEventListener("change", onTrackChange);
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(` Track ${trackNumber}`));
  tracksContainer.appendChild(label);
  currentTrack = trackNumber;
}
