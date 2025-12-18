import { defineStore } from "pinia";
// import configFile from "@/config/config.toml";
import configFile from "@/config/config.json";


export const useConfigStore = defineStore("config", {
    actions: {
        getConfig() {
            console.log(configFile.colors)
            return {
                title: configFile.text.title,
                favicons: configFile.favicons,
                landingText: configFile.text.landingText,
                landingImage: configFile.assets.landingImage,
                landingButtonText: configFile.text.landingButtonText,
                targets: configFile.targets,
                allDeals: configFile.targets
                    .map(target => target.deals)
                    .reduce((prev, curr) => prev.concat(curr), []),
                colors: configFile.colors
            }
        },
    },
});