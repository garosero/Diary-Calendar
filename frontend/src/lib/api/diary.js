import axios from "axios";


/**
 *  Diary Post 관련 api 함수들
 */

 export const uploadImageAPI = (FormData) => {
     return axios.post('/api/diary/image', FormData, {
         withCredentials : true,
     });
 } 

 export const addDiaryAPI = (formData) => {
     return axios.post('/api/diary/post',formData,{
         withCredentials : true,
     })
 }