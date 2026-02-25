# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

...crickets...

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
