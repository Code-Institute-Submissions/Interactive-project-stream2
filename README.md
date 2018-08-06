## DISCLAIMER: This Project was created for educational purposes ONLY.
FBI API and data manipulation Project with RESTful/wrapper APIs. Used with the FBI Crime Data Explorer API. 

# Crime Data Explorer FBI Website

![Desktop Demo](https://raw.githubusercontent.com/mboladop/Interactive-project-stream2/master/stream2.gif "Desktop Demo")
 
## Overview
 
### What is this website for?
 
This is a website for anyone interested in searching Data comparisons between different ethnicities, types of crimes and the real amount of victims/offenders in each one.
It specifically designed to access real time Data provided by the public FBI API. Extremely useful for lawyers, political campaign uses, non-profits, NGO´s, civil right advocates and special interest groups.
 
### What does it do?
 
This website has two main searching parameters, first being the type of felony/crime you want to search for and second being the race and or year (you can specify a year or search for all the ones available 1991-2016).

### How does it work
 
This website uses **Java-Script** and **jQuery** to route viewers through the site. The site is styled with **Bootstrap**, **css3** and **Google Fonts**. The data was being originally called from the front-end using **Javascript** and **JQuery** code. Mid-way through the project the FBI API changed not only creating a unique API key for each user (provided at request) but also restructuring the data provided, including more and better parameters for the searches. This changes also included the use of CORS, (Cross-Origin Resource Sharing) that avoided the calls from any front end. This made necessary the creation of a specific back end (restful-wrapper API) to meet the new requirements of the API. The restful-API part of the project can be viewed [HERE](https:https://mboladop-fbi-restful-api.herokuapp.com/offenders/rape).

## Features
 
### Existing Features
- Eye catching graphs.
- Easy UX search form approach.
- Minimal simple Landing.
- Scrollable access to navigate through the data the charts and graphs are based on.
- Links page to FBI API site which simplifies the access to the source.

## Technologies Used

- **HTML5**, **CSS3** and **Javascript**
  - Base languages used to create website.
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give the project a simple, responsive layout.
- [JQuery](https://jquery.com)
    - Use **JQuery** for Bootstrap and displaying modal.
- [Google Fonts](http://googlefonts.com/)
    - We use **Google Fonts** to give our project the fonts.
- [Crossfilter](https://cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.12/crossfilter.js)
    - We use **Crossfilter** the JavaScript library to explore large multivariate datasets in the browser. To be able to manipulate the data used for the charts.
- [dc/d3](https://cdnjs.cloudflare.com/ajax/libs/)
    - We use **dc/d3** javascript charting libraries to create the graphs.

## Testing
- All code used on the site has been tested to ensure everything is working as expected
- Site viewed and tested in the following browsers:
  - Google Chrome
  - Safari
- Site viewed and tested in the following devices:
  - Iphone 7plus
  - Iphone x 
  - Ipad
  - Macbook 13" and 15"
  - Samsung Galaxy

-FBI API button:
    * Click on the “FBI API” button.
    * Check the website displays in a different tab.
-Crime buttons:
    * Click on the different ”Crime” buttons.
    * Check the ethnicity checkboxes display in the search form for each one.
-Search form:
    * Click on the “Search” button on the form.
    * Try to submit the empty form and verify reload occurs.
    * Try to submit the form with only ethnicity specified and check data appears.
    * Try to submit the form with only year specified and check reload occurs.
-Reset button:
    * Click on the “reset” button once the data of a search is loaded.
    * Verify the search goes back to the first step, (choosing a crime).

# How the project looks and works on different browsers and screen sizes:

![Responsive Demo](https://raw.githubusercontent.com/mboladop/Interactive-project-stream2/master/stream2responsive.gif "Responsive Demo")

# BUGS
To test it in different devices i started using the console toggle device toolbar, when I fixed all the versions for the different tablets and mobile screens I opened the website  from my Iphone and realised the display was not looking as it should.
To fix this I created a specific and new mobile version. For this purpose i downloaded Xcode simulator and served the website via [npm package serve](https://www.npmjs.com/package/serve) to be able to access it instantly and remotely through my own phone.


## Deployment
1. Navigate to the repository where you're setting up your deployments.
2. Under your repository name, click Settings.
3. Go to GitHub Pages section.
4. Click and choose master branch.
5. Click save.


## Contributing

### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command.
2. After you've done that you'll need to make sure that you have **npm** installed. Link [npm package serve](https://www.npmjs.com/package/serve)
6. The project will now run locally.
7. Make changes to the code and if you think it belongs in here then just submit a pull request.

## Credits

### Media
- The animated Gifs of the different projects from the [Giphy Capture App](https://giphy.com/apps/giphycapture)


### Information
- The information used to create this site was from a number of sources
    - The FBI API used to extract the data charted was obtained from: [Crime Data Explorer](https://crime-data-explorer.fr.cloud.gov/proxy/swagger-ui.html)
    
## Project Live:

[Link to project](https://mboladop.github.io/Interactive-project-stream2/)

