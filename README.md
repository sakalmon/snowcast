# Snowcast
A web application that allows users to see the day's snowfall forecast at popular ski resorts as well as search for others.
## [Try out Snowcast!](http://snowcast.co)
![App Screenshot]()
## :blue_book: Plan for developing the app
### 1. User stories
* I'm a person who wants to travel and snowboard/ski at various places... so,
* I want to be able to see a list of popular ski resorts
* Snowfall for each ski resort should be displayed
* I also want to see the current temperature of each resort
* I would like to be able to search for other ski resorts
* Hourly snowfall would be a nice addition
### 2. Pages
* Popular Resorts Page
* Search Page (or bar)
* Forecast Details
### 3. Tasks
![Tasks]()
### 4. Wireframes
#### Popular Resorts (Home Page)
![Popular Resorts (Home Page)]()
#### Forecast Details
![Forecast Details]()
### 5. Things to watch out for
* Scope/feature creep
* Implementing overly ambitious features
* Committing private API keys to Github (don't do it!)
* Leaving deployment too late (can run into issues, do it early and often)
## Approach Taken
* Purchased domain name - [snowcast.co](http://snowcast.co)
* Researched AWS deployment
* Deployed default React app to AWS EC2 and see if it's too difficult for this project
* A lot of setup was involved with EC2 so I found an easier alternative (S3 Bucket)
* Researched required APIs and their limitations
* Determine if APIs are suitable by performing multiple fetch requests using Postman and inspecting the response data.
* Wireframe desired pages
* Create basic required components from wireframes
* Break apart those basic components into smaller components so that they may be used on multiple pages.
* Style the app just enough so that we can get an idea of what components/logic are required next.
* Implement each feature one at a time
* Finalise styling
* Deploy app
* Test app
## Deployment
* The app was deployed to AWS
* S3 Bucket
* Configured to use custom domain name (Route 53)
## :rocket: Tecnologies Used
* AWS Cloud Computing
* React
* Functional/Class components
* Lifecycle methods and Hooks
* Open Cage Data API - Forward Geocoding
* Open Weather API - Weather Data
* Front-end routing using React
* Sass - Improved stylesheets
* Dotenv - Storing environment variables for API keys
* Fontawesome icons
## Lessons Learnt
* setState and useState are asynchronous. Data will not be ready immediately.
* React Development environment causes rendering to happen twice (helps debug issues)
* Be careful with where fetch requests go in React as it can cause an infinite loop which uses up all of your APIs quotas (ask me how I know :grin:)
* Embrace front-end routing as it's very useful (learnt that you can pass data through a Link component)
* Javascript thinks NaN is of data type: 'number' :trollface:
## :beetle: Bugs
* Clicking on a resort while on the forecast details page causes a blank white page to appear (this is due to the Resort component being reused which is intended to be clickable on a different page).
* Can't navigate anywhere else if a search result is not clicked
## :star: Future features
* Make app responsive for different devices
* Toggle between Celsius and Fahrenheit units
* Show snowfall data for the next 7 days
* Sort resorts by snowfall amount or temperature
