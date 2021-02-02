
import { service, request} from '@/api/_service.js'
const urls="http://app.changxinghuiyuan.com/akjsjywzx/Business"
export function QueryFAQList(count){
        return request({
         url:urls+"/QueryFAQList",
         method:"get",
         params:{
            OnePageCount:10,
            LastReadIndex:count*10,
         }
        })
}
// 删除
export function DeleteFAQ(d){
    return new Promise((resolve,reject)=>{
        request({
            url:urls+"/DeleteFAQ",
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
export function InsertFAQ(data) {
    return request({
        url:urls+"/InsertFAQ",
            method:"post",
            data
    })
}
export function UpdateFAQ(data) {
    return request({
        url:urls+"/UpdateFAQ",
            method:"post",
            data
    })
}
