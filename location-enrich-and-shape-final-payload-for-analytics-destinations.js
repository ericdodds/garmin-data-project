export async function transformEvent(event, metadata) {
    
     if (event.event == 'webhook_source_event' ) 
        {
                
                // Delete messageId to prevent event duplication 
                delete event["messageId"];
                
                // Set anonymousId to prevent creation of additional users 
                event.anonymousId = event.properties.userId;
                
                // Set the correct name for the event (default is webhook_source_event)
                event.event = event.properties.event;
                
                // Reposition the properties object to be in the correct hierarchy
                event.properties = event.properties.properties;
                
                // Replace the webhook generated timestamp with the Garmin activity timestamp (activity_start_time)
                event.timestamp = event.properties.activity_start_time;
                event.originalTimestamp = event.properties.activity_start_time;
                
                // Parse gear lists to be formatted correctly for Mixpanel 
                event.properties.gear_id = JSON.parse(event.properties.gear_id);
                event.properties.gear_model = JSON.parse(event.properties.gear_model);
                event.properties.gear_make = JSON.parse(event.properties.gear_make);
                
                // Concatenate lattitude and longitude with a comma to make the reverse geolocation API call 
                event.properties.latLong = event.properties.converted_start_latitude_num + "," + event.properties.converted_start_longitude_num;
                
                // Reverse geolocate location data via the Positionstack API using latitude and longitude 
                if (event.properties.latLong) {
                    const addy= await fetch("http://api.positionstack.com/v1/reverse?access_key=1234567890&limit=1&query="+event.properties.latLong);
                    
                    event.properties.address = addy.data[0].label;
                    event.properties.continent = addy.data[0].continent;
                    event.properties.country = addy.data[0].country;
                    event.properties.city = addy.data[0].locality;
                    event.properties.state = addy.data[0].region;
                
                }
                
                // Create a traits object and add the userId as a trait 
                  let traits = { 
                 "userId": event.properties.userId
                }
                
                event.traits = Object.assign(traits)
        }
    
    return event;
}
