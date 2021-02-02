<template>
  <d2-container>
    <el-container>
      <el-header>
        <div>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="add_FAQs_btn"
            >新增问题</el-button
          >
        </div>
      </el-header>
      <!-- 这里是主要部分 -->
      <el-main>
        <el-table
            fit
          :data="tableDatafaqs"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="问题序号" width="60" prop="ID">
          </el-table-column>
          <el-table-column label="问题"  prop="Question">
          </el-table-column>
          <el-table-column label="答案" prop="Answer">
          </el-table-column>
          <!-- 对数据操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="FAQ_change_btn(scope)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="Detele_FAQs(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
    
      </el-main>
      
      <el-footer>
<el-pagination
            :current-page.sync="FAQpage.current_page"
            background
            :page-size="FAQpage.pageSize"
            :pager-count="5"
            layout="->,total, prev, pager, next,jumper"
            :total="FAQpage.totals"
            @current-change="FAQCurrentChange"
          >
          </el-pagination>
      </el-footer>
    </el-container>
    <!-- 弹出层 -->
    <el-dialog
      title="新增问题"
      :visible.sync="show_addFAQ"
      width="40%"
      border="true"
      center
    >
      <el-form label-width="100px" :model="add_FAQss"  size="small">
        <el-form-item label="问题">
          <el-input v-model="add_FAQss.Question"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="add_FAQss.Answer"  type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"  >
        <el-button type="primary" @click="add_FAQs_ture() " v-if="show_FAQbtn"
          >确 定</el-button>
          <el-button type="primary" @click="FAQ_change_update()" v-else
          >更改</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { QueryFAQList,InsertFAQ,DeleteFAQ,UpdateFAQ } from "@/api/faq.js";
export default {
  data() {
    return {
      tableDatafaqs: [],
      show_addFAQ: false,
      show_FAQbtn:true,
      dialog_details: [],
      FAQpage:{
          pageSize:10,
          current_page:1,
          totals:20,
          val:Number,
        },
      add_FAQss: {
          ID:Number,
          Question:'',
          Answer:'',
      },
      type_options1: [
        {
          value: 0,
          label: "电脑",
        },
        {
          value: 1,
          label: "打印机",
        },
      ],
        value:''
    };
  },
  created(){
this.GetFAQs(0);
  },
  mounted() {
    
  },
  methods: {
    FAQ_change_btn(b) {
      this.show_addFAQ = true;
      console.log(b.row);
      this.add_FAQss = b.row;
      this.show_FAQbtn=false;
    },
    FAQ_change_update(){
      UpdateFAQ(this.add_FAQss)
      console.log(this.add_FAQss)
      this.show_addFAQ = false;
      this.GetFAQs(this.FAQpage.current_page-1)
    },
    // 删除
    
    Detele_FAQs(id){
        // console.log(id)
        DeleteFAQ(id.ID).then(()=>{
          // console.log("删除成功")
           this.GetFAQs(this.FAQpage.current_page-1)
        })
        
    },
    // 获取电脑配置
    GetFAQs(id) {
      QueryFAQList(id)
        .then((res) => {
          console.log(res)
          this.tableDatafaqs = res.Result.List;
          this.FAQpage.totals=res.Result.Count;
        })
        .catch((err) => {
          console.log("出现错误");
        });
    },
    show_dialon() {
      this.show_addFAQ = true;
    },
    // 增加
    add_FAQs_btn(){
      this.show_addFAQ=true;
      this.show_FAQbtn=true;
      this.add_FAQss=this.$options.data().add_FAQss
    },
    add_FAQs_ture() {
      InsertFAQ(this.add_FAQss)
        .then((res) => {
          console.log("成功" + res);
           this.show_addFAQ = false;
           this.GetFAQs(this.FAQpage.current_page-1)
           this.show_dialon;
        })
        .catch((err) => {
          console.log("发送出现了错误");
        });
    },
    // 换页
    // handleSizeChange(val){
    //   console.log(val)
    // },
    // 页面
    FAQCurrentChange(){
      
    }
  },
};
</script>

<style>
</style>
// import { QueryMemberList,UpdateRepair,DeleteRepair,InsertRepair } from "@/api/computes";
// export default {
//   data() {
//     return {
//       tableData1: [],
//       show_dialon1: false,
//       dialog_details: [],
//       add_repair: {
//         Region: "",
//         Department: "",
//         Cause: "",
//         Status: "",
//         CreateTime: "",
//         CompletionTime: "",
//       },