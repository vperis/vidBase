// some canned html that dynamically generates page based on Title & embedded URL
//      titURL(yourtitle, yourURL);

// bootstrap CSS
var docCSS = "<link rel=\"stylesheet\" " +                          "href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" " + 
    "integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" " + 
    "crossorigin=\"anonymous\"> \n" +
    "<meta charset=\"utf-8\"> \n";

// Viewport definitions, especially for mobile devices
var docViewPort = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> \n" +
            "<link rel=\"icon\" type=\"image/x-icon\" href=\"popcorn.ico\"> \n" ;

module.exports = function() {
    this.titURL = function(title, embedurl) { 
        return "<!doctype html> \n" +
            "<html> \n" +
            "<head> \n" +
                docCSS + 
                "<title> " + title + " </title> \n" +  
                docViewPort +
            "</head> \n" +
            "<body> \n" + embedurl + "\n</body> \n" +
            "</html> \n"      
    };
    
    this.videoNotFound = function(videotag) {
        return "<!doctype html> \n" +
            "<html> \n" +
            "<head> \n" +
                docCSS + 
                "<title>" + "Video Not Found" + "</title> \n" +  
                docViewPort +
            "</head> \n" +
            "<body> \n" + 
                "<h3> video <mark>" + videotag + "</mark> is not found.</h3>\n" +
            "</body> \n" +
            "</html> \n" 
    };
}