<template>
  <q-tabs
    no-caps
    right-icon="-"
    active-color="terciary"
    align="justify"
    class="bg-white text-dark shadow-0 fixed-bottom bottom-tab q-py-md-xs q-px-md-lg flex q-py-xs" 
  >
    <q-route-tab class="q-px-xs-sm q-px-md-lg" :to="'/dashboard'"  exact replace  >
      <div class="flex flex-center column">
        <div v-html="wozIcons.home" />
        <span class="q-mt-xs text-dark text-caption">Inicio</span>
      </div>
    </q-route-tab>
    <!-- <q-route-tab class="q-px-xs-sm q-px-md-lg" :to="'/last-operations'" :icon="'eva-flip-2-outline'" exact replace label="Ult. Trans." /> -->
    <q-route-tab class="q-px-xs-sm q-px-md-lg" exact replace style="opacity: 0.4;">
      <div class="flex flex-center column">
        <q-icon
          :size="'sm'"
          :name="'eva-flip-2-outline'"
        />
        <span class="q-mt-xs text-dark text-caption">Ult. Trans</span>
      </div>
    </q-route-tab>
    <q-route-tab class="q-px-xs-sm q-px-md-lg" :to="'/account_bank'"  exact  replace  >
      <div class="flex flex-center column">
        <q-icon
          :size="'sm'"
          :name="icons.outlinedAccountBalance"
        />
        <span class="q-mt-xs text-dark text-caption">Banco</span>
      </div>
    </q-route-tab>
    <q-route-tab class="q-px-xs-sm q-px-md-lg" :to="'/notifications'"  exact replace >
      <div class="flex flex-center column">
        <section class="flex flex-center column relative">
          <div v-html="wozIcons.notification" />
          <q-badge v-if="notificationsCount > 0" color="red" rounded floating class="notificationBadge" :label="notificationsCount >= 10 ? '+'+notificationsCount : notificationsCount " />
        </section>
        <span class="q-mt-xs text-dark text-caption">Notificaciones</span>
      </div>
    </q-route-tab>
    <q-route-tab class="q-px-xs-sm q-px-md-lg" :to="'/profile'"  exact replace > 
      <div class="flex flex-center column">
        <div v-html="wozIcons.profile" />
        <span class="q-mt-xs text-dark text-caption">Perfil</span>
      </div>
    </q-route-tab>
   
  </q-tabs>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import wozIcons from '@/assets/icons/wozIcons'
import { useNotificationStore } from '@/services/store/notification.store'
import { useAuthStore } from '@/services/store/auth.store'

export default {
  setup () {
    const icons = inject('ionIcons')
    const store = useNotificationStore()
    const user = useAuthStore().user;
    const notificationsCount = ref(0)

    const getNotifications = () =>{
      store.getAllNotificationByUser(user.id).then((data) =>{
        notificationsCount.value = data.data.unreadCount
      })
    }

    onMounted(()=>{
      getNotifications()
    })
    return { icons, wozIcons, notificationsCount}
  },
}
</script>
<style>
.notificationBadge{
  top: -3px!important; right: -7px!important;
}
.q-tab__label{
    font-size: 0.72rem!important;
  }
</style>
<style lang="scss" scoped>
  
  .w-100{
    width: 100%!important;
  }
  .bottom-tab{
    border-top: 1.5px solid $grey-3;
    width: 50%;
    left: 25%;
  }
  @media screen and (max-width: 780px){
    .bottom-tab{
      width: 100%;
      left: 0%;
    }
  }
</style>