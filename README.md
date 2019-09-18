# HealthyHorizonsApp

This is an EPICS project for Healthy Horizons at Butler University. The purpose of the Healthy Horizons program is to promote healthful living by providing a comprehensive wellness package to Butler faculty. This website is built to substitute a paper form with a technological solution, in the hopes that the website can provide more for the users of Healthy Horizons than paper submissions ever could.

## Wiki

For technical details, visit the [wiki](https://github.com/rutrum/healthy-horizons/wiki).  It will share details about languages used, how the project is structured, and how the client-server model works in web development.

## Technologies and File Structure

This is a node.js website using the express framework.  Files related to serving the website are located in the root directory.  HTML files are in the root of the `src` directory.  Scripts and stylesheets are in the `src/script` and `src/style` directories respectively.  All other website data is stored in `src/resources`.

## How to Start Server

Clone the repository, and be sure to install node package manager (npm) on your machine.

Run `npm i` in the project folder.  This will install all the project dependencies.  Then run `node app.js` to start the server.

Additionally, you can install `nodemon` which will allow the server to auto refresh the page on saved changes.  To do this, install it using `npm i nodemon -g` and then run the server using `nodemon app.js`.