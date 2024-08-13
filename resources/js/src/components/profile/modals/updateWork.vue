<template>
  <q-dialog v-model="updateInfoDialog" persistent backdrop-filter="blur(8px)">
      <q-card style="min-width: 350px; transform:translateY(-25%)" >
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold"> {{ setTitleByOperation() }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-if="dialogType == 'work'"  class="position-relative relative">
            <!-- <q-input dense v-model="copyValue" clearable clear-icon="eva-close-outline" autofocus  /> -->
            <q-select
              v-model="copyValue"
              clearable
              use-input
              clear-icon="eva-close-outline" autofocus 
              transition-show="scale"
              transition-hide="scale"
              label="Selecciona tu tipo de empleo"
              :options="workOptions"
              hint="Ej. Empleado, independiente, o empleador"
              dropdown-icon="eva-chevron-down-outline"
              class="selectedWorkType"
              behavior="menu"
              @filter="filterWork"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div v-if="dialogType == 'office'" >
            <q-input 
              dense 
              v-model="copyValue" 
              clearable 
              clear-icon="eva-close-outline" 
              autofocus  
              hint="Ej. Analista IT, Gerente de operaciones, Operador"
            />
          </div>
          <div v-if="dialogType == 'salary'" >
            <!-- <q-input dense v-model="copyValue" clearable clear-icon="eva-close-outline" autofocus  /> -->
            <q-range
              class="q-my-sm q-px-sm"
              v-model="salaryRange"
              color="green"
              markers
              label-always
              :left-label-value="minPriceLabel"
              :right-label-value="maxPriceLabel"
              :marker-labels="rangeSalaryMarkets"
              switch-label-side
              switch-marker-labels-side
              :min="0"
              :max="8000000"
              @update:model-value="updateForSlider()"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Volver" @click="hideModal(null)"/>
          <q-btn flat label="Confirmar" :loading="loading" @click="uptadteInfo()" > 
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>
<script>
  import { ref, onMounted, computed } from 'vue';
  import { useUserStore } from '@/services/store/user.store'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import util from '@/util/numberUtil'

  export default {
    props: {
      dialog: Boolean,
      dialogToshow: String,
    },
    emits: ['hideModal'],
    setup (props, { emit }) {
      //vue provider
      const store = useUserStore();
      const authStore = useAuthStore();
      let user = useAuthStore().user;
      const $q = useQuasar();
      const numberFormat = util.numberFormat
      const moneyFormat = util.moneyFormat

      // Data
      const salaryRange = ref({
        min: 0,
        max: 0
      })
      const works = [
        'Trabajador/a independiente', 
        'Trabajador/a publico', 
        'Trabajador/a privado', 
        'Empleador/a', 
        'Jubilado/a' ,
        'Fuerza Armada',
        ' Obrero/a', 
        'Desempleado/a',
        'Estudiante', 
      ]
      const rangeSalaryMarkets = [
        { value: 0, label: '0Gs' },
        { value: 2500000, label: `Gs ${numberFormat(2.5)}Mill`},
        { value: 6000000, label: `Gs ${numberFormat(6)}Mill`},
      ]
      const workOptions = ref(works)
      const loading = ref(false);
      const updateInfoDialog = props.dialog;
      const dialogType = props.dialogToshow;
      const copyValue = ref('');

      // Methods
      const loadingShow = (state) => {
        loading.value = state;
      }
      const showNotify = (type, message) => {
        $q.notify({
          message: message,
          color: type,
          actions: [
            { icon: 'eva-close-outline', color: 'white', round: true, handler: () => { /* ... */ } }
          ]
        })
      }
      const setModelInput = () => {
        if(dialogType == 'work')   copyValue.value = user.work ;
        if(dialogType == 'office') copyValue.value = user.office;
        if(dialogType == 'salary') {
          try{
            salaryRange.value.min = parseFloat(user.salary.split('-')[0].trim())*1000000
            salaryRange.value.max = parseFloat(user.salary.split('-')[1].trim())*1000000
          }catch{

          }
            
        }
      }
      const setSendData = () => {
        if(dialogType == 'work') {
         return {
          id: user.id,
          work: copyValue.value
         } 
        }     
        if(dialogType == 'office') {
         return {
          id: user.id,
          office: copyValue.value
         }   
        } 
        if(dialogType == 'salary') {
         return {
          id: user.id,
          salary: copyValue.value
         } 
        }   
      }
      const setTitleByOperation = () => {
        if(dialogType == 'work') return 'Selecciona tu tipo de empleo';
        if(dialogType == 'office') return 'Ingresa tu cargo';
        if(dialogType == 'salary') return 'Ingresa tú rango de salario';
      }
      const hideModal = (data) => {
        emit('hideModal', data)
      }
      const uptadteInfo = () =>{
        if(!validateform()) return
        loadingShow(true)
        store.updateUser(setSendData())
        .then((data)=> {
          if(!data.code){
              showNotify('negative', data)
              loadingShow(false);
              return;
            }
            setTimeout(() => {
              authStore.$patch({ user: data.data })
              console.log(data.data)
              showNotify('positive', 'Datos actualizados')
              loadingShow(false);
              hideModal()
            }, 1000);
        })
        .catch((e) => { 
          console.log(e)
          loadingShow(false);
          showNotify('negative', 'Error al enviar codigo')
        })
      }
      const filterWork = (val, update) => {
        setTimeout(() => {
          update(() => {
            if (val === '') {
              workOptions.value = works
            }
            else {
              const search = val.toLowerCase()
              workOptions.value = works.filter(v => v.toLowerCase().indexOf(search) > -1)
            }
          })
        }, 500)
      }
      const validateform = () => {
        if( (!copyValue.value || copyValue.value.length < 3) ) {
          showNotify('negative', 'Dato ingresado no perimitido')
          return false
        }
        return true
      }
      const updateForSlider = () => {
        copyValue.value =  `${moneyFormat(salaryRange.value.min)} - ${moneyFormat(salaryRange.value.max)}`
      }

      onMounted(() => {
        setModelInput()
      })
      return {
        loading,
        user,
        updateInfoDialog,
        copyValue,
        hideModal,
        setTitleByOperation,
        setModelInput,
        uptadteInfo,
        dialogType,
        model: ref(null),
        workOptions,
        filterWork,
        salaryRange,
        updateForSlider,
        rangeSalaryMarkets,
        minPriceLabel: computed(() => `${moneyFormat(salaryRange.value.min)} Gs.`),
        maxPriceLabel: computed(() => `${moneyFormat(salaryRange.value.max)} Gs.`),
      }
    }
  };
</script>

<style lang="scss">
.selectedWorkType {
  & .q-field__label {
   transform: translateY(-70%) scale(0.75)!important
  }
}
</style>
