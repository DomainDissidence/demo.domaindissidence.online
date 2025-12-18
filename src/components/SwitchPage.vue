<script setup>
import { useAppStore } from "@/stores/appStore.js";

const appStore = useAppStore();
const currentTarget = appStore.currentTargetValue;
</script>



<template>
    <video id="bg-video" muted autoplay loop playsinline>
        <source src="/video/blood.mp4#t=2" type="video/mp4">
    </video>


    <div id="content">

        <!-- <h1>{{ currentTarget.name.toUpperCase() }}</h1> -->
        <div id="title">
            <h1>Do not patronize
                <span id="target-name">{{ currentTarget.name.toUpperCase() }}</span>
            </h1>
            <h2>People's lives depend on it.</h2>
        </div>
        <!-- <h1>Do not patronize -->
        <!--     <br> -->
        <!--     <span id="target-name">{{ currentTarget.name.toUpperCase() }}</span>. -->
        <!--     <br> -->
        <!--     People's lives depend on it. -->
        <!-- </h1> -->

        <!-- <p>{{ currentTarget.cards[0].header }}</p> -->

        <section class="target-card" v-for="card in currentTarget.cards">
            <h3>{{ card.header }}</h3>
            <p v-for="text in card.paragraphs">{{ text }}</p>
        </section>

        <section class="target-card" v-for="gripe in currentTarget.gripes">
            <template v-for="(gripeLine, i) in gripe.split(/(?<=\.) /)">
                <h3 v-if="i === 0">{{ gripeLine }}</h3>
                <p v-else>{{ gripeLine }}</p>
            </template>
        </section>

        <section id="citation-card">
            <h3>Citations</h3>
            <a :href="citation" target="_blank" v-for="citation in currentTarget.citations">{{ citation }}</a>
        </section>
    </div>
</template>



<style scoped lang="scss">
@use "../css/breakpoints" as *;


:global(body) {
    background-color: black;
}


@font-face {
    font-family: "bloodfont";
    font-weight: normal;
    font-style: normal;
    src: url("../assets/fonts/PaintDropsRegular.ttf");
}


video#bg-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: fixed;
    z-index: -1;
    opacity: 0.2;
    mix-blend-mode: hard-light;
    //background-blend-mode: screen;
}


#content {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 350px;
    margin: 0 auto;

    @include at-breakpoint($md) {
        max-width: 600px;
    }

    #title {
        color: var(--color-blood);
        text-align: center;
        text-transform: uppercase;
        margin: 40px 0;
        letter-spacing: 0.3rem;
        //max-width: 450px;
        text-wrap: balance;
        width: 100%;


        h1, h2 {
            //font-size: 2.2rem;
            font-family: "Lexend", sans-serif;
            //font-weight: 700;
            width: 100%;
        }

        h1 {
            font-size: 2.4rem;
            font-weight: 900;

            span#target-name {
                //display: inherit;
                //max-width: inherit;
                display: block;
                font-weight: normal;
                font-size: 5.5rem;
                font-family: "bloodfont", monospace;
                //display: inline-block;
                margin-top: 10px;
                width: 100%;
                //line-height:
            }
        }

        h2 {
            font-size: 1.6rem;
            font-weight: 400;
        }
    }


    section {
        padding: 20px 14px;
        font-family: "Lexend", sans-serif;
        min-height: 160px;
        width: 100%;
        margin-bottom: 30px;
        position: relative;
        border: 1px solid var(--color-text-dim);
        background-color: black;


        h3 {
            font-weight: 600;
            color: var(--color-text);
            font-size: 1.35rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        p, a {
            color: var(--color-text-dim);
            font-size: 1.15rem;
            font-weight: 400;

            &:not(:first-of-type) {
                margin-top: 17px;
            }
        }
    }


    section.target-card {
        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            box-shadow: 10px 4px var(--color-blood);
        }
    }


    section#citation-card {

        h3 {
            text-align: center;
            font-size: 2rem;
        }

        a {
            display: block;
            color: var(--color-blood-lighter);
            word-wrap: anywhere;
            opacity: 0.8;
            transition: opacity .1s ease-out;

            &:not(:first-of-type) {
                margin-top: 17px;
            }

            &:hover {
                //color: var(--color-accent);
                opacity: 1;
            }
        }
    }
}
</style>