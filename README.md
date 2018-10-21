# CBatmo
*A **Netatmo Weather Station** Web-APP for Raspberry Pi &amp; official Raspberry touchscreen.*

![screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_005.png)

![screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_004.png)

For my Netatmo Weather Station I was looking for a display information to have a quick look 
of the measures done by the station. I looked at the WEB to find something but finally did not 
find what I was really looking for. Then, I decided to use one of my Pi to develop a small touch 
application and finally share a part of my work.

This is a rewrite of my current APP which include **Netatmo API, Google Calendar API, 
Swiss Weather forecast API and WebcamTravel API**. For this public 
release I have removed Google Cal API, WebcamTraval API and change Swiss Weather 
API by Dark Sky API.

## Development
This project is a Web APP write in Javascript with **ReactJS, Redux** for the frontend and **ExpressJS** 
for the backend.

The main focus of this app is :
* Must works well with a Raspberry Pi 3
* Optimized for a official Raspberry Pi touch monitor 7" (800x480)
* Design to use 5 Netatmo modules (main, external, second internal, rain and wind)

The design of the frontend is not responsive, if you want to use another screen resolution you will 
certainly get mess and have to adapt the CSS code to match with your screen.

If you don't have the same modules as mine you will also get mess because currently there is not 
any intelligence to manage modules, means they are hard coded in the frontend (this part could be 
adapted in the future...).

Currently the app is only in English.

### Next development focus
* Add French language
* Add ability to choose Dark sky units (Netatmo units are define in your Netatmo account)
* Settings area to change language, units, latitude and longitude.

## How to try this APP
From your computer, clone the repo, install node_modules dependencies, edit the api.json and 
start the dev-server. Do not install and build from a Raspberry, you will get an error, 
node-sass dependence is not compatible ARM architecture then it is not possible to build 
the app from this.

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

## What about deploy to my Pi ?
I will explain in a wiki page how to deploy this app on your Pi and how to install your 
Raspberry to start as Kiosk mod. Will come soon...
