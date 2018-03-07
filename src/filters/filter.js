import Vue from 'vue'
import Format from '../lib/format'

let a = Vue.filter('date', stamp => {
  return Format.formatDate(stamp * 1000, '-', 'date')
})

export default {a}
