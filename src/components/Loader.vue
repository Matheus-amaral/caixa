<template>
  <div class="loader"></div>
</template>

<script>
  export default {
    name: 'Loader',
  }
</script>

<style>
  .loader {
    border: 2.5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2.5px solid transparent;
    width: 15px;
    height: 15px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>