<template>
  <div class="fps-counter" ref="counter"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MyClass extends Vue {
  times: number[] = []
  // lastCalledAt = 0

  $refs!: {
    counter: HTMLDivElement
  }

  mounted() {
    requestAnimationFrame(this.loop)
  }

  loop() {
    requestAnimationFrame(this.loop)
    // let fps = 0

    // if (this.lastCalledAt) {
    //   const delta = performance.now() - this.lastCalledAt

    //   fps = Math.round(1000 / delta)
    // }

    // this.lastCalledAt = performance.now()
    // this.$refs.counter.textContent = `FPS: ${fps}`

    const now = performance.now()
    while (this.times.length > 0 && this.times[0] <= now - 1000) {
      this.times.shift()
    }
    this.times.push(now)
    this.$refs.counter.textContent = `FPS: ${this.times.length}`
  }
}
</script>

<style scoped lang="scss">
.fps-counter {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: green;
  font-size: 11px;
  padding: 5px;
  z-index: 3;
  width: 50px;
}
</style>
