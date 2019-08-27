<template>
  <div
    ref="card"
    class="popup-card"
    :class="{ isTapped, isOpen }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

const SWIPE_THRESHOLD = 40

@Component({})
class PopupCard extends Vue {
  @Prop({ type: String, required: true })
  image!: string

  startY = 0

  delta = 0

  isOpen = false

  isTapped = false

  boundingRect!: DOMRectReadOnly

  transformValue = 0

  scaleValue = 0

  $refs!: {
    card: HTMLDivElement
  }

  get cardEl() {
    return this.$refs.card
  }

  onTouchStart(e: TouchEvent) {
    if (this.isOpen) {
      this.startY = e.touches[0].clientY
    } else {
      this.isTapped = true
      this.boundingRect = this.cardEl.getBoundingClientRect() as DOMRectReadOnly
    }
  }

  onTouchMove(e: TouchEvent) {
    if (this.isOpen) {
      this.delta = e.touches[0].clientY - this.startY

      const isSwipedDown = this.delta > 0

      if (isSwipedDown) {
        requestAnimationFrame(this.swipe)
      }
    } else {
      this.isTapped = false
    }
  }

  onTouchEnd() {
    if (this.isOpen) {
      if (this.delta < SWIPE_THRESHOLD) {
        this.popup()
      }
    } else if (this.isTapped) {
      this.isOpen = true
      this.toggleBodyScroll({ block: true })

      requestAnimationFrame(this.popup)
    }
  }

  swipe() {
    const newScale = this.scaleValue - this.delta / window.innerWidth
    const newTransform = this.transformValue + this.delta

    if (this.delta > SWIPE_THRESHOLD) {
      this.isOpen = false

      this.popdown()
      this.toggleBodyScroll({ block: false })
    } else {
      this.cardEl.style.transform = `translate3d(0, ${newTransform}px, 0) scale(${newScale})`
      this.cardEl.style.borderRadius = `${this.delta / 3}px`
    }
  }

  popup() {
    this.scaleValue = window.innerWidth / this.boundingRect.width
    this.transformValue = -Math.round(this.boundingRect.y)
    console.log({
      scaleValue: this.scaleValue,
      transformValue: this.transformValue
    })

    this.cardEl.style.transform = `translate3d(0, ${this.transformValue}px, 0) scale(${this.scaleValue})`
    this.cardEl.style.borderRadius = '0'
  }

  popdown() {
    this.cardEl.style.transform = ''
    this.cardEl.style.borderRadius = ''
  }

  toggleBodyScroll({ block = true }) {
    if (block) {
      document.addEventListener('touchstart', this.preventBodyScroll, {
        passive: false
      })
    } else {
      document.removeEventListener('touchstart', this.preventBodyScroll)
    }
  }

  preventBodyScroll(e: TouchEvent) {
    e.preventDefault()
  }
}

export default PopupCard
</script>

<style lang="scss" scoped>
.popup-card {
  user-select: none;
  height: 400px;
  width: 100%;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
  }

  &.isTapped {
    transform: scale(0.95);
  }

  &.isOpen {
    border-radius: 0;
  }
}
</style>
