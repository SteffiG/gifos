
const start = document.querySelector('.creating__button--options');
start.addEventListener('click', getStreamAndRecord);
console.log('hola');
function getStreamAndRecord() {
    console.log('llegue');
    const video = document.querySelector('.video')
    console.log(video);
    if(navigator.mediaDevices.getUserMedia) {
        console.log('es aqui');
        navigator.mediaDevices
        .getUserMedia({audio: false, video: {height: { max: 480 }}})
        .then((mediaStream) => {
            let streamCamara = mediaStream;
            video.srcObject = streamCamara;
            video.play()
        })
        .catch((error) => console.log(`Ocurrio un error: ${error}`))
    }
}

//export default getStreamAndRecord;