# Skyline - Mental Model Generator

## Web application
You can find the official deployment with GitHub Pages in https://katasc22.github.io/iaweb24-mmd-generator/

## Standalone application
Skyline is available for both Windows and Linux platforms. Check the latest binaries [here](https://github.com/katasc22/iaweb24-mmd-generator/releases/latest).

## Building on your own

### Make sure to install dependencies:
```
npm install
```

### Development server
Start the development server on http://localhost:3000
```
npm run dev
```

### Generate files for deployment:
```
npm run generate
```

### Building the standalone application:
Requires Rust installed. You can get it here: https://www.rust-lang.org/tools/install
```
npx tauri build
```
The binaries can be found at `src-tauri/target/release/`


