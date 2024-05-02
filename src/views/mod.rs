pub mod app {
    use crate::controller::index;
    use yew::prelude::*;

    #[function_component]
    pub fn Main() -> Html {
        let counter = use_state(|| 0);
        let onclick = {
            let counter = counter.clone();
            move |_| {
                let value = *counter + 1;
                counter.set(value);
            }
        };

        let response = index::action_index();

        html! {
            <div>
                <button {onclick}>{ "+1" }</button>
                <div class={classes!("text-3xl","font-bold","underline")}>{ "测试测试测试" }</div>
                <p>{ *counter }</p>
                <div>{ *counter }</div>
                <div>{ response }</div>
            </div>
        }
    }
}
