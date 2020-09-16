/**
 * GLOBAL VARIABLES
 */
const video = document.querySelector('.video')
const start = document.querySelector('.start');
const record = document.querySelector('record');
const end = document.querySelector('.finish');
const up = document.querySelector('.upGifo');
const title = document.querySelector('.creating__written--title');
const paragraph = document.querySelector('.creating__written--paragraph');
let constraints = { audio: false,  video: {width: 480,height: 320 }}

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
    title.innerHTML = '¿Nos das acceso a tu cámara?';
    paragraph.innerHTML = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creanDo el GIFO';
    start.classList.remove('hidden');
}

/**
 * @method getStreamAndRecord
 * @description - function that start the video streaming
 */

async function getStreamAndRecord() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoGif(stream);
        record.classList.add('hidden');
    }
    catch(e) {
        console.log(e.message);
    }
}

/**
 * @method videoGif
 * @param {*} stream
 * @description - function that start the camera streaming 
 */

function videoGif(stream) {
    video.classList.remove('hidden');
    video.srcObject = stream;
    video.play()
}

/**
 * LISTENER
 */

start.addEventListener('click', startVideo);