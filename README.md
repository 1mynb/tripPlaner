# Trip Planner


## Description 
<div style="text-align: justify;"> 
This project is developed to help drivers plan their trip. They provide their current location, pickup location , drop location and current cycle hours used by the drivers. Then the system shows the appropriate routes and other detail if the trip is valid as per HOS of Federal Motor Carrier Safetey Administration(FMCSA). It also drows the log sheet automatically based on the inputs provided by the driver. The backend part of the project is developed by using Django Framework and its front end part is developed by using React Framework. Its database is Designed by Mysql.
</div>

---
## Requirements

    * Build an app that takes trip details as inputs and outputs route instructions and draws ELD logs as outputs
    * Build an app that takes in the following inputs Current location, Pickup location, Dropoff location, Current Cycle Used (Hrs)
    * Build an app that Outputs Map showing route and information regarding stops and rests find and use a free map API
    * Build an app the logs Daily Log Sheets filled out -- need to draw on the log and fill out  sheet, multiple log sheets will needed for longer trips
    * 

### Assumptions

    * Property-carrying driver, 70hrs/8days, no adverse driving conditions
    * Fueling at least once every 1,000 miles
    * 1 hour for pickup and drop-off
---

## How the project works

   * First the project displays a prompt page for the user
   * The user then select the current, pick & dropoff location, fill current cycle count
   * The user can also select these locations from the map provided by the system
   * The system then inserted the pickup & dropoff location detail & their latitude, logitude into database
   * The system then use openrouteservice api to find the routes
   * If the route is found, it will be dispayed on the map
   * The system calcuate the fuel station and breaks based on 70/8 rules of FMCSA
   * The system then marks the fuel & break location in the map
   * The system calulates the off duty, on duty, driving, sleeper birth hours
   * The system then draws the daily log sheet of the trip

   <video src="https://tripplanner.zeaye.com/overviewOpt.mp4" controls></video>

---

## Usage

   * visit https://tripplanner.zeaye.com
   * fill the necessary fields, current, pickup & dropoff locations, currency cycle hours used 
   * Then click Plan Trip button to see the out puts
   * The system then displays the output


   
---

## Examples
<p align="center">
    <img src="https://github.com/1mynb/tripPlaner/blob/main/prompts.PNG">
</p>
<p align="center">
    <img src="https://github.com/1mynb/tripPlaner/blob/main/route.PNG">
</p>
<p align="center">
    <img src="https://github.com/1mynb/tripPlaner/blob/main/log-sheet.PNG">
</p>

---

## Tools / Packages

   * django: 5.1.7
   * django-cors-headers: 4.7.0
   * django-environ: 0.12.0
   * djangorestframework: 3.15.2
   * mysqlclient: 2.2.7
   * PyMySQL: 1.1.1
   * requests:2.32.3
   * axios: 1.8.4,
   * konva: 9.3.20,
   * leaflet: 1.9.4,
   * react: 19.1.0,
   * react-dom: 19.1.0,
   * react-konva: 19.0.3,
   * react-leaflet: 5.0.0,
   * react-router-dom: 7.4.1
   * react-select: 5.10.1,
   * yup: 1.6.1 
---

## Author
* **Beniyam Legesse** - https://github.com/beniyaml
