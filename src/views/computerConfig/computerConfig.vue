<template>
  <d2-container>
    <el-container>
      <el-header>
        <div>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="add_computer_btn()"
            >新增电脑配置</el-button
          >
        </div>
      </el-header>
      <!-- 这里是主要部分 -->
      <el-main>
        <el-table
          :data="tableData1"
          tooltip-effect="dark"
          style="width: 100%"
          fit
        >
          <el-table-column label="电脑型号" width="120" prop="ComputerNo">
          </el-table-column>

          <el-table-column label="显卡系列" width="120" prop="GraphicsCard">
          </el-table-column>
          <el-table-column prop="CPU" label="cpu" width="120">
          </el-table-column>
          <el-table-column prop="MainBoard" label="主板" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="type"
            label="型号"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.Type==0">计算机</span>
              <span v-else> 打印机</span>
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
      width="30%"
      border="true"
      center
    >
      <el-form label-width="100px" :model="add_computers"  size="small">
        <el-form-item label="电脑型号">
          <el-input v-model="add_computers.ComputerNo"></el-input>
        </el-form-item>
        <el-form-item label="显卡系列">
          <el-input v-model="add_computers.GraphicsCard"></el-input>
        </el-form-item>
        <el-form-item label="显卡类型">
          <el-input v-model="add_computers.GraphicsType"></el-input>
        </el-form-item>
        <el-form-item label="内存">
          <el-input v-model="add_computers.Memory"></el-input>
        </el-form-item>
        <el-form-item label="散热方式">
          <el-input v-model="add_computers.CoolingWay"></el-input>
        </el-form-item>
        <el-form-item label="硬盘">
          <el-input v-model="add_computers.HardDisk"></el-input>
        </el-form-item>
        <el-form-item label="CPU">
          <el-input v-model="add_computers.CPU"></el-input>
        </el-form-item>
        <el-form-item label="机器类型"  >
          <el-select v-model="add_computers.Type" placeholder="请选择类型" >
            <el-option
              v-for="item in type_options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <span v-else>{{this.add_computers.Type==0?"计算机":"打印机"}}</span> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="show_dialon1 = false,add_computers={}">取 消</el-button> -->
        <el-button type="primary" @click="add_computers_ture()" v-if="show_insertOK"
          >确 定</el-button>
        <el-button type="primary" @click="insert_computers_ture()" v-if="!show_insertOK"
          >更 改</el-button>
      </span>
    </el-dialog>
    
  </d2-container>
</template>

<script>
import { QueryComputerConfigList,InsertComputerConfig,DeleteComputerConfig,UpdateComputerConfig } from "@/api/computes";
export default {
  data() {
    return {
      tableData1: [],
      show_dialon1: false,
      dialog_details: [],
      add_computers: {
        CPU: "",
        ComputerNo: "",
        CoolingWay: "",
        GraphicsCard: "",
        GraphicsType: "",
        HardDisk: "",
        MainBoard: "",
        Memory: "",
        Type: 0,
      },
      type_options1: [
        {
          value: 0,
          label: "计算机",
        },
        {
          value: 1,
          label: "打印机",
        },
      ],
      computerpage:{
          pageSize:10,
          current_page:1,
          totals:20,
          val:new Number,
        },
        value:'',
        show_insertOK:true
    };
  },
  mounted() {
    this.GetComputer(0);
    // Getcomputers(10)
  },
  methods: {
    // 获取电脑详细
    handleComputerDetali(b) {
      this.show_dialon1 = true;
      console.log(b.row);
      this.add_computers = b.row;
      this.show_insertOK=false;
    },
    // 删除
    
    Detele_computer(id){
        console.log(id)
        DeleteComputerConfig(id.ID).then(()=>{
          console.log("删除成功")
        })
        this.GetComputer(this.computerpage.current_page-1);
    },
    handleDelete(a, b) {},
    // 获取电脑配置
    GetComputer(id) {
      QueryComputerConfigList(id)
        .then((res) => {
          console.log(res);
          this.tableData1 = res.Result.List;
          this.computerpage.totals=res.Result.Count;
        })
        .catch((err) => {
          console.log("出现错误");
        });
    },
    show_dialon() {
      this.show_dialon1 = true;
    },
    // 增加
    add_computer_btn(){
          this.show_dialon1=true;
          this.show_insertOK=true;
          this.add_computers=this.$options.data().add_computers;
    },
    add_computers_ture() {
      // console.log(this.add_computers)
      InsertComputerConfig(this.add_computers)
        .then((res) => {
          console.log("成功" + res);
       this.GetComputer(this.computerpage.current_page-1)
       this.show_dialon1=false;
       
        })
        .catch((err) => {
          console.log("发送出现了错误");
        });
    },
    // 分页
    computerCurrentChange(){
       this.GetComputer(this.computerpage.current_page-1)
    },
    // 更新
    insert_computers_ture(d){
        UpdateComputerConfig(this.add_computers)
        this.show_dialon1=false;
    }
  },
};
</script>

<style>
</style>