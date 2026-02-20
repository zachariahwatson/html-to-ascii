```
    __    __            __      __                              _ _
   / /_  / /_____ ___  / /     / /_____        ____ ___________(_|_)
  / __ \/ __/ __ `__ \/ /_____/ __/ __ \______/ __ `/ ___/ ___/ / /
 / / / / /_/ / / / / / /_____/ /_/ /_/ /_____/ /_/ (__  ) /__/ / /
/_/ /_/\__/_/ /_/ /_/_/      \__/\____/      \__,_/____/\___/_/_/

```

html-to-ascii is a React component that dynamically converts an HTML page into pure, selectable, ASCII text. None of that fake Canvas trickery here!

[[Changelog](https://github.com/zachariahwatson/html-to-ascii/blob/main/CHANGELOG.md)]

## Installation

```sh
npm i html-to-ascii
```

Add `<ASCIIProvider>` to the root of your project:

```jsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ASCIIProvider } from "html-to-ascii"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ASCIIProvider>
			<App />
		</ASCIIProvider>
	</StrictMode>,
)
```

## Usage

### Quick Start

Wrap your page with `<ASCII>` and add the `ascii` class to any element you want to render:

```jsx
import { ASCII } from "html-to-ascii"

function App() {
	return (
		<ASCII>
			<div className="flex justify-center"> <!---I'm not ASCII :(-->
				<div className="text-center w-64 h-24 ascii">Look at me! I'm ASCII!</div>
			</div>
		</ASCII>
	)
}

export default App
```

Output

```
        ┌─────────────────────────┐
        │  Look at me! I'm ASCII! │
        │                         │
        │                         │
        │                         │
        │                         │
        └─────────────────────────┘
```

### Customization

html-to-ascii supports three interchangeable methods for customizing the look of your boxes:

#### 1. Adding props to `<ASCIIProvider>`:

This method changes the global style for every element unless locally overridden.
_(A full list of options can be seen [here](#asciiprovider))_

```html
<!--set the left and right borders to ":"-->
<ASCIIProvider l=":" r=":"></ASCIIProvider>
```

Output

```
        ┌─────────────────────────┐
        :  Look at me! I'm ASCII! :
        :                         :
        :                         :
        :                         :
        :                         :
        └─────────────────────────┘
```

#### 2. Using class names on elements inside of `<ASCII>` to enable certain ASCII features:

_(A full list of class names can be seen [here](#ascii))_

```jsx
<ASCII>
  <div className="flex justify-center">
          <!--enable only the border-->
    <div className="text-center w-64 h-24 ascii-border">
            Hey! Where'd the text go?
            <!--enable only text and the top right and bottom left corners-->
            <div className="ascii-text ascii-border-tr ascii-border-bl w-full h-12">Right here!</div>
          </div>
  </div>
</ASCII>
```

Output

```
        ┌─────────────────────────┐
        │                        ┐│
        │                         │
        │       Right here!       │
        │└                        │
        │                         │
        └─────────────────────────┘
```

#### 3. Using class names on elements inside of `<ASCII>` to override global styles:

This method allows you to add local styling to a single element without changing the styles of other elements. _(A full list of override class names can be seen [here](#ascii))_

```jsx
<ASCII>
  <div className="flex justify-center">
    <div className="text-center w-96 h-32 p-4 ascii">
      I look so cool! B)
      <br />
      <br />
                <!--override border styles-->
      <div className="ascii ascii-l-║ ascii-r-║ ascii-t-═ ascii-b-═ ascii-tl-╔ ascii-tr-╗ ascii-br-╝ ascii-bl-╚ w-full h-12">
        {"I look even *cooler* >B)"}
      </div>
    </div>
  </div>
</ASCII>
```

Output

```
 ┌───────────────────────────────────────┐
 │                                       │
 │           I look so cool! B)          │
 │ ╔═══════════════════════════════════╗ │
 │ ║      I look even *cooler* >B)     ║ │
 │ ║                                   ║ │
 │ ╚═══════════════════════════════════╝ │
 │                                       │
 └───────────────────────────────────────┘
```

### Preserving Strings and ASCII Art

ASCII art can contain some weird character combinations, and sometimes that messes with the renderer (especially "\\" and "(" ). We don't want to escape any characters upon render because it would mess with the grid array length and such, so we can "sterilize" certain texts by using `String.raw` and `white-space: pre`:

```jsx
<ASCII>
  <div className="flex justify-center">
    <div className="w-[1000px] h-72 border text-center ascii whitespace-pre">
    {String.raw`
 _____     _  ______         _       ______     ______  _____  _____
|_   _|   / // ____ `.      / \    .' ____ \  .' ___  ||_   _||_   _|
  | |    / / `'  __) |     / _ \   | (___ \_|/ .'   \_|  | |    | |
  | |   < <  _  |__ '.    / ___ \   _.____`. | |         | |    | |
 _| |_   \ \| \____) |  _/ /   \ \_| \____) |\ `.___.'\ _| |_  _| |_
|_____|   \_\\______.' |____| |____|\______.' `.____ .'|_____||_____|

  `}
  </div>
</ASCII>
```

## API

## `<ASCIIProvider>`

### Props:

| Prop   | Type      | Default | Description           |
| ------ | --------- | ------- | --------------------- |
| `t`    | `string?` | `'─'`   | Top border            |
| `ti`   | `string?` | `'┴'`   | Top intersection      |
| `b`    | `string?` | `'─'`   | Bottom border         |
| `bi`   | `string?` | `'┬'`   | Bottom intersection   |
| `l`    | `string?` | `'│'`   | Left border           |
| `li`   | `string?` | `'┤'`   | Left intersection     |
| `r`    | `string?` | `'│'`   | Right border          |
| `ri`   | `string?` | `'├'`   | Right intersection    |
| `tl`   | `string?` | `'┌'`   | Top-left corner       |
| `tr`   | `string?` | `'┐'`   | Top-right corner      |
| `br`   | `string?` | `'┘'`   | Bottom-right corner   |
| `bl`   | `string?` | `'└'`   | Bottom-left corner    |
| `i`    | `string?` | `'┼'`   | Four-way intersection |
| `fill` | `string?` | `' '`   | Element fill          |

## `<ASCII>`

### Props:

| Prop             | Type       | Default | Description                                 |
| ---------------- | ---------- | ------- | ------------------------------------------- |
| `gridReveal`     | `boolean?` | `true`  | Toggle scan-style reveal of the grid        |
| `revealDuration` | `number?`  | `1000`  | Duration of the grid reveal in milliseconds |

### Class names:

| Class name        | Description                                 |
| ----------------- | ------------------------------------------- |
| `ascii`           | Enable all                                  |
| `ascii-border`    | Enable all borders                          |
| `ascii-border-l`  | Enable left border                          |
| `ascii-border-r`  | Enable right border                         |
| `ascii-border-t`  | Enable top border                           |
| `ascii-border-b`  | Enable bottom border                        |
| `ascii-border-tl` | Enable top-left corner                      |
| `ascii-border-tr` | Enable top-right corner                     |
| `ascii-border-br` | Enable bottom-right corner                  |
| `ascii-border-bl` | Enable bottom-left corner                   |
| `ascii-text`      | Enable text                                 |
| `ascii-no-fill`   | Disable element's fill (will be "see-thru") |

### Override class names:

Replace '#' with your desired character

| Class name     | Description           |
| -------------- | --------------------- |
| `ascii-t-#`    | Top border            |
| `ascii-ti-#`   | Top intersection      |
| `ascii-b-#`    | Bottom border         |
| `ascii-bi-#`   | Bottom intersection   |
| `ascii-l-#`    | Left border           |
| `ascii-li-#`   | Left intersection     |
| `ascii-r-#`    | Right border          |
| `ascii-ri-#`   | Right intersection    |
| `ascii-tl-#`   | Top-left corner       |
| `ascii-tr-#`   | Top-right corner      |
| `ascii-br-#`   | Bottom-right corner   |
| `ascii-bl-#`   | Bottom-left corner    |
| `ascii-i-#`    | Four-way intersection |
| `ascii-fill-#` | Element fill          |

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/html-to-ascii
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
