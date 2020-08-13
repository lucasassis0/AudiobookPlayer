import axios from 'axios'

export default function getData() {
    return axios.get('https://run.mocky.io/v3/96f0177a-118f-43b8-9c99-e84e3dc3fa81')
}