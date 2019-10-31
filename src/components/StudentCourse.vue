<template>
  <div class="StudentCourse">
    <el-row>
      日期选择
      <el-date-picker
        v-model="selectWeek"
        type="week"
        format="yyyy 年 第 WW 周"
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

    <!-- 三个切换tab -->
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
              <el-button @click="courseClick(scope.row)" type="text" size="small">请假</el-button>
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
              <el-button @click="courseClick(scope.row)" type="text" size="small">请假</el-button>
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
              <el-button @click="courseClick(scope.row)" type="text" size="small">请假</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 课程请假dialog -->
    <el-dialog title="是否继续请假？" :visible.sync="dialogVisible" width="70%" top="30vh">
      <el-dialog
        width="70%"
        title="确认请假？"
        :visible.sync="innerDialogVisible"
        top="30vh"
        append-to-body
      >
        <span>请假后课时无法恢复</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerDialogVisible = false;dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="innerDialogVisible = false;dialogVisible = false">确定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="innerDialogVisible = true;">请假</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentCourse",
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
      dialogVisible: false,
      innerDialogVisible: false
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
        this.mainClass = res.data
      });

    // 获取班级id
    this.$http.get(process.env.url + "/getClassId").then(res => {
      this.classIds = res.data;
    });
  },
  methods: {
    dateSelect() {
      // console.log(this.selectWeek);
      console.log("日期变换");

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
      this.currentClassId = command

      this.dateSelect()
    },
    tabClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.label);

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
    courseClick(row) {
      // console.log(row); // row是整行数据对象 私有监视对象
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
</style>
