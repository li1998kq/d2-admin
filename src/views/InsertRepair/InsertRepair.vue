<template>
  <d2-container>
    <el-container>
      <el-header>
        <div>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="add_computer_btn()"
            >新增报修</el-button
          >
        </div>
      </el-header>
      <!-- 这里是主要部分 -->
      <el-main>
        <el-table
          :data="tableRepair"
          tooltip-effect="dark"
          style="width: 100%"
          fit
        >
          <el-table-column label="地区" width="120" prop="Region">
          </el-table-column>

          <el-table-column label="部门" width="120" prop="Department">
          </el-table-column>
          <el-table-column prop="Cause" label="保修原因"> </el-table-column>
          <el-table-column prop="CreateTime" label="创建时间">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="Status"
            label="型号"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.Status == 0" ><el-link type="danger">未完成</el-link></span>
              <span v-else-if="scope.row.Status == 1"> <el-link type="warning">正在维修</el-link></span>
              <span v-else><el-link type="success">已完成</el-link></span>
            </template>
          </el-table-column>
          <!-- 对数据操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleComputerDetali(scope)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="Detele_computer(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          :current-page.sync="computerpage.current_page"
          background
          :page-size="computerpage.pageSize"
          :pager-count="5"
          layout="->,total, prev, pager, next,jumper"
          :total="computerpage.totals"
          @current-change="computerCurrentChange"
          > 
          </el-pagination>
      </el-footer>
    </el-container>

    <!-- 弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="show_dialon1"
      width="400px"
      border="true"
      center
    >
      <el-form label-width="100px" :model="add_repair" size="small">
        <!-- <el-form-item label="地区" style="text-align:center">
          <span >{{add_repair.Region+'-'+add_repair.Department}}</span>
        </el-form-item> -->
        <el-form-item label="部门">
   <el-cascader :options="model_reg" @change="choose"  :props="regionset1"
  v-model="model_chooseReg">
</el-cascader>
          <!-- <el-input v-model="add_repair.Department"></el-input> -->
        </el-form-item>
        <el-form-item label="报修原因">
          <el-input v-model="add_repair.Cause"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="add_repair.Status"></el-input>
        </el-form-item> -->
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="add_repair.CreateTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker
            v-model="add_repair.CompletionTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="add_repair.Status" placeholder="请选择类型">
            <el-option
              v-for="item in type_options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <span v-else>{{this.add_repair.Type==0?"计算机":"打印机"}}</span> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="show_dialon1 = false,add_repair={}">取 消</el-button> -->
        <el-button
          type="primary"
          @click="add_repair_ture()"
          v-if="show_insertOK"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="insert_computers_ture()"
          v-if="!show_insertOK"
          >更 改</el-button
        >
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  QueryMemberList,
  InsertRepair,
  DeleteRepair,
  UpdateRepair,
  GetRegioned,
} from "@/api/computes";
export default {
  data() {
    return {
      model_chooseReg:"",
      model_reg:[],
      regionset1: { value: "Name", label: "Name", children: "Childs" },
      tableRepair: [],
      show_dialon1: false,
      dialog_details: [],
      add_repair: {
        Region: "",
        Department: "",
        Cause: "",
        Status: "",
        CreateTime: "",
        CompletionTime: "",
      },
      type_options2: [
        {
          value: 0,
          label: "未完成",
        },
        {
          value: 1,
          label: "正在维修",
        },
        {
          value: 2,
          label: "已完成",
        },
      ],
      computerpage: {
        pageSize: 10,
        current_page: 1,
        totals: 20,
        val: Number,
      },
      value: "",
      show_insertOK: true,
    };
  },
  created(){
     this.GetRegion()
  },
  mounted() {
    this.GETRepair(0);
    // GETRepairs(10)
  },
  methods: {
    // 地区信息
    GetRegion(){
        GetRegioned().then(res=>{
          console.log('获取成功'+res)
          this.model_reg=res.Result
        }).catch(err=>{
          console.log()
        })
    },
      // 获取电脑详细
    handleComputerDetali(b) {
      this.show_dialon1 = true;
      // console.log(b.row);
      this.add_repair = b.row;
      this.show_insertOK = false;
      this.model_chooseReg=this.add_repair.Department;
    },
    // 删除

    Detele_computer(id) {
      console.log(id);
      DeleteRepair(id.ID).then(() => {
        console.log("删除成功");
      this.GETRepair(this.computerpage.current_page - 1);

      });
    },
    handleDelete(a, b) {},
    // 获取电脑配置
    GETRepair(id) {
      QueryMemberList(id)
        .then((res) => {
          console.log(res);
          this.tableRepair = res.Result.List;
          this.computerpage.totals = res.Result.Count;
        })
        .catch((err) => {
          console.log("出现错误");
        });
    },
    show_dialon() {
      this.show_dialon1 = true;
    },
    // 增加
    add_computer_btn() {
      this.show_dialon1 = true;
      this.show_insertOK = true;
      this.add_repair = this.$options.data().add_repair;
    },
    add_repair_ture() {
      console.log(this.add_repair);
      InsertRepair(this.add_repair)
        .then((res) => {
          console.log("3");
          console.log("成功" + res);
          this.GETRepair(this.computerpage.current_page - 1);
          this.show_dialon1 = false;
        })
        .catch((err) => {
          console.log("发送出现了错误");
        });
    },
    choose(){
          console.log(this.model_chooseReg)
           this.add_repair.Region=this.model_chooseReg[0]
      this.add_repair.Department=this.model_chooseReg[1]
    },
    // 分页
    computerCurrentChange() {
      this.GETRepair(this.computerpage.current_page - 1);
    },
    // 更新
    insert_computers_ture(d) {
     
      // console.log(this.model_chooseReg)
      UpdateRepair(this.add_repair);
      this.show_dialon1 = false;
    },
  },
};
</script>

<style>
</style>