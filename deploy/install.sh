#!/bin/bash
# NEW INSTALL SCRIPT NOT YET TESTED ON FRESH INSTALL

CBATMO_DIR=cbatmo
ENV_FILE=".env"

echo "CBATMO DEPLOY SCRIPT for Raspberry Pi OS Lite"
echo "By Gulivert aka Cédric Bapst"
echo "https://github.com/Gulivertx/cbatmo"
echo "!!! Please read the readme first in github page !!!"
echo "!!! THIS SCRIPT ONLY WORKS WITH Raspberry Pi OS Lite !!!"
echo "______________________________________________________"

# Set some information
NAME=cbatmo
VERSION="$(sed -n '3p' < package.json | sed -e 's/^[[:space:]]*//' | cut -d'"' -f 4)"

CreateCbatmoEnvFile()
{
  sleep 3

  echo ""
  echo "Create a new ${ENV_FILE} file, please follow and answer each question."

  touch ${ENV_FILE}

  echo "APP_ENV=prod" >> $ENV_FILE
  read -p "Please specify your APP secret key: " APP_SECRET
  echo "APP_SECRET=${APP_SECRET}" >> $ENV_FILE
  read -p "Please specify your OpenWeather API key: " OPENWEATHER_API_KEY
  echo "OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}" >> $ENV_FILE
  read -p "Please specify your Netatmo client id: " NETATMO_CLIENT_ID
  echo "NETATMO_CLIENT_ID=${NETATMO_CLIENT_ID}" >> $ENV_FILE
  read -p "Please specify your Netatmo client secret: " NETATMO_CLIENT_SECRET
  echo "NETATMO_CLIENT_SECRET=${NETATMO_CLIENT_SECRET}" >> $ENV_FILE

  echo "${ENV_FILE} created."
}

InstallCbatmoPackagesDependencies()
{
  ### Verify if node/npm/yarn are installed
  if ! [[ -x "$(command -v node)" ]]; then
      sleep 3
      echo "Node is not installed, install will automatically start"
      echo "NodeJS LTS will be installed via NVM script"

      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

      # Verify if nvm is correctly installed
      if ! [[ -x "$(command -v nvm)" ]]; then
        echo "Ouch nvm is no correctly installed, please check the official documentation, aborted !"
        echo "https://github.com/nvm-sh/nvm#installing-and-updating"
        exit 1
      fi

      # Install Node LTS
      nvm install --lts

      sleep 3
      echo ""
      echo "Verify if node and npm are correctly installed"
      if ! [[ -x "$(command -v node)" ]]; then
        echo "Ouch node is no correctly installed, please check the official documentation, aborted !"
        echo "https://github.com/nvm-sh/nvm#installing-and-updating"
        exit 1
      fi
      if ! [[ -x "$(command -v npm)" ]]; then
        echo "Ouch npm is no correctly installed, please check the official documentation, aborted !"
        echo "https://github.com/nvm-sh/nvm#installing-and-updating"
        exit 1
      fi

      echo ""
      echo "Installed yarn package manager"
      npm install -g yarn

      echo ""
      echo "CBatmo packages dependencies are now installed with success."
  fi
}

# Configure Debian and Install Debian RPI needed packages
ConfigureAndInstallDebianDep()
{
  # Configure Linux kernel options
  echo ""
  echo "Configure kernel options"
  sudo echo '
    lcd_rotate=2
    gpu_mem=256
  '>> /boot/config.txt

  # Move to Debian testing and upgrade
  echo ""
  echo "Shift Debian stable to Debian testing and upgrade"

  sleep 3

  echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
  sudo sed -i 's/buster/testing/' /etc/apt/sources.list

  sleep 2

  sudo apt-get update -yqq && sudo apt-get dist-upgrade -yqq
  sudo apt autoremove

  # Install needed Debian packages
  echo ""
  echo "Install window manager and webkit-gtk"
  sleep 3
  sudo apt-get install -yqq weston git ntp gjs gnome-themes-standard libwebkit2gtk-4.0-37 libwebkit2gtk-4.0-37-gtk2 libwebkit2gtk-4.0-dev

  # Set timezone
  sleep 3
  echo ""
  echo "Set timezone to Europe/Zurich"
  echo "If you need to choose another timezone run the command by change Europe/Zurich:"
  echo "sudo timedatectl set-timezone Europe/Zurich"
  echo ""
  echo "To get the list of available timezone run : timedatectl list-timezone"
  sudo timedatectl set-timezone Europe/Zurich

  # Enable and start ssh
  sleep 3
  echo ""
  echo "Enable some serives as ssh and ntp"
  sudo systemctl enable ssh
  sudo systemctl start ssh

  # Enable and start ntp
  sudo systemctl enable ntp
  sudo systemctl start ntp

  # Change hostname
  sleep 3
  echo ""
  echo "Set hostname"
  sudo hostnamectl set-hostname cbatmo
  sudo sed -i 's/raspberrypi/cbatmo/' /etc/hosts

  # Add pi user to launch weston from command-line
  sudo usermod -a -G weston-launch pi
}

PrepareCbatmo()
{
  # Install cbatmo npm package dependencies
  sleep 3
  echo ""
  echo "Install CBatmo npm packages dependencies"
  yarn install --production

  sleep 3
  echo ""
  echo "Prepare RPI for auto login and start cbatmo WEB server"
  sudo cp deploy/systemd/override.conf /etc/systemd/system/getty@tty1.service.d/override.conf
  sudo systemctl enable getty@tty1

  sudo cp deploy/systemd/cbatmo.service /etc/systemd/system/
  sudo systemctl enable cbatmo.service
  sudo systemctl restart cbatmo.service

  sleep 3
  echo ""
  echo "Configure Weston window manager"
  mkdir -p ~/.config
  cp deploy/weston/weston.ini ~/.config/weston.ini

  #echo ""
  #echo "Configure Weston and CBatmo auto-start"
  #cp deploy/.bash_profile ~/.bash_profile THIS NOT WORK ANYMORE FROM LAST DEBIAN VERSION. TODO INVESTIGATE
  # TEMPORARY LAUNCH WESTON FROM PROFILE
  echo '
    if [[ ! $DISPLAY && $XDG_VTNR -eq 1 ]]; then
      exec weston-launch
    fi
  ' >> ~/.profile
}

# Verify if cbatmo folder exist
if [ -d "${CBATMO_DIR}" ]; then
  echo "${CBATMO_DIR} already exist, update the current installation !"

  sleep 3

  # Move to cbatmo folder
  cd $CBATMO_DIR

  # Update the repository
  git pull

  # Install new yarn dependencies
  yarn install --production

  # Restart CBatmo server
  sudo systemctl restart cbatmo.service

  # Restart RPI
  sudo reboot

  exit 1
else
  echo "${CBATMO_DIR} does not exist, start a new installation !"

  sleep 3

  # Install Debian dependencies
  ConfigureAndInstallDebianDep

  # Clone the repository
  echo "Clone CBatmo repository"
  git clone https://github.com/Gulivertx/cbatmo.git $CBATMO_DIR

  # Move to cbatmo folder
  cd $CBATMO_DIR

  CreateCbatmoEnvFile
  InstallCbatmoPackagesDependencies
  PrepareCbatmo

  sleep 3

  sudo reboot
fi
