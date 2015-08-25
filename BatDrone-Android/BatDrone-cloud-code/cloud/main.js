Parse.initialize("NVvy7CLhZmKpqQdDvk6pVRSidDQvZA4sbbh9wqTx"
                        ,'dJuI5aJCKJTL4FhFZXv0VpIcWSRjeUg6eLF7GYoQ');

var addressInChinese = "台北市羅斯福路四段1號";

function getResponse(options) {
    Parse.Cloud.httpRequest({
        method: "POST",
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            address : addressInChinese,
            key:"AIzaSyBa9L6OKDlBjNX2moZiR8hYNQesNwdPP0w"
        },
        success: function(httpResponse) {
            var response = httpResponse.data;
            if(response.status == "OK"){
                var lat = response.results[0].geometry.location.lat;
                var lng = response.results[0].geometry.location.lng;
                var point = new Parse.GeoPoint(lat,lng);

                var Spots = Parse.Object.extend("Spots");
                //var spotsQuery = new Parse.Query("Spots");
                //spotsQuery.equalTo();

                var object = new Spots();
                //object.set("location", point);
                object.set("location", point);
                object.set("address", addressInChinese);
                object.save(null, {
                    success: function(object) {
                        // The object was saved successfully.
                        options.success(object.id);
                      },
                    error: function(object, error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and message.
                        console.log("Error");
                        options.error(langLat);
                    }
                });
            }
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
}

Parse.Cloud.define("geoCoding", function(request, response) {
  getResponse({
    success: function() {
      response.success();
    },
    error: function(error) {
      response.error(error);
    }
  });
});


