<template>
  <div style="height: 91vh; overflow-y: auto;">
    <div class="q-pa-md-md q-pa-sm q-px-md q-mb-xl" >
      <Transition name="inFade">
        <div v-if="ready">
          <div>
            <div class="text-body2 text-weight-bold q-mb-md q-pt-sm ">¿Por qué pedimos que cargues tu billetera?
            </div>
            <div class="benefict-options__container q-pa-md">
              <div class="text-weight-medium q-mb-xs">• Debito de los préstamos</div>
              <div class="text-weight-medium q-mb-xs">• Pago de servicios</div>
              <div class="text-weight-medium ">• Mayor posibilidad de préstamos</div>
            </div>
          </div>
          <div class="q-mt-md">
            <div>
              <div class="text-body1 text-weight-bold q-mb-none q-pt-sm "  >
                Escoge cuánto cargar
              </div>
              <div class="text-caption text-weight-medium q-mb-sm " style="font-size: 0.73rem!important;">
                Podrás usar este saldo para pagos de servicios y cuotas.
              </div>
            </div>
            <div class="q-mt-md">
              <div v-for="(n, key) in amountList" :key="key" class=" q-mb-md amount__container q-pl-md" @click="selectAmount(key)">
                <div class="text-weight-medium">Gs {{ numberFormat(n) }}</div>
                <div></div>
              </div>
            </div>
          </div>
          <div class="q-mt-md">
            <div>
              <div class="text-body2 text-weight-bold q-mb-xs q-pt-sm ">
                ¿Quieres cargar un monto personalizado?
              </div>
              <div class="text-caption text-weight-medium q-mb-sm " style="font-size: 0.73rem!important;">
                Indica cuánto quieres cargar en tu billetera
              </div>
            </div>
            <div class="q-mt-lg q-px-sm">
              <div>
                <q-input 
                  v-model="amount" 
                  placeholder="GS. 0" 
                  class="amount_diff" 
                  mask="###.###.###.###"
                  reverse-fill-mask 
                />
              </div>
            </div>
            <div class="q-pt-xs q-mx-md-xl q-px-md-sm">
              <q-btn 
                label="Pagar con Tpago" 
                unelevated
                no-caps 
                type="submit" 
                color="primary" 
                class="full-width q-mt-lg rounded_button" 
                :loading="loading=='tpago'"
                @click="getUrlPay()" 
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
              <q-btn 
                label="Pagar con Tigo Money" 
                unelevated
                no-caps 
                type="submit" 
                color="tigo" disabled
                class="full-width q-mt-lg rounded_button position-relative" 
                :loading="loading=='tigo'" 
              >
                <div class="flex flex-center unavailable-button">
                  <q-icon name="eva-lock-outline"></q-icon>
                </div>
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
              <q-btn 
                label="Pagar con Personal Pay" 
                unelevated
                no-caps 
                type="submit" 
                color="personal" disabled
                class="full-width q-mt-md rounded_button position-relative" 
                :loading="loading=='personal'" 
                
              >
                <div class="flex flex-center unavailable-button">
                  <q-icon name="eva-lock-outline"></q-icon>
                </div>
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-subtitle1 text-weight-bold q-mb-sm  "> <q-skeleton type="text" width="30%" /></div>
          <div v-for="n in 8" :key="n" class=" q-px-sm q-mb-md bank__section_skeleton" >
            <q-skeleton type="QBtn" width="20%" height="15px" />
          </div>
        </div>
      </Transition> 
      <div>
        <waitModal :dialog="dialog" />
      </div>
    </div>
  </div>
</template>
<script>
  import { onMounted, ref } from 'vue'
  import wozIcons from '@/assets/icons/wozIcons'
  import util from '@/util/numberUtil'
  import { usePayStore } from '@/services/store/pay.store'
  import { useQuasar } from 'quasar';
  import waitModal from '@/components/layouts/modals/waitModal.vue';

  export default {
    components: {
      waitModal,
    },
    setup () {
      const ready = ref(true)
      // const router = useRouter()
      const numberFormat = util.numberFormat
      const loading = ref('')
      const payStore = usePayStore()
      const q = useQuasar()
      const dialog = ref(false)
      const amountList = [
        30000,
        60000,
        100000,
        150000
      ]
      const amount = ref('')
      const payForm = ref('')

      const loadingShow = (state) => {
        loading.value = state;
      }
      const selectAmount = (index) => {
        amount.value = amountList[index]
      }
      const getUrlPay = () => {
        loadingShow('tpago')
        dialog.value = true
        const data = {
          amount: formatAmount(),
          type: 1,
          debitDay: new Date().getDate()
        }
        payStore.payRequest(data)
        .then((response) => {
          if(response.code !== 200) throw response

          payForm.value = response.data.payment_link.link_url ?? response.data.subscription_link

          setTimeout(() => {
            loadingShow('')
            dialog.value = false
            openTpagoWindow()
          }, 1000);
        }).catch(() =>{
          showNotify.apply('negative', 'Error para procesar el pago')
        })

      }
      const formatAmount = () => {
        return parseInt(amount.value.replace(/\./g, ''))
      }
      const showNotify = (type, message) => {
        q.notify({
          message: message,
          color: type,
          actions: [
            { icon: 'eva-close-outline', color: 'white', round: true, handler: () => { /* ... */ } }
          ]
        })
      }
      const openTpagoWindow = () => {
        var ventana = window.open(payForm.value, 'pago', `height=${q.screen.height},width=${q.screen.width}`);
        setTimeout(() => {
          ventana.document.close();
          ventana.focus();
          return true;
        }, 1000);
      }
      onMounted(() => {
      })
      return { ready, wozIcons, numberFormat, amountList, amount, loading, payForm, dialog, getUrlPay, selectAmount, }
    },
  }
</script>
<style lang="scss" scoped>
.unavailable-button {
  position: absolute; bottom: 0; top: 0; left: 0; right: 0; background: rgba(12, 12, 12, 0.397); 
}
.bank__section_skeleton{
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;

}
.benefict-options__container{
  border: 1.5px solid $primary;
  border-radius: 15px;
}
.amount__container{
  border: 1px solid $grey-5;
  border-radius: 10px;
  height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 2px 5px 0px lightgrey;
}
</style>
<style>
.bg-tigo {
  background: #fab32a!important;
}
.text-tigo {
  color: #fab32a!important;
}
.bg-personal{
  background: #6128be!important;
}
.text-personal{
  color: #6128be!important;
}
.rounded_button{
  border-radius: 12px!important;
  padding: 0.8rem 0px!important;
}
.amount_diff input{
  text-align: center;
  color: rgb(71, 71, 71);
  font-size: 35px;
  transform: translateY(5px);

}
.amount_diff input::placeholder{
  color: rgb(165, 165, 165);
  text-align: center;

}
</style>