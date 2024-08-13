<template>
  <q-dialog v-model="dialog" persistent backdrop-filter="blur(8px)">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold"> Agregar {{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none" style="overflow-y: hidden"  v-if="type == 1" >
        <q-input 
          dense 
          v-model="setterVal" 
          clearable 
          clear-icon="eva-close-outline" 
          autofocus   
        />
      </q-card-section>
      <q-card-section class="q-pt-none" style="overflow-y: hidden"  v-if="type == 2" >
        <van-picker 
          v-model="setterVal" 
          :columns="index == 'due_date' ? days : amounts" 
          visible-option-num="7" 
          :show-toolbar="false"  
          class="van_picker_up" 
        />
      </q-card-section>
      <q-card-section class="q-pt-none" style="overflow-y: hidden"  v-if="type == 3" >
        <q-file  v-model="setterVal" clearable clear-icon="eva-close-outline"  autofocus dense >
          <template v-slot:prepend>
            <q-icon name="eva-attach-2-outline" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Volver" @click="hiddeModal()"/>
        <q-btn flat label="Confirmar" :loading="loading" @click="setValue()" > 
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';
  import util from '@/util/numberUtil'
 
  export default {
    props: {
      dialog: Boolean,
      input: Object,
    },
    emits: ['hiddeModal'],
    setup (props, { emit }) {

      //vue provider
      const user = useAuthStore().user;
      const router = useRouter()
      const dialog = props.dialog
      const type = props.input.type
      const index = props.input.index
      const title = props.input.title
      const setterVal = ref()
      const loading = ref(false)
      const numberFormat = util.numberFormat

      const days = user.is_first_loan 
      ?[
          { text: '15 días', value: 15 },
        ]
      : [
          { text: '7 días', value: 7 },
          { text: '10 días', value: 10 },
          { text: '15 días', value: 15 },
          { text: '30 días', value: 30 },
          { text: '60 días', value: 60 },
          { text: '75 días', value: 75 },
          { text: '90 días', value: 90 },

        ];

      const amounts = user.is_first_loan 
      ? [
          { text: 'Gs. '+numberFormat(100000), value: 100000 },
          { text: 'Gs. '+numberFormat(250000), value: 250000 },
          { text: 'Gs. '+numberFormat(500000), value: 500000 },
        ]
      : [
        { text: 'Gs. '+numberFormat(100000), value: 100000 },
        { text: 'Gs. '+numberFormat(250000), value: 250000 },
        { text: 'Gs. '+numberFormat(500000), value: 500000 },
        { text: 'Gs. '+numberFormat(750000), value: 750000 },
        { text: 'Gs. '+numberFormat(1000000), value: 1000000 },
        { text: 'Gs. '+numberFormat(1300000), value: 1300000 },
        { text: 'Gs. '+numberFormat(1500000), value: 1500000 },
        { text: 'Gs. '+numberFormat(2000000), value: 2000000 },
        { text: 'Gs. '+numberFormat(2500000), value: 2500000 },
        { text: 'Gs. '+numberFormat(3000000), value: 3000000 },
        { text: 'Gs. '+numberFormat(3500000), value: 3500000 },
        { text: 'Gs. '+numberFormat(3750000), value: 3750000 },
        { text: 'Gs. '+numberFormat(4000000), value: 4000000 },
        { text: 'Gs. '+numberFormat(4250000), value: 4250000 },
        { text: 'Gs. '+numberFormat(4500000), value: 4500000 },
        { text: 'Gs. '+numberFormat(4750000), value: 4750000 },
        { text: 'Gs. '+numberFormat(5000000), value: 5000000 },
      ]
      // Methods
      const hiddeModal = () => {
        emit('hiddeModal', null)
      }
      const setValue = () => {
        const value = type == 1
        ? setterVal.value
        : type == 2
        ? setterVal.value[0]
        : setterVal.value

        emit('hiddeModal', value)
      }

      const setValueByType = () => {
        if(props.input.value){
          setterVal.value = props.input.value
          return
        }

        setterVal.value = type == 1 
        ? ''
        : type == 2 
        ? [{text:'', value:''}]
        : null
      }
      onMounted(() => {
        setValueByType() 
      })

      return {
        loading,
        dialog,
        router,
        days,
        amounts,
        type,
        title,
        index,
        setterVal,
        hiddeModal,
        setValue,
      }
    }
  };
</script>
<style lang="scss">
.van_picker_up{
  transform: translateY(-10%); 
  height: 268px;

  & .van-ellipsis{
    font-size: 120%;
  }
  & [class*=van-hairline]:after{
    border-color: #000!important;
  }
}
</style>
