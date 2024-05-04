use actix_files as fs;
use actix_web::{web, App, HttpServer};
use std::env;
use yew_app::cfg::{FRONT_ROOT, WEBROOT};
use yew_app::controller::index::greet;

#[actix_web::main] // or #[tokio::main]
async fn main() -> std::io::Result<()> {
    let static_files_directory = match env::current_exe() {
        Ok(mut exe_path) => {
            exe_path.pop();
            exe_path.push("dist");
            exe_path
                .to_str()
                .expect("Failed to convert path to string")
                .to_owned()
        }
        Err(e) => {
            println!("Failed to get current exe path: {}", e);
            String::new()
        }
    };

    println!("static_files_directory: {}", static_files_directory);

    let mount_path = format!("{WEBROOT}/{FRONT_ROOT}");
    println!("mount_path: {}", mount_path);
    HttpServer::new(move || {
        App::new()
            .service(fs::Files::new(&mount_path, &static_files_directory).show_files_listing())
            .service(web::scope(WEBROOT).service(greet))
    })
    .bind(("127.0.0.1", 8888))?
    .run()
    .await
}
