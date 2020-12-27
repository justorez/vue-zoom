<template>
    <div id="app">
        <vue-zoom class="img-zoom" debug>
            <img src="./assets/1.jpg" @click="onClickImg" />
        </vue-zoom>
    </div>
</template>

<script>
export default {
    name: "app",
    methods: {
        onClickImg() {
            alert("233");
        }
    }
};
</script>

<style lang="less">
#app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .img-zoom {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #000;

        img {
            max-width: 100%;
        }
    }
}
</style>
