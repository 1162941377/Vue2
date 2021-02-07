<template>
    <div class="demo">
        <button @click="show = !show">click</button>
        <transition>
            <div
             class="react"
             v-if="show"
            ></div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity .3s;
}

.v-enter-to,
.v-leave {
    opacity: 1;
}

.react {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    background-color: #008c8c;
}
</style>