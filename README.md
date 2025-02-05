
## Setup

## Make sure to install dependencies:
```
npm install
```

## Development Server
Start the development server on http://localhost:3000
```
npm run dev
```

## Generate files for deployment:
```
npm run generate
```

## Tauri app Deployment
Requires Rust installed. You can get it here: https://www.rust-lang.org/tools/install
```
npx tauri build
```
The binaries can be found at `src-tauri/target/release/`


