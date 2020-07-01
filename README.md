# CBatmo
*A **Netatmo Weather Station** Web-APP for Raspberry Pi &amp; official Raspberry touchscreen.*

![screenshot](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/screenshot_011.png)

For my Netatmo Weather Station I was looking for a display information to have a quick look 
of the measures done by the station. I looked at the WEB to find something but finally did not 
find what I was really looking for. Then, I decided to use one of my Pi to develop a small touch 
application and finally share a part of my work.

This is a rewrite of a first version of my APP which included **Netatmo API, Google Calendar API, 
Swiss Weather forecast API and WebcamTravel API**. For this public 
release I removed Google Calendar API, WebcamTraval API and change Swiss Weather 
API by Dark Sky API. The first proposal can be found in the [Netatmo forum](https://forum.netatmo.com/viewtopic.php?f=5&t=14458)

### Change in 2.3.x
#### 2.3.2
* Fix issues #31 #38 #35 #33 #32 #26
* You can now install cbatmo directly from raspberry pi without any build process from another computer as the build is now commit in github! A new install.sh script is on the way and will be soon available

#### 2.3.1
* Improve mobile portrait layout
* Bug fix, rain graph, fullscreen layout for Raspberry touch screen

#### 2.3.0
* Added German language (thanks to [marcol43](https://github.com/marcol123) for the [pull request](https://github.com/Gulivertx/cbatmo/pull/20))
* Added support for all indoor modules and not only one
* Improve OpenWeather icons
* Fix bugs to show correct units and convert data for graphics according to the units

**I also make a big change to support mobile devices!** What does that means?
Cbatmo can be reach from your mobile and will have an adapted (more and less) UI for landscape and portrait orientation. You
can pin to your dashboard the app and it will work as PWA (currently no service worker implemented). To use CBatmo outside
your home, you have to configure port forwarding in your router. I also had to modify how we connect to the app to add
a login page where you have to fill your Netatmo credential and a secret key that only you know and have to be configured in .env file.

I'm developping this UI adaptation only on an iPhone XR and 7 plus then any feedback from user using other phones will be
great or even better, pull request with fix for other devices.

Here is a preview on an iPhone XR

[screenshot mobile 1](https://raw.githubusercontent.com/Gulivertx/cbatmo/2.3.x/screenshots/cbatmo_mobile_003.png)
[screenshot mobile 2](https://raw.githubusercontent.com/Gulivertx/cbatmo/2.3.x/screenshots/cbatmo_mobile_001.png)
[screenshot mobile 3](https://raw.githubusercontent.com/Gulivertx/cbatmo/2.3.x/screenshots/cbatmo_mobile_002.png)


### Change in 2.2.x
The version 2.2.0 introduce OpenWeather API in replacement of Darksky which is now part of Apple and close for new subsciption and will be closed for all users from the end of 2021. 
* Replace Darksky API by OpenWeather API
* Add i18n translation support for French and English languages

**For users which have used CBatmo with Darksky please do not forget to update the file `.env` after a `git pull` and fill the OpenWeather key**.

Currently the application support English and French language, if you would like to have this application in any other languages please 
provide me a new translated file based on [english  file](https://github.com/Gulivertx/cbatmo/blob/master/client/i18n/en/common.json).

### Change in 2.1.x
* Move javascript code to typescript
* New webpack configuration which is more easy to handle because using the same commands in Windows / MacOS / Linux (no manual OS variable to set anymore)
* New application design with only one unique view

If you still want to use the version 2.0.0 you can download it here : https://github.com/Gulivertx/cbatmo/releases

## Development
This project is a Web APP write in Javascript with **[ReactJS](https://reactjs.org/), [Redux](https://redux.js.org/)** for the frontend and **[ExpressJS](https://expressjs.com/)** for the backend.

The main focus of this app is :
* Must works well with a Raspberry Pi 3
* Optimized for a official Raspberry Pi touch monitor 7" (800x480)
* Design to use 5 Netatmo modules (MAIN, OUTDOOR, INDOOR, RAIN and WIND)

## How to try this APP
### Build for development - from a MacOS, Linux(not ARM) or Windows computer
First you will need to have [NodeJS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) installed in your main computer and then follow the next steps.

* Clone the repo
* Install yarn dependencies packages
* Create a new .env file with API keys
* Build and run the DEV server

#### Clone and install yarn dependencies
```bash
git clone https://github.com/Gulivertx/cbatmo.git
cd cbatmo
yarn
```

#### Create a new .env file
Copy the file `.env.dist` to `.env` in the root project folder. Edit the new file and fill your **Netatmo information** and **OpenWeather information**.
If you do not have these, you have to create new credentials to [Netatmo developer](https://dev.netatmo.com) and
[OpenWeather](https://openweathermap.org/). All are free.

#### Run the DEV server
To build the app and start the DEV server just use the command `yarn run watch`.
The DEV server will only start if in the file `.env` the variable **APP_ENV** is set to **dev**.

If everything works fine you should be able to reach the application from your favorite browser http://localhost:3000. 
To have the correct display size you must change your browser to handle a resolution of 800x480.
In Chrome you have to open the chrome-dev-tools, set the display to **responsive** and choose a resolution of **800x480**.

Now your can start to modify any files, webpack will rebuild automatically your changes, just refresh the web-browser to see you changes.
Enjoy !!!

### Build for production - from a MacOS, Linux(not ARM) or Windows computer
If the repo is not already cloned do th same steps as development.

#### Clone and install yarn dependencies
```bash
git clone https://github.com/Gulivertx/cbatmo.git
cd cbatmo
yarn
```

#### Create or edit the .env file
Copy the file `.env.dist` to `.env` if it is not already created and edit it by filling your **Netatmo information** and **Dark Sky information**.

**Change the first variable `APP_ENV=dev` to `APP_ENV=prod`.**

#### Deploy to the Raspberry Pi - Automatic deployment 
**If you work from a MacOS or Linux OS** you can use the script `deploy.sh` to auto build, auto deploy CBatmo to your Raspberry. To use this script you
need to configure your Raspberry Pi. Just be sure that the followings things are configured correctly in your Raspberry:

* SSH server running
* sudo configured and allow the user to run commands without any password

Edit the file `rpi/cbatmo.service` and change the **WorkingDirectory** where cbatmo will be installed (should by /user/YOUR_USERNAME/cbatmo).
In a Raspbian it should by **/user/pi/cbatmo**, in an ArchLinux it should be **/user/alarm/cbatmo**. Now modifiy the user and group of your
Raspberry user. For the Raspbian use **pi** as user and group. For Archlinux use **alarm** as user and group.

Now run the script :
````bash
cd rpi
./deploy.sh
````

![deploy](https://raw.githubusercontent.com/Gulivertx/cbatmo/master/screenshots/cbatmo_deploy.gif)

Follow the steps asked by the script and at the end you should have a working instance of CBatmo deployed to your Raspberry and running.

From your computer web-browser try to reach your Raspberry Pi by filling the ip address with port 3000 of your raspberry ex.: http://10.0.0.10:3000.

#### Deploy to the Raspberry Pi - Manual deployment
For Windows user there is no deploy script, then you have to follow these steps.

##### Build the app in prod mode
Be sure to set the variable **APP_ENV** to **prod** in the `.env` file. Then build the app:
```bash
yarn run build
```
At the end of the build process you will find new files in `public` folder and a new **index.ejs** in the folder `views`.

Edit the file `rpi/cbatmo.service` and change the **WorkingDirectory** where cbatmo will be installed (should by /user/YOUR_USERNAME/cbatmo).
In a Raspbian it should by **/user/pi/cbatmo**, in an ArchLinux it should be **/user/alarm/cbatmo**. Now modifiy the user and group of your
Raspberry user. For the Raspbian use **pi** as user and group. For Archlinux use **alarm** as user and group.

##### Create an archive
The best way to transfer the app to your Raspberry is to create an archive. Create for instance a ZIP file with 7Zip call `cbatmo.zip` and add the following contents inside:

* public
* rpi
* views
* .env
* package.json
* server.js
* yarn.lock

**Do not add the node_modules folder !!**. Clients, logs, and screenshots is not necessary to run the app on your Pi.

##### Transfer the archive cbatmo.zip to the Pi
To transfer the archive, you can just copy and paste it with an USB key, or if your are comfortable with ssh/sftp just use it.
Uncompress the archive in the Pi, you must be logged to your Pi inside a console or thru SSH:
```bash
cd WHERE_CBATMO.ZIP_IS
unzip cbatmo.zip
cd cbatmo
yarn install --production
sudo cp rpi/cbatmo.service /etc/systemd/system/
sudo systemctl enable cbatmo.service
sudo systemctl restart cbatmo.service
```

This steps install server dependencies, create a new cbatmo Systemd init script, launch this init script which will start automatically the web server in the Raspberry boot.
To verify if the server is running you can run this command `systemctl status cbatmo.service`. You must a get a result like this:

```bash
* cbatmo.service - CBatmo WEB server
     Loaded: loaded (/etc/systemd/system/cbatmo.service; enabled; vendor preset: disabled)
     Active: active (running) since Mon 2019-12-30 09:52:10 CET; 2s ago
   Main PID: 357 (node)
      Tasks: 18 (limit: 1150)
     Memory: 32.9M
     CGroup: /system.slice/cbatmo.service
             |-357 node /usr/bin/yarn start
             `-369 /usr/bin/node server.js

Dec 30 09:52:10 picbatmo systemd[1]: Started CBatmo WEB server.
Dec 30 09:52:11 picbatmo CBatmo[357]: yarn run v1.21.1
Dec 30 09:52:11 picbatmo CBatmo[357]: $ node server.js
Dec 30 09:52:12 picbatmo CBatmo[369]: Server running on http://localhost:3000 as production
```

From your computer web-browser try to reach your Raspberry Pi by filling the ip address with port 3000 of your raspberry ex.: http://10.0.0.10:3000.
