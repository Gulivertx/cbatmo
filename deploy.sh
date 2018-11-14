#!/bin/bash
# TODO : this script is currently not complete

NAME=cbatmo
VERSION="$(sed -n '3p' < package.json | sed -e 's/^[[:space:]]*//' | cut -d'"' -f 4)"
TAR_NAME="$NAME-$VERSION.tar.gz"
DIRECTOY_NAME="${PWD##*/}"

echo "Start packaging version: ${VERSION}"

# Move in the parent directory
cd ..

# Generate the archive
tar czf ${TAR_NAME} --exclude="${DIRECTOY_NAME}/node_modules" --exclude="${DIRECTOY_NAME}/screenshots" --exclude="${DIRECTOY_NAME}/.git" ${DIRECTOY_NAME}

echo "Generated archive with name $TAR_NAME"
