<template>
  <div>
    <div class="overlay" :class="{ isOpen }"></div>
    <div
      ref="card"
      class="popup-card"
      :class="{ isTapped, isOpen }"
      @touchstart="onTouchStart"
      @touchend="isTapped = false"
    >
      <div class="popup-card__img">
        <img :src="image" alt="" />
      </div>
      <!-- <slot name="title" />

    <slot name="subtitle" /> -->

      <div class="popup-card__content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Hammer from 'hammerjs'

const factor = 2.5
const SWIPE_THRESHOLD = 50 * factor

@Component({})
class PopupCard extends Vue {
  @Prop({ type: String, required: true })
  image!: string

  isOpen = false

  isTapped = false

  boundingRect!: DOMRectReadOnly

  transformValue = 0

  scaleValue = 0

  $refs!: {
    card: HTMLDivElement
  }

  gesture!: HammerManager

  get cardEl() {
    return this.$refs.card
  }

  mounted() {
    this.gesture = new Hammer(this.cardEl)

    this.gesture
      .get('pan')
      .set({ threshold: 0, direction: Hammer.DIRECTION_DOWN })

    this.gesture.on('tap', this.onTap)
  }

  beforeDestroy() {
    this.gesture.destroy()
  }

  onTap() {
    if (this.isOpen) {
      return
    }

    this.popup()
  }

  onPanDown(event: HammerInput) {
    const { deltaY } = event

    if (deltaY < 0) {
      return
    }

    const newScale = 1 - deltaY / (window.innerWidth * factor)

    if (deltaY > SWIPE_THRESHOLD) {
      this.popdown()
    } else {
      const borderRadius = Math.min(deltaY / 3, 10)

      this.cardEl.style.transform = `translate3d(-${this.boundingRect.x}px, ${this.transformValue}px, 0) scale(${newScale})`
      this.cardEl.style.borderRadius = `${borderRadius}px`
    }
  }

  onPanEnd({ deltaY }: HammerInput) {
    if (deltaY < SWIPE_THRESHOLD) {
      requestAnimationFrame(this.popup)
    }
  }

  onTouchStart() {
    if (this.isOpen) {
      return
    }

    this.isTapped = true
    this.boundingRect = this.cardEl.getBoundingClientRect() as DOMRectReadOnly
  }

  popup() {
    requestAnimationFrame(() => {
      this.transformValue = -Math.round(this.boundingRect.y)
      this.cardEl.style.transform = `translate3d(-${this.boundingRect.x}px, ${this.transformValue}px, 0)`
      this.cardEl.style.borderRadius = '0'
    })

    if (!this.isOpen) {
      this.gesture.on('pan', this.onPanDown)
      this.gesture.on('pancancel panend', this.onPanEnd)
    }

    this.isOpen = true
  }

  popdown() {
    requestAnimationFrame(() => {
      this.cardEl.style.transform = ''
      this.cardEl.style.borderRadius = ''
    })

    this.gesture.off('pan', this.onPanDown)
    this.gesture.off('pancancel panend', this.onPanEnd)

    this.isOpen = false
  }
}

export default PopupCard
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: saturate(180%) blur(15px);
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  touch-action: none;
  user-drag: none;

  &.isOpen {
    opacity: 1;
  }
}

.popup-card {
  position: relative;
  z-index: 300;
  user-select: none;
  height: 412px;
  width: 100%;
  border-radius: 12px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-property: transform, height, width, border-radius;
  will-change: transform;
  overflow: hidden;
  box-shadow: 0 10px 12px 0px rgba(0, 0, 0, 0.25);

  .popup-card__img {
    overflow: hidden;
  }

  .popup-card__content {
    background: white;
    height: 0;

    > * {
      opacity: 0;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
  }

  &.isTapped {
    transform: scale(0.95);
  }

  &.isOpen {
    border-radius: 0;
    width: 100vw;
    height: 100vh;
    transition-duration: 700ms;
    transition-property: transform, height, width;
    box-shadow: 0 10px 22px 10px rgba(0, 0, 0, 0.25);

    .popup-card__img {
      max-height: 60vh;
    }

    .popup-card__content {
      height: 40vh;

      > * {
        opacity: 1;
      }
    }
  }
}
</style>
