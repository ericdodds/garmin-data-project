with cte_gear as 
  (SELECT 
    m.activity_id, 
    '[' || string_agg (distinct '"' || m.`gear_pk` || '"', ',') || ']' as gear_id,
    '[' || string_agg (distinct '"' || g.`custom_make_model` || '"',  ',')|| ']' as gear_make,
    '[' || string_agg (distinct '"' || g.`display_name` || '"', ',')|| ']' as gear_model,
   -- '["gear_details": {' || string_agg (distinct '{"gear_model": "' || g.`display_name` || '", "gear_make": "' || g.`custom_make_model` || '", "gear_id": "' || m.`gear_pk` || '"}', ',') || '}]' as gear_details



  FROM `garmin_gear_activity_mapping.gear_by_activity` m 
    LEFT OUTER JOIN `garmin_gear_index.gear` g on m.gear_pk = g.gear_pk  
  GROUP BY activity_id
),

 cte_activity as (
   SELECT distinct
    `manufacturer`,
    `converted_max_elevation_feet`,
    `converted_water_estimated_int`,
    `converted_moving_duration_minutes`,
    `converted_anaerobic_training_effect_float`,
    `converted_activity_training_load_int`,
    `activity_type`,
    `converted_min_elevation_feet`,
    `favorite`,
    `converted_avg_speed_mph`,
    `converted_event_type_id_num`,
    `sport_type`,
    a.`event_text`,
    `begin_timestamp`,
    `converted_avg_hr`,
    `converted_time_zone_id_int`,
    `converted_start_time_local_datetime`,
    a.`activity_id`,
    `converted_max_temperature_fahrenheit`,
    `converted_start_longitude_num`,
    `converted_start_latitude_num`,
    `converted_max_hr`,
    `converted_moderate_intensity_minutes_int`,
    `converted_end_latitude_num`,
    `converted_elapsed_duration_minutes`,
    `name`,
    `converted_max_speed_mph`,
    `converted_elevation_gain_feet`,
    `converted_elevation_loss_feet`,
    `converted_avg_fractional_cadence_int`,
    `start_time_gmt`,
    `converted_distance_miles`,
    `converted_start_time_gmt_datetime`,
    `converted_bmr_calories_k_cal`,
    `converted_max_vertical_speed_mph`,
    `converted_lap_count_num`,
    `converted_vigorous_intensity_minutes_int`,
    `converted_min_temperature_fahrenheit`,
    `converted_end_longitude_num`,
    `converted_calories_k_cal`,
    `converted_max_ftp_int`,
    `start_time_local`,
    `converted_aerobic_training_effect_num`,
    PARSE_DATETIME('%Y-%m-%d, %I:%M %p', converted_start_time_local_datetime ) activity_start_time,
    date(PARSE_DATETIME('%Y-%m-%d, %I:%M %p', converted_start_time_local_datetime )) activity_start_date,
    'eric.dodds@gmail.com' as userId
FROM `garmin_activities.activity` a
 )
SELECT a.*,
    m.`gear_id`,
    m.`gear_make`,
    m.`gear_model`,
  -- m.`gear_details`
FROM cte_activity a
    LEFT OUTER JOIN cte_gear m ON a.activity_id = m.activity_id
-- where m.activity_id is not null
