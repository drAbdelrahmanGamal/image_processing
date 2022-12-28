# Image Processing API

this is an image processing api that can use in multiple way:

1. image placeholder service.
2. image thumbs previewer.

## inistall

to install the project please run `npm i` or `npm install`

## usage

### build

to build the project run `npm run build`

### test

for testing run the following script `npm run test`
it will do the following:

- format the script (to format the script only use `npm run prettier`)
- build the project to javascript (to build only use `npm run build`).
- check the script for any errors (to check script only use `npm run eslint`)
- test the whole project

### run in development mode

to run project from typescript in developing mode run `npm run dev`

### start

to start the javascript project after building it run `npm run start`

> [**NOTE**: you should build before starting the javascript project]

## End points

valid endpoints to be tested
the server will run in port **3000**

- main endpoint: `localhost:3000/` this just saying hello world
- images endpoint: `localhost:3000/images` this is just an endpoint for future work if we can display all images here but now it just saying hello world from images route
- **resize api endpoint (most important endpoint)**: `localhost:3000/images/resize?i={image_name}&w={width}&h={height}`

  > don't forget to replace `image_name` and `width` and `height` in the api url

valid `image_name` = (01 || 02 || 03 || 04)
