<template>
  <q-dialog v-model="dialog" persistent backdrop-filter="blur(8px)">
    <q-card style="min-width: 350px">
      <q-card-section class=" q-mt-md">
        <div class="text-h6 text-weight-bold text-center"> {{ message.modalMessage }}</div>
        <div class="text-subtitle2 q-mt-sm text-weight-medium text-justify text-auto-phase"> 
          Para obtar por un credito debes tener tu perfil verificado y completar toda tu información laboral y personal.
        </div>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat :label="message.buttonMessage" :loading="loading" @click="router.push(message.redirectTo)" > 
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
  import { useRouter } from 'vue-router';

  export default {
    props: {
      dialog: Boolean,
      type: Number,
    },
    setup (props,) {

      //vue provider
      const loading = ref(false)
      const dialog = props.dialog
      const router = useRouter()
      const type = props.type
      const message = ref({
        modalMessage: '',
        buttonMessage: '',
        redirectTo:'',
      })
      
      const setMessage = () => {
        message.value.modalMessage = type == 1
        ? 'No has completado tu perfil.'
        : 'Verificación de perfil no realizada' 
        message.value.buttonMessage = type == 1
        ? 'Completar Perfil'
        : 'Verificar tu indentidad' 
        message.value.redirectTo = type == 1
        ? '/profile'
        : '/user_info' 
      }
      onMounted(() => {
        setMessage()
      })
      return {
        loading,
        dialog,
        router,
        message,
      }
    }
  };
</script>
