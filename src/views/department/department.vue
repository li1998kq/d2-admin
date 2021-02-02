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
        <el-button type="primary" @click="add_department_ture()" v-if="show_choose"
          >确 定</el-button>
          <el-button type="primary" @click="UpdateDep()" v-else
          >更 改</el-button>
      </span>
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
  UpdateDepartment
} from "@/api/department";
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
      dialog_details: [],
      departmentpage: {
        pageSize: 10,
        current_page: 1,
        totals: 5,
        val:new Number,
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
      show_choose:true,

    };
  },
  created() {
    this.GetDepartment(0);
  },
  mounted() {
    this.GetRegions();
  },
  methods: {
    handleEdit(b) {
      this.show_dialon = true;
      console.log(b.row);
      this.add_departments = b.row;
      this.show_choose=false;
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
          console.log(res)
        })
        .catch((err) => {
          this.$message("出现错误");
        });
    },
    addDepartment() {
      this.show_dialon = true;
      this.add_departments = this.$options.data().add_departments;
      this.model_region1 = [];
    },
    // 更新部门信息update
    UpdateDep(){
        UpdateDepartment(this.add_departments).then(()=>{
          this.$message.success("更新成功")
          this.show_dialon=false;
        })
    },
    add_list() {},
    add_department_ture() {
      //  this.add_departments.Region=this.model_region1[0]
      // this.add_departments.DepartmentName=this.model_region1[1]
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
      this.model_region=''
      this.GetDepartment(this.departmentpage.current_page-1);
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
</style>