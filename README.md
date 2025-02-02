
## Setup

## Make sure to install dependencies:
```
npm install
```
## Development Server
## Start the development server on [http://localhost:3000/iaweb24-mmd-generator/]
## Run development
```
npm run dev
```
## Generate files for deployment:
```
npm run generate
```
## Deploy via github pages:
```
npm run deploy
```
## Tauri app Deployment
Requires Rust installed. You can get it here: https://www.rust-lang.org/tools/install
## Step 1: Change Nuxt Configuration
For the tauti build, change (or uncomment) in nuxt.config the app baseURL
from `'/iaweb24-mmd-generator/'` to `'./'.` 

## Step 2: Initialize Tauri
```
npx tauri init
```
 - Set the name of the app to "skyline" (for example)
 - Set the name of the window 
 - Set the path to `../dist/public`
 - Let the rest as the default

## Step 4: Change Identifier
Change the identifier 'name' in src-tauri/tauri.conf.json as something else, such as `com.skyline.dev`

## Step 5: Build Tauri
```
npx tauri build
```
## Step 6: Run the application
it is on `src-tauri/target/release/app.exe`


