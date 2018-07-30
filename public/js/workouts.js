// var s = document.createElement("script");
// s.type = "text/javascript";
// s.src = "http://somedomain.com/somescript";
// $("head").append(s);


function startFunction(){
    alert("Hello from the other side xD");
}


$(document).ready(function() {
    
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '/css/3-col-portfolio.css');
    document.getElementsByTagName("head")[0].appendChild(link);
    
    var link1 = document.createElement('link');
    link1.setAttribute('rel', 'stylesheet');
    link1.setAttribute('type', 'text/css');
    link1.setAttribute('href', '/vendor/bootstrap/css/bootstrap.min.css');
    document.getElementsByTagName("head")[0].appendChild(link1);
    
    document.title = "Browse Workouts"
    
});
