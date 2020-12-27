<template>
    <div class="vue-zoom">
        <div class="debug-info" v-if="debug">
            <span>scale: {{ scale.toFixed(1) }}</span>
            <br />
            <span>moveX: {{ moveX.toFixed(1) }}</span>
            <br />
            <span>moveY: {{ moveY.toFixed(1) }}</span>
        </div>
        <span
            class="vue-zoom__child"
            :style="childStyle"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <slot />
        </span>
    </div>
</template>

<script>
import { TouchMixin } from "./touch";
import { getDistance, range, preventDefault } from "./utils";

export default {
    name: "vue-zoom",
    mixins: [TouchMixin],
    props: {
        debug: Boolean,
        minZoom: {
            type: Number,
            default: 1 / 3
        },
        maxZoom: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            scale: 1,
            moveX: 0,
            moveY: 0,
            startMoveX: 0,
            startMoveY: 0,
            maxMoveX: 0,
            maxMoveY: 0,
            moving: false,
            zooming: false
        };
    },
    computed: {
        childStyle() {
            const { scale } = this;
            const style = {
                transition: this.zooming || this.moving ? "" : ".3s all"
            };

            if (scale !== 1) {
                style.transform = `scale3d(${scale}, ${scale}, 1) translate(${this
                    .moveX / scale}px, ${this.moveY / scale}px)`;
            }

            return style;
        }
    },
    methods: {
        startMove(event) {
            const child = event.currentTarget;
            const rect = child.getBoundingClientRect();
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            this.touchStart(event);
            this.moving = true;
            this.startMoveX = this.moveX;
            this.startMoveY = this.moveY;
            this.maxMoveX = Math.max(0, (rect.width - winWidth) / 2);
            this.maxMoveY = Math.max(0, (rect.height - winHeight) / 2);
        },
        startZoom(event) {
            this.moving = false;
            this.zooming = true;
            this.startScale = this.scale;
            this.startDistance = getDistance(event.touches);
        },
        onTouchStart(event) {
            const { touches } = event;

            if (touches.length === 1 && this.scale !== 1) {
                this.startMove(event);
            } else if (touches.length === 2) {
                this.startZoom(event);
            }
        },
        onTouchMove(event) {
            const { touches } = event;
            if (this.moving || this.zooming) {
                preventDefault(event, true);
            }

            if (this.moving) {
                this.touchMove(event);
                const moveX = this.deltaX + this.startMoveX;
                const moveY = this.deltaY + this.startMoveY;
                this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX);
                this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY);
            }

            if (this.zooming && touches.length === 2) {
                const distance = getDistance(touches);
                const scale = (this.startScale * distance) / this.startDistance;
                this.scale = range(scale, this.minZoom, this.maxZoom);
            }
        },
        onTouchEnd(event) {
            if (this.moving || this.zooming) {
                let stopPropagation = true;

                if (
                    this.moving &&
                    this.startMoveX === this.moveX &&
                    this.startMoveY === this.moveY
                ) {
                    stopPropagation = false;
                }

                if (!event.touches.length) {
                    this.moving = false;
                    this.zooming = false;
                    this.startMoveX = 0;
                    this.startMoveY = 0;
                    this.startScale = 1;

                    if (this.scale < 1) {
                        this.resetScale();
                    }
                }

                if (stopPropagation) {
                    preventDefault(event, true);
                }
            }
        },
        resetScale() {
            this.scale = 1;
            this.moveX = 0;
            this.moveY = 0;
        }
    }
};
</script>

<style lang="less">
.vue-zoom {
    position: relative;

    &__child {
        display: inline-block;
        font-size: 0;
        transform-origin: center;
    }

    .debug-info {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform: translate3d(-50%, -50%, 0);
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        text-shadow: 0 0 8px #000;
    }
}
</style>
