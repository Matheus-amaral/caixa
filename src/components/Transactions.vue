<template>
  <Menu class="app">
    <div class="texts">
      <h1 class="title light-text">Transações do {{caixa['name']}}!</h1>
      <Button style="width:278" @click="show()" label="Nova transação"/>
      <h2 class="light-text">Saldo atual: R$ {{ !Number.isInteger(caixa.saldo) ? caixa.saldo.toLocaleString('pt-BR') : caixa.saldo.toLocaleString('pt-BR')+',00' }}</h2>
      <h2 class="light-text">Ultimas transações:</h2>
    </div>

    <div class="transaction-card-list" v-if="transactions.length">
      <Card :category="transaction.type" v-for="transaction in transactions" v-bind:key="transaction">
        Operação: {{ transaction.type == 'entrada' ? 'Entrada' : 'Saida' }}
        <br/>
        Categoria: {{ transaction.category ? transaction.category.name : '' }}
        <br/>
        Valor: R$ {{ !Number.isInteger(transaction.amount) ? transaction.amount.toLocaleString('pt-BR') : transaction.amount.toLocaleString('pt-BR')+',00' }}
        <br/>
        Data: {{ formatedDate(transaction.date) }}
      </Card>
    </div>
    <div style="margin-left:20px" v-else>Você não possui nenhuma transação realizada!</div>
    <modal name="transaction" classes="transaction-dialog" height="auto">
      <FloatingActionButton @click="$modal.hide('transaction')" class="close" icon="times"/>
      <p>Informe os dados da nova transação!</p>
      <Input :currency="true" name="amount" label="Valor" placeholder="Valor" @change="change" :error="error['amount']"/>
      <Select :options="types" name="type" label="Tipo" placeholder="Selecione o tipo" @change="change" :error="error['type']"/>
      <Select :options="categories" name="category_id" label="Categoria" placeholder="Selecione uma categoria" @change="change" :error="error['category']"/>
      <TextArea name="description" label="Descrição" placeholder="Descrição..." @change="change" :error="error['description']"/>
      <Button label="Cadastrar" :sending="sending" @click="save()"/>
    </modal>
  </Menu>
</template>

<script>
  import Menu from './Menu.vue'
  import Card from './TransactionCard.vue'
  import Input from './Input.vue'
  import TextArea from './TextArea.vue'
  import Select from './Select.vue'
  import Button from './Button.vue'
  import FloatingActionButton from './FloatingActionButton.vue'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    name: 'Caixas',
    components: { Menu, Card, Input, Select, Button, FloatingActionButton, TextArea },
    data() {
      return {
        transactions: [],
        categories: [],
        category: {},
        types: [{id:'entrada', name: 'Entrada'}, {id:'saida', name: 'Saida'}],
        caixa: {},
        form: {},
        error: '',
        sending: false,
        id: 0
        
      };
    },
    created() {
        this.id = this.$route.params.id;
    },
    mounted() {
      axios.get('https://caixa-api.uc.r.appspot.com/api/caixas/transactions?' + 'id=' + this.id + '&access_token='+localStorage.getItem('token')).then(response => {
        this.caixa = response.data.caixa[0];
        this.transactions = this.caixa.transactions;
        console.log(this.caixa)
      }).catch(error=> {
        console.log(error);
      });

      axios.get('https://caixa-api.uc.r.appspot.com/api/categories?&access_token='+localStorage.getItem('token')).then(response => {
        this.categories = response.data;
      }).catch(error=> {
        console.log(error);
      });
    },
    methods: {
      show () {
        this.sending = false;
        this.form = {};
        this.error = {
          'amount': '',
          'description': '',
          'category': '',
          'type': ''
        };
        this.$modal.show('transaction');
      },
      hide () {
        this.$modal.hide('transaction');
      },
      change(index, value) {
        this.form[index] = value;
      },
      formatedDate(date) {
        return moment(date).format('DD/MM/Y hh:mm');
      },
      validate() {
        this.error['amount'] = this.form['amount'] != '' && this.form['amount'] ? '' : 'Informe o valor';
        this.error['description'] = this.form['description'] != '' && this.form['description'] ? '' : 'Informe a descrição';
        this.error['category'] = this.form['category_id'] != '' && this.form['category_id'] ? '' : 'Informe a categoria';
        this.error['type'] = this.form['type'] != '' && this.form['type'] ? '' : 'Informe o tipo';
        return this.error['amount'] == '' && this.error['description'] == '' && this.error['category'] == '';
      },
      async save () {
        this.sending = true;
        this.form['amount'] = this.form['amount'].replace("R$ ", "");
        this.form['amount'] = this.form['amount'].replace(/\./g,'');
        this.form['amount'] = this.form['amount'].replace(",", ".");
        this.form['amount'] = parseFloat(this.form['amount']);
        console.log(parseFloat(this.form['amount']));
        if(this.validate()) {
          this.form['date'] = moment();
          this.form['caixa_id'] = this.caixa['id'];
          console.log(this.form.amount);
          await axios.post('https://caixa-api.uc.r.appspot.com/api/transactions', this.form, {headers: {'content-type': 'application/json'}}).then(response => {
            this.sending = false;
            this.hide();
            axios.get('https://caixa-api.uc.r.appspot.com/api/caixas/transactions?' + 'id=' + this.caixa.id + '&access_token='+localStorage.getItem('token')).then(response => {
              this.caixa = response.data.caixa[0];
              this.transactions = response.data.caixa[0].transactions;
              console.log(this.caixa)
            }).catch(error=> {
              console.log(error);
            });
            console.log(response);
          }).catch(error => {
            this.sending = false;
            this.$swal({
              html:
                'Ocorreu um erro, ' +
                'o valor a ser retirado não pode ser maior que o saldo do caixa!'      
            }).then(response => {
              console.log(response)
              this.hide();
            });
            console.log(error);
          });
        }
        this.sending = false;
      },
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

  .transaction-card-list {
    display: block;
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

  .transaction-dialog {
    padding: 25px;
    margin: auto !important;
    width: 500px !important;
    top: 0 !important;
    left: 0 !important;
    border-radius: 10px !important;
    text-align: center;
  }

  .close {
    position: absolute;
  }

  .vm--container {
    width: 100%;
    height: 100vh;
    display: flex;
  }

  .swal2-confirm {
    width: 258px !important;
    height: 20 !important;
    margin: auto !important;
    margin-top: 10px !important;
    padding: 10px !important;
    border-radius: 20px !important;
    justify-content: center !important;
    display:flex !important;
    background-color: #1fc8db !important;
    background-image: linear-gradient(141deg, #1fc8db 40%, #2cb5e8 75%);
    color: white; 
    height: 40px !important;
    font-size: 12px !important;
    font-weight: 300 !important;
    transition: 2s;
  }

  .swal2-confirm:focus {
    outline-width: 0;
  }
</style>