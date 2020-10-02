import api from './services.js';

/**
 * GLOBAL VARIABLES
 */
const video = document.querySelector('.video')
const start = document.querySelector('.start');
const record = document.querySelector('.record');
const end = document.querySelector('.finish');
const up = document.querySelector('.upGifo');
const circle = document.getElementsByClassName('creating__options--circle');
const title = document.querySelector('.creating__written--title');
const paragraph = document.querySelector('.creating__written--paragraph');
const timer = document.querySelector('.creating__timer');
const repeat = document.querySelector('.creating__repeat');
let constraints = { audio: false,  video: { width: 480, height: 320 }}
let initTime, idInterval;

up.addEventListener('click', load);

/**
 * @method startVideo
 * @description - function in charge of listening to the click event of the start button
 */

function startVideo() {
  cameraPermissions();
  getStreamAndRecord();
}

/**
 * @method cameraPermissions
 * @description - function that change the description in the square area
 */

function cameraPermissions() {
    title.innerHTML = `¿Nos das acceso a tu cámara?`;
    paragraph.innerHTML = `El acceso a tu camara será válido sólo <span class="breakpoint">por el tiempo en el que estés creando el GIFO</span>`;
    start.classList.add('hidden');
    circle[0].classList.toggle('active');
}

/**
 * @method getStreamAndRecord
 * @description - function that start the video streaming
 */

async function getStreamAndRecord() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoGif(stream);
        record.classList.remove('hidden');
        const recorder = creatingRecorder(stream);
        record.addEventListener('click', () => recording(recorder));
        end.addEventListener('click', () => stopRecording(recorder));
    }
    catch(error) {
        console.log(error);
    }
}

/**
 * @method videoGif
 * @param {*} stream
 * @description - function that start the camera streaming 
 */

function videoGif(stream) {
  title.classList.add('hidden');
  paragraph.classList.add('hidden');
  video.classList.remove('hidden');
  video.srcObject = stream;
  video.play()
}

/**
 * @method creatingRecorder
 * @param {} stream 
 * @description - 
 */

function creatingRecorder(stream) {
  const recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
      console.log('started');
    },
  });
  recorder.camera = stream;
  return recorder;
}

/**
 * @method recording
 * @param {*} recorder
 * @description - function that starts the recorder 
 */

function recording(recorder) {
  timer.classList.remove("hidden");
  startCount();
  recorder.startRecording();
  record.classList.add("hidden");
  end.classList.remove("hidden");
  circle[0].classList.toggle("active");
  circle[1].classList.toggle("active");
};

/**
 * @method recording
 * @param {*} recorder
 * @description - function that stop the recorder 
 */

let infoGif; 

function stopRecording(recorder) {
  stopCount();
  timer.classList.add('hidden');
  end.classList.add('hidden');
  up.classList.remove('hidden');
  repeat.classList.remove('hidden');
  recorder.stopRecording(() => {
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'))
    infoGif = form;
  })
  //video.srcObject = null;
  recorder.camera.stop();
  //recorder = null;
}

/**
 * @method 
 * @description - function that show the timer
 */

const time = numSeconds => {
  let hours = Math.floor(numSeconds / 60 / 60);
  numSeconds -= hours * 60 * 60;
  let minutes = Math.floor(numSeconds / 60);
  numSeconds -= minutes * 60;
  numSeconds = parseInt(numSeconds);
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (numSeconds < 10) numSeconds = "0" + numSeconds;

  return `${hours}:${minutes}:${numSeconds}`;
};

const updateTime = () => {
  timer.textContent = time((Date.now() - initTime) / 1000);
}

// Ayudante para la duración; no ayuda en nada pero muestra algo informativo
const startCount = () => {
  initTime = Date.now();
  idInterval = setInterval(updateTime, 1000);
};

const stopCount = () => {
  clearInterval(idInterval);
  initTime = null;
  timer.textContent = "";
}

/**
 * @method repeatVideoGif
 * @description - function that repeat video
 */

function repeatVideoGif() {
  repeat.classList.add('hidden');
  up.classList.add('hidden');
  getStreamAndRecord(); 
}

function load() {
  loadVideoGif();
  api.uploadGif()
  .then((json) => {
    console.log(json);
  })
  console.log('hii');
  
}

function loadVideoGif() {
  repeat.classList.add('hidden');
  up.classList.add('hidden');
  circle[1].classList.add('active');
  circle[2].classList.add('active');
}

/**
 * LISTENER
 */

start.addEventListener('click', startVideo);
repeat.addEventListener('click', repeatVideoGif);