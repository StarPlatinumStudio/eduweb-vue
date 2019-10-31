<template>
  <div class="ManageCourse">
    <!-- <h1>请假申请处理</h1>
    <h1>课程新增</h1>选择日期
    <el-input v-model="date" placeholder></el-input>选择时间段
    <el-input v-model="date" placeholder></el-input>课程名称
    <el-input v-model="date" placeholder></el-input>
    <el-button type="primary" @click="addCourse">新增课程</el-button>-->

    <el-row>
      日期选择
      <el-date-picker
        v-model="selectWeek"
        type="week"
        format="yyyy 年 第 WW 周"
        placeholder="选择周"
        @change="dateSelect"
        value-format="yyyy-MM-dd"
        :picker-options="{'firstDayOfWeek': 1}"
        :clearable="false"
      ></el-date-picker>
    </el-row>

    <el-row>
      班级选择：
      <el-dropdown trigger="click" @command="classSelect">
        <el-button type="primary">
          {{currentClassId}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in classIds" :key="index" :command="item">{{item}}班</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>

    <el-tabs v-model="tabActiveName" @tab-click="tabClick" type="card">
      <el-tab-pane label="主修课" name="mainTab">
        <!-- 主修课表 -->
        <el-table :data="mainClass" style="width: 100%" stripe>
          <el-table-column prop="date" label="日期" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.date | dateFormat('MM-DD')}}</div>
              <div>{{scope.row.timeStart + '-' + scope.row.timeEnd}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="课程" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editCourse(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="confirmDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="活动课" name="activityTab">
        <!-- 活动课表 -->
        <el-table :data="activityClass" style="width: 100%" stripe>
          <el-table-column prop="date" label="日期" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.date | dateFormat('MM-DD')}}</div>
              <div>{{scope.row.timeStart + '-' + scope.row.timeEnd}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="课程" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editCourse(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="confirmDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="试听课" name="tryTab">
        <!-- 试听课表 -->
        <el-table :data="tryClass" style="width: 100%" stripe>
          <el-table-column prop="date" label="日期" align="center">
            <template slot-scope="scope">
              <div>{{scope.row .date | dateFormat('MM-DD')}}</div>
              <div>{{scope.row.timeStart + '-' + scope.row.timeEnd}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="课程" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="editCourse(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="confirmDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-button type="primary" @click="addCourse">新增课程</el-button>

    <!-- 修改课程dialog -->
    <el-dialog title="修改课程" :visible.sync="dialogEditCourseVisible" width="90%">
      <el-form :model="editCourseForm" label-width="110px" :rules="rules" ref="ruleFormEdit">
        <el-form-item label="课程名称" size="small" prop="name">
          <el-input v-model="editCourseForm.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" size="small" prop="type">
          <el-select v-model="editCourseForm.type" placeholder="请选择课程类型" style="width: 100%;">
            <el-option label="主修课" value="主修课"></el-option>
            <el-option label="活动课" value="活动课"></el-option>
            <el-option label="试听课" value="试听课"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程日期" size="small" prop="date">
          <el-date-picker
            v-model="editCourseForm.date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="{'firstDayOfWeek': 1}"
            :clearable="false"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="课程开始时间" size="small" prop="timeStart">
          <el-time-select
            placeholder="起始时间"
            v-model="editCourseForm.timeStart"
            style="width: 100%;"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="课程结束时间" size="small" prop="timeEnd">
          <el-time-select
            placeholder="结束时间"
            v-model="editCourseForm.timeEnd"
            style="width: 100%;"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: editCourseForm.timeStart
          }"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="班级id" size="small" prop="classId">
          <el-input v-model="editCourseForm.classId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCourseConfirm('ruleFormEdit')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增课程dialog -->
    <el-dialog title="新增课程" :visible.sync="dialogAddCourseVisible" width="90%">
      <el-form :model="addCourseForm" label-width="110px" :rules="rules" ref="ruleFormAdd">
        <el-form-item label="课程名称" size="small" prop="name">
          <el-input v-model="addCourseForm.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" size="small" prop="type">
          <el-select v-model="addCourseForm.type" placeholder="请选择课程类型" style="width: 100%;">
            <el-option label="主修课" value="主修课"></el-option>
            <el-option label="活动课" value="活动课"></el-option>
            <el-option label="试听课" value="试听课"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程日期" size="small" prop="date">
          <el-date-picker
            v-model="addCourseForm.date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="{'firstDayOfWeek': 1}"
            :clearable="false"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="课程开始时间" size="small" prop="timeStart">
          <el-time-select
            placeholder="起始时间"
            v-model="addCourseForm.timeStart"
            style="width: 100%;"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="课程结束时间" size="small" prop="timeEnd">
          <el-time-select
            placeholder="结束时间"
            v-model="addCourseForm.timeEnd"
            style="width: 100%;"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: addCourseForm.timeStart
          }"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="班级id" size="small" prop="classId">
          <el-input v-model="addCourseForm.classId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourseConfirm('ruleFormAdd')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 课程删除dialog -->
    <el-dialog title="是否继续删除？" :visible.sync="dialogDeleteCourseVisible" width="90%" top="30vh">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteCourseVisible = false">取 消</el-button>
        <el-button type="warning" @click="deleteCourse(deleteRow)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManageCourse",
  data() {
    return {
      mainClass: [],
      activityClass: [],
      tryClass: [],
      classIds: [],
      selectWeek: "",
      tabActiveName: "mainTab",
      currentCourseType: "主修课",
      currentClassId: 1,
      dialogEditCourseVisible: false,
      dialogAddCourseVisible: false,
      dialogDeleteCourseVisible: false,
      deleteRow: null,
      editCourseForm: {
        id: null,
        name: "",
        type: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        classId: ""
      },
      addCourseForm: {
        name: "",
        type: "",
        date: this.$moment().format("YYYY-MM-DD"),
        timeStart: "",
        timeEnd: "",
        classId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择课程类型", trigger: "change" }
        ],
        timeStart: [
          { required: true, message: "请输入开始时间", trigger: "change" }
        ],
        timeEnd: [
          { required: true, message: "请输入结束时间", trigger: "change" }
        ],
        classId: [{ required: true, message: "请输入班级id", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.selectWeek = this.$moment().format("YYYY-MM-DD");

    // 请求每周的课程
    this.$http
      .get(process.env.url + "/courseBetweenWeek/" + this.currentClassId, {
        params: {
          dateStart: this.$moment()
            .weekday(1)
            .format("YYYY-MM-DD"),
          dateEnd: this.$moment()
            .weekday(7)
            .format("YYYY-MM-DD"),
          courseType: this.currentCourseType
        }
      })
      .then(res => {
        // this.mainClass = res.data._embedded.schedule;
        this.mainClass = res.data;
      });

    // 获取班级id
    this.$http.get(process.env.url + "/getClassId").then(res => {
      this.classIds = res.data;
    });
  },
  methods: {
    dateSelect() {
      // console.log(this.selectWeek);
      // console.log("日期变换");

      // 请求每周的课程
      this.$http
        .get(process.env.url + "/courseBetweenWeek/" + this.currentClassId, {
          params: {
            // 选择日期的周一
            dateStart: this.$moment(this.selectWeek)
              .weekday(1)
              .format("YYYY-MM-DD"),
            // 选择日期的周天
            dateEnd: this.$moment(this.selectWeek)
              .weekday(7)
              .format("YYYY-MM-DD"),
            courseType: this.currentCourseType
          }
        })
        .then(res => {
          switch (this.currentCourseType) {
            case "主修课":
              this.mainClass = res.data;
              break;
            case "活动课":
              this.activityClass = res.data;
              break;
            case "试听课":
              this.tryClass = res.data;
              break;
            default:
              break;
          }
        });
    },
    classSelect(command) {
      // console.log("班级选择");
      this.currentClassId = command;

      this.dateSelect();
    },
    tabClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.label);

      // 请求每周的课程
      this.$http
        .get(process.env.url + "/courseBetweenWeek/" + this.currentClassId, {
          params: {
            // 选择日期的周一
            dateStart: this.$moment(this.selectWeek)
              .weekday(1)
              .format("YYYY-MM-DD"),
            // 选择日期的周天
            dateEnd: this.$moment(this.selectWeek)
              .weekday(7)
              .format("YYYY-MM-DD"),
            courseType: tab.label
          }
        })
        .then(res => {
          switch (tab.label) {
            case "主修课":
              this.mainClass = res.data;
              this.currentCourseType = "主修课";
              this.activityClass = [];
              this.tryClass = [];
              break;
            case "活动课":
              this.activityClass = res.data;
              this.currentCourseType = "活动课";
              this.mainClass = [];
              this.tryClass = [];
              break;
            case "试听课":
              this.tryClass = res.data;
              this.currentCourseType = "试听课";
              this.mainClass = [];
              this.activityClass = [];
              break;
            default:
              break;
          }
        });
    },
    confirmDelete(row) {
      this.dialogDeleteCourseVisible = true;
      this.deleteRow = row;
    },
    deleteCourse(row) {
      this.$http
        .delete(process.env.url + "/schedules/" + row.id)
        .then(res => {
          this.deleteRow = null;
          this.dialogDeleteCourseVisible = false;
          this.dateSelect();
          this.$message("删除成功");
        });
    },
    editCourse(row) {
      this.editCourseForm.id = row.id;
      this.editCourseForm.name = row.name;
      this.editCourseForm.type = row.type;
      this.editCourseForm.date = this.$moment(row.date).format("YYYY-MM-DD");
      this.editCourseForm.timeStart = row.timeStart;
      this.editCourseForm.timeEnd = row.timeEnd;
      this.editCourseForm.classId = row.classId;
      this.dialogEditCourseVisible = true;
    },
    editCourseConfirm(formName) {
      // console.log("课程修改确认");

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message("修改成功");
          this.$http
            .put(
              process.env.url + "/schedules/" + this.editCourseForm.id,
              this.editCourseForm
            )
            .then(res => {
              this.dateSelect();
              // 获取班级id
              this.$http.get(process.env.url + "/getClassId").then(res => {
                this.classIds = res.data;
              });
              this.currentClassId = this.classIds[0];
            });
          this.dialogEditCourseVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addCourse() {
      this.date = this.$moment().format("YYYY-MM-DD");
      this.dialogAddCourseVisible = true;
    },
    addCourseConfirm(formName) {
      // console.log("课程新增确认");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message("新增成功");
          this.$http
            .post(process.env.url + "/schedules", this.addCourseForm)
            .then(res => {
              this.dateSelect();
              // 获取班级id
              this.$http.get(process.env.url + "/getClassId").then(res => {
                this.classIds = res.data;
              });
              this.currentClassId = this.classIds[0];
            });
          this.dialogAddCourseVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>