<template>
  <Menu class="app">
    <div class="texts">
      <h1 class="title light-text">Olá, {{this.user['username']}}!</h1>
      <Button style="width:278" @click="show()" label="Novo caixa"/>
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
    <modal name="caixa" classes="dialog" height="auto">
      <FloatingActionButton @click="$modal.hide('caixa')" class="close" icon="times"/>
      <p>Informe o nome do novo caixa!</p>
      <Input name="name" label="Nome" placeholder="Nome" @change="change" :error="error"/>
      <Button label="Cadastrar" :sending="sending" @click="save()"/>
    </modal>
  </Menu>
</template>

<script>
  import Menu from './Menu.vue'
  import Card from './Card.vue'
  import Input from './Input.vue'
  import Button from './Button.vue'
  import FloatingActionButton from './FloatingActionButton.vue'
  import axios from 'axios'

  export default {
    name: 'Caixas',
    components: { Menu, Card, Input, Button, FloatingActionButton },
    data() {
      return {
        caixas: [],
        user: {},
        form: {},
        error: '',
        sending: false
      };
    },
    mounted() {
      axios.get('https://caixa-api.uc.r.appspot.com/api/users/current?' + 'id=' + localStorage.getItem('id') + '&access_token='+localStorage.getItem('token')).then(response => {
        this.user = response.data.user[0];
        this.caixas = this.user.caixas;
        console.log(this.user);
      }).catch(error=> {
        console.log(error);
      });
    },
    methods: {
      show () {
        this.sending = false;
        this.form = {};
        this.error = '';
        this.$modal.show('caixa');
      },
      hide () {
        this.$modal.hide('caixa');
      },
      change(index, value) {
        this.form[index] = value;
      },
      validate() {
        console.log(this.error)
        this.error = this.form['name'] != '' && this.form['name'] ? '' : 'Informe o nome';
        return this.error == '';
      },
      save () {
        this.sending = true;
        if(this.validate()) {
          this.form['saldo'] = 0;
          this.form['user_id'] = localStorage.getItem('id');
          axios.post('https://caixa-api.uc.r.appspot.com/api/caixas', this.form, {headers: {'content-type': 'application/json'}}).then(response => {
            this.sending = false;
            axios.get('https://caixa-api.uc.r.appspot.com/api/users/current?' + 'id=' + localStorage.getItem('id') + '&access_token='+localStorage.getItem('token')).then(response => {
              this.user = response.data.user[0];
              this.caixas = this.user.caixas;
              console.log(this.user);
            }).catch(error=> {
              console.log(error);
            });
            this.hide();
            console.log(response);
          }).catch(error => {
            this.sending = false;
            console.log(error);
          });
        }
        this.sending = false;
      }
    }
  }
</script>

<style>
  .app {
    text-align: left;
    justify-content: left;
    display: flex;
    min-height: 100vh;
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

  .dialog {
    padding: 25px;
    margin: auto !important;
    width: 500px !important;
    top: 0 !important;
    left: 0 !important;
    border-radius: 10px !important;
    text-align: center;
  }

  .close {
    position: absolute
  }

  .vm--container {
    width: 100%;
    height: 100vh;
    display: flex;
  }
</style>