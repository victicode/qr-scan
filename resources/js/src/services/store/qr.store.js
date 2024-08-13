import { defineStore } from "pinia";
import ApiService from "@/services/axios/";
import JwtService from "@/services/jwt/";

export const useQrStore = defineStore("qr", {
  actions: {
    async scanQr(data) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.post("api/qr/", data)
            .then(({ data }) => {
              if(data.code !== 200){
                throw data;
              }
              resolve(data)
            }).catch((response) => {
              console.log(response)
              resolve('Error al escanear');
            });
        }
      })
      .catch((response) => {
        console.log(response)
        return 'Error al actualizar datos';
      });
    },
    async sendMobileCode(data) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.post("api/user/sendPhoneCode", data)
            .then(({ data }) => {
              if(data.code !== 200){
                throw data;
              }
              resolve(data)
            }).catch(({response}) => {
              console.log(response)
              resolve('Error al enviar codigo');
            });
        }
      })
      .catch(({response}) => {
        console.log(response)
        resolve('Error al enviar codigo');
      });
    },
    async verifyMobileCode(data) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.post("api/user/verifyPhoneCode", data)
            .then(({ data }) => {
              if(data.code !== 200){
                throw data;
              }
              console.log(data)
              resolve(data)
            }).catch(({response}) => {
              console.log(response)
              resolve('Error al validar codigo');
            });
        }
      })
      .catch(({response}) => {
        console.log(response)
        resolve('Error al validar codigo');
      });
    },
  },
  getters: {
  },
});