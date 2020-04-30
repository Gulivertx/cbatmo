#!/bin/bash
# An automatic installer script for CBATMO
# This script works on MacOS and Linux

# Move in the project root directory
cd ..

NAME=cbatmo
VERSION="$(sed -n '3p' < package.json | sed -e 's/^[[:space:]]*//' | cut -d'"' -f 4)"
TAR_NAME="$NAME-$VERSION.tar.gz"
DIRECTOY_NAME="${PWD##*/}"

echo "CBATMO DEPLOY SCRIPT"
echo "CBATMO VERSION ${VERSION}"
echo "______________________________________________________"

# Verify if .env file exist
ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
  echo ""
  echo "${ENV_FILE} file does not exist!"

  while true; do
    read -p "Do you want to create a new one? " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit 0;;
        * ) echo "Please answer yes or no";;
    esac
  done

  touch .env
  echo "APP_ENV=prod" >> $ENV_FILE
  #read -p "Please specify your Darksky secret key: " DARKSKY_SECRET_KEY
  #echo "DARKSKY_SECRET_KEY=${DARKSKY_SECRET_KEY}" >> $ENV_FILE
  read -p "Please specify your OpenWeather API key: " OPENWEATHER_API_KEY
  echo "OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}" >> $ENV_FILE
  read -p "Please specify your Netatmo client id: " NETATMO_CLIENT_ID
  echo "NETATMO_CLIENT_ID=${NETATMO_CLIENT_ID}" >> $ENV_FILE
  read -p "Please specify your Netatmo client secret: " NETATMO_CLIENT_SECRET
  echo "NETATMO_CLIENT_SECRET=${NETATMO_CLIENT_SECRET}" >> $ENV_FILE
  read -p "Please specify your Netatmo username: " NETATMO_USERNAME
  echo "NETATMO_USERNAME=${NETATMO_USERNAME}" >> $ENV_FILE
  read -p "Please specify your Netatmo password: " NETATMO_PASSWORD
  echo "NETATMO_PASSWORD=${NETATMO_PASSWORD}" >> $ENV_FILE
fi

# build for production
echo ""
echo "Build cbatmo for production"
yarn run build

echo ""
echo "Start packaging version: ${VERSION}"

# Move in the parent directory
cd ..

# Generate the archive
tar czf ${TAR_NAME} \
  --exclude="${DIRECTOY_NAME}/client" \
  --exclude="${DIRECTOY_NAME}/logs" \
  --exclude="${DIRECTOY_NAME}/node_modules" \
  --exclude="${DIRECTOY_NAME}/screenshots" \
  --exclude="${DIRECTOY_NAME}/.git" \
  ${DIRECTOY_NAME}

echo "Generated archive with name $TAR_NAME"
echo ""

while true; do
    read -p "Do you want to upload this archive into your Raspberry Pi? " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit 0;;
        * ) echo "Please answer yes or no";;
    esac
done

while true; do
    read -p "Please specify your Raspberry Pi IP address: " RPI_IP
    case $RPI_IP in
        [1]* ) break;;
        * ) echo "Please specify a valid IP, e.g. 10.0.0.143";;
    esac
done

read -p "Please specify your Raspberry Pi username: " RPI_USER

echo "Upload $TAR_NAME on your Raspberry Pi ${RPI_IP}"
sftp $RPI_USER@$RPI_IP << SFTP_COMMANDS
  put $TAR_NAME
  quit
SFTP_COMMANDS

echo ""
while true; do
    read -p "Do you want to install cbatmo into your Raspberry Pi? " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit 0;;
        * ) echo "Please answer yes or no";;
    esac
done

echo "Install CBatmo on your Raspberry Pi ${RPI_IP}"
ssh $RPI_USER@$RPI_IP << SSH_COMMANDS
  rm -Rf cbatmo
  tar xzf $TAR_NAME
  cd cbatmo
  yarn install --production
  sudo cp rpi/cbatmo.service /etc/systemd/system/
  sudo systemctl enable cbatmo.service
  sudo systemctl restart cbatmo.service
  sleep 2
  systemctl status cbatmo.service
  exit
SSH_COMMANDS

exit 0;
