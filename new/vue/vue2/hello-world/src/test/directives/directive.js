import longpress from './longpress'
import debounce from './debounce'
import throttle from './throttle'

const directives = {
    longpress,
    debounce,
    throttle
}

export default {
    install(Vue) {
        Object.keys(directives).forEach(key => {
            Vue.directive(key, directives[key])
        })
    }
}