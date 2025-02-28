# Skyline - Mental Model Generator

## Web application

You can find the official deployment with GitHub Pages
in https://katasc22.github.io/iaweb24-mmd-generator/

## Standalone application

Skyline is available for both Windows and Linux platforms. Check the latest
binaries [here](https://github.com/katasc22/iaweb24-mmd-generator/releases/latest).

## Building on your own

### Make sure to install dependencies:

```sh
npm install
```

### Development server

Start the development server on http://localhost:3000

```sh
npm run dev
```

### Generate files for deployment:

```sh
npm run generate
```

Optional arguments:

- `basePath`: the base path where the application will be deployed. For example:

```sh
npm run generate --basePath='/skyline/'
```

### Building the standalone application:

Requires [Rust](https://www.rust-lang.org/tools/install) installed and the application generated as
explained above.

```sh
npx tauri build
```

The binaries can be found at `src-tauri/target/release/`.


