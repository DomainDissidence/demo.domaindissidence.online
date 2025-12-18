<script setup>
import configFile from "@/config/config.toml";
import HomePage from "@/components/HomePage.vue";
import SwitchPage from "@/components/SwitchPage.vue";
import { useAppStore } from "@/stores/appStore.js";
import { useConfigStore } from "@/stores/configStore.js";


document.title = configFile.text.title;


configFile.favicons.forEach(favicon => {
    const link = document.createElement("link");
    link.rel = favicon.rel;
    link.type = favicon.type;
    link.sizes = favicon.sizes;
    link.href = favicon.url;
    document.head.appendChild(link);
});


const appStore = useAppStore();
appStore.setShowingGripes(false);

const config = useConfigStore().getConfig();

</script>



<template>
    <HomePage v-if="!appStore.showingGripesValue" />
    <SwitchPage v-else />
</template>



<style lang="scss">
* {
    scroll-behavior: smooth;
}


* {
    --color-background: v-bind(config.colors.background);
    --color-accent: v-bind(config.colors.accent);
    --color-text: v-bind(config.colors.text);
    --color-text-dim: v-bind(config.colors.textDim);
    --color-surface: v-bind(config.colors.surface);
    --color-darker: v-bind(config.colors.darker);
    --color-blood: v-bind(config.colors.blood);
}


button {
    background-color: var(--color-accent);
    //color: var(--color-background);
    color: var(--color-darker);
    //padding: 5px 9px;
    cursor: pointer;
    //font-weight: 550;
    font-family: "Lexend", sans-serif;
    //font-weight: 400;
    width: fit-content;
    box-shadow: 0 0 5px rgba(black, 0.3);
    user-select: none;
    border-radius: 3px;
    transition: opacity .15s ease-out;
    //letter-spacing: .02em;
    //font-size: .9rem;
    position: relative;
    border: none;
    height: fit-content;
    //letter-spacing: 0;
    //font-size: 1.05rem;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: black;
        opacity: 0;
        transition: opacity .1s ease-out;
    }

    &:hover:after {
        opacity: 0.2;
    }
}
</style>