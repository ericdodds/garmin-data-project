/***  
* Docs: https://rudderstack.com/docs/transformations/#adding-a-transformation
* Examples: https://github.com/rudderlabs/sample-user-transformers
* This function gets executed on each event before it gets pushed to a destination
* event               => JSON object of Event sent to rudder
* metadata (optional) => JavaScript function which can be used to access metadata
*                        of the given event by calling metadata(event)  
* After all the transformations are done, the final event that 
* needs to be pushed to the destination should be returned by this function
***/

import { convertTimestamp } from "unixTimestampToDatetime"

export function transformEvent(event, metadata) {
    
   if (metadata(event).sourceId == '2Li4LXXy4DZsup4QALWYclBVLpr') {
      event.event = "gear_by_activity";
   }
 
    if (metadata(event).sourceId == '2Li4ALEMa19wztwjTHNZHKac6ro') {
      event.event = "gear";
    } 
    
    if (metadata(event).sourceId == '2Li3rlFzUdmLxxQw9aRmCVllgYh') {
      event.event = "activity";
      
      // Convert timezoneId to integer 
      event.properties.converted_timeZoneId_int = parseInt(event.properties.timeZoneId,10);
      
      // Convert activity beginning timestamp to datetimes using timestamp conversion library 
      event.properties.beginTimestamp = parseInt(event.properties.beginTimestamp);
      event.properties.converted_beginTimestamp_datetime = convertTimestamp(event.properties.beginTimestamp);
      
      // Convert event eventTypeId to number 
      event.properties.converted_eventTypeId_num = Number(event.properties.eventTypeId);
      
      // Convert local and GMT start times to datetimes using conversion library
      event.properties.startTimeLocal = parseInt(event.properties.startTimeLocal);
      event.properties.converted_startTimeLocal_datetime = convertTimestamp(event.properties.startTimeLocal);
      
      event.properties.startTimeGmt = parseInt(event.properties.startTimeGmt);
      event.properties.converted_startTimeGmt_datetime = convertTimestamp(event.properties.startTimeGmt);
      
      // Convert duration from milliseconds to minutes and round to 2 decimals
      event.properties.duration_minutes = Math.round( (parseFloat([[event.properties.duration/1000]/60])) * 1e2) / 1e2;
      
      // Convert distance from centimeters to miles 
      event.properties.converted_distance_miles = Math.round( (parseFloat([event.properties.distance/160934.4])) * 1e2) / 1e2;
      
      // Convert elevationGain and elevationLoss from centimeters to feet  
      event.properties.converted_elevationGain_feet = parseInt([event.properties.elevationGain * .032808399]);
      event.properties.converted_elevationLoss_feet = parseInt([event.properties.elevationLoss * .032808399]);
     
      // Convert avgSpeed and maxSpeed to mph from centimeters per second
      event.properties.converted_avgSpeed_mph = Math.round( (parseFloat([event.properties.avgSpeed * 22.369])) * 1e1) / 1e1;
      event.properties.converted_maxSpeed_mph = Math.round( (parseFloat([event.properties.maxSpeed * 22.369])) * 1e1) / 1e1;
      
      //Convert avgHr to Number
      event.properties.converted_avgHr = Number(event.properties.avgHr);
     
      //Convert maxHr to Number
      event.properties.converted_maxHr = Number(event.properties.maxHr);
     
      //Convert calories from joules to kCal
      event.properties.converted_calories_kCal = parseInt([event.properties.calories / 4.2]);
     
      //Convert bmr calories from joules to kCal
      event.properties.converted_bmrCalories_kCal = parseInt([event.properties.bmrCalories / 4.2]);
      
      // Convert startLongitude and startLatitude Numbers
      event.properties.converted_startLongitude_num = Number(event.properties.startLongitude);
      event.properties.converted_startLatitude_num = Number(event.properties.startLatitude);
      
      // Convert aerobicTrainingEffect to a Numbers
      event.properties.converted_aerobicTrainingEffect_num = Math.round( parseFloat(event.properties.aerobicTrainingEffect) * 1e2) / 1e2;
      
      // Convert avgFractionalCadence and maxFractionalCadence to Integers
      event.properties.converted_avgFractionalCadence_int = parseInt(event.properties.avgFractionalCadence);
      event.properties.converted_maxFractionalCadence_int = parseInt(event.properties.maxFractionalCadence);
      
      // Convert maxFtp to an Integer
      event.properties.converted_maxFtp_int = parseInt(event.properties.maxFtp);
      
      // Convert elapsedDuration and movingDuration from milliseconds to minutes and round to two decimals
      event.properties.converted_elapsedDuration_minutes = Math.round( (parseFloat([[event.properties.elapsedDuration/1000]/60])) * 1e2) / 1e2;
      event.properties.converted_movingDuration_minutes = Math.round( (parseFloat([[event.properties.movingDuration/1000]/60])) * 1e2) / 1e2;
      
      // Convert anaerobicTrainingEffect to Float and round to one decimal
      event.properties.converted_anaerobicTrainingEffect_float = Math.round( parseFloat(event.properties.anaerobicTrainingEffect) * 1e1) / 1e1;
      
      // Convert minTemperature and maxTemperature to Integers in Fahrenheit
      event.properties.converted_minTemperature_fahrenheit = (event.properties.minTemperature * 1.8) + 32;
      event.properties.converted_maxTemperature_fahrenheit = (event.properties.maxTemperature * 1.8) + 32;
      
      // Convert minElevation and maxElevation from centimeters to feet  
      event.properties.converted_minElevation_feet = parseInt([event.properties.minElevation * .032808399]);
      event.properties.converted_maxElevation_feet = parseInt([event.properties.maxElevation * .032808399]);
      
      // Convert maxVerticalSpeed to mph from centimeters per second
      event.properties.converted_maxVerticalSpeed_mph = Math.round( (parseFloat([event.properties.maxVerticalSpeed * 22.369])) * 1e2) / 1e2;
      
      // Convert lapCount to a Number
      event.properties.converted_lapCount_num = Number(event.properties.lapCount);
      
      // Convert startLongitude and startLatitude Numbers
      event.properties.converted_endLongitude_num = Number(event.properties.endLongitude);
      event.properties.converted_endLatitude_num = Number(event.properties.endLatitude);
      
      // Convert waterEstimated to an Integer
      event.properties.converted_waterEstimated_int = Number(event.properties.waterEstimated);
      
      // Convert activityTrainingLoad to an Integer
      event.properties.converted_activityTrainingLoad_int = parseInt(event.properties.activityTrainingLoad);
      
      // Convert moderateIntensityMinutes and vigorousIntensityMinutes to Integers
      event.properties.converted_moderateIntensityMinutes_int = parseInt(event.properties.moderateIntensityMinutes);
      event.properties.converted_vigorousIntensityMinutes_int = parseInt(event.properties.vigorousIntensityMinutes);
      
    }
    
    return event;
}
