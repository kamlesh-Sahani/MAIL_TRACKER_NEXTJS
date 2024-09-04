"use client";
import toast from 'react-hot-toast';
export const  toastClient = ({message,success}:{message:string;success:boolean})=>{
  if(success){
    toast.success(message);
  }else{
    toast.error(message);
  }

}