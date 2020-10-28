const api = {
    gifosTrending: (() => {
        return new Promise((resolve, reject) => {
            fetch(`https://api.giphy.com/v1/gifs/trending?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs&limit=5&rating=g`)
            //.then recibe un callback y el response de la promesa
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
        })
    }),

    trendingTopic: (() => {
        return new Promise((resolve, reject) => {
            fetch('https://api.giphy.com/v1/trending/searches?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs')
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
        })
    }),

    uploadGif: ((infoGif) => {
        return new Promise((resolve, reject) => {
            fetch('https://upload.giphy.com/v1/gifs?api_key=A1hJOpkrFlJITK2YiwMHoqqnOKdoKKYs', { method: 'POST', body: infoGif, 'mode': 'no-cors',
	        'headers': {'Access-Control-Allow-Origin': '*' }})
                .then(response => { resolve(response.json()) })
                .catch(error => { reject(error) })
        });
    })
}

export default api;
