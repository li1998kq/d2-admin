// import { functions } from "lodash"
// import {getdata} from "./_service
// const urls="http://app.changxinghuiyuan.com/akjsjywzx/Business"
// export  const Getcomputers=(m)=>{
//     getdata("./QueryComputerConfigList",{
//         OnePageCount:10*m,
//         // :10*m
//     })
// }
// import api from '@/api'
import { service, request} from '@/api/_service.js'
import { method } from 'lodash'
// import qs from "qs"

// import { reject, resolve } from 'core-js/fn/promise'
const urls="http://app.changxinghuiyuan.com/akjsjywzx/Business"
export function QueryComputerConfigList(count){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/QueryComputerConfigList",
            method:"get",
            params:{
              OnePageCount:10,
              LastReadIndex:count*10
            }
          }).then(res=>{
              resolve(res)
          }).catch(err=>{
              reject(err+"请求错误")
          })
    })
}
export function InsertComputerConfig(d){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/InsertComputerConfig",
            method:"post",
            data:d
          }).then(res=>{
              resolve(res)
          }).catch(()=>{
              reject(" 错误")
          })
    })
}
// 删除
export function DeleteComputerConfig(d){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/DeleteComputerConfig",
            method:"post",
            data:{
                id:d
            }
          }).then(res=>{
              resolve(res)
          }).catch(()=>{
              reject(" 删除错误")
          })
    })
}
// 更改电脑配置
export function UpdateComputerConfig(data) {
   return request({
    url:urls+"/UpdateComputerConfig",
    method:"post",
    data
   })
}
export function getCom(){
    return request({
         url:urls+"/QueryComputerConfigList",
         method:"get"
     })   
 }
// 保修的api相关配置
// 得到保修列表
export function QueryMemberList(count=0) {
    return request({
     url:urls+"/QueryMemberList",
     method:"get",
     params:{
        OnePageCount:10,
        LastReadIndex:count*10
      }
    })
 }
//  新增保修
export function InsertRepair(data) {
    return request({
     url:urls+"/InsertRepair",
     method:"post",
     data
    })
 }
// 删除保修
export function DeleteRepair(data) {
    return request({
     url:urls+"/DeleteRepair",
     method:"post",
     data:{
         id:data
     }
    })
 }
//  更新
 export function UpdateRepair(data) {
    return request({
     url:urls+"/UpdateRepair",
     method:"post",
     data
    })
 }
 export function GetRegioned(){
    return request({
         url:urls+"/GetRegion",
         method:"get"
     })   
 }

