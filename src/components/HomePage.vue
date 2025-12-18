<script setup>
import Deal from "@/components/Deal.vue";
import { onMounted, ref } from "vue";
import { animate } from "animejs";
import { useConfigStore } from "@/stores/configStore.js";
// import DownChevron from "@/components/icons/DownChevron.vue";
import DownChevron from "@/assets/icons/down-chevron.svg";



const START_FROM_SWAPPED_PAGE = false;


const config = useConfigStore().getConfig();
const searchText = ref("");


function getSearchResults() {
    return config.boycottTargets
        .filter(target => target.name.toLowerCase()
            .includes(searchText.value.toLowerCase()));
}


function startAnim() {
    animate("#down-chevron", {
        bottom: "+=10",
        loop: true,
        alternate: true,
        ease: "outSine",
    });
}


function scrollToDeals(_event) {
    const dealsSection = document.querySelector("#deals");
    window.scrollTo(0, dealsSection.offsetTop);
}

if (START_FROM_SWAPPED_PAGE)
    onMounted(() => document.querySelector(".deal button").click());
</script>



<template>
    <div id="background"
         :style="'background-image: url(\'' + config.landingImage + '\');'"></div>

    <section id="landing">
        <div class="content">
            <h1>{{ config.landingText }}</h1>

            <p>Start saving now!</p>

            <button @click="scrollToDeals">{{ config.landingButtonText }}</button>
        </div>

        <div id="down-chevron">
            <img :src="DownChevron" alt="Down arrow icon" @load="startAnim">
            <!-- <DownChevron /> -->
        </div>
    </section>

    <section id="deals">
        <div class="content">
            <div id="deals-header">
                <h2>Current Deals</h2>

                <input id="search" type="search" placeholder="Search..." v-model="searchText">
            </div>

            <div id="deals-grid">
                <template v-for="target in getSearchResults()">
                    <Deal
                        v-for="dealText in target.deals"
                        :target="target">
                        <p>{{ dealText }}</p>
                    </Deal>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
// document.querySelector(".deal button").click();
</script>

<style scoped lang="scss">

#background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #2a7b9b;
        background: linear-gradient(0deg,
            rgba(42, 123, 155, 1) 0%,
            rgba(87, 199, 133, 1) 70%,
            rgb(201, 255, 188) 100%);
        opacity: .6;
    }

    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        backdrop-filter: brightness(50%) contrast(105%);
    }
}


section {
    min-height: 100vh;

    .content {

    }
}


section#landing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //height: 100vh;

    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 30px;
        margin: 0 10px;
        border: 1px solid white;
        max-width: 500px;
        backdrop-filter: blur(3px) contrast(105%) brightness(95%);


        h1, p {
            text-wrap: balance;
            color: var(--color-text);

            &:is(h1) {
                font-size: 3rem;
                font-weight: 700;
                letter-spacing: 0.1rem;
                line-height: 105%;
            }

            &:is(p) {
                font-size: 1.5rem;
                font-weight: 500;
                color: var(--color-text-dim);
                margin-top: 0.65rem;
                letter-spacing: 0.05rem;
            }
        }

        button {
            margin-top: 2rem;
            padding: 5px 15px;
            font-weight: 500;
        }
    }

    #down-chevron {
        svg, img {
            color: white;
            width: 100%;
            height: 100%;
        }

        position: absolute;
        bottom: 30px;
        height: 55px;
    }
}


section#deals {
    padding-top: 60px;
    background-color: RGB(from var(--color-background) r g b / 50%);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    //box-shadow: 0 -5px 6px rgba(black, 0.3);
    backdrop-filter: blur(4px) contrast(100%) brightness(90%);
    mask: linear-gradient(to bottom, transparent 0%, black 10%);

    .content {
        padding: 30px 20px;

        #deals-header {
            display: flex;
            flex-direction: column;
            margin-bottom: 40px;
            padding: 0 5px;

            h2 {
                color: var(--color-accent);
                font-size: 2.5rem;
                letter-spacing: 0.1rem;
                white-space: pre;
                margin-bottom: 13px;
                font-family: "Lexend", sans-serif;
                font-weight: 300;
            }

            #search {
                padding: 6px 10px;
                border-radius: 5px;
                border: none;
                box-shadow: inset 0 0 4px 1px rgba(#fac3c3, 0.3);
                width: 100%;
                background-color: var(--color-text);
                color: var(--color-darker);
                font-family: "Inter", sans-serif;
                font-size: 1.05rem;
                letter-spacing: 0.02em;
                //margin: 0 10px;


                &::placeholder {
                    color: var(--color-surface);
                }
            }
        }

        #deals-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            grid-gap: 17px;
            //column-gap: 5px;
            width: 100%;
            //max-width: 100%;
            //background-color: red;
            //grid-auto-flow: row dense;
            place-items: center;
            place-content: center;
            //place-content: space-evenly space-evenly;
            //place-self: center;
            //place-items: center center ;
            //place-;
        }
    }
}
</style>