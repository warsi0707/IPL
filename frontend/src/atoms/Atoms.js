import {atom, selector} from 'recoil'

export const productAtom = atom({
    key: "productAtom",
    default: []
})
export const productDetailAtom = atom({
    key: "productDetailAtom",
    default: {}
})
export const messageAtom = atom({
    key: "messageAtom",
    default: ""
})
export const errorAtom = atom({
    key: "errorAtom",
    default: ""
})
export const loadingAtom = atom({
    key: "loadingAtom",
    default: true
})
export const userAuthAtom = atom({
    key: "userAuthAtom",
    default: true
})
export const hambergAtom = atom({
    key: "hambergAtom",
    default: true
})
export const emailAtom = atom({
    key: "emailAtom",
    default: ""
})
export const passwordAtom = atom({
    key: "passwordAtom",
    default: ""
})
export const nameAtom = atom({
    key: "nameAtom",
    default: ""
})
export const usernameAtom = atom({
    key: "usernameAtom",
    default: ""
})
