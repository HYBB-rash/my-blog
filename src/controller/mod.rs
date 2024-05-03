pub mod index {

    use crate::views::hello::get_hello;
    use actix_web::{get, web, Responder};
    #[get("/index/{name}")]
    async fn greet(name: web::Path<String>) -> impl Responder {
        get_hello(&name)
    }
}
