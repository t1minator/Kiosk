
# The Dentist Is In

Consists of two projects
 - The dentistisin_web-master is the Server side (Dentist side) project and is written in Meteor.
    - The version it is written against is Meteor 1.1.0, as of this writing the current version is 1.4
    - The app runs as written locally however will not login using any usernames provided
 - The dentistisin_kiosk-master which is the client side in the kiosk. This was written as an app for the chrome store.


## To run dentistisin_web-master local :
* [Assuming linux]
Clone project: 
git clone https://github.com/thedentistisin/Kiosk.git

Install Meteor: 
```sh
$ curl https://install.meteor.com/ | sh
```
change directory:
```sh
$ cd Kiosk/dentistisin_web-master/src/ 
```
Run with settings: 
```sh
$ meteor --settings private/settings.json
```
