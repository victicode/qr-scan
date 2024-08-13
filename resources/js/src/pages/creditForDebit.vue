<template>
  <div class="section_page q-mt-lg q-pt-lg">
    <div class="">
      <div class="text-subtitle1 text-weight-bold text-center">Retirá según tu tarjeta</div>
      <div class="q-px-md-xl q-px-md">
        <div class="q-pa-md select_card q-mt-md">
          <div class="flex" >
            <div style="width: 10%;" class="q-mr-sm text-center">
              <q-radio v-model="selectCard" checked-icon="eva-checkmark-circle-outline"  val="1" />
            </div>
            <div class="flex justify-between card_detail q-pb-sm" >
              <div>
                <div class="text-left text-body1">
                  Tarjeta de crédito
                </div>
                <div class="text-left text-body2 text-grey-6">
                  Plazo a 24 meses 
                </div>
              </div>
              <div>
                <div class="text-right text-weight-medium text-caption">
                  Préstamos hasta
                </div>
                <div class="text-right text-weight-bold text-body2">
                  {{ numberFormat(25000000) }}
                </div>
              </div>
            </div>

          </div>
          <div class="flex q-mt-md" >
            <div style="width: 10%;" class="q-mr-sm text-center">
              <q-radio v-model="selectCard" checked-icon="eva-checkmark-circle-outline"  val="2" />
            </div>
            <div class="flex justify-between card_detail q-pb-sm" >
              <div>
                <div class="text-left text-body1">
                  Tarjeta de débito
                </div>
                <div class="text-left text-body2 text-grey-6">
                  Hasta 18 cuotas
                </div>
              </div>
              <div>
                <div class="text-right text-weight-medium text-caption">
                  Préstamos hasta
                </div>
                <div class="text-right text-weight-bold text-body2">
                  {{ numberFormat(5000000) }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="text-h6 text-weight-bold q-mt-lg text-center">¿Por qué solicitamos esto?</div>
      <div class="q-px-md-xl q-px-md">
        <div class="q-pa-md why_section q-mt-md">
          <div class="flex items-center q-mt-md">
            <q-icon name="eva-checkmark-circle-2-outline" size="md" color="primary" />
            <div class="q-ml-sm text-weight-medium text-subtitle1">
              Constancia de que tienes empleo.
            </div>
          </div>
          <div class="flex items-center q-mt-md">
            <q-icon name="eva-checkmark-circle-2-outline" size="md" color="primary" />
            <div class="q-ml-sm text-weight-medium text-subtitle1">
              Flujo de efectivo constante.
            </div>
          </div>
          <div class="flex items-center q-mt-md">
            <q-icon name="eva-checkmark-circle-2-outline" size="md" color="primary" />
            <div class="q-ml-sm text-weight-medium text-subtitle1">
              Débitos automáticos.
            </div>
          </div>
        </div>
      </div>
      <div class="q-px-lg q-mt-xl q-px-md-xl q-mx-md-xl">
        <q-btn 
          color="primary" class="w-100 q-pa-sm q-mb-lg  link_button" 
          no-caps
          :loading="loading"
          @click="goTo()"
        >
          <div class="text-white q-mt-sm text-subtitle1 text-weight-medium"  >
            Vincular
          </div> 
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
  import { useAuthStore } from '@/services/store/auth.store'
  import { inject, ref } from 'vue'
  import util from '@/util/numberUtil'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      //vue provider
      const user = useAuthStore().user;
      const numberFormat = util.numberFormat
      const icons = inject('ionIcons')
      const q = useQuasar()
      const router = useRouter()
      const loading = ref(false)
      // Data
      const selectCard = ref(0)
      const goTo = () => {
        if(!verify()){
          showNotify('negative', 'Debe seleccionar el tipo de tarjeta')
          return
        }
        router.push('/linked_card/'+selectCard.value)
      }
      const verify = () => {
        
        return selectCard.value !== 0
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

      return{
        icons,
        user,
        numberFormat,
        selectCard,
        loading,
        goTo,
      }
    },
  }

</script>
<style>

</style>
<style lang="scss" scoped>
  .link_button  {
    border-radius: 15px!important;
  }
  .w-100{
    width: 100%;
  }
  .why_section {
    border-radius: 20px;
    background: #d9dff1;
  }
  .card_detail{
    width: 86%; 
    border-bottom: 1.5px solid #ececec;
  }
  .select_card{
    box-shadow: 0px 4px 8px 0px rgba(134, 134, 134, 0.397);
    border-radius: 20px;
  }
  .section_page {
    background: white;
    height: 100%;
    width: 100%;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  }
</style>