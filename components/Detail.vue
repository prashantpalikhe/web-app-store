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
      default: 200
    }
  },
  data() {
    return {
      enableParallax: false,
      scrollY: 0
    }
  },
  mounted() {
    this.enableParallax = true

    this.loop = this.loop.bind(this)
    requestAnimationFrame(this.loop)

    document.addEventListener('touchstart', () => {
      document.querySelector(
        '[name="apple-mobile-web-app-status-bar-style"]'
      ).content = 'default'
    })
  },
  beforeDestroy() {
    this.enableParallax = false
  },
  methods: {
    loop() {
      requestAnimationFrame(this.loop)

      if (!this.enableParallax) return

      this.scrollY = window.scrollY

      if (this.scrollY >= 0) {
        const yTransformation = Math.max(0, this.scrollY / 2)

        this.$refs.parallax.style.transform = `translate3d(0, -${yTransformation}px, 0)`
      } else {
        const scale = -this.scrollY / this.heroHeight + 1

        this.$refs.parallax.style.transform = `scale3d(${scale}, ${scale}, 0)`
        // eslint-disable-next-line
        console.log({
          scrollY: this.scrollY,
          scale,
          top: this.$refs.parallax.getBoundingClientRect().top
        })
      }
    }
  }
}
</script>

<style scoped>
.parallax {
  position: fixed;
  height: 200px;
  will-change: transform;
  top: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-position: top center;
  transform-origin: top;
  z-index: -1;
}

.content {
  position: relative;
  margin-top: 200px;
  z-index: 1;
  background-color: white;
  user-select: none;
}
</style>
