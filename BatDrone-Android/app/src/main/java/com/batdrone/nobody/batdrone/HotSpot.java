package com.batdrone.nobody.batdrone;

import com.parse.ParseClassName;
import com.parse.ParseGeoPoint;
import com.parse.ParseObject;
import com.parse.ParseQuery;
import com.parse.ParseUser;

/**
 * Data model for a post.
 */
@ParseClassName("Spots")
public class HotSpot extends ParseObject {
    public String getText() {
        return getString("address");
    }

    public void setText(String value) {
        put("address", value);
    }

    public String getDistrict() {
        return getString("district");
    }

    public void setDistrict(String value) {
        put("district", value);
    }

    public ParseGeoPoint getLocation() {
        return getParseGeoPoint("location");
    }

    public void setLocation(ParseGeoPoint value) {
        put("location", value);
    }

    public static ParseQuery<HotSpot> getQuery() {
        return ParseQuery.getQuery(HotSpot.class);
    }
}
