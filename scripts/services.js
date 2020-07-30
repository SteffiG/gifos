function name(){
    let url='';
    function Services(url){
        this.url = url;
    }
    Services.prototype.getGifosTrend = function (callback){
        return fetch(this.url)
            .then(function(response) {
            return response.json();
            })
            .then(function(myJson) {
            console.log(myJson);
            });
    }
}
