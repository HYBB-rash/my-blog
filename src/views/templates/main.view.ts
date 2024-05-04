import { createApp, defineComponent } from 'vue'
import "./src/css/style.css"

createApp(defineComponent({
    setup() {
        return () => "Hello World!";
    }
})).mount('#app')
