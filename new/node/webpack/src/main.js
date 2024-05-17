// import { bar } from './bar'
// import { car } from './car'

export const getData = () => {
    // return bar + car
    import('./bar').then(res => console.log(res))
}