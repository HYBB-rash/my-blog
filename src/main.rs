use yew::prelude::*;

#[function_component]
fn App() -> Html {
    let counter = use_state(|| 0);
    let onclick = {
        let counter = counter.clone();
        move |_| {
            let value = *counter + 1;
            counter.set(value);
        }
    };

    html! {
        <div>
            <button {onclick}>{ "+1" }</button>
            <div class="text-3xl font-bold underline">{ "测试测试测试" }</div>
            <p>{ *counter }</p>
            <div>{ *counter }</div>
        </div>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
