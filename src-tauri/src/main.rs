// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::thread;

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            // Start the Nuxt server in a new thread
            thread::spawn(|| {
                let nuxt_server = Command::new("node")
                    .arg("../.output/server/index.mjs") // Path to your Nuxt server
                    .spawn();
                
                match nuxt_server {
                    Ok(_) => println!("Nuxt server started successfully."),
                    Err(err) => eprintln!("Failed to start Nuxt server: {}", err),
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}