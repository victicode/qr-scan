<template>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px)">
    <transition name="horizontal">
      <q-card style="width: 300px" v-if="step == 1">
        <q-card-section class="row items-center q-pb-none text-h6">
          {{ readyScanner ? 'Escane el codigo!' : 'Cargando...' }}
        </q-card-section>
        <q-card-section>
          <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="hiddeModal()" />
        </q-card-actions>
      </q-card>
    </transition>
    <transition name="horizontal">
      <q-card style="width: 300px" v-if="step == 2">
        <q-card-section class="row items-center q-pb-none text-h6">
          {{ ready ? 'Codigo escaneado!🎉': 'Procesando...' }}
        </q-card-section>
        <q-card-section>
         
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="hiddeModal()" />
        </q-card-actions>
      </q-card>
    </transition>
    <transition name="horizontal">
      <q-card style="width: 300px" v-if="step == 3">
        <q-card-section class="row items-center q-pb-none text-h6">
          Error al escanear
        </q-card-section>
        <q-card-section class="text-subtitle1 text-weight-medium">
         {{ textError }}. 🚩
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Reintentar" color="primary" @click="step = 1; readyScanner = false" />
        </q-card-actions>
      </q-card>
    </transition>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import { inject } from 'vue'
import { useAuthStore } from '@/services/store/auth.store'
import { StreamBarcodeReader } from "vue-barcode-reader";
import { useQrStore } from '@/services/store/qr.store'
import { useQuasar } from 'quasar';
export default {
  components: {
    StreamBarcodeReader,
  },
  setup () {
    const dialog = ref(false)
    const emitter = inject('emitter');
    const user = useAuthStore().user;
    const store = useQrStore()
    const step = ref(1)
    const ready = ref(false)
    const readyScanner = ref(false)
    const textError = ref('')
    const $q = useQuasar()

    emitter.on('showScanModal', () => {  
      showModal()
    });

    const showModal = () => {
      dialog.value = true
    }
    const hiddeModal = () => {
      dialog.value = false
    }
    const onLoaded = () => {
      readyScanner.value = true
    }
    const onDecode = (code) => {
      // alert(code)
      // step.value = 2; 
      const data = {
        code: code,
      }
      store.scanQr(data)
      .then((data) => {
        console.log(data)
        if(data.code !== 200) throw data
        step.value = 2; 
        setTimeout(() => {
          ready.value = true
        }, 1000);
      }).catch((response) => {
        step.value = 3;
        textError.value = response
        showNotify('negative', response) 
      })
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
    return {
      dialog,
      step,
      ready,
      readyScanner,
      textError,
      hiddeModal,
      onDecode,
      onLoaded,
    }
  }
}
</script>