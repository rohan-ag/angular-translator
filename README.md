# angular-translator README

A VS Code extension to internationalize hard-coded strings in html file and build up the en.json file for Angular Projects. 

## Features

Supported Features:

* Select the string to internationalize ,which adds translate pipe to it.
* Make the corresponding entry of the selected strinf in en.json file, with a maximum key lenght of 5 words. 
*Duplicate entry are not made.

![adds translate pipe](https://raw.githubusercontent.com/rohan-ag/angular-translator/master/images/gif1.gif)
![adds to en.json](https://raw.githubusercontent.com/rohan-ag/angular-translator/master/images/gif2.gif)


## Requirements

There should be an **i18n** folder inside the **src** folder with an **en.json** File.

This extension assumes that Angular Project should has the npm package [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core "@ngx-translate/core") installed.

## Known Issues

The extension will not work if the requirement specified above is not met. **It will not create a file automatically in case it is not found.**

## Release Notes

### 0.0.1

Initial release of Angular-Translator

The first release focused on providing a simple semi-automated solution to internationalize all hard coded strings in your angular app for English Language.

### 0.1.1
This release fixes the issue of duplicate object key in en.json file and converts the key to lowercase.


**Enjoy!**
