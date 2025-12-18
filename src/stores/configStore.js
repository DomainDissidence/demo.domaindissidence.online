import { defineStore } from "pinia";
import configFile from "@/config/config.toml";


export const useConfigStore = defineStore("config", {
    actions: {
        getConfig() {
            return {
                landingText: configFile.text.landingText,
                landingImage: configFile.assets.landingImage,
                landingButtonText: configFile.text.landingButtonText,
                boycottTargets: configFile.boycottTargets,
                allDeals: configFile.boycottTargets
                    .map(target => target.deals)
                    .reduce((prev, curr) => prev.concat(curr), []),
                colors: configFile.colors,
            }
        },
    },
});