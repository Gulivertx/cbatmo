# CBatmo
*A **Netatmo Weather Station** Web-APP for Raspberry Pi &amp; official Raspberry touchscreen.*

![screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/2.1.x/screenshots/screenshot_011.png)

For my Netatmo Weather Station I was looking for a display information to have a quick look 
of the measures done by the station. I looked at the WEB to find something but finally did not 
find what I was really looking for. Then, I decided to use one of my Pi to develop a small touch 
application and finally share a part of my work.

This is a rewrite of a first version of my APP which included **Netatmo API, Google Calendar API, 
Swiss Weather forecast API and WebcamTravel API**. For this public 
release I removed Google Calendar API, WebcamTraval API and change Swiss Weather 
API by Dark Sky API. The first proposal can be found in the [Netatmo forum](https://forum.netatmo.com/viewtopic.php?f=5&t=14458)

### What's new in 2.1.x ?
**The version 2.1.0 is currently in hard development. I'm trying my best to release this new version in the end of my holidays (6 of January 2020).**

* Move javascript code to typescript
* New webpack configuration which is more easy to handle and would be the same commands in Windows / MacOS / Linux
* New application design with only one unique view (I also try to have an adaptable layout for different users configuration of modules abailable)

If you want to try this version, or maybe help me to develop it, you can try it by following the updated information [bellow](https://github.com/Gulivertx/cbatmo/tree/2.1.x#how-to-try-this-app)

### What's new in 2.0.0 ?
* New Redux reducer / actions for a better store and more comprehensive code
* New Data Transfert Object (DTO) to manage data received from Netatmo and Darksky API
* Recognizing dynamically which Netatmo modules are connected to the station
* Give an UI feedback if a module is unavailable (See this [screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_008.png) or [this one](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_006.png))
* Bind Netatmo user configuration for unit and lang to Darksky API and UI
* General performance improvements to have better control of React component mount when data did not change
* Few crashes fix to keep the app alive without the message "Something went wrong" and obligation to reload the all app!!!
* New Charts to display the last 12 hours of data
* Charts can now be change to see data for other measure (click the value of which you want to see the chart)

***The design of the frontend is still not adapted to be responsive and would be done in a next release. Because this, if you want to use another screen resolution or do not have the same module as mine (MAIN, OUTDOOR, INDOOR, RAIN and WIND) you will get mess and have to adapt the CSS code to match with your screen.***

## Development
This project is a Web APP write in Javascript with **[ReactJS](https://reactjs.org/), [Redux](https://redux.js.org/)** for the frontend and **[ExpressJS](https://expressjs.com/)** for the backend.

The main focus of this app is :
* Must works well with a Raspberry Pi 3
* Optimized for a official Raspberry Pi touch monitor 7" (800x480)
* Design to use 5 Netatmo modules (MAIN, OUTDOOR, INDOOR, RAIN and WIND)

Currently the app support English and French languages and the configuration of the locale is taken by 
Netatmo settings. If you're station is in French you will have this app in French, for all other 
languages the fallback locale is English.

## How to try this APP
### Build for development (from a MacOS, Linux or Windows computer)
First you will need to have [NodeJS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) installed in your main computer.

Here are the steps to start:
* Clone the repo
* Install dependencies
* Start the DEV server

```bash
git clone -b 2.1.x https://github.com/Gulivertx/cbatmo.git
cd cbatmo
yarn
```

Now copy the file `.env.dist` to `.env` and edit it by filling your **Netatmo information** and **Dark Sky information**.
If you do not have these, you have to create new credentials to [Netatmo developer](https://dev.netatmo.com) and
[Dark Sky dev](https://darksky.net/dev). All are free.

Finally build and start the application with the command `yarn run watch`.

If everything works fine you should be able to reach the application from your favorite browser http://localhost:3000. 
To have the correct display size you must change your browser to handle a resolution of 800x480.
In Chrome you have to open the chrome-dev-tools, set the display to **responsive** and choose a resolution of **800x480**.

Now your can start to modify any files, webpack will rebuild automatically your changes, just refresh the web-browser to see you changes.
Enjoy !!!

### Build for production (from a MacOS, Linux or Windows computer)
The steps is more and less the same as the development build just some commands changes.

If the repo is not already cloned do th same steps as development.
```bash
git clone -b 2.1.x https://github.com/Gulivertx/cbatmo.git
cd cbatmo
yarn
```

Copy the file `.env.dist` to `.env` and edit it by filling your **Netatmo information** and **Dark Sky information**.

**Now edit the `.env` file and change the first variable `APP_ENV=dev` to `APP_ENV=prod`.**

If you work from a MacOS or Linux OS you can use the script deploy.sh to auto build, auto deploy CBatmo to your Raspberry. To use this script you
need to configure your Raspberry Pi. Just be sure that the followings things are configured corretly:

* SSH server running
* sudo configured and allow the user to run admin commands without any password

Edit the file `rpi/cbatmo.service` and change the **WorkingDirectory** where cbatmo will be installed (should by /user/YOUR_USERNAME/cbatmo).
In a Raspbian it should by **/user/pi/cbatmo**, in an ArchLinux it should be **/user/alarm/cbatmo**. Now modifiy the user and group of your
Raspberry user. For the Raspbian User should be pi and group pi as well. For an Archlinux this for both alarm.

Now run the script :
````bash
cd rpi
./deploy.sh
````

From now you should be able to reach from your computer web-browser the ip address with port 3000 of your raspberry ex.: http://10.0.0.10:3000.
