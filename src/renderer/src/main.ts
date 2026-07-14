import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './index.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(autoAnimatePlugin).mount('#app')
