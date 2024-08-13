<template>
  <div  class="bg-primary" style="height: 100vh;">
    <div v-if="Object.values(transfer).length > 0" style="height: 100%;">

      <div id="topbarLayout" class="bg-primary q-pt-md">
        <div class="w-100 flex justify-between items-center h-100 q-pb-sm">
          <div class="boxNoVisible">
          </div>
          <div class="text-weight-bold text-h4 text-white">
            {{ route.meta.title == 'Banco' ? 'Cuenta bancaria' : route.meta.title}}
          </div>
          <div class="boxNoVisible">
          </div>
        </div>
      </div>
      <div>
        <div class="q-px-md q-mt-lg q-px-md-xl">
          <div class="recipe__card bg-white q-py-md ">
            <div class="recipe__card--header flex items-center w-100 q-pa-md q-px-md-lg ">
              <div class="w-50">
                <div>
                  <div class="text-weight-bold text-subtitle1">Comprobante</div>
                  <q-linear-progress 
                    rounded 
                    size="4px"  
                    :value="0.6" 
                    style="width: 70%;"
                    color="primary" reverse class="q-mt-none transfer__line" 
                  />
    
                </div>
              </div>
              <div class="w-50 flex justify-end">
                <div v-html="wozIcons.transferir" class="transfer-icon"/>
              </div>
            </div>
            <div class="q-px-md q-px-md-lg">
              <div class="recipe__list q-pt-sm q-mt-xs q-pb-xs">
                <div class="text-subtitle1 text-weight-bold">Monto</div>
                <div class="text-grey-8 text-caption text-weight-medium">Cantidad de dinero en Guaranies</div>
                <div class="text-primary text-weight-bold text-body1">
                  Gs. {{ numberFormat(transfer.amount) }}
                </div>
              </div>
              <div class="recipe__list q-pt-sm q-mt-xs q-pb-xs">
                <div class="text-subtitle1 text-weight-bold">Enviado a</div>
                <div class="text-grey-8 text-caption text-weight-medium">Titular Woz Pay</div>
                <div class="text-primary text-weight-bold text-body1">
                  {{ transfer.user_to.user.name }}
                </div>
              </div>
              <div class="recipe__list q-pt-sm q-mt-xs q-pb-xs">
                <div class="text-subtitle1 text-weight-bold">Documentación</div>
                <div class="text-grey-8 text-caption text-weight-medium">Documento de identificación</div>
                <div class="text-primary text-weight-bold text-body1">
                  {{ numberFormat(transfer.user_to.user.dni) }}
                </div>
              </div>
              <div class="recipe__list q-pt-sm q-mt-xs q-pb-xs">
                <div class="text-subtitle1 text-weight-bold">Concepto</div>
                <div class="text-grey-8 text-caption text-weight-medium">Motivo del envio</div>
                <div class="text-primary text-weight-bold text-body1">
                  {{ transfer.concept }}
                </div>
              </div>
            </div>
            <div class="q-px-md-xl q-mb-md">
              <div class="q-px-xl q-mt-lg q-px-md-xl q-mx-md-xl">
                <q-btn 
                  color="primary" class="w-100 q-pa-md back__to" 
                  no-caps
                  label="Volver al incio"
                  @click="router.go(-3)"
                >
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-px-md-xl q-pt-sm">
        <div class="q-px-lg q-mt-lg q-px-md-xl q-mx-md-xl">
          <q-btn 
            color="negative" class="w-100 q-pa-md donwload" 
            no-caps
          >
          <div class="flex flex-center">
            <div class="q-mr-xs q-mt-xs">
              Descargar
            </div>
            <div v-html="wozIcons.pdf" />
          </div>
          </q-btn>
        </div>
      </div>
    </div>

  </div>
</template>
<script >
  import { inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import wozIcons from '@/assets/icons/wozIcons'
  import { useQuasar } from 'quasar';
  import { useTransferStore } from '@/services/store/transfer.store'
  import util from '@/util/numberUtil'

  export default {
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const route = useRoute();
      const router = useRouter();
      const $q = useQuasar()
      const transferId = route.params.id 
      const storeTransfer = useTransferStore()
      const transfer = ref({})
      const numberFormat = util.numberFormat

      const getTransfer = () => {
        storeTransfer.getTransfer(transferId)
        .then((data) => {
          transfer.value = data.data
        })
      }
      onMounted(()=>{
        $q.addressbarColor.set('#0449fb')
        getTransfer()
      })
      return {
        icons,
        router,
        route,
        wozIcons,
        transfer,
        numberFormat,
      }
    }
  };
</script>
<style lang="scss" scoped>
.donwload {
  border-radius: 15px!important;
}
.back__to  {
  border-radius: 50px!important;
}
.w-100{
  width: 100%;
}
.w-50 {
  width: 50%;
}
.recipe__card {
  border-radius: 20px;
  &--header {
    border-bottom: 1.5px solid $primary;
  }
}
.recipe__list{
  border-bottom: 1px solid $grey-6;
}
.boxNoVisible {
  width: 72px;
  height: 72px;
  visibility: hidden;
}
.h-100{
  height: 100%;
}
#topbarLayout{
  height: 10%;
  width: 100%;
  // border-bottom: 1px solid lightgray;
}
</style>

<style lang="scss">
.transfer-icon {
  &  > svg {
    transform: rotate(-45deg) scale(0.8);
  }
}
.transfer__line {
  border-radius: 155px;

  & .q-linear-progress__track{
    opacity: 1;
    border-radius: 155px;
  }
  & .q-linear-progress__model {
    border-radius: 155px;
  }
}
</style>