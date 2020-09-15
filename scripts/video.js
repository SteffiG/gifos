
const start = document.querySelector('.creating__button--start');
start.addEventListener('click', getStreamAndRecord);
console.log('hola');
function getStreamAndRecord() {
    console.log('llegue');
    const video = document.querySelector('.video')
    console.log(video);
    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
        .getUserMedia({audio: false, video: {height: { max: 480 }}})
        .then((stream) => {
            console.log(stream);
            video.srcObject = stream;
            video.play()
        })
        .catch((error) => console.log(`Ocurrio un error: ${error}`))
    }
}

//export default getStreamAndRecord;