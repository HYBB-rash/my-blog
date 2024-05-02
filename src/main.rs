mod controller;
mod views;

fn main() {
    yew::Renderer::<views::app::Main>::new().render();
}
