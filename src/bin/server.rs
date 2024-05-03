use actix_web::{App, HttpServer};
use yew_app::controller::index::greet;

#[actix_web::main] // or #[tokio::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(greet))
        .bind(("127.0.0.1", 8888))?
        .run()
        .await
}
