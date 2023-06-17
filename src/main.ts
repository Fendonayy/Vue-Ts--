import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.css'
import router from './router'
import App from './App.vue'
import registerStore from './store'
import registerIcons from './global/register-icons'
import 'element-plus/theme-chalk/el-message.css'

// import 'element-plus/es/components/sub-menu/style/css '
//针对ELMessage和ELLoading等组件引入样式
//1.全局引入样式（所有样式全部引入）
//2.import 'element-plus/theme-chalk/el-message.css'
//3.使用vite-plugin-style-import
//1.npm install vite-plugin-style-import consola -D
//2.在vite.config.ts中配置
const app = createApp(App)
app.use(registerIcons)
app.use(registerStore)
app.use(router)
app.mount('#app')
