<template>
  <div class="container">
    <detail hero-image="/regular.jpg" hero-image-blurred="/blur.jpg">
      <section class="header">
        <img src="/icon.jpg" alt="" />

        <div class="header__content">
          <h1>The Sims™ Mobile</h1>
          <h2>Play with life.</h2>
          <div class="spacer" />

          <div class="header__actions">
            <button>GET</button>
            <span class="small">In-App Purchases</span>
          </div>
        </div>
      </section>

      <section class="stats">
        <div class="stat">
          <p class="stat__result">4.6 ★★★★☆</p>
          <p>23,6K Ratings</p>
        </div>

        <div class="stat">
          <p class="stat__result">12 +</p>
          <p>Age</p>
        </div>
      </section>

      <carousel :items="items" />

      <section>
        <p>
          Lorem eiusmod eu esse mollit eu adipisicing. Ipsum commodo elit
          exercitation laborum cupidatat voluptate voluptate ut culpa aute id ut
          quis qui. Aute aliqua est ex veniam magna ad Lorem aute sit do
          excepteur. Consectetur et aute tempor irure irure cupidatat eu velit
          cupidatat. Nostrud ut ipsum eiusmod sit nisi occaecat consectetur aute
          excepteur est. Sunt minim commodo amet nisi mollit occaecat
          adipisicing et nostrud. Laboris minim consequat irure minim in
          consequat Lorem sint culpa nostrud Lorem do. Lorem laboris laborum
          nulla ad irure nisi sunt nisi magna excepteur Lorem enim anim. Enim in
          ullamco consequat fugiat ea reprehenderit id sit duis dolor officia
          aute commodo. Ullamco ut et labore proident commodo ullamco ipsum
          commodo aliqua minim.
        </p>
      </section>

      <section>
        <popup-card image="/popup.jpeg">
          <template #title>
            <p class="small">HOW TO</p>
            <p class="big">
              Write your <br />
              debut novel
            </p>
          </template>

          <template #subtitle>
            <p>Organise your thought and beat writer's block</p>
          </template>

          <template #content>
            <p style="padding: 20px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              repellat minima soluta voluptatibus eos, sequi reiciendis vero
              provident cum laudantium? Impedit totam repellendus, voluptatum
              debitis nostrum tenetur vero cumque eligendi.
            </p>
          </template>
        </popup-card>
      </section>
    </detail>
  </div>
</template>

<script>
import Detail from '~/components/Detail.vue'
import PopupCard from '~/components/PopupCard.vue'
import Carousel from '~/components/Carousel.vue'

export default {
  components: {
    Detail,
    Carousel,
    PopupCard
  },
  data() {
    return {
      items: [
        '/carousel.jpg',
        '/carousel.jpg',
        '/carousel.jpg',
        '/carousel.jpg',
        '/carousel.jpg',
        '/carousel.jpg'
      ]
    }
  }
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

section {
  padding: 20px;
}

.header {
  display: flex;
}

.spacer {
  flex: 1;
}

.header img {
  width: 118px;
  height: 118px;
  border-radius: 25px;
  margin-right: 20px;
  flex-shrink: 0;
}

.header__content {
  display: flex;
  flex-direction: column;
}

.header h1 {
  font-size: 22px;
  margin-top: 5px;
}

.header h2 {
  font-size: 15px;
  font-weight: normal;
  color: #8e8e93;
  margin-top: 5px;
}

button {
  background: #2d7cf6;
  -webkit-appearance: none;
  border: none;
  padding: 6px 20px;
  color: white;
  font-weight: bold;
  border-radius: 20px;
}

.small {
  font-size: 10px;
  color: #8d8e92;
}

.stats {
  display: flex;
  justify-content: space-between;
}

.stat {
  color: #b3b4b8;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.stat__result {
  font-weight: bold;
  font-size: 22px;
}
</style>
