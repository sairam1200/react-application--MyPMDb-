# MyPMDb
Mobile Development Application
App’s Context & Data
The interactions of the application with
other systems is shown as the data flow between the application and service providers. As there
are several different services and functionalities the application has to offer, there are also several
different service providers.
Device - The application can functionally work if it can have access to some services which
provided by the device and its OS. Finding the user’s location as an example needs to read
data from GPS sensors and use it to make the availability check service possible. Most of
the services might be working with the device storage as there are mostly services storing
and managing information from internal database and UI.
– Location from GPS
– Audio from Microphone
– Access Internet
– Access Storage Device
• Remote Database - There are internet databases that offer different range of information
about movies which are available to use for developers by open source API:s. Although My
PMDB application needs to use several providers as the developer team will use data from
different databases.
– Movie information / poster / trailer
– Search result
– Upcoming Movies
– Availability control to show where can the movie be watched in relation with the user’s
location.
Remote Server - There are some services that need to write the data from user (high safety
demands) and read / use it later. Authentication for the account registration and login is
an example for this.
– Registration of a new user is decided to demand as less information as possible and
needs just one email address from user. The authentication handles by some react-
native library (Firebase).
– Apart from the data which stored in the user device, the application would be able
to store a backup from the Watchlist. It is not been decided how to demonstrate to
perform the backup test though.
User Inputs - The application collects user’s login information ,i.e. an email address and the
password for the account in My PMDb. These information is used in an authentication system
that verifies the user credentials. There are other user inputs that come into the system while the
user is interacting and using the application such as:
• Text as a title to search
• Clicking on buttons and choosing different features / services
• Swiping up / down & left / right to see the contents.
Remote Database - Application searches for movie information using different API:s connected to
online free databases that offer movie information. For example the user search a title for a movie,
3 November 28, 2021
Design Document 1 App’s Context & Data
then the application uses these remote databases to bring the information the user wishes to see.
We also consider to develop a feature where the user would be able to import / export watch-list
into a remote database and use the API to develop more features like sharing with friends and so
on.
There are open source free API:s that are available to be used in development by popular streaming
services such as Netflix, Disney Plus, Amazon Prime and etc. These sort of remote databases are
intended to be used in order to fix the availability service the application provides.
Internal Sensor - The voice data is collected by a microphone, and the location data is collected
by GPS.
Design Evaluation
a. Color scheme consist of at list three colors will be used in order to make sure that the colors
are chosen as planed. The shape of the buttons, icons ,... are chosen as it seems common in
the eyes of the developer team, but inside the application these objects are consistent with
their design and functionalities.
b. Separate design modules are thought to be made to be reused in different screens in order to
keep consistency in the design between different screens and activities. If there is a button
with specific functionality used multiple times in several screens, We make sure to use the
same interface (button , icon, style, ...). Furthermore, We consider to divide the interface
into smaller fragments in order to reuse / update / debug easier. Using similar interface
fragment of the presentation of the data (in here movie in formation / poster / trailer / lists
...) helps users to experience a familiar interface even using new features.
c. The development team evaluated the design mostly based on their own observations on
the design of likelihood applications offering similar and in some cases different services.
Although some friends / families are considered to be asked to use and test different features
and be evaluated by the development team later on. Based on what we received as feedback
by showing some of our prototype design on Figma for family / friends, the design seems to
be reliable if the real UI is as good as it is showing on the design phase.
d. Using Figma as a platform to make our wireframes of User Interface Design helped us to
visualize and test different prototypes for design easily and fast.
