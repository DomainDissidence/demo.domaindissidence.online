import { defineStore } from "pinia";


export const useAppStore = defineStore("app", {
    state: () => {
        return {
            showingGripes: false,
            currentTarget: {},
        };
    },
    getters: {
        showingGripesValue(state) {
            return state.showingGripes;
        },
        currentTargetValue(state) {
            return state.currentTarget;
        },
    },
    actions: {
        setShowingGripes(showing = true) {
            this.showingGripes = showing;
        },
        setCurrentTarget(target) {
            this.currentTarget = target;
        },
    },
});