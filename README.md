# DISCLAIMER: This Project was created for educational purposes ONLY.

FBI API and data manipulation Project with RESTful/wrapper APIs. Used with the FBI Crime Data Explorer API. 

# Crime Data Explorer FBI Website
 
## Overview
 
### What is this website for?
 
This is a website for anyone interested in searching Data comparisons between different ethnicities, types of crimes and the real amount of victims/offenders in each one.
It specifically design to access real time Data provided by the public FBI API. Extremely useful for lawyers, political campaign uses, non-profits, NGO´s, civil right advocates and special interest groups.
 
### What does it do?
 
This website has two main searching parameters, first being the type of felony/crime you want to search for and second being the race and or year (you can speacify a year or search for the ones available 1991-2016).

### How does it work
 
This website uses **Java-Script** and **jQuery** to route viewers through the site. The site is styled with **Bootstrap**, **css3** and **Google Fonts**. The data was being originally called from the front-end using **Javascript** and **JQuery** code. Mid-way through the project the FBI API changed not only creating a unic API key for each user (provided at request) but also restructuring the data provided, including more and better parameters for the searchs. This changes also included the use of CORS, (Cross-Origin Resource Sharing) that avoided the class from the front end. This made necessary the creation of a specific back end (restful-wrapper API) to meet the new requirements. The restful-API part of the project can be viewed [HERE](https:#).

## Features
 
### Existing Features
- Eye catching graphs.
- Easy UX search form approach.
- Minimal simple Landing.
- Scrollable acces to navigate through the data the charts and graphs are based on.
- Links page to FBI API site which simplifies the access to the source.

## Tech Used

### Some the tech used includes:
- **HTML**, **CSS** and **Javascript**
  - Base languages used to create website
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give the project a simple, responsive layout.
- [JQuery](https://jquery.com)
    - Use **JQuery** for boostrap and displaying modal.

## Testing
- All code used on the site has been tested to ensure everything is working as expected
- Site viewed and tested in the following browsers:
  - Google Chrome
  - Safari
  - Mozilla Firefox
  - Internet Explorer

## Contributing
 
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. The project will now run on [localhost](http://127.0.0.1:8080)
3. Make changes to the code and if you think it belongs in here then just submit a pull request

## Credits

### Media
- The FBI logo used in this site was obtained from: [](https:#)
- The chart display design inspiration was taken from: [Code Institute](https://www.codeinstitute.net/student-projects/)

### Information
- The information used to create this site was from a number of sources
    - The FBI API used to extract the data charted was obtained from: [Crime Data Explorer](https://crime-data-explorer.fr.cloud.gov/api)
    
### Website working Demo and Link to project:

[Link to project](https://mboladop.github.io/Interactive-project-stream2/)

gifs