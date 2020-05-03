<template>
  <div>
    <div v-if="!sending" class="button" v-on:click="action">
      {{ label }}
    </div>
    <div v-else class="button" v-on:click="action">
      <Loader/>
    </div>
  </div>
</template>

<script>
  import Loader from './Loader.vue'

  export default {
    name: 'Button',
    props: {
      label: String,
      sending: Boolean
    },
    components: {
      Loader,
    },
    methods: {
      action() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>
  .button {
    width: 258px;
    height: 20;
    margin: auto;
    margin-top: 10px;
    padding: 10px;
    border-radius: 20px;
    justify-content: center;
    display:flex;
    background-color: #1fc8db;
    background-image: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    color: white;
    transition: 2s;
  }
  .button:hover {
    background-color: white;
    background-image: linear-gradient(141deg, #1fc8db 60%, #2cb5e8 90%);
  }
</style>