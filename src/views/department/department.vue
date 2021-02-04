<template>
  <d2-container>
    <el-container>
      <el-header>
        <el-row :gutter="10">
          <el-col :span="12">
            <!-- 对数据筛选 -->
            <el-button type="primary" icon="el-icon-edit" @click="addDepartment"
              >新增部门</el-button
            >
          </el-col>
          <!-- <el-col :span="6"> </el-col>
          <el-col :span="6"> 
          </el-col> -->
          <el-col :span="12" class="casc">
            <el-cascader
              :options="regionList"
              @change="departmentlist"
              clearable
              collapse-tags
              :props="regionset"
              v-model="model_region"
            >
            </el-cascader>
            <el-button type="primary" size="small" class="mar-s" @click="sizer"
              >筛选</el-button
            >
            <el-button
              type="primary"
              size="small"
              class="mar-s"
              @click="clearsizer"
              ><i class="el-icon-close"></i> 清除筛选</el-button
            >
          </el-col>
        </el-row>
      </el-header>
      <!-- 这里是主要部分 -->
      <el-main>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="部门名称" width="120" prop="DepartmentName">
          </el-table-column>

          <el-table-column label="地区" width="120" prop="Region">
            <!-- <template slot-scope="scope">{{ scope.row.Depar }}</template> -->
          </el-table-column>
          <el-table-column prop="Contact" label="联系人" width="120">
          </el-table-column>
          <el-table-column prop="Phone" label="联系电话" show-overflow-tooltip>
          </el-table-column>
          <!-- 对数据操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope)"
                >详细信息</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="departmentCom(scope.$index, scope.row)"
                >电脑配置管理</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          :current-page.sync="departmentpage.current_page"
          background
          :page-size="departmentpage.pageSize"
          :pager-count="5"
          layout="->,total, prev, pager, next,jumper"
          :total="departmentpage.totals"
          @current-change="departmentCurrentChange"
        >
                    </el-pagination
        >
      </el-footer>
    </el-container>

    <!-- 弹出层 -->
    <el-dialog
      title="新增部门"
      :visible.sync="show_dialon"
      width="60%"
      fit
      border="true"
      center
    >
      <el-row>
        <el-col :span="6"></el-col>
        <el-form label-width="100px" :model="add_departments" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="地区" width="15%">
                <el-input v-model="add_departments.Region"></el-input>
              </el-form-item>
              <el-form-item label="部门">
                <!-- <el-cascader :options="regionList" @change="add_list" clearable collapse-tags :props="regionset1"
  v-model="model_region1"
>
</el-cascader> -->
                <el-input v-model="add_departments.DepartmentName"></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="add_departments.Contact"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="add_departments.Phone"></el-input>
              </el-form-item>
              <el-form-item label="安装时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择时间"
                  v-model="add_departments.InstallTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="最新维护时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择时间"
                  v-model="add_departments.MaintainTime"
                  style="width: 100%"
                  align="right"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经纬度">
                <el-input v-model="add_departments.Longitude"></el-input>
                <el-input v-model="add_departments.Latitude"></el-input>
              </el-form-item>
              <el-form-item label="分配数">
                <el-input v-model="add_departments.Allotment"></el-input>
              </el-form-item>
              <!-- <el-form-item label="安装电脑">
    <el-input v-model="add_departments.allotment"></el-input>
  </el-form-item> -->
              <el-form-item label="接收">
                <el-input v-model="add_departments.Number"></el-input>
              </el-form-item>
              <el-form-item label="打印机">
                <el-input v-model="add_departments.Printer"></el-input>
              </el-form-item>
              <el-form-item label="安装打印机">
                <el-input v-model="add_departments.InstalPrinter"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="add_departments.Remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-col :span="6"></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show_dialon = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add_department_ture()"
          v-if="show_choose"
          >确 定</el-button
        >
        <el-button type="primary" @click="UpdateDep()" v-if="!show_choose"
          >更 改</el-button
        >
      </span>
    </el-dialog>
    <!-- 电脑配置弹出框 -->
    <el-dialog
      :title="
        '电脑配置：' +
        this.addComputerDep.Region +
        '——' +
        this.addComputerDep.Department
      "
      :visible.sync="show_com"
      width="width"
    >
      <el-container>
        <el-divider> 当前设备</el-divider>

        <el-main>
          <!-- <h3>当前的设备</h3> -->
          <div class="Com_card">
            <el-card v-for="(item, index) in computerList" :key="index">
              <div class="Com_btn">
                <el-button
                  type="info"
                  size="small"
                  @click="Com_update(item, index)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="Com_de(item, index)"
                  >删除</el-button
                >
              </div>
              <h3>{{ item.ComputerNo }}</h3>
              <div v-if="update_index != index">数量：{{ item.Number }}</div>
              <div class="Com_btn">
                <el-input
                  v-model="computerUpdate.Number"
                  placeholder="数量"
                  v-if="update_index == index"
                ></el-input>
                <el-button
                  type="primary"
                  @click="update_com"
                  v-if="update_index == index"
                  size="small"
                  >更改</el-button
                >
              </div>
            </el-card>
          </div>
          <span v-if="this.computerList.length == 0">当前无设备配置</span>
        </el-main>
        <el-divider> 添加设备</el-divider>
        <el-footer>
          <el-form
            label-position="left"
            :inline="true"
            :model="addComputerDep"
            class="computer_form"
          >
            <el-form-item label=" 选择设备">
              <el-select
                v-model="addComputerDep.ComputerConfigId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in computerList_Choose"
                  :key="item.value"
                  :label="item.ComputerNo"
                  :value="item.ID"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备数量">
              <el-input
                type="number"
                placeholder="请输入数量"
                class="input"
                v-model="addComputerDep.Number"
              ></el-input>
            </el-form-item>
            <el-form-item label=".">
              <el-button type="primary" @click="addComputer_true"
                >确定新增</el-button
              >
            </el-form-item>
          </el-form>
        </el-footer>
      </el-container>

      <div slot="footer" style="text-align: center; margin-top: 20px">
        <!-- <el-button @click="show_com = false">取 消</el-button>
        <el-button type="primary" @click="show_com = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  department,
  Postdepartment,
  DeleteDepartment,
  GetRegion,
  GetDepartmentAll,
  InsertDepartment,
  UpdateDepartment,
  InsertDepartmentComputer,
  UpdateDepartmentComputer,
  DeleteDepartmentComputer,
  GetDataInfo,
} from "@/api/department";
import * as comInfo from "@/api/computes.js";
export default {
  data() {
    return {
      model_region: "",
      model_region1: [],
      regionList: [],
      regionset: {
        emitPath: false,
        value: "Name",
        label: "Name",
        children: "Childs",
      },
      regionset1: { value: "Name", label: "Name", children: "Childs" },
      tableData: [],
      multipleSelection: [],
      show_dialon: false,
      show_computerUpdate: false,
      dialog_details: [],
      departmentpage: {
        pageSize: 10,
        current_page: 1,
        totals: 5,
        val: new Number(),
      },
      add_departments: {
        Region: "",
        DepartmentName: "",
        Contact: "",
        Phone: "",
        InstallTime: "",
        MaintainTime: "",
        Longitude: "",
        Latitude: "",
        Allotment: new Number(),
        Number: new Number(),
        Printer: new Number(),
        InstalComputer: new Number(),
        InstalPrinter: new Number(),
        Remark: "",
      },
      options: [],
      value_change: "",
      show_choose: true,
      show_com: false,
      computerList: new Array(),
      computerList_Choose: new Array(),
      computerID_Choose: new Number(),
      computer_id: new Number(),
      addComputerDep: {
        ID: Number,
        Region: new String(),
        Department: new String(),
        DepartmentID: new Number(),
        ComputerConfigID: new Number(),
        Number: new Number(),
      },
      /**删除的选择
       */

      computerUpdate: {
        ID: Number,
        Region: "",
        Department: "",
        DepartmentID: new Number(),
        ComputerConfigID: new Number(),
        Number: Number,
      },
      /**正在编辑的index
       * @type {Number}
       */
      update_index: null,
    };
  },

  created() {
    this.GetDepartment(0);
    this.getcomputerList();
  },
  mounted() {
    this.GetRegions();
  },
  methods: {
    getcomputerList() {
      comInfo.getCom().then((res) => {
        console.log(res);
        this.computerList_Choose = res.Result.List;
      });
    },
    handleEdit(b) {
      this.show_dialon = true;
      console.log(b.row);
      this.add_departments = b.row;
      this.show_choose = false;
    },
    handleDelete(a, b) {
      console.log(b);
      DeleteDepartment(b.ID).then(() => {
        this.GetDepartment(this.departmentpage.current_page - 1);
        this.$message.success("删除成功");
      });
    },
    GetDepartment(id = 0) {
      department(id)
        .then((res) => {
          this.tableData = res.Result.List;
          this.departmentpage.totals = res.Result.Count;
          console.log(res);
        })
        .catch((err) => {
          this.$message("出现错误");
        });
    },
    addDepartment() {
      this.show_dialon = true;
      this.add_departments = this.$options.data().add_departments;
      this.model_region1 = [];
      this.show_choose = true;
    },
    // 更新部门信息update
    UpdateDep() {
      UpdateDepartment(this.add_departments).then(() => {
        this.$message.success("更新成功");
        this.show_dialon = false;
      });
    },
    add_list() {},
    add_department_ture() {
      InsertDepartment(this.add_departments).then((res) => {
        console.log("cg");
        this.show_dialon = false;
      });
    },
    // 分页数据
    departmentCurrentChange(val) {
      this.departmentpage.current_page = val;
      this.GetDepartment(val - 1);
    },
    // 获取地区信息
    GetRegions() {
      GetRegion()
        .then((res) => {
          this.regionList = res.Result;
        })
        .catch(() => {});
    },
    // 筛选
    departmentlist(value) {
      console.log(this.model_region);
    },
    sizer() {
      GetDepartmentAll(this.model_region)
        .then((res) => {
          console.log(res);
          this.tableData = res.Result;
        })
        .catch((err) => {
          console.log("出现错误");
        });
    },
    clearsizer() {
      this.model_region = "";
      this.GetDepartment(this.departmentpage.current_page - 1);
    },
    // 部门电脑配置管理
    departmentCom(a, b) {
      // this.GetDataInfoRe()
      this.show_com = true;
      this.addComputerDep = this.$options.data().addComputerDep;
      this.computerList = b.EquipmentList;
      this.addComputerDep.Region = b.Region;
      this.addComputerDep.Department = b.DepartmentName;
      this.addComputerDep.DepartmentID = b.ID;
      console.log(this.addComputerDep.Department);
    },
    // 新增部门电脑
    addComputer_true() {
      console.log(this.addComputerDep);

      InsertDepartmentComputer(this.addComputerDep)
        .then((res) => {
          // this.GetDepartment(this.departmentpage.current_page-1);
          this.GetDataInfoRe();
          //  this.addComputerDep=this.$options.data().addComputerDep
        })
        .catch(() => {
          this.$message("新增失败");
        });
    },
    /**编辑电脑按钮
     * @param {Number} index 当前索引
     */
    Com_update(a, index) {
      if (index == this.update_index) {
        this.update_index == null;
      } else {
        this.update_index = index;
      }
      // console.log(this.computerList[index])
      // console.log(this.addComputerDep)
      // console.log(a)
      var com_id = a.ComputerNo;
      this.computerList_Choose.map((item) => {
        if (item.ComputerNo == com_id) {
          this.computerUpdate.ComputerConfigID =this.computerUpdate.ID=item.ID;
        }
      });
      this.computerUpdate.Region = this.addComputerDep.Region;
      this.computerUpdate.Department = this.addComputerDep.Department;
      this.computerUpdate.DepartmentID = this.addComputerDep.DepartmentID;
      this.computerUpdate.ID = a.Id;
      this.computerUpdate.Number = a.Number;
    },
    Com_de(a) {
      var com_id = a.ComputerNo;
      this.computerList_Choose.map((item) => {
        if (item.ComputerNo == com_id) {
          this.computerUpdate.ComputerConfigID  =this.computerUpdate.ID=item.ID ;
        }
      });
      this.computerUpdate.Region = this.addComputerDep.Region;
      this.computerUpdate.Department = this.addComputerDep.Department;
      this.computerUpdate.DepartmentID = this.addComputerDep.DepartmentID;
      this.computerUpdate.ID = a.Id;
      this.computerUpdate.Number = a.Number;
      console.log(this.computerUpdate);
      this.$confirm("确定要删除该数据吗？").then(() => {
        DeleteDepartmentComputer(this.computerUpdate);
        this.GetDataInfoRe();
      });
      // DeleteDepartmentComputer(this.computerUpdate)
    },
    update_com() {
      // console.log(this.computerList)
      // console.log(this.computerUpdate)
      UpdateDepartmentComputer(this.computerUpdate).then((res) => {
        this.update_index = null;
      });
      this.GetDataInfoRe()
    },
    // 部门电脑刷新
    GetDataInfoRe() {
      console.log(this.addComputerDep);
      GetDataInfo(this.addComputerDep.Department).then((res) => {
        console.log(res.Result.EquipmentList);
        this.computerList = res.Result.EquipmentList;
      });
    },
  },
};
</script>

<style scoped>
.el-input__inner {
  width: 80px;
}
el-form-item {
  width: 15%;
}
.casc {
  display: flex;
}
.mar-s {
  margin: 0 1rem;
}
.Com_card {
  display: flex;
  justify-content: space-evenly;
}
.Com_btn {
  display: flex;
  justify-content: space-evenly;
}
.input {
  width: 150px;
  margin-right: 30px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.computer_form {
  display: flex;
  align-items: center;
}
</style>