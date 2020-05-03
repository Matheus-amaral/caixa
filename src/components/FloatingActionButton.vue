<template>
  <div>
    <div v-if="!sending" :class="!inverse ? 'button' : 'inverse'" v-on:click="action">
      <FontAwesomeIcon :icon="icon"/>
    </div>
    <div v-else :class="!inverse ? 'button' : 'inverse'" v-on:click="action">
      <Loader/>
    </div>
  </div>
</template>

<script>
  import Loader from './Loader.vue'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
  import { faBars } from '@fortawesome/free-solid-svg-icons'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add(faArrowLeft, faBars, faTimes)

  export default {
    name: 'FloatingActionButton',
    props: {
      icon: String,
      sending: Boolean,
      inverse: Boolean
    },
    components: {
      Loader,
      FontAwesomeIcon
    },
    methods: {
      action() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>
  .inverse {
    width: 20;
    height: 20;
    margin: auto;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    display:flex;
    color: #1fc8db;
    background-color: white;
  }

  .inverse:hover {
    color: #2cb5e8;
  }

  .button {
    width: 20;
    height: 20;
    margin: auto;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
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