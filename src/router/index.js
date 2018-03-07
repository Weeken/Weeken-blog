// const Nav = resolve => require(['../components/navigator'], resolve)
import Nav from '../components/navigator'

let options = {
  routes: []
}

let noNav = (r => {
  return r.keys().map(key => r(key).default)
})(require.context('../pages/', true, /^\.\/noTab\/([\s\S])+\/route\.js$/))

let management = (r => {
  return r.keys().map(key => r(key).default)
})(require.context('../pages/', true, /^\.\/management\/([\s\S])+\/route\.js$/))

let hasNav = {
  path: '/nav',
  component: Nav,
  name: 'nav',
  children: (r => {
    return r.keys().map(key => r(key).default)
  })(require.context('../pages/', true, /^\.\/hasTabs\/([\s\S])+\/route\.js$/))
}

options.routes = [...noNav, ...management]
options.routes.push({path: '/', redirect: '/home'})
options.routes.push(hasNav)

// eslint-disable-next-line
options.scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

export default options
