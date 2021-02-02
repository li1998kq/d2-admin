
import { service, request} from '@/api/_service.js'
const urls="http://app.changxinghuiyuan.com/akjsjywzx/Business"
export function QueryComputerConfigList(count=1){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/QueryComputerConfigList",
            method:"get",
            params:{
              OnePageCount:4,
              LastReadIndex:count*4
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

