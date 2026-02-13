# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[0.3.2]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.3.2
[0.3.1]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.3.1
[0.3.0]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.3.0
[0.2.4]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.2.4
[0.2.3]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.2.3
[0.2.2]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.2.2
[0.2.1]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.2.1
[0.2.0]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.2.0
[0.1.0]: https://github.com/zachariahwatson/html-to-ascii/releases/tag/0.1.0
