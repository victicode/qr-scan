
<template>
  <div class="profile_section" >
    <div class="" v-if="Object.values(user).length > 0" >
      <div class="w-100 q-mx-none" >
        <!-- info -->
        <q-toolbar class="bg-grey-5 text-black ">
          <q-toolbar-title> 
            <div class="w-100 flex items-center justify-between">
              <span class="text-subtitle2 text-weight-bold">Información profesional</span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-list >
          <q-item class=" q-px-sm" >
            <q-item-section>
              <div class="flex align-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                  <div>
                    <div class="text-weight-bold text-caption">Tipo laboral</div>
                    <div class="text-caption text-grey-5">
                      {{user.work ?? 'Agregar'}}
                    </div>
                  </div>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">
                  <q-btn unelevated flat round color="bg-grey-5" style="color: black" @click="showDialog('work')" icon="eva-edit-2-outline" />
                </q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class=" q-px-sm" >
            <q-item-section>
              <div class="flex align-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                  <div>
                    <div class="text-weight-bold text-caption">Cargo</div>
                    <div class="text-caption text-grey-5">
                      {{user.office ?? 'Agregar'}}
                    </div>
                  </div>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">
                  <q-btn unelevated flat round color="bg-grey-5" style="color: black"  @click="showDialog('office')" icon="eva-edit-2-outline" />
                </q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class=" q-px-sm" >
            <q-item-section>
              <div class="flex align-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                  <div>
                    <div class="text-weight-bold text-caption">Rango de ingresos</div>
                    <div class="text-caption text-grey-5">
                      {{user.salary ?? 'Agregar'}}
                    </div>
                  </div>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">
                  <q-btn unelevated flat round color="bg-grey-5" style="color: black"  @click="showDialog('salary')" icon="eva-edit-2-outline" />
                </q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />

        </q-list>
      </div>
    </div>
    <div v-if="dialog">
      <updateWork  :dialog="dialog" :dialogToshow="dialogShow"  @hideModal="hideModal" />
    </div>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { inject } from 'vue'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';
  import updateWork from '@/components/profile/modals/updateWork.vue';

  export default {
    components:{
      updateWork,
    }, 
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const $q = useQuasar()
      const store = useAuthStore()
      const router = useRouter();
      const user = useAuthStore().user;
      const dialog = ref(false)
      const dialogShow = ref('')

      // data
      const loading = ref(false)
      // Data


      
      // Methods
      const showDialog = (dialogToShow) => {
        dialog.value = true
        dialogShow.value = dialogToShow

      }
      const hideModal = (data) => {
        dialog.value = false;
        dialogShow.value = '';
      }
      return {
        icons,
        loading,
        user,
        dialog,
        dialogShow,
        showDialog,
        hideModal,

      }
    }
  };
</script>
<style lang="scss">
#logout-button{
  padding: 10px;
}
.profile_section{
  height: 100%; 
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
}
}
</style>