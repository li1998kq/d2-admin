// import api from '@/api'
import { service, request} from '@/api/_service.js'
import qs from "qs"

// import { reject, resolve } from 'core-js/fn/promise'
const urls="http://app.changxinghuiyuan.com/akjsjywzx/Business"
export function department(count){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/QueryDepartmentList",
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
export function DeleteDepartment(d){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/DeleteDepartment",
            method:"post",
            data:{
                ID:d
            }
          }).then(res=>{
              resolve(res)
          }).catch(()=>{
              reject(" 新增部门错误")
          })
    })
}
// 获取地区
export function GetRegion(params={}) {
   return request({
        url:urls+"/GetRegion",
        method:"get"
    })   
}
export function GetDepartmentAll(pa) {
    return request({
         url:urls+"/GetDepartmentAll",
         method:"get",
         params:{
            DEPARTMENTNAME:pa
         }
     })   
 }
 export function InsertDepartment(data) {
    return request({
         url:urls+"/InsertDepartment",
         method:"post",
        data
     })   
 }
//  更新部门信息
export function UpdateDepartment(data) {
    return request({
         url:urls+"/UpdateDepartment",
         method:"post",
        data
     })   
 }