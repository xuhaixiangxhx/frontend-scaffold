import { defineStore } from "pinia";

const useDemoStore = defineStore('demo', {
    state: () => ({ count: 0 }),
    getters: {},
    actions: {}
})