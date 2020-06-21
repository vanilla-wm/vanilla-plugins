import VanillaWm from './VanillaWM'
import { ConstructorType } from './VanillaWMPlugin'

export default ({ clientId, clientSecret, ...restProps }: ConstructorType) =>
  new VanillaWm({ clientId, clientSecret, ...restProps })
