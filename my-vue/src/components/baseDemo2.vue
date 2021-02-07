<template>
    <div class="demo">
        <button @click="show = !show">click</button>
        <transition name="box">
            <div
             class="react"
             v-if="show"
            ></div>
        </transition>
        <transition name="square">
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
.box-enter,
.box-leave-to {
    opacity: 0;
    transform: translateX(300px);
}

.box-enter-active,
.box-leave-active {
    transition: all .3s;
}

.box-leave,
.box-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.square-enter,
.square-leave-to {
    opacity: 0;
    transform: translateY(300px);
}

.square-enter-active,
.square-leave-active {
    transition: all .3s;
}

.square-leave,
.square-enter-to {
    opacity: 1;
    transform: translateY(0px);
}

.react {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    background-color: #008c8c;
}
</style>