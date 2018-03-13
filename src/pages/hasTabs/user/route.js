// const user = resolve => require(['./user'], resolve)
import user from './user'
export default {
  path: '/user',
  name: 'user',
  component: user
}
