import { App } from 'vue'
import registerProperties from './register-properties'

export default function gloableRegister(app: App) {
  app.use(registerProperties)
}
