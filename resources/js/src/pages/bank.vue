<template>
  <div style="height: 91vh;">
    <div class="q-pa-md" >
      <Transition name="inFade">
        <div v-if="banks.length > 0 && ready">
          <div>
            <div class="text-subtitle1 text-weight-bold q-mb-sm  ">Entidades</div>
            <div>
              <div v-for="(bank,index) in banks" :key="index" class="q-pa-md q-mb-md bank__section" @click="selectBank(bank.id)">
                <div v-html="wozIcons[bank.logo]" />
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="banks.length == 0 && ready" >

        </div>
        <div v-else>
          <div class="text-subtitle1 text-weight-bold q-mb-sm  "> <q-skeleton type="text" width="30%" /></div>
          <div v-for="n in 8" :key="n" class=" q-px-sm q-mb-md bank__section_skeleton" >
            <q-skeleton type="QBtn" width="20%" height="15px" />
          </div>
        </div>
      </Transition>      
    </div>
  </div>
</template>
<script>
  import { onMounted, ref } from 'vue'
  import wozIcons from '@/assets/icons/wozIcons'
  import { useBankAccountStore } from '@/services/store/bankAccount.store'
  import { useRouter } from 'vue-router';

  export default {
    setup () {
      const store = useBankAccountStore()
      const banks = ref([])
      const ready = ref(false)
      const router = useRouter()
      // const user = useAuthStore().user;

      const getAllBanks = () =>{
        store.getAllBanks().then((data) =>{
          if(data.code !== 200) return
          banks.value = data.data
          setTimeout(() => {
            ready.value = true
            return
          }, 800);
        })
      }
      const selectBank = (id) =>{
        router.push('/add_account_bank/'+id)
      }
      onMounted(() => {
        getAllBanks()
      })
      return { banks, ready, wozIcons, selectBank }
    },
  }
</script>
<style lang="scss" scoped>
.bank__section_skeleton{
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;

}
.bank__section, .bank__section_skeleton {
  border: 1px solid lightgray; 
  border-radius:10px;
  height: 55px;
  overflow: hidden;
  transition: all 0.6s ease-in;
  cursor: pointer;
  &:active {
    background: $primary;
    
  }
}

</style>