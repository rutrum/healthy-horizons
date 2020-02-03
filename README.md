# HealthyHorizonsApp

This is an EPICS project for Healthy Horizons at Butler University. The purpose of the Healthy Horizons program is to promote healthful living by providing a comprehensive wellness package to Butler faculty. This website is built to substitute a paper form with a technological solution, in the hopes that the website can provide more for the users of Healthy Horizons than paper submissions ever could.

## Wiki

For technical details, visit the [wiki](https://github.com/rutrum/healthy-horizons/wiki).  It will share details about languages used, how the project is structured, and how the client-server model works in web development.

## How to Get Started with Development

You should download (possibly) four things.
* [Git](https://git-scm.com/downloads) (to manage the files in this project)
* [VSCode](https://code.visualstudio.com/download) or your favorite text editor. Do not use Notepad++, please.
* [Node and NPM](https://nodejs.org/en/) (get the LTS version)
* A terminal to run certain commands.  If you are on MacOS or Linux, use the terminal provided to you.  On windows, I recommend [Cmder](https://cmder.net/)

You should also download the git repository that you are reading from now.  Go to a place you like to store things, and open a terminal from there.  Then type this in the terminal:
```
git clone https://github.com/rutrum/healthy-horizons.git
```
This will download the repository into a folder called `healthy-horizons`.

## How to Start Server

Run `npm i` in the project folder.  This will install all the project dependencies.  Then run `node server.js` to start the server.

Additionally, you can install `nodemon` which will allow the server to auto refresh the page on saved changes.  To do this, install it using `npm i nodemon -g` and then run the server using `nodemon server.js`.

## Running mySQL Server

Try following [this article](https://medium.com/@backslash112/start-a-remote-mysql-server-with-docker-quickly-9fdff22d23fd) to spin up one in a docker container.

Suggested container name: `myhealthysql`.