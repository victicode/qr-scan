
<template>
  <div class="apply_section" >
    <div class="q-pb-lg" v-if="Object.values(user).length > 0 && !isCurrentLoan" >
      <q-stepper
        v-model="step"
        ref="stepper"
        contracted
        color="primary"
        animated
        class="no-header-steper"
      >
        <q-step
          :name="1"
          title="Select campaign settings"
          icon="settings"
          :done="step > 1"
        >
          <div class="w-100 q-mx-none" >
            <q-toolbar class="bg-grey-5 text-black ">
              <q-toolbar-title> 
                <div class="w-100 flex items-center justify-between">
                  <span class="text-subtitle2 text-weight-bold q-mt-sm">Datos laborales</span>
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list >
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'business')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Empresa
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.business ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'business_address')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Dirección
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.business_address ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'business_phone')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Número de teléfono
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.business_phone ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section>
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Aporta IPS
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="q-mt-none">
                      <q-toggle size="md" color="positive" v-model="readTapes.ips" :val="true"  />

                    </q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
            <q-toolbar class="bg-grey-5 text-black q-mt-sm">
              <q-toolbar-title> 
                <div class="w-100 flex items-center justify-between">
                  <span class="text-subtitle2 text-weight-bold ">Referencia laboral</span>
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list >
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'boss_name')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Nombre de tu jefe directo
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.boss_name ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'boss_phone')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      WhatsApp de tu jefe
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.boss_phone ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
            <q-toolbar class="bg-grey-5 text-black q-mt-sm">
              <q-toolbar-title> 
                <div class="w-100 flex items-center justify-between">
                  <span class="text-subtitle2 text-weight-bold q-mt-sm">Referencia personal</span>
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list >
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'reference_name')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Nombre y apellido
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.reference_name ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'reference_relationship')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Parentesco
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.reference_relationship ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(1, 'reference_phone')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      WhatsApp
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.reference_phone ?? 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </div>
        </q-step>
        <q-step
          :name="2"
          title="Select campaign settings"
          icon="settings"
          :done="step > 2"
        >
          <div class="w-100 q-mx-none" >
            <q-toolbar class="bg-grey-5 text-black ">
              <q-toolbar-title> 
                <div class="w-100 flex items-center justify-between">
                  <span class="text-subtitle2 text-weight-bold q-mt-sm">Informconf</span>
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list >
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(3, 'informconf')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Certificado - reporte de Informconf
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.informconf ? readTapes.informconf.name : 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
            <q-toolbar class="bg-grey-5 text-black q-mt-sm">
              <q-toolbar-title> 
                <div class="w-100 flex items-center justify-between">
                  <span class="text-subtitle2 text-weight-bold ">Comprobante de ingresos</span>
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list >
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(3, 'work_certificate')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Certificado laboral firmado
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.work_certificate ? readTapes.work_certificate.name : 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(3, 'last_ips')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Tres ultimos IPS
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ readTapes.last_ips ? readTapes.last_ips.name : 'Agregar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              
            </q-list>
            <q-toolbar class="bg-grey-5 text-black q-mt-sm">
              <q-toolbar-title> 
                <div class="w-100 flex items-center justify-between">
                  <span class="text-subtitle2 text-weight-bold q-mt-sm">Linea de crédito disponible</span>
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-list >
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(2, 'amount')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                     {{ user.is_first_loan ? 'Primer préstamo' : 'Préstamo' }} 
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ loan.amount ? 'Gs.' + numberFormat(loan.amount) : 'Seleccionar' }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section @click="showInputModal(2, 'due_date')">
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Plazo
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">{{ loan.due_date  ? loan.due_date + ' días' : 'Seleccionar' }} </q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item class="q-py- q-px-sm" >
                <q-item-section>
                  <div class="flex items-center justify-between">
                    <q-item-label class="q-mt-xs text-weight-bold" >
                    <span class="text-body2 text-weight-bold">
                      Total a devolver
                    </span>
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-weight-medium text-body2">Gs. {{ numberFormat(loan.amountToPay) }}</q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
            <div class="q-px-md">
              <div class="q-mt-lg more_money_requiriments q-pa-sm">
                <div class="text-body1 text-center text-weight-bold"> ¿Quieres una linea de crédito superior?</div>
                <div class="q-mt-md q-pl-lg">
                  <div class="q-mb-md text-weight-medium text-body2">• Carga y mantén un saldo de Gs. 500.000</div>
                  <div class="q-mb-md text-weight-medium text-body2">• Paga tus facturas de Aqui Pago</div>
                  <div class="q-mb-md text-weight-medium text-body2">• Adquiere una membresia de Woz Paraguay</div>
                  <div class="q-mb-md text-weight-medium text-body2">• Compra un libro digital de Woz Dropshipping</div>
                </div>
              </div>
            </div>
          </div>
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation class="q-mt-md flex justify-end q-mx-md-xl q-mb-xl">
            <q-btn v-if="step > 1"  color="grey-6" @click="$refs.stepper.previous()" class="w-100 q-pa-sm q-mb-md" label="Volver"  />
            <q-btn 
              @click=" step == 1 ? $refs.stepper.next() : createApplyLoan()" 
              color="primary" class="w-100 q-pa-sm q-mb-xl" 
              :label="step === 2 ? 'Presentar solicitiud' : 'Siguente'" 
              :loading="loading"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
    <div class="q-mt-xl q-px-md" v-else>
      <div>
        <div class="text-h6 text-center text-weight-bold">
          Ya tienes un préstamo activo, termina de pagarlo para obtar por otro.
        </div>

        <div class="flex justify-center q-mt-lg ">
          <q-btn color="primary" label="volver" class="q-px-md" size="md"  @click="router.push('/')"  style="width: 50%;" />
        </div>
      </div>
    </div>
    <div v-if="sendLoading">
      <doneModal :dialog="sendLoading" :text="'Solicitud enviada'" />
    </div>
    <div v-if="dialog == 'redirect'">
      <redirectModal :dialog="(dialog == 'redirect')" :type="redirectType" />
    </div>
    <div v-if="dialog == 'setValue'">
      <setValueModal  :dialog="(dialog == 'setValue')" :input="input"  @hiddeModal="hiddeModal"/>
    </div>
    
  </div>
</template>

<script>
  import { ref, inject, onMounted } from 'vue';
  import { useAuthStore } from '@/services/store/auth.store'
  import { useLoanStore } from '@/services/store/loan.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';
  import redirectModal from '@/components/creditApply/modals/redirectModal.vue';
  import setValueModal from '@/components/creditApply/modals/setValueModal.vue';
  import doneModal from '@/components/layouts/modals/doneModal.vue';

  import util from '@/util/numberUtil'

  export default {
    components: {
      redirectModal,
      setValueModal,
      doneModal
    },
    setup () {
      const q = useQuasar()
      const router = useRouter()
      const user = useAuthStore().user;
      const loanStore = useLoanStore();
      const numberFormat = util.numberFormat
      
      
      // Data
      const isCurrentLoan = ref(true)
      const sendLoading = ref(false);
      const dialog = ref('')
      const redirectType = ref(0);
      const loading = ref(false)
      const step = ref(1)
      const isUserApply = ref(true)
      const input = {
        title: '',
        type: 1,
        index:'',
      }
      const readTapes = ref({
        business: null,
        business_address: null,
        business_phone: null,
        ips:false,
        boss_name: null,
        boss_phone: null,
        reference_name: null,
        reference_phone: null,
        reference_relationship: null,
        informconf: null,
        work_certificate: null,
        last_ips: null,
        
      })
      const loan = ref({
        amount: null,
        amountToPay: 0,
        due_date:null,
      })

      const titleText = {
        business: 'Empresa',
        business_address: 'Dirección de empresa',
        business_phone: 'Teléfono de empresa',
        boss_name: 'Nombre de jefe',
        boss_phone: 'WhatsApp de jefe',
        reference_name: 'Nombre completo de referencia',
        reference_phone: 'WhatsApp de referencia',
        reference_relationship: 'Parentesco de referencia',
        informconf: 'Informconf',
        work_certificate: 'Certificado Laboral',
        last_ips: 'Ultimos tres ultimos Ips',
        amount: 'Monto de prestamo',
        due_date: 'Plazo',
      }


      // Methods
      const validateUser = () => {
        if(user.verify_status != 2 ) {
          isUserApply.value = false
          redirectType.value = 2
          return isUserApply.value
        }

        const dontValidate = ['is_public','email_verified_at','is_first_loan','created_at', 'updated_at', 'deleted_at',]

        Object.entries(user).forEach( ([key, value]) => {
          if(dontValidate.includes(key)) return
          if(!value) isUserApply.value = false
        });

        redirectType.value = 1
        return isUserApply.value
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
      const loadingShow = (state) => {
        loading.value = state;
      }
      const loadingDone = (state) => {
        sendLoading.value = state;
      }

      const showModal = (data) => {
        dialog.value = data
      }
      const showInputModal = (type, index) => {
        input.type = type;
        input.index = index;
        input.title = titleText[index];
        input.value = type != 2 ? readTapes.value[input.index] : [loan.value[input.index]]

        showModal('setValue')
      }
      const setInput = (data) => {
        input.type != 2 
        ? readTapes.value[input.index] = data
        : loan.value[input.index] = data
        calulateTotalAmount(data)
      }

      const calulateTotalAmount = (data) => {
        if(input.index == 'amount') 
          loan.value['amountToPay'] = (parseInt(data) * 0.70) + parseInt(data) 
      }
      const hiddeModal = (data) => {
        dialog.value = ''
        if(!data) return
        setInput(data)
      }
      const createApplyLoan = () => {
        if(!validateForm()){
          showNotify('negative', 'Tienes que llenar todo el formulario')
          return
        }

        loadingShow(true)
        const formData = new FormData()
        formData.append('business', readTapes.value.business)
        formData.append('business_address', readTapes.value.business_address)
        formData.append('business_phone', readTapes.value.business_phone)
        formData.append('ips', readTapes.value.ips)
        formData.append('boss_name', readTapes.value.boss_name)
        formData.append('boss_phone', readTapes.value.boss_phone)
        formData.append('reference_name', readTapes.value.reference_name)
        formData.append('reference_phone', readTapes.value.reference_phone)
        formData.append('reference_relationship', readTapes.value.reference_relationship)
        formData.append('informconf', readTapes.value.informconf)
        formData.append('last_ips', readTapes.value.last_ips)
        formData.append('work', readTapes.value.work_certificate)


        formData.append('amount', loan.value.amount)
        formData.append('amountToPay', loan.value.amountToPay)
        formData.append('due_date', loan.value.due_date)



        loanStore.createLoan(formData)
        .then((data) => {
          if(!data.code) throw data
          loadingDone(true)
          loadingShow(false)
          setTimeout(() => {
            router.push('/')
          }, 3500);
        }).catch((e) => {
          console.log(e)
          showNotify('negative', 'Error al enviar la solicitud')
        })
        
      }
      const validateForm = () => {
        let isValid = true 
        const dontValidate = ['ips','amountToPay']
        const formInputs = Object.assign({}, readTapes.value, loan.value);

        Object.entries(formInputs).forEach( ([key, value]) => {
          if(dontValidate.includes(key)) return
          if(!value) isValid = false
          // console.log([key, value])
        });
        
        return isValid
      }

      const activeLoan = () => {
        loanStore.getLoan(user.id).then((data) => {
          if(!data.code)  throw data
          isCurrentLoan.value = data.data ? true : false 
            
        }).catch((e) => {
          showNotify('negative', 'error al obtener prestamo activo')
        })
      }

      onMounted(() => {
        if(!validateUser()){
          showModal('redirect')
        }
        activeLoan()
      })

      return {
        loading,
        sendLoading,
        user,
        dialog,
        readTapes,
        step,
        redirectType,
        loan,
        input,
        numberFormat,
        isCurrentLoan,
        router,
        showModal,
        hiddeModal,
        showInputModal,
        createApplyLoan,
      }
    }
  };
</script>
<style lang="scss">
#logout-button {
  padding: 10px;
}
.apply_section {
  height: 115%; 
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.text-auto-phase {
  word-break: auto-phrase!important;
}
.no-header-steper {
  box-shadow: none!important;

  & .q-stepper__header {
    display: none;
  }
  & .q-stepper__step-inner{
    padding: 0px!important
  }
}
</style>
<style lang="scss" scoped>
.w-100{
  width: 100%!important;
}
.more_money_requiriments {

  background: #e1e9fe;
  border-radius: 15px;

}
</style>