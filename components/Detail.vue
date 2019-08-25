<template>
  <div class="detail">
    <div
      ref="parallax"
      class="parallax"
      :style="{ backgroundImage: `url(${heroImage})` }"
    />

    <div class="content">
      <slot />
    </div>

    <console />
  </div>
</template>

<script>
import Console from '~/components/Console.vue'

export default {
  components: { Console },
  props: {
    heroImage: {
      type: String,
      required: true
    },
    heroHeight: {
      type: Number,
      default: 180
    }
  },
  data() {
    return {
      enableParallax: false
    }
  },
  mounted() {
    this.enableParallax = true

    this.loop = this.loop.bind(this)
    requestAnimationFrame(this.loop)
  },
  beforeDestroy() {
    this.enableParallax = false
  },
  methods: {
    loop() {
      if (!this.enableParallax) return
      const scrollY = window.scrollY

      if (scrollY >= 0) {
        const yTransformation = Math.max(0, scrollY / 2)

        // console.log({ yTransformation }) // eslint-disable-line

        this.$refs.parallax.style.transform = `translate3d(0, -${yTransformation}px, 0)`
      } else {
        const scale = -scrollY / this.heroHeight + 1

        this.$refs.parallax.style.transform = `scale3d(${scale}, ${scale}, 0)`

        console.log({ scrollY, scale }) // eslint-disable-line
        // this.$refs.parallaxBlurred.style.transform = `scale(${scale})`

        // this.$refs.parallax.style.opacity = 1 - -scrollY / this.heroHeight
      }

      requestAnimationFrame(this.loop)
    }
  }
}
</script>

<style scoped>
.parallax {
  position: fixed;
  height: 180px;
  will-change: transform;
  top: 0;
  left: 0;
  right: 0;
  background-size: cover;
  transform-origin: top;
}

.content {
  position: relative;
  padding: 20px;
  margin-top: 180px;
  z-index: 1;
  background-color: #fff;
  user-select: none;
}
</style>
