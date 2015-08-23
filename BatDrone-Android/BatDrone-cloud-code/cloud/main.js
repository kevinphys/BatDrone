Parse.initialize("NVvy7CLhZmKpqQdDvk6pVRSidDQvZA4sbbh9wqTx"
                        ,'dJuI5aJCKJTL4FhFZXv0VpIcWSRjeUg6eLF7GYoQ');

var counter = 0;
var spots = Parse.Object.extend("Spots");
var addressInChinese = "台北市羅斯福路四段1號";

Parse.Cloud.httpRequest({
    method: "POST",
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {
        address : addressInChinese,
        key:"AIzaSyBa9L6OKDlBjNX2moZiR8hYNQesNwdPP0w",
        language:"zh-TW"
    },
    success: function(httpResponse) {
        var response=httpResponse.data;
        if(response.status == "OK"){
            var point = new Parse.GeoPoint(response.results[0].geometry.location);
            spots.set("location", point);
            console.log(point);
         }
    },
    error: function(httpResponse) {
        console.error('Request failed with response code ' + httpResponse.status);
    }
});


