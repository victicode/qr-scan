import { defineStore } from "pinia";
import ApiService from "@/services/axios/";
import JwtService from "@/services/jwt/";

export const useLoanStore = defineStore("loan", {
  actions: {

    async getLoan(userId) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.get("/api/loan/"+userId,)
            .then(({ data }) => {
              if(data.code !== 200){
                throw data;
              }
              resolve(data)
            }).catch((response) => {
              console.log(response)
              resolve('Error al solicitar prestamo.');
            });
        }
      })
      .catch((response) => {
        console.log(response)
        return 'Error al actualizar datos';
      });
    },
    async createLoan(data) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.post("/api/loan/", data)
            .then(({ data }) => {
              if(data.code !== 200){
                throw data;
              }
              resolve(data)
            }).catch((response) => {
              console.log(response)
              resolve('Error al solicitar prestamo.');
            });
        }
      })
      .catch((response) => {
        console.log(response)
        return 'Error al actualizar datos';
      });
    },
    async updateBankAccount(data) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.post("/api/accounts_bank/"+data.id, data)
            .then(({ data }) => {
              if(data.code !== 200){
                throw data;
              }
              resolve(data)
            }).catch((response) => {
              console.log(response)
              resolve('Error al actualizar datos');
            });
        }
      })
      .catch((response) => {
        console.log(response)
        return 'Error al actualizar datos';
      });
    },
    async deleteBankAccount(userId) {
      return await new Promise((resolve) => {
        if (JwtService.getToken()) {
          ApiService.setHeader();
          ApiService.get("/api/accounts_bank/delete/"+ userId)
          .then(({ data }) => {
            if(data.code !== 200){
              throw data;
            }
            resolve(data)
          }).catch((response) => {
            console.log(response)
            resolve('Error al actualizar datos');
          });
        }
      })
      .catch((response) => {
        console.log(response)
        return 'Error al actualizar datos';
      });
    }
  },
  getters: {
  },
});