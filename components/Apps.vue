<template>
  <div class="apps">
    <div class="apps__header">
      <span class="apps__title">{{ title }}</span>

      <span class="apps__cta">
        See All
      </span>
    </div>

    <div class="apps__carousel">
      <div v-for="(chunk, j) in chunks" :key="j" class="apps__carousel__item">
        <div v-for="(app, k) in chunk" :key="k" class="apps__app">
          <img :src="app.icon" :alt="app.title" />

          <div class="apps__app__titles">
            <p class="apps__app__title">{{ app.title }}</p>
            <p class="apps__app__subtitle">{{ app.subtitle }}</p>
          </div>

          <div class="apps__app__action">
            <button>GET</button>
            <span>In-App Purchases</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import chunk from 'lodash/chunk'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface App {
  title: string
  subtitle: string
  icon: string
}

@Component({})
export default class Apps extends Vue {
  @Prop({ type: Array, required: true })
  readonly apps!: App[]

  @Prop({ type: String, required: true })
  readonly title!: string

  chunks!: App[][]

  created() {
    this.chunks = chunk(this.apps, 2)
  }
}
</script>

<style scoped lang="scss">
.apps {
  background-color: #eef1f7;

  &__header {
    display: flex;
    padding: 20px 20px 0;
    align-items: center;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    flex: 1;
    letter-spacing: -0.6px;
  }

  &__cta {
    color: #2a7af5;
    font-size: 18px;
  }
}

.apps__carousel {
  display: flex;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &__item {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    min-width: calc(100vw - 40px);
    scroll-snap-align: center;
  }
}

.apps__app {
  display: flex;
  padding: 9px 0;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 16px;
    margin-right: 12px;
  }

  &__titles {
    flex: 1;
  }

  &__title {
    font-size: 18px;
  }

  &__subtitle {
    font-size: 14px;
  }

  &__action {
    align-self: center;
    display: flex;
    flex-direction: column;

    button {
      color: #2d7cf6;
      -webkit-appearance: none;
      border: none;
      padding: 6px 23px;
      background: white;
      font-weight: bold;
      border-radius: 20px;
      font-size: 16px;
      margin-bottom: 4px;
    }

    span {
      font-size: 9px;
      color: #8d8e92;
    }
  }
}
</style>
