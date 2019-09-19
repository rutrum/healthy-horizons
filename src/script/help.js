// Gets JSON objects from url
// Returns the actual object from source
function get(url){
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    return JSON.parse(request.responseText);
}