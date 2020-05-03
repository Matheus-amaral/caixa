<template>
  <div class="card" :class="category == 'Entrada' ? 'green-card' : 'red-card'">
    <div class="content">
      <div :class="category == 'Entrada' ? 'green-content' : 'red-content'"><slot></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Transaction',
    props: {
      category: String
    }
  }
</script>

<style>
  .content {
    background-color: white;
    border-radius: 7.5px; 
  }

  .red-content {
    background: linear-gradient(141deg, #ff6666 40%, #cc0000 75%);;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-radius: 7.5px;
    padding: 20px;
  }
  .green-content{
    background: linear-gradient(141deg, #5cd65c 40%, #29a329 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-radius: 7.5px;
    padding: 20px;
  }

  .card {
    width: 278px;
    height: 106px;
    margin: 20px;
    padding: 2px;
    border-radius: 10px;
    -webkit-box-shadow: -3px 29px 79px 15px rgba(0,0,0,0.05);
    -moz-box-shadow: -3px 29px 79px 15px rgba(0,0,0,0.05);
    box-shadow: -3px 29px 79px 15px rgba(0,0,0,0.05);
  }

  .green-card {
    color: white;
    background-image: linear-gradient(141deg, #5cd65c 40%, #29a329 75%);
    transition: 0.25s;
  }

  .red-card {
    color: white;
    background-image: linear-gradient(141deg, #ff6666 40%, #cc0000 75%);
    transition: 0.25s;
  }
</style>