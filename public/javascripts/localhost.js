const API_URL = getHostURL();

function getHostURL() {
    if(window.location.host.indexOf('localhost') != -1){
        return 'http://localhost:5000';
    }
    else {
        return 'https://socialspark.herokuapp.com'
    }
}
