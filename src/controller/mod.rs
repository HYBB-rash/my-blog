pub mod index {

    use crate::views::tmpl;
    use actix_web::{get, web, Responder};
    #[get("/index/{name}")]
    async fn greet(name: web::Path<String>) -> impl Responder {
        tmpl(&name)
    }
}
