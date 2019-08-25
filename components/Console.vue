<template>
  <div class="console-container">
    <div ref="console" class="console" />
  </div>
</template>

<script>
export default {
  mounted() {
    window.console.log = (rawMessage) => {
      let message = rawMessage
      if (typeof rawMessage === 'object') {
        message = JSON.stringify(rawMessage)
      }

      const p = document.createElement('p')
      p.textContent = message

      this.$refs.console.appendChild(p)
      this.$refs.console.scrollTop = this.$refs.console.scrollHeight
    }
  }
}
</script>

<style lang="css" scoped>
.console-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  padding: 8px;
  border-radius: 2px;
  z-index: 1;
}

.console {
  color: green;
  line-height: 1.5;
  font-size: 11px;
  height: 80px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
