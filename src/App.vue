<template>
  <html>
    <head>
      <meta charset="utf-8">
      <title>route</title>
    </head>
    <body>
      <div id="container">
        <div id="app">
          <router-view></router-view>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
  import moment from "moment";

  export default {
    name: 'App',
    mounted() {
      if(moment().isAfter(localStorage.getItem('expires'))) {
        localStorage.clear();
        this.$router.push('/auth');
      }
    }
  }
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100vh;
  display: flex;
}
</style>
