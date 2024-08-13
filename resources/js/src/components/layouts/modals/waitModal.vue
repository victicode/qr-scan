<template>
  <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-white text-white flex flex-center q-py-md" style="width: 300px">
      <q-card-section class="q-py-none">
        <q-spinner-hourglass
          color="grey-5"
          size="5em"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
  export default {
    props: {
      dialog: Boolean,
    },
    setup(props) {
      //vue provider
      const dialog = props.dialog;
      
    
      return{
        dialog,
      }
    },
  }

</script>

