
<template>
  <div class="profile_section" >
    <div class="" v-if="Object.values(user).length > 0" >
      <div class="w-100 q-mx-none" >
        <!-- info -->
        <q-toolbar class="bg-grey-5 text-black ">
          <q-toolbar-title> 
            <div class="w-100 flex items-center justify-between">
              <span class="text-subtitle2 text-weight-bold q-mt-sm">Datos personales</span>
              <span>
                <!-- <q-icon name="eva-edit-2-outline" /> -->
                <q-btn unelevated flat round color="bg-grey-5" style="color: black"  to="/user_info" icon="eva-edit-2-outline" />
              </span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-list >
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Nombre completo
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.name }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  N° de documento
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ numberFormat(user.dni) }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Número de teléfono
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.phone ?? 'No asignado'  }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                  <div>
                    <span class="text-caption text-weight-bold">
                      Verificar identidad
                    </span>
                    <q-icon
                    :name="user.verify_status == 2 ? icons.sharpVerified : icons.outlinedVerified"
                      size="sm"
                      :color=" user.verify_status > 0 ? 'terciary' :'grey-6'"
                      class="user-verify-user"
                      :class="{'verify-user':user.verify_status == 2, }"
                      @click="showToltip"
                    >
                      <q-tooltip 
                        anchor="top middle" 
                        self="bottom middle" 
                        :class=" user.verify_status == 2 ? 'bg-positive': 'bg-terciary' " 
                        :offset="[10, 10]" 
                        v-model="showing"
                      >
                        {{
                          user.verify_status == 1
                          ? 'Verificación en proceso'
                          : user.verify_status == 2 
                          ? 'Usuario verificado'
                          : 'Sin verificación'
                        }}
                      </q-tooltip>
                    </q-icon>
                  </div>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">
                  {{ 
                    user.verify_status == 2 
                    ? 'Aprobado'
                    : user.verify_status == 1
                    ? 'Pendiente'
                    : 'Subir documentos'
                  }}
                </q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                  <div>
                    <span class="text-caption text-weight-bold">
                      Número de cuenta Woz Pay
                    </span>
                  </div>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption flex items-center">
                  <div class="q-mr-xs q-mt-xs">{{ user.wallet.number }}</div>
                  <div @click="copyText()" >
                     <q-icon
                       name="eva-clipboard-outline"
                       size="xs"
                       color="grey-6"
                     />
                  </div>
                </q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
        <!-- address -->
        <q-toolbar class="bg-grey-5 text-black q-mt-sm">
          <q-toolbar-title> 
            <div class="w-100 flex items-center justify-between">
              <span class="text-subtitle2 text-weight-bold q-mt-sm">Dirección particular</span>
              <span>
                <!-- <q-icon name="eva-edit-2-outline" /> -->
                <q-btn unelevated flat round color="bg-grey-5" style="color: black" to="/user_address" icon="eva-edit-2-outline" />
              </span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-list >
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Ciudad
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.city ?? 'Agregar' }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Barrio o localidad
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.locality ?? 'Agregar' }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Calle y N° de casa
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.address ?? 'Agregar'  }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
        <!-- professional -->
        <q-toolbar class="bg-grey-5 text-black q-mt-sm">
          <q-toolbar-title> 
            <div class="w-100 flex items-center justify-between">
              <span class="text-subtitle2 text-weight-bold q-mt-sm">Información profesional</span>
              <span>
                <!-- <q-icon name="eva-edit-2-outline" /> -->
                <q-btn unelevated flat round color="bg-grey-5" style="color: black" to="/user_proffesion" icon="eva-edit-2-outline" />
              </span>
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-list >
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Privado - Funcionario público
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.work ?? 'Agregar' }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Cargo
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.office ?? 'Agregar' }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-py- q-px-sm" >
            <q-item-section>
              <div class="flex items-center justify-between">
                <q-item-label class="q-mt-xs text-weight-bold" >
                <span class="text-caption text-weight-bold">
                  Salario
                </span>
                </q-item-label>
                <q-item-label caption lines="1" class="text-weight-medium text-caption">{{ user.salary ?? 'Agregar'  }}</q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </div>
    </div>
    <div class="row">
      <div class="col-12 q-mt-md q-mb-md q-px-md-xl q-px-xs-lg q-pt-md">
        <q-btn 
          id="logout-button" 
          label="Cerrar sesión" 
          unelevated
          no-caps 
          color="terciary" 
          class="full-width" 
          :loading="loading"
          @click="logout" 
        >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
  import { ref } from 'vue';
  import { inject } from 'vue'
  import { useAuthStore } from '@/services/store/auth.store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';
  import util from '@/util/numberUtil'
  export default {
    setup () {
      //vue provider
      const icons = inject('ionIcons')
      const $q = useQuasar()
      const store = useAuthStore()
      const router = useRouter()
      const user = useAuthStore().user;
      
      // data
      const loading = ref(false)
      // Data
      const showing = ref(false)
      
      // Methods
      const showToltip = () => {
        showing.value = true
        setTimeout(() => {
          showing.value = false
        }, 3500);
      }
      // methods
      const numberFormat = util.numberFormat
      
      const logout = () =>{
        loadingShow(true)
        store.logout().then((data)=>{
          if(!data.code){
            showNotify('negative', data)
            loadingShow(false);
            return;
          }
          showNotify('warning', 'Sesión cerrada')
          setTimeout(() => {
            router.push('/login')
            loadingShow(false);
          }, 2000);
        }).catch((e) => { 
          console.log(e)
          showNotify('negative', 'Error al cerrar sesión')
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
      const loadingShow = (state) => {
        loading.value = state;
      }
      const copyText = () => {
        showNotify('positive', 'Número de cuenta copiado')
      }
      return {
        icons,
        loading,
        user,
        numberFormat,
        showing,
        logout,
        showToltip,
        copyText,
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