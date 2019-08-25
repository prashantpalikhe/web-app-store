<template>
  <ul class="carousel">
    <li class="carousel__item" v-for="(item, index) in items" :key="index">
      <img class="carousel__img" :src="item" alt="" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.carousel {
  display: flex;
  list-style: none;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.carousel__item {
  margin-right: 10px;
}

.carousel__item:last-of-type {
  padding-right: 20px;
}

.carousel__img {
  width: calc(100vw - 40px);
  object-fit: cover;
  scroll-snap-align: center;
  border-radius: 10px;
}
</style>
