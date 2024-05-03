import { createApp, defineComponent } from 'vue'
import './style.css'

createApp(defineComponent({
    setup() {
        return () => "Hello World!";
    }
})).mount('#app')
