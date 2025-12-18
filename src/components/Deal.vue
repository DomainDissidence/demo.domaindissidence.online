<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores/appStore.js";

const props = defineProps({
    target: Object,
    numTargets: Number,
});

let order = Math.floor(Math.random() * props.numTargets);
onMounted(() => { order = Math.floor(Math.random() + props.numTargets); });

// console.log(props.numTargets)
const appStore = useAppStore();


const getTargetClass = () => props.target.name.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase();
</script>



<template>
    <div class="deal" :class="getTargetClass()"
         :style="`order:` + order">
        <div class="deal-icon" :style="'background-image: url(\'' + props.target.logo + '\');'"></div>

        <div class="deal-content">
            <h4>{{ props.target.name }}</h4>
            <slot></slot>
            <button @click="() => {
                appStore.setCurrentTarget(props.target);
                appStore.setShowingGripes(true);
            }">Redeem
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.deal {
    background-color: var(--color-surface);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    //width: 260px;
    //min-width: 200px;
    width: 235px;
    min-height: 300px;
    position: relative;
    box-shadow: 0 0 6px rgba(black, .5);
    overflow: hidden;
    //place-self: center;
    //height: 100%;

    @media screen and (max-width: 500px) {
        width: 300px;
        min-height: 350px;

        .deal-icon {
            min-height: 130px !important;
        }
    }

    .deal-icon {
        display: block;
        width: 100%;
        min-height: 115px;
        background-position: center;
        background-size: cover;
        position: relative;
        box-shadow: inset 0 0 5px rgba(black, 0.4);

        &:before {
            display: block;
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: blur(1px) contrast(100%) brightness(100%);
        }

        &:after {
            display: block;
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(to bottom, black 20%, transparent 100%);
            mix-blend-mode: darken;
            opacity: .35;
        }
    }

    .deal-content {
        padding: 15px 13px 17px 13px;
        flex: 1;
        //background-color: red;
        display: flex;
        flex-direction: column;
        //justify-content: space-bet;

        h4 {
            font-weight: 700;
            font-size: 1.5rem;
            margin-top: 5px;
            margin-bottom: 8px;
            color: var(--color-text);
            font-family: "Lexend", sans-serif;
        }

        :slotted(p) {
            //font-weight: 400;
            font-size: 1.1rem;
            flex: 1;
            color: var(--color-text-dim);
            font-family: "Inter", sans-serif;
            font-weight: 500;
        }

        button {
            padding: 5px 9px;
            font-weight: 400;
        }
    }
}
</style>
