<template>
  <div style="height: 91vh;">
    <Transition name="inFade">
      <div v-if="bankAccounts.length > 0 && ready" class="h-100 w-100">
        <div class="q-pt-md q-px-lg account__container" >
          <div class="q-pt-md q-pb-none q-px-md q-px-md-md q-mb-md account__info" v-for="(account, key) in bankAccounts" :key="key">
            <div >
              <div class="flex justify-between items-top account__info--bank account__info--item" >
                <div class="text-weight-medium text-caption2">Banco:</div>
                <div style="height: 100%;" :class="account.bank.logo">
                  <div v-html="wozIcons[account.bank.logo]" />
                </div>
              </div>
              <div class="flex justify-between items-center q-mt-md account__info--item">
                <div class="text-weight-medium text-caption2">N° de cuenta</div>
                <div class="text-caption2 text-weight-medium text-primary">{{ account.account_number }}</div>
              </div>
              <div class="flex justify-between items-center q-mt-md account__info--item">
                <div class="text-weight-medium text-caption2">Titular</div>
                <div class="text-caption2 text-weight-medium text-grey-7">{{ account.account_owner }}</div>
              </div>
              <div class="flex justify-between items-center q-mt-md account__info--item">
                <div class="text-weight-medium text-caption2">Tipo de cuenta</div>
                <div class="text-caption2 text-weight-medium text-grey-7">{{ account.account_type }}</div>
              </div>
              <div class="flex justify-between items-center q-mt-md account__info--item">
                <div class="text-weight-medium text-caption2">Número de cédula</div>
                <div class="text-caption2 text-weight-medium text-primary">{{ account.account_owner_dni }}</div>
              </div>
            </div>
            <div class="flex items-end justify-end q-mt-md q-pb-md">
              <q-btn unelevated class="q-ml-md" size="sm" round color="grey-7" style="color: black" @click="showModal(account.id, 'update')" icon="eva-edit-2-outline" />
              <q-btn unelevated class="q-ml-md" size="sm" round color="negative" style="color: black" @click="showModal(account.id, 'delete')" icon="eva-trash-2-outline" />
            </div>
          </div>
        </div>
        <div class="q-pt-md q-px-lg flex flex-center" style="border-top: 1px solid #dfdfdf;">
          <q-btn 
            label="Agrega cuenta bancaria" 
            unelevated
            no-caps 
            color="primary q-py-sm" 
            class="redirect_button" 
            @click="router.push('/bank')" 
          />
        </div>
      </div>
      <div v-else-if="bankAccounts.length == 0 && ready" class="h-100">
        <div class="h-100 flex flex-center column q-px-md q-pb-xl">
          <div class="text-weight-bold q-pb-xl text-subtitle1">
            No tienes cuentas de banco asociadas
          </div>
          <div class="w-100 flex justify-center">
            <q-btn 
              label="Agrega cuenta bancaria" 
              unelevated
              no-caps 
              color="primary q-py-sm" 
              class="redirect_button" 
              @click="router.push('/bank')" 
            />
          </div>
        </div>
      </div>
      <div v-else class="q-pt-md q-px-lg account__container w-100" >
        <div class="q-pt-md q-pb-none q-px-md q-px-md-md q-mb-md account__info loading" v-for="n in 8" :key="n">
          <div>
            <div class="flex justify-between items-center account__info--bank account__info--item q-py-md" v-for="j in 5" :key="j" >
              <div style=" width: 25%;"   class="q-mt-xs q-pt-xs">
                <q-skeleton type="QBtn" width="100%" height="15px" />
              </div>
              <div style=" width: 25%;"   class="q-mt-xs q-pt-xs">
                <q-skeleton type="QBtn" width="100%" height="15px" />
              </div>
            </div>
          <div class="flex items-end justify-end q-mt-md q-pb-md">

            <q-skeleton class="q-ml-md" type="QBtn" width="30px" height="30px" />
            <q-skeleton class="q-ml-md" type="QBtn" width="30px" height="30px" />
          </div>
          </div>
        </div>
      </div>
    </Transition>  
    <div v-if="dialog=='update'">
      <updateModal :dialog="(dialog =='update')" :account="selectedAccountBank" @hideModal="hideModal" />
    </div>
    <div v-if="dialog=='delete'">
      <deleteModal :dialog="(dialog =='delete')" :account="selectedAccountBank" @hideModal="hideModal"/>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, ref } from 'vue'
import wozIcons from '@/assets/icons/wozIcons'
import { useBankAccountStore } from '@/services/store/bankAccount.store'
import { useAuthStore } from '@/services/store/auth.store'
import { useRouter } from 'vue-router';
import deleteModal from '@/components/accountsBank/modals/deleteModal.vue'
import updateModal from '@/components/accountsBank/modals/updateModal.vue'

export default {
  components:{
    deleteModal,
    updateModal,
  },
  setup () {
    const store = useBankAccountStore()
    const user = useAuthStore().user;
    const bankAccounts = ref([])
    const ready = ref(false)
    const router = useRouter()
    const selectedAccountBank = ref({})
    const dialog = ref('');
    
    const getAccountsBankbyUser = () =>{
      ready.value = false
      store.getAllAccountBankByUser(user.id).then((data) =>{
        if(data.code !== 200) return
        bankAccounts.value = data.data
        setTimeout(() => {
          ready.value = true
        }, 800);
      })
    }
    const showModal = async (id, modal) => {
      await selectAccountBank(id).then((data)=>{
        dialog.value = modal
      })
    }
    const selectAccountBank = (id) => {
      return new Promise((resolve)=>{
        selectedAccountBank.value = Object.assign(bankAccounts.value.find((account) => account.id == id ))
        setTimeout(()=>{
          resolve(selectedAccountBank.value)
        }, 500)
      })
    }
    const hideModal = () => {
      dialog.value = '';
      getAccountsBankbyUser()
    }
    onMounted(() => {
      getAccountsBankbyUser()
    })

    return { bankAccounts, ready, router, wozIcons, dialog, selectedAccountBank, selectAccountBank, showModal, hideModal  }
  },
}
</script>
<style lang="scss" scoped>
.account__info--item{
  border-bottom: 1.5px $grey-5 dashed ;
  padding-bottom: 10px;
}
.h-100{
  height: 100%;
}
.w-100{
  width: 100%;
}
.redirect_button{
  width: 50%;
}
@media screen and (max-width: 780px){
  .redirect_button{
    width: 100%;
  }
}
.account__container{
  overflow-y: auto; 
  height: max-content;
  max-height: 85%;
  cursor: pointer;
}
.account__info{
  
  background: #ccdafe;
  border-radius: 10px;
  &--bank{
    padding-top: 2px;
    height: 35px;
    overflow: hidden;
  }
}
.account__info.loading{
  // background: transparent!important;
  border: 1px dashed $grey-5;

}
.text-caption2{
  font-size: 0.85rem!important;
}
.bancoBasa{
  transform: translateX(5%) translateY(0%)
}
.bancoRio{
  transform: translateY(-0%) translateX(38%);
}
.continental{
  transform: translateY(0%) translateX(40%) scale(1.2);
}
.eko{
  transform: translateY(0%) translateX(35%);
}
.itau{
  transform: translateY(10%) translateX(-5%);
}
.sudameris{
  transform: translateY(10%) translateX(25%) scale(1.2);
}
.ueno{
  transform: translateY(0%) translateX(5%);
}
.wally{
  transform: translateY(0%) translateX(60%);
}
</style>