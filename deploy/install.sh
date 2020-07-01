#!/bin/bash
# Install script not yet working, on my way

CBATMO_DIR=cbatmo
ENV_FILE=".env"

echo "CBATMO DEPLOY SCRIPT"
echo "By Gulivert aka Cédric Bapst"
echo "https://github.com/Gulivertx/cbatmo"
echo "!!! Please read the readme first in github page !!!"
echo "______________________________________________________"

# Verify if cbatmo folder exist
if [ -d "${CBATMO_DIR}" ]; then
  echo "${CBATMO_DIR} already exist, currently update is not supported, aborted !"
  # TODO
  exit 1
fi

# Clone the repository
git clone https://github.com/Gulivertx/cbatmo.git $CBATMO_DIR

# Move to cbatmo created folder
cd cbatmo

# Set some information
NAME=cbatmo
VERSION="$(sed -n '3p' < package.json | sed -e 's/^[[:space:]]*//' | cut -d'"' -f 4)"

CreateEnvFile()
{
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

# Install Debian RPI needed packages
InstallDebianDep()
{
  sudo apt update && sudo apt upgrade

  # TODO
}

InstallApplicationDependencies()
{
  ### Verify if node is installed
  if ! [[ -x "$(command -v node)" ]]; then
      echo "Node is not installed, install will automatically start"
      echo "NodeJS LTS will be installed via NVM script"

      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

      if ! [[ -x "$(command -v nvm)" ]]; then
        echo "Ouch nvm is no correctly installed, please check the official documentation, aborted !"
        echo "https://github.com/nvm-sh/nvm#installing-and-updating"
        exit 1
      fi

      # Install Node LTS
      nvm install --lts
  fi
}

InstallNodePackagesProductionDep()
{
  ### Verify if yarn is installed
  if ! [[ -x "$(command -v npm)" ]]; then
      echo "Error: npm is not installed"
      echo "Please verify your NodeJS and npm installation, aborted !"
      exit 1
  fi

  npm install --production
}

PrepareRpi()
{
  echo "Prepare RPI for auto login and start cbatmo WEB server"
  sudo cp deploy/systemd/override.conf /etc/systemd/system/getty@tty1.service.d/override.conf
  sudo cp deploy/systemd/cbatmo.service /etc/systemd/system/
  sudo systemctl enable getty@tty1
  sudo systemctl enable cbatmo.service
  sudo systemctl restart cbatmo.service
}

PrepareRpiAutoStart()
{

}
