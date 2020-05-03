<template>
  <div>
    <div id="side-menu" class="side-menu" :style="'width: '+width+'px;'">
      <div class="button">
        <FloatingActionButton :inverse="true" @click="expand()" icon="bars"/>
      </div>
      <div v-if="this.width == 250">
        <a @click="$router.push('/caixas')">Caixas</a>
        <a @click="$router.push('/categories')">Categorias</a>
        <a @click="logout()">Sair</a>
      </div>
    </div>
    <div id="main" :style="'margin-left: '+width+'px;'" v-on:click="close()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import FloatingActionButton from './FloatingActionButton.vue'

  export default {
    name: 'Menu',
    components: {FloatingActionButton},
    data() {
      return {
        width: 75
      }
    },
    methods: {
      expand() {
        this.width = this.width == 250 ? 75 : 250;
      },
      close() {
        this.width = 75;
      },
      logout() {
        localStorage.clear();
        this.$router.push('/auth');
      }
    }
  }
</script>

<style>
  .button {
    width: 20px;
    margin-left: auto;
    margin-right: 35px;
    margin-top: 10px;
  }

  .side-menu {
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #1fc8db;
    background-image: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    overflow-x: hidden; 
    transition: 0.5s;
  }

  .side-menu a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    text-align: center; 
    color: white;
    display: flex;
    transition: 0.3s;
  }

  .side-menu a:hover {
    color: #f1f1f1;
  }

  .side-menu .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  #main {
    transition: margin-left .5s;
    padding: 20px;
  }

  @media screen and (max-height: 450px) {
    .side-menu {padding-top: 15px;}
    .side-menu a {font-size: 18px;}
  }
</style>