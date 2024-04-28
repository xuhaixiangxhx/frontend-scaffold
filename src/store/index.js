import { defineStore } from "pinia";

export const useDemoStore = defineStore('demo', {
    state: () => ({ count: 0 }),
    getters: {},
    actions: {}
})

export const useCollapseStore = defineStore('collapse', {
    state: () => {
        return {isCollapse: false}
    },
    getters: {},
    actions: {
        changeCollapase(){
            this.isCollapse = !this.isCollapse
        }
    }
})
