<template>
  <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale" class="doneLoan"> 
      <q-card class="bg-white text-white flex flex-center q-py-md" style="width: 100%; height: 100%">
        <q-card-section class="q-py-none flex column flex-center">
          <q-icon name="eva-checkmark-circle-outline" size="10rem" color="grey-6" />
          <div class="text-positive text-h5 text-weight-medium q-mt-md">{{text}}</div>
          <div class="text-grey-6 text-h6 text-weight-medium q-mt-md">Serás redirigido...</div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>
<script>
  export default {
    props: {
      dialog: Boolean,
      text: String
    },
    setup(props) {
      //vue provider
      const dialog = props.dialog;
      
    
      return{
        dialog,
        text:props.text
      }
    },
  }

</script>

<style lang="scss">
.doneLoan .q-dialog__inner {
  padding:0px
}
.doneLoan .q-card {
  max-height: 100%!important;
}
.doneLoan .q-dialog__inner--minimized > div{
  max-width: 50%!important;
}
@media screen and (max-width: 780px){
  .doneLoan .q-dialog__inner--minimized > div{
  max-width: 100%!important;
}
}
</style>
