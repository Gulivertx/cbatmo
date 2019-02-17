# CBatmo
*A **Netatmo Weather Station** Web-APP for Raspberry Pi &amp; official Raspberry touchscreen.*

![screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_009.png)

![screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_010.png)

For my Netatmo Weather Station I was looking for a display information to have a quick look 
of the measures done by the station. I looked at the WEB to find something but finally did not 
find what I was really looking for. Then, I decided to use one of my Pi to develop a small touch 
application and finally share a part of my work.

This is a rewrite of a first version of my APP which included **Netatmo API, Google Calendar API, 
Swiss Weather forecast API and WebcamTravel API**. For this public 
release I removed Google Calendar API, WebcamTraval API and change Swiss Weather 
API by Dark Sky API. The first proposal can be found in the [Netatmo forum](https://forum.netatmo.com/viewtopic.php?f=5&t=14458)

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
This project is a Web APP write in Javascript with **ReactJS, Redux** for the frontend and **ExpressJS** 
for the backend.

The main focus of this app is :
* Must works well with a Raspberry Pi 3
* Optimized for a official Raspberry Pi touch monitor 7" (800x480)
* Design to use 5 Netatmo modules (MAIN, OUTDOOR, INDOOR, RAIN and WIND)

Currently the app support English and French languages and the configuration of the locale is taken by 
Netatmo settings. If you're station is in French you will have this app in French, for all other 
languages the fallback locale is English.

## How to try this APP
### Build for development (from a MacOS, Linux or Windows computer)
First you will need to have [NodeJS](https://nodejs.org/en/) installed and as an option [yarn](https://yarnpkg.com/en/) but this is not mandatory as NodeJS provide npm package manager.

From your computer, clone the repo, install node_modules dependencies, edit the api.json and 
start the dev-server. **Do not install and build the project from a Raspberry directly, you will get an error, 
node-sass dependence is not compatible ARM architecture then it is not possible to build the app from this.** You can build the app from MacOS, Linux or Windows without any problem, and then push the build to your Raspberry.

```bash
git clone https://github.com/Gulivertx/cbatmo.git
cd cbatmo
yarn # or npm install
```

Now edit the file located in `config/api.json` and fill your **Netatmo client ID**, **Netatmo 
client secret** and finally your **Dark Sky secret key**. If you do not have these, you have to
create login to [Netatmo developer](https://dev.netatmo.com) and [Dark Sky dev](https://darksky.net/dev) 
(All are free).

Finally build and start the application `yarn run dev:start # or npm run dev:start`

Now you should be able to reach the application from your favorite browser http://localhost:3000. 
If you want the correct size of display, from Chrome for instance, open the chrome-dev-tools, 
set the display to **responsive** and choose a resolution of **800x480**.

### Build for production (from a MacoS, Linux or Windows computer)
The steps is the same development build just some the command to build change, but here is the whole steps.

```bash
git clone https://github.com/Gulivertx/cbatmo.git
cd cbatmo
yarn # or npm install
./deploy.sh
```

The script **deploy.sh** will create an archive cbatmo-%current_version%.tar.gz (ex.: cbatmo-2.0.0.tar.gz) in the upper directory of the project. Copy this archive to your raspberry with ssh.

```bash
cd ..
sftp username@ip_address_of_your_pi
enter your passowrd
put cbatmo-%current_version%.tar.gz
exit
ssh username@ip_address_of_your_pi
enter your passowrd
tar xvzf cbatmo-%current_version%.tar.gz
cd cbatmo
yarn install --production # or npm install --production
yarn start # or npm start
```

From now you should able to reach from your computer web-browser the ip address with port 3000 of your raspberry ex.: http://10.0.0.10:3000

## What about using my Raspberry Pi as Kiosk mod ?
I will explain in a wiki page how to deploy this app on your Pi and how to install your 
Raspberry to start as Kiosk mod. Will come soon...
