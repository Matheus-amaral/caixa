<template>
  <Menu class="app">
    <div class="texts">
      <h1 class="title light-text">Olá, {{this.user['username']}}!</h1>
      <h2 class="light-text">Selecione um caixa para vizualizar as transações:</h2>
    </div>

    <div class="card-list" v-if="caixas.length">
      <Card v-for="caixa in caixas" v-bind:key="caixa" @click="$router.push('/transactions/'+caixa.id)">
        {{ caixa.name }}
        <br/>
        Saldo: R$ {{ !Number.isInteger(caixa.saldo) ? caixa.saldo.toLocaleString('pt-BR') : caixa.saldo.toLocaleString('pt-BR')+',00' }}
      </Card>
    </div>
    <div style="margin-left:20px" v-else>Você não possui nenhum caixa cadastrado!</div>
  </Menu>
</template>

<script>
  import Menu from './Menu.vue'
  import Card from './Card.vue'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: { Menu, Card },
    data() {
      return {
        caixas: [],
        user: {}
      };
    },
    mounted() {
      axios.get('https://caixa-276110.uc.r.appspot.com/api/users/current?' + 'id=' + localStorage.getItem('id') + '&access_token='+localStorage.getItem('token')).then(response => {
        this.user = response.data.user[0];
        this.caixas = this.user.caixas;
      }).catch(error=> {
        console.log(error);
      });
    }
  }
</script>

<style>
  .app {
    text-align: left;
    justify-content: left;
    display: flex;
  }

  .card-list {
    display: grid !important;
    grid-template-columns: 300px 300px 300px 300px;
  }

  .title{
    background: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .light-text {
    font-weight: 100;
  }

  .texts {
    margin: 20px;
  }
</style>