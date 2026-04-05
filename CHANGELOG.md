# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

...crickets...

## [0.9.3] - 2026-04-05

### Added

- fontColor and bgColor options

## [0.9.2] - 2026-03-30

### Added

- Default font from URL

### Changed

- Make character rendering more sequential and less dependent on position to combat cross-browser issues

## [0.9.1] - 2026-03-21

### Changed

- Instead of shipping with a default font file, require the user to define their own font to circumvent opentype.js troubles

## [0.9.0] - 2026-03-07

### Changed

- Calculate font metrics using opentype.js
- Grid now only reveals on mount, not resizes
- Use multiple observers and listeners instead of constantly polling for changes every frame
- Default font size is 18px to help mitigate cross-browser rounding issues

## [0.8.3] - 2026-03-03

### Fixed

- Font width was not the problem (see v0.8.2), just needed to add `whitespace-pre` to the container div

## [0.8.2] - 2026-03-02

### Fixed

- Used the wrong font width calculation which resulted in the grid breaking on certain characters that had different dimensions

## [0.8.1] - 2026-03-01

### Changed

- Use the font's actual bounding box instead of the em bounding box to calculate grid height

## [0.8.0] - 2026-03-01

### Added

- `ascii-parent` class for locking elements' movement to their parents
- `font`, `fontSize` and `fontWeight` options added to `<ASCIIProvider>`

### Changed

- `<ASCIIProvider>` now uses Canvas TextMetrics to calculate font width and height for the grid initialization

### Fixed

- Much less "wiggly-ness" or dancing borders when moving elements

### Removed

- Various redundant things

## [0.7.1] - 2026-02-26

### Added

- `ascii-underline` class for underlining text, was previously only available for `<a>` elements

### Removed

- Whitespace within text (messed with elements under the text)

## [0.7.0] - 2026-02-25

### Added

- Support for page scrolling

### Changed

- ASCII grid rows from `<p>`s to `<div>`s to get rid of newlines when selecting and copying the page

## [0.6.2] - 2026-02-24

### Changed

- Character rendering method - characters are rendered sequentially by index instead of by position

### Removed

- Ability to select the underlying HTML elements

## [0.6.1] - 2026-02-23

### Added

- Basic debug that allows you to see the actual DOM under the ASCII grid (you still have to add a border etc. to elements you want to see)
- More comments

### Changed

- Box intersections won't occur on sides that have a shadow
- Only underline alphabetic characters in `<a>` tags
- Use document client window w/h instead of window w/h in `useWindowDimensions()`

### Fixed

- A few shadow positioning mishaps

### Removed

- Redundant shadow options in GridOptions (tl, tr, br, bl)

## [0.6.0] - 2026-02-22

### Added

- Basic shadows
- Unicode underlines on `<a>` link text
- 'v' prefix to versions

### Changed

- Font to Cascadia Mono (for better unicode underline compatibility)

## [0.5.0] - 2026-02-19

### Added

- More border intersection rules (I think I got them all!)

### Changed

- Reveal grid based on duration, not cells per frame

### Fixed

- More grid inaccuracy when dragging or moving elements
- Fully refresh grid on window resize

## [0.4.1] - 2026-02-13

### Fixed

- Grid inaccuracy when dragging or moving elements

## [0.4.0] - 2026-02-12

### Added

- Added general image functionality

## [0.3.2] - 2026-02-12

### Added

- Fleshed out package.json for npm
- `<ASCII>` props in README.md
- LICENSE file
- TODO.md file

### Fixed

- Added correct linking in CHANGELOG.md

## [0.3.1] - 2026-02-12

### Removed

- Unused imports

## [0.3.0] - 2026-02-12

### Added

- Granular local class name options adjustment (e.g. className="ascii ascii-b-+" sets the bottom border to "+")
- ASCIIProvider props for customizing border, fill, corners, etc.
- Basic README.md

### Changed

- Rendering should be a tad bit faster

### Fixed

- Backslashes in ASCII art etc. would force a new line when rendering the grid, breaking anything rendered thereafter

## [0.2.4] - 2026-02-10

### Fixed

- Tailwind not working upon using components

## [0.2.3] - 2026-02-10

### Fixed

- index.js not found error (hopefully)

## [0.2.2] - 2026-02-10

### Changed

- Renamed /types file extensions to .d.ts

### Fixed

- Added missing ASCIIProvider export (oops)

## [0.2.1] - 2026-02-09

### Fixed

- Build stuff and stuff

## [0.2.0] - 2026-02-09

### Added

- Best practice component library packaging stuff

### Changed

- Moved components to /lib

## [0.1.0] - 2026-02-08

### Added

- Basic functionality
- ASCII box customization
- Basic position change monitoring

[0.9.3]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.9.2...v0.9.3
[0.9.2]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.8.3...v0.9.0
[0.8.3]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.6.2...v0.7.0
[0.6.2]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/zachariahwatson/html-to-ascii/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/zachariahwatson/html-to-ascii/compare/0.5.0...v0.6.0
[0.5.0]: https://github.com/zachariahwatson/html-to-ascii/compare/0.4.1...0.5.0
[0.4.1]: https://github.com/zachariahwatson/html-to-ascii/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/zachariahwatson/html-to-ascii/compare/0.3.2...0.4.0
[0.3.2]: https://github.com/zachariahwatson/html-to-ascii/compare/0.3.1...0.3.2
[0.3.1]: https://github.com/zachariahwatson/html-to-ascii/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/zachariahwatson/html-to-ascii/compare/0.2.4...0.3.0
[0.2.4]: https://github.com/zachariahwatson/html-to-ascii/compare/0.2.3...0.2.4
[0.2.3]: https://github.com/zachariahwatson/html-to-ascii/compare/0.2.2...0.2.3
[0.2.2]: https://github.com/zachariahwatson/html-to-ascii/compare/0.2.1...0.2.2
[0.2.1]: https://github.com/zachariahwatson/html-to-ascii/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/zachariahwatson/html-to-ascii/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.1.0
