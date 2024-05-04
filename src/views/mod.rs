#![forbid(unsafe_code)]
#![deny(unreachable_pub)]
use crate::cfg::{FRONT_ROOT, WEBROOT};

use std::fmt;

#[doc(no_inline)]
pub use actix_web;
use actix_web::body::BoxBody;
use actix_web::http::header::HeaderValue;
use actix_web::http::StatusCode;
use actix_web::{HttpResponse, HttpResponseBuilder, ResponseError};
#[doc(no_inline)]
pub use askama::*;

#[derive(Template)]
#[template(path = "index.html")]
struct Use<'a> {
    name: &'a str,
    production: bool,
    front_root: &'a str,
    webroot: &'a str,
    import_file: String,
}

pub fn tmpl(name: &str) -> HttpResponse<BoxBody> {
    let production = cfg!(not(debug_assertions)); // 判断是否为生产环境
    let import_file = import_from_vite(name);
    println!("import_file: {}", import_file);
    into_response(&Use {
        name,
        production,
        front_root: FRONT_ROOT,
        webroot: WEBROOT,
        import_file,
    })
}

/// Render a [`Template`] into a [`HttpResponse`], or render an error page.
fn into_response<T: ?Sized + askama::Template>(tmpl: &T) -> HttpResponse<BoxBody> {
    try_into_response(tmpl).unwrap_or_else(|err| HttpResponse::from_error(ActixError(err)))
}

/// Try to render a [`Template`] into a [`HttpResponse`].
fn try_into_response<T: ?Sized + askama::Template>(
    tmpl: &T,
) -> Result<HttpResponse<BoxBody>, Error> {
    let value = tmpl.render()?;
    Ok(HttpResponseBuilder::new(StatusCode::OK)
        .content_type(HeaderValue::from_static(T::MIME_TYPE))
        .body(value))
}

/// Newtype to let askama::Error implement actix_web::ResponseError.
struct ActixError(Error);

impl fmt::Debug for ActixError {
    #[inline]
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        <Error as fmt::Debug>::fmt(&self.0, f)
    }
}

impl fmt::Display for ActixError {
    #[inline]
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        <Error as fmt::Display>::fmt(&self.0, f)
    }
}

impl ResponseError for ActixError {}

// vite manifest load
use std::env;
use std::fs;

pub fn import_from_vite(name: &str) -> String {
    let import_str = match env::current_exe() {
        Ok(mut exe_path) => {
            exe_path.pop();
            let exe_path = exe_path.join(FRONT_ROOT).join(".vite");
            let manifest_path = exe_path.join("manifest.json");
            println!("manifest_path: {:?}", manifest_path);
            let import_cfg = if manifest_path.exists() {
                let manifest = fs::read_to_string(manifest_path).unwrap();
                let manifest: serde_json::Value = serde_json::from_str(&manifest).unwrap();
                // 遍历 manifest 所有的 value, 找到 value 里面的 name.
                // 如果 name 和传入的 name 相等, 则返回这个 value.
                manifest
                    .as_object()
                    .unwrap()
                    .values()
                    .find(|v| v["name"] == name && v["isEntry"] == true)
                    .unwrap()
                    .clone()
            } else {
                serde_json::json!({})
            };
            // 读取 import_cfg 里面的 css 数组, 并映射成 <link ref="stylesheet" href="xxx.css" /> 标签
            let css = import_cfg
                .get("css")
                .map(|css| {
                    let css = css.as_array().unwrap();
                    css.iter()
                        .map(|css| {
                            let href = css.as_str().unwrap();
                            format!(
                                "<link rel=\"stylesheet\" href=\"{WEBROOT}/{FRONT_ROOT}/{href}\" />",
                            )
                        })
                        .collect::<Vec<String>>()
                })
                .unwrap_or_default();
            // 读取 import_cfg 里面的 file 字段, 并映射成 <script type="module" src="xxx.js"></script> 标签
            let file = import_cfg
                .get("file")
                .map(|file| {
                    let file = file.as_str().unwrap();
                    format!(
                        "<script type=\"module\" src=\"{WEBROOT}/{FRONT_ROOT}/{file}\"></script>",
                    )
                })
                .unwrap_or_default();
            // 将 file 和 css 展开, 合并成同一个数组
            Vec::from([css, vec![file]].concat())
        }
        Err(e) => {
            println!("Failed to get current exe path: {}", e);
            vec![]
        }
    };
    // 将数组转换成字符串
    import_str.join("\n")
}
