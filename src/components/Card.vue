<template>
  <div class="caixa-card" v-on:click="action()">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    methods: {
      action() {
        this.$emit('click')
      }
    }
  }
</script>

<style>
  .caixa-card {
    width: 238;
    height: 66px;
    margin: 20px;
    padding: 20px;
    margin-top: 0;
    border-radius: 10px;
    color: white;
    background-image: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    transition: 0.25s;
  }

  .caixa-card:hover {
    background-image: linear-gradient(141deg, #1fc8db 60%, #2cb5e8 90%);
  }
</style>