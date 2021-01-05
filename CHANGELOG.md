# Changelog

All notable changes to this project will be documented in this file.

## [2.3.6] - 2021-01-04
### Added
- Add colors for status icons

### Changed
- Replace status icons
- Bug corrections to show the correct icon according to the status (battery, wifi, radio)
- Remove Netatmo modules icons
- Fix issue #46 and #55

## [2.3.5] - 2020-12-22
### Added
- Create new types folder to centralize types for typescript

### Changed
- Minor fixes
- Bump Webpack to 5.x + fix webpack config
- Bump React to 17.x
- Upgrade all other NPM packages to their last version

## [2.3.4] - 2020-08-23
### Added
- Add status icons
- Add ability to choose which inside module to show from a dropdown menu when there is more than one

### Changed
- Fix issue #30


## [2.3.3] - 2020-07-03
### Changed
- Fix issues #26 #41
- The issue 26 where the rain graph make the screen shaking was not finally fix by the version 2.3.2, this new commit should definitively fix this damn issue.

## [2.3.2] - 2020-06-01
### Changed
- Fix issues #31 #38 #35 #33 #32 #26
- You can now install cbatmo directly from raspberry pi without any build process from another computer as the build is now commit in github!

## [2.3.1] - 2020-05-30
### Changed
- Improve mobile portrait layout
- Bug fix, rain graph, fullscreen layout for Raspberry touch screen

## [2.3.0] - 2020-05-08
### Added
- Added German language (thanks to [marcol43](https://github.com/marcol123) for the [pull request](https://github.com/Gulivertx/cbatmo/pull/20))
- Added support for all indoor modules in Redux store
- Added a mobile layout

### Changed
- Improve OpenWeather icons
- Fix bugs to show correct units and convert data for graphics according to the user units

## [2.2.x] - 2020-04-30
### Changed
- Replace Darksky API by OpenWeather API
- Add i18n translation support for French and English languages

## [2.1.x] - 2019-12-30
### Changed
- Move javascript code to typescript
- New webpack configuration which is more easy to handle because using the same commands in Windows / MacOS / Linux (no manual OS variable to set anymore)
- Changelog inconsistency section in Bad Practices

### Removed
- Remove virtual-keyboard
