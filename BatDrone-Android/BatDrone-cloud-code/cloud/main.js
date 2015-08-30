//var addressInChinese = "台北市羅斯福路四段1號";
var addressInChinese = "";


function getAddress(){
    Parse.Cloud.httpRequest({
        method: "GET",
        url: 'http://data.taipei/opendata/datalist/apiAccess',
        params: {
            scope : "resourceAquire",
            rid : "efe5c923-fa09-4d55-896e-877c553f04e0"
        },
        success: function(httpResponse) {
            var _response = httpResponse.data;
            var count = _response.result.count;
            var promises = [];
            for (i=0; i<count; i++) {
                var addressInChinese = _response.result.results[i].District + _response.result.results[i].Location;
                var district = _response.result.results[i].District;
                promises.push(getGeoCodingAndSave(addressInChinese, district));
            }
            Parse.Promise.when(promises).then(function(results) {
                //response.success("Promises httpResponse successs");
            }, function(err) {
            });
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
}


function getGeoCodingAndSave(addressInChinese, district) {
    return Parse.Cloud.httpRequest({
        method: "POST",
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            address : addressInChinese,
            key:"YOUR_GOOGLE_GEOCODING_API_KEY"
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
2
                var object = new Spots();
                //object.set("location", point);
                object.set("location", point);
                object.set("district", district)
                object.set("address", addressInChinese);
                object.save(null, {
                    success: function(object) {
                        // The object was saved successfully.
                        console.log(object.id);
                    },
                    error: function(object, error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and message.
                        console.log("Error");
                    }
                });
            }
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
}

Parse.Cloud.define("updateData", function(request, response) {
  getAddress({
    success: function() {
      response.success("Success!");
    },
    error: function(error) {
      response.error(error);
    }
  }, addressInChinese);
});


