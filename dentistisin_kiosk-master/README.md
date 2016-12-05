# DINKA

The Dentist Is In Kiosk Application (DINKA) is the frontend client-facing component of the dentist video chat web solution. The application is developed using Meteor and javascript using a gulp build system.

Releasing the application boils down to 4 simple steps:
* Compiling Code for Distribution
* Updating the version of the package manifest
* Zipping the distribution folder
* Uploading the zipped folder to the chrome web store

## Compiling Code for Distribution

```
gulp scripts
```
This will composite all the scripts into the *gulp_dist* folder. It also compiles all of the i18n localizations as well into a javascript file.

## Versioning system
The version of the system is done by altering the *gulp_dist/manifest.json* file to change *version*. Versioning adheres to semver.

## Packaging Code for Distribution

```
zip -r dentistisin_VERSION.zip gulp_dist
```
This will zip all the necessary files for the chrome web extension. 

## Updating the chrome web extension
Updating the chrome web extension is very straight forward. Merely upload the zip file to the chrome web store dashboard replacing the existing version, not uploading a new version. *It's important to make sure that your manifest version number was incremented so chrome will validate your update to the clients appropriately.*
