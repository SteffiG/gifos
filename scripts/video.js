
const start = document.querySelector('.creating__button--start');
start.addEventListener('click', getStreamAndRecord);

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.play()
    })
}

export default getStreamAndRecord;