import Vue from 'vue'

Vue.filter('truncate', function(value, length, clamp) {
  clamp = clamp || '...'
  if (!value) return ''
  if (value.length > length) {
    value.trim()
    return value.substring(0, length) + clamp
  }
  return value
})
