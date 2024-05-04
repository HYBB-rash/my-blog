import { defineComponent } from "vue";
import HelloWorld from "./src/components/HelloWorld.vue";
import vue_svg from "./assets/vue.svg";
import vite_svg from "./assets/vite.svg";
import "./src/css/logo.css";

export default defineComponent({
    setup() {
        return () => (
            <>
                <div class="flex justify-center align-middle">
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={vite_svg} class="logo" alt="Vite logo" />
                    </a>
                    <a href="https://vuejs.org/" target="_blank">
                        <img src={vue_svg} class="logo vue" alt="Vue logo" />
                    </a>
                </div>
                <HelloWorld msg="Vite + Vue" />
            </>
        );
    },
});
