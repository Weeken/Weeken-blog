// const home = resolve => require(['./home'], resolve)
import addNote from './addNote'
export default {
  path: '/addNote',
  name: 'addNote',
  component: addNote
}
