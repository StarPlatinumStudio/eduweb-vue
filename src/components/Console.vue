<template>
<el-container>
 <el-dialog
  title="添加管理员"
  :visible.sync="addAdminDialogVisible"
  width="90%"
  >
  <el-form ref="addAdminForm" :model="addAdminForm" label-width="80px">
  <el-form-item label="人员昵称" prop="name" autocomplete="off" :rules="[{ required: true, message: '人员昵称不能为空'}]">
    <el-input v-model="addAdminForm.name"></el-input>
  </el-form-item>
  <el-form-item label="登录账户" prop="account" autocomplete="off" :rules="[{ required: true, message: '登陆账户不能为空'}]">
    <el-input v-model="addAdminForm.account"></el-input>
  </el-form-item>
  <el-form-item label="登录密码" prop="password" autocomplete="off" :rules="[{ required: true, message: '登陆密码不能为空'}]">
    <el-input v-model="addAdminForm.password"></el-input>
  </el-form-item>
  <el-form-item label="管理权限">
  <el-switch
  v-model="authoritys.admin"
  active-text="人员管理">
  </el-switch>
  <el-switch
  v-model="authoritys.user"
  active-text="用户管理">
  </el-switch>
  <el-switch
  v-model="authoritys.edit"
  active-text="资源管理">
  </el-switch>
  <el-switch
  v-model="authoritys.event"
  active-text="活动管理">
  </el-switch>
  </el-form-item>
  <el-button type="primary" round style="width: 100%"  @click="addAdmin('addAdminForm')" v-loading.fullscreen.lock="fullscreenLoading">确认添加</el-button>
  </el-form>
 </el-dialog>
  <el-dialog
  title="管理管理员"
  :visible.sync="manageAdminDialogVisible"
  width="90%"
  >
  <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
      帮助&nbsp;&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
    </template>
    <div style="text-align: left">数据库ID(主键)：唯一确保账户信息唯一性的数据。</div>
    <br/>
    <div style="text-align: left">修改数据时请确认登录账户不要重复，否则会在登陆时造成错误</div>
  </el-collapse-item>
  </el-collapse>
  <el-form ref="adminForm" :model="adminForm" label-width="80px">
    <el-form-item label="数据库ID" >
    <el-input disabled v-model="adminForm.id"></el-input>
    </el-form-item>
    <el-form-item label="人员昵称" prop="name" autocomplete="off" :rules="[{ required: true, message: '人员昵称不能为空'}]">
    <el-input v-model="adminForm.name"></el-input>
    </el-form-item>
    <el-form-item label="登录账户" prop="account" autocomplete="off" :rules="[{ required: true, message: '登陆账户不能为空'}]">
    <el-input v-model="adminForm.account"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="password" autocomplete="off" :rules="[{ required: true, message: '登陆密码不能为空'}]">
    <el-input v-model="adminForm.password"></el-input>
    </el-form-item>
    <el-form-item label="管理权限">
    <el-switch
    v-model="adminFormAuthoritys.admin"
    active-text="人员管理">
    </el-switch>
    <el-switch
      v-model="adminFormAuthoritys.user"
    active-text="用户管理">
    </el-switch>
    <el-switch
    v-model="adminFormAuthoritys.edit"
    active-text="资源管理">
    </el-switch>
    <el-switch
    v-model="adminFormAuthoritys.event"
    active-text="活动管理">
    </el-switch>
    </el-form-item>
    <el-button-group>
      <el-button type="danger" round style="width: 50%"  @click="deleteAdmin('adminForm')" v-loading.fullscreen.lock="fullscreenLoading">删除管理员</el-button>
    <el-button type="primary" round style="width: 50%"  @click="manageAdmin('adminForm')" v-loading.fullscreen.lock="fullscreenLoading">确认修改</el-button>
    </el-button-group>
  </el-form>
   </el-dialog>
  <el-dialog
  title="新增校区"
  :visible.sync="addSchoolDialogVisible"
  width="90%"
  >
  <el-form ref="saveSchoolForm" :model="saveSchoolForm" label-width="80px">
  <el-form-item label="校区名称" prop="name" autocomplete="off" :rules="[{ required: true, message: '校区名称不能为空'}]">
    <el-input v-model="saveSchoolForm.name"></el-input>
  </el-form-item>
  <el-form-item label="校区位置" prop="address" autocomplete="off" :rules="[{ required: true, message: '登陆账户不能为空'}]">
    <el-input v-model="saveSchoolForm.address"></el-input>
  </el-form-item>
  <el-form-item label="介绍详情"   prop="detial" autocomplete="off" :rules="[{ required: true, message: '介绍详情不能为空'}]">
    <el-input type="textarea" v-model="saveSchoolForm.detial"></el-input>
  </el-form-item>
  <el-button type="primary" round style="width: 100%"  @click="saveSchool('saveSchoolForm')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
  </el-form>
  </el-dialog>
  <el-dialog
  title="编辑校区"
  :visible.sync="editSchoolDialogVisible"
  width="90%"
  >
  <el-form ref="saveSchoolForm" :model="saveSchoolForm" label-width="80px">
    <el-form-item label="数据库ID" prop="id">
    <el-input disabled v-model="saveSchoolForm.id"></el-input>
  </el-form-item>
  <el-form-item label="校区名称" prop="name" autocomplete="off" :rules="[{ required: true, message: '校区名称不能为空'}]">
    <el-input v-model="saveSchoolForm.name"></el-input>
  </el-form-item>
  <el-form-item label="校区位置" prop="address" autocomplete="off" :rules="[{ required: true, message: '登陆账户不能为空'}]">
    <el-input v-model="saveSchoolForm.address"></el-input>
  </el-form-item>
  <el-form-item label="介绍详情"   prop="detial" autocomplete="off" :rules="[{ required: true, message: '介绍详情不能为空'}]">
    <el-input type="textarea" v-model="saveSchoolForm.detial"></el-input>
  </el-form-item>
  <el-button-group>
    <el-button type="danger" round style="width: 50%"  @click="deleteSchool()" v-loading.fullscreen.lock="fullscreenLoading">删除校区</el-button>
  <el-button type="primary" round style="width: 50%"  @click="editSchool()" v-loading.fullscreen.lock="fullscreenLoading">立即修改</el-button>
  </el-button-group>
  </el-form>
  </el-dialog>
  <el-dialog
  title="添加班级"
  :visible.sync="addClassDialogVisible"
  width="90%"
  >
  <el-form ref="saveClassForm" :model="saveClassForm" label-width="80px">
  <el-form-item label="归属校区" prop="school" autocomplete="off" :rules="[{ required: true, message: '校区名称不能为空'}]">
    <el-cascader v-model="saveClassForm.school" :options="schoolOption" :show-all-levels="false"></el-cascader>
  </el-form-item>
  <el-form-item label="班级名称" prop="name" autocomplete="off" :rules="[{ required: true, message: '班级名称不能为空'}]">
    <el-input v-model="saveClassForm.name"></el-input>
  </el-form-item>
  <el-form-item label="介绍详情"   prop="detial" autocomplete="off" :rules="[{ required: true, message: '介绍详情不能为空'}]">
    <el-input type="textarea" v-model="saveClassForm.detial"></el-input>
  </el-form-item>
      班级相册超连接（可选）
    <el-input v-model="saveClassForm.pictures"></el-input>
  <el-button type="primary" round style="margin-top: 20px;width: 100%"  @click="saveClass('saveClassForm')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
  </el-form>
  </el-dialog>
  <el-dialog title="编辑班级" :visible.sync="editClassDialogVisible" width="90%" >
    <el-form ref="saveClassForm" :model="saveClassForm" label-width="80px">
      <el-form-item label="数据库ID" prop="id">
        <el-input disabled v-model="saveClassForm.id"></el-input>
      </el-form-item>
    <el-form-item label="归属校区" prop="school">
      <el-input disabled v-model="saveClassForm.school"></el-input>
    </el-form-item>
    <el-form-item label="班级名称" prop="name" autocomplete="off" :rules="[{ required: true, message: '班级名称不能为空'}]">
      <el-input v-model="saveClassForm.name"></el-input>
    </el-form-item>
    <el-form-item label="介绍详情"   prop="detial" autocomplete="off" :rules="[{ required: true, message: '介绍详情不能为空'}]">
      <el-input type="textarea" v-model="saveClassForm.detial"></el-input>
    </el-form-item>
          班级相册超连接（可选）
    <el-input v-model="saveClassForm.pictures"></el-input>
    <el-button type="primary" round style="margin-top：20px;width: 100%"  @click="editClass('saveClassForm')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
    </el-form>
  </el-dialog>
  <el-dialog title="处理VIP请求" :visible.sync="vipRequestDialogVisible" width="90%" >
    <el-form label-width="80px">
      <el-form-item label="数据库ID" prop="id">
        <el-input disabled v-model="vipRequestForm.id"></el-input>
      </el-form-item>
    <el-form-item label="微信名">
      <el-input disabled v-model="vipRequestForm.nickname"></el-input>
    </el-form-item>
    <el-form-item label="请求留言">
      <el-input disabled v-model="vipRequestForm.detial"></el-input>
    </el-form-item>
    <el-form-item label="班级分配">
      <el-cascader v-model="vipRequestForm.theclass" :options="allClass" :show-all-levels="false"></el-cascader>
    </el-form-item>
     <el-form-item label="备注(选填)">
      <el-input v-model="vipRequestForm.adminmessage"></el-input>
    </el-form-item>
    <el-button type="primary" round style="width: 40%"  @click="vipRequestForm.theclass=vipRequestForm.theclass[0];saveVipRequest('已同意')" v-loading.fullscreen.lock="fullscreenLoading">通过请求</el-button>
    <el-button type="danger" round style="width: 40%"  @click="vipRequestForm.theclass='';saveVipRequest('已拒绝')" v-loading.fullscreen.lock="fullscreenLoading">拒绝请求</el-button>
    </el-form>
  </el-dialog>
  <el-dialog :visible.sync="imgPreviewDialogVisible">
    <img width="100%" :src="imgPreviewDialogImageUrl" alt="">
  </el-dialog>
   <el-dialog title="点评" :visible.sync="commentDialogVisible" width="90%">
     点评{{comment.nickname}}的作业
    <el-input type="textarea" placeholder='在这里填写内容' v-model="comment.comment" height='100px'></el-input>
    <el-button type="primary" round style="width: 100%"  @click="saveComment()" v-loading.fullscreen.lock="fullscreenLoading">提交点评</el-button>
  </el-dialog>
  <el-header style="padding:0;">
    <el-page-header @back="goBack" content="言桥教育 管理控制台">
    </el-page-header>
    <el-row>
      <el-col  :xs='{span: 24,}' :sm='{span: 16, offset: 4}' :md='{span: 16, offset: 4}' :lg='{span: 12, offset: 6}' :xl='{span: 12, offset: 6}'>
<el-tabs type="border-card" v-model="activeName">
    <el-tab-pane  name="1" style="text-align: initial;">
           <span slot="label"><i class="el-icon-user"></i> 个人中心</span>
           <el-row ><el-avatar icon="el-icon-user-solid"></el-avatar><span class="adminname">{{adminInfo.name}}</span></el-row>
           <el-row>
               <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                         修改个人信息&nbsp;&nbsp;&nbsp;<i class="header-icon el-icon-edit"></i>
                    </template>
                        <el-form ref="myForm" :model="myForm" >
                            <el-form-item label="昵称" prop="name" :rules="[{ required: true, message: '名称不能为空'}]">
                             <el-input :disabled="true" v-model="myForm.name" placeholder="请输入你的昵称" ></el-input>
                            </el-form-item>
                            <el-form-item label="登录账户">
                             <el-input :disabled="true" v-model="myForm.account"></el-input>
                            </el-form-item>
                             <el-form-item label="登录密码" prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
                             <el-input  v-model="myForm.password" placeholder="请输入密码" ></el-input>
                         </el-form-item>
                         <el-button type="primary" round style="width: 100%"  @click="updateMe('myForm')" v-loading.fullscreen.lock="fullscreenLoading">提交修改</el-button>
                    </el-form>
                  </el-collapse-item>
               </el-collapse>
           </el-row>
           <el-button type="info" plain round style="width: 100%;margin-top: 10px"  @click="$router.push({ name: 'HelloWorld' })">退出登录</el-button>
    </el-tab-pane>
<el-tab-pane name="2" :disabled="myAuth.admin">
  <span slot="label"><i class="el-icon-s-cooperation"></i>行政管理</span>
  <el-tabs v-model="adminTab">
    <el-tab-pane label="管理员管理" name="1">
      <el-button type="primary" round style="width: 100%"  @click="addAdminDialogVisible=true" v-loading.fullscreen.lock="fullscreenLoading">添加管理员</el-button>
      <el-table
       :data="this.allAdmin"
       style="width: 100%">
       <el-table-column
        prop="account"
        label="登录账户">
        </el-table-column>
        <el-table-column
        prop="name"
        label="名称">
        </el-table-column>
         <el-table-column
        fixed="right"
        label="操作">
          <template slot-scope="adminscope">
           <el-button @click="editAdmin(adminscope.$index)" type="text" size="small">编辑</el-button>
          </template>
       </el-table-column>
      </el-table>
       </el-tab-pane>
    <el-tab-pane label="校区管理" name="2">
      <el-row>
        <el-button type="primary" round style="width: 100%"  @click="saveSchoolForm={};addSchoolDialogVisible=true" v-loading.fullscreen.lock="fullscreenLoading">添加校区</el-button>
      </el-row>
      <br/>
      <el-row>
        <el-button type="primary" round style="width: 100%"  @click="saveClassForm={};addClassDialogVisible=true" v-loading.fullscreen.lock="fullscreenLoading">添加班级</el-button>
      </el-row>
      <el-table
       :data="schoolOption"
       style="width: 100%">
       <el-table-column
        prop="id"
        label="数据库ID">
        </el-table-column>
        <el-table-column
        prop="value"
        label="校区名称">
        </el-table-column>
         <el-table-column
        fixed="right"
        label="操作">
          <template slot-scope="schoolscope">
           <el-button @click="saveSchoolForm = {id: schoolOption[schoolscope.$index].id, name: schoolOption[schoolscope.$index].value, address: schoolOption[schoolscope.$index].address, detial: schoolOption[schoolscope.$index].detial};editSchoolDialogVisible=true" type="text">编辑</el-button>
          </template>
       </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="班级管理" name="3">
     <el-table
       :data="allClass"
       style="width: 100%">
       <el-table-column
        prop="id"
        label="数据库ID">
        </el-table-column>
        <el-table-column
        prop="label"
        label="班级名称">
        </el-table-column>
         <el-table-column
        fixed="right"
        label="操作">
          <template slot-scope="classscope">
           <el-button @click="saveClassForm = {id: allClass[classscope.$index].id,name: allClass[classscope.$index].label,school :allClass[classscope.$index].school, detial: allClass[classscope.$index].detial, pictures: allClass[classscope.$index].pictures};editClassDialogVisible=true" type="text">编辑</el-button>
          </template>
       </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</el-tab-pane>
<el-tab-pane label="用户管理" name="3" :disabled="myAuth.user">
  <el-tabs v-model="userTab">
    <el-tab-pane label="用户列表" name="1">
      <el-card class="box-card" style="margin:10px">
        <el-collapse>
          <el-divider content-position="left">记录在案的用户列表:</el-divider>
          <el-collapse-item v-for="(item, index) in allUsers" :key="index" :title="item.nickname" :name='index' style="text-align: left;">
            <template slot="title">
              <el-avatar icon="el-icon-user-solid" :src='item.headimgurl'></el-avatar>&nbsp;{{item.nickname}}&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
            <el-row>微信名：{{item.nickname}}</el-row>
            <el-row>备注：{{item.remarks}}</el-row>
            <el-row>地区：{{item.country}}&nbsp;{{item.province}}&nbsp;{{item.city}}</el-row>
            <el-row>语言：{{item.language}}</el-row>
            <el-row>性别：{{item.sex}}</el-row>
            <el-row>openid：{{item.openid}}</el-row>
            <el-button @click="saveClassForm = {};vipRequestDialogVisible=true" type="primary" round style="width: 100%">处理请求</el-button>
           </el-collapse-item>
         </el-collapse>
       </el-card>
    </el-tab-pane>
    <el-tab-pane label="会员申请" name="2">
      <el-card class="box-card" style="margin:10px">
        <el-collapse>
          <el-divider content-position="left">待处理的用户VIP申请列表:</el-divider>
          <el-collapse-item v-for="(item, index) in vipRequest.waiting" :key="index" :title="item.nickname" :name='index' style="text-align: left;">
            <template slot="title">
              <el-avatar icon="el-icon-user-solid" :src='item.headimgurl'></el-avatar>&nbsp;{{item.nickname}}&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
            <el-row>微信名：{{item.nickname}}</el-row>
            <el-row>请求留言：{{item.detial}}</el-row>
            <el-row>创建时间：{{item.createtime}}</el-row>
            <el-row>申请状态：{{item.statu}}</el-row>
            <el-row>openid：{{item.openid}}</el-row>
            <el-row><el-button @click="vipRequestForm={};vipRequestForm=item;vipRequestDialogVisible=true" type="primary" round style="width: 100%">处理请求</el-button></el-row>
           </el-collapse-item>
         </el-collapse>
       </el-card>
       <el-card class="box-card" style="margin:10px">
        <el-collapse>
          <el-divider content-position="left">已通过的用户VIP申请列表:</el-divider>
          <el-collapse-item v-for="(item, index) in vipRequest.agree" :key="index" :title="item.nickname" :name='index' style="text-align: left;">
            <template slot="title">
              <el-avatar icon="el-icon-user-solid" :src='item.headimgurl'></el-avatar>&nbsp;{{item.nickname}}&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
            <el-row>微信名：{{item.nickname}}</el-row>
            <el-row>请求留言：{{item.detial}}</el-row>
            <el-row>创建时间：{{item.createtime}}</el-row>
            <el-row>处理时间：{{item.finishtime}}</el-row>
            <el-row>申请状态：{{item.statu}}</el-row>
            <el-row>分配班级：{{item.theclass}}</el-row>
            <el-row>处理管理员：{{item.adminname}}</el-row>
            <el-row>管理员备注：{{item.adminmessage}}</el-row>
            <el-row>openid：{{item.openid}}</el-row>
            <el-row><el-button @click="vipRequestForm={};vipRequestForm=item;vipRequestDialogVisible=true" type="primary" round style="width: 100%">重置请求</el-button></el-row>
           </el-collapse-item>
         </el-collapse>
       </el-card>
       <el-card class="box-card" style="margin:10px">
        <el-collapse>
          <el-divider content-position="left">已拒绝的用户VIP申请列表:</el-divider>
          <el-collapse-item v-for="(item, index) in vipRequest.refuse" :key="index" :title="item.nickname" :name='index' style="text-align: left;">
            <template slot="title">
              <el-avatar icon="el-icon-user-solid" :src='item.headimgurl'></el-avatar>&nbsp;{{item.nickname}}&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
            <el-row>微信名：{{item.nickname}}</el-row>
            <el-row>请求留言：{{item.detial}}</el-row>
            <el-row>创建时间：{{item.createtime}}</el-row>
            <el-row>处理时间：{{item.finishtime}}</el-row>
            <el-row>申请状态：{{item.statu}}</el-row>
            <el-row>处理管理员：{{item.adminname}}</el-row>
            <el-row>管理员备注：{{item.adminmessage}}</el-row>
            <el-row>openid：{{item.openid}}</el-row>
            <el-row><el-button @click="vipRequestForm={};vipRequestForm=item;vipRequestDialogVisible=true" type="primary" round style="width: 100%">重置请求</el-button></el-row>
           </el-collapse-item>
         </el-collapse>
       </el-card>
    </el-tab-pane>
    <!-- <el-tab-pane label="班级管理" name="3">
    </el-tab-pane> -->
  </el-tabs>
    </el-tab-pane>
      <el-tab-pane label="资源管理" name="4" :disabled="myAuth.edit">资源管理</el-tab-pane>
      <el-tab-pane label="作业管理" name="5" :disabled="myAuth.event">
          <el-tabs v-model="adminTab">
            <el-tab-pane label="作业发布" name="1">
              <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  帮助&nbsp;&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
                </template>
                <div style="text-align: left">
                  <p>完成时间：开始时间在未来的，会归入【即将开始的作业】中，开始时间在未来的，会归入【即将开始的作业】中</p>
                  <p>图片最多上传9张，视频最多上传1个，为了用户视频体验，上传的视频请压缩在100M以内</p></div>
              </el-collapse-item>
              </el-collapse>
              <el-form ref="homeWorkForm" :model="homeWorkForm" >
                <el-form-item label="作业名称" prop="name" :rules="[{ required: true, message: '不能为空'}]">
                  <el-input v-model="homeWorkForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="选择班级" prop="theclass" :rules="[{ required: true, message: '不能为空'}]">
                  <el-cascader v-model="homeWorkForm.theclass" multiple :options="allClass" :show-all-levels="false"></el-cascader>
                </el-form-item>
                <el-form-item label="开始时间" prop="starttime" :rules="[{ required: true, message: '不能为空'}]">
                  <el-col>
                    <el-date-picker type="date" placeholder="开始日期" v-model="homeWorkForm.starttime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="截至时间" prop="finishtime" :rules="[{ required: true, message: '不能为空'}]">
                  <el-col>
                    <el-date-picker type="date" placeholder="结束日期" v-model="homeWorkForm.finishtime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="详情描述" prop="detial" :rules="[{ required: true, message: '不能为空'}]">
                  <el-input type="textarea" v-model="homeWorkForm.detial"></el-input>
                </el-form-item>
                <el-form-item label="添加图片">
                </el-form-item>
                <el-upload
                  class="upload-demo"
                  action
                  :http-request="handleUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="limit"
                  :on-exceed="handleExceed"
                  :file-list="homeWorkForm.fileList"
                  :list-type="listType"
                  accept="image/*"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview"></span>
                    <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                  </span>
                  <div slot="tip" class="el-upload__tip">{{ tip }}</div>
                </el-upload>
                <el-form-item label="添加视频">
               <el-upload
                accept="video/*"
                ref="upload"
                action
                :http-request="videoleUpload"
                :limit="videoLimit"
                :before-remove="videoRemove"
                :on-remove="handleRemove"
                :file-list="homeWorkForm.videoList">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
               </el-form-item>
               <el-button :loading="homeWorkBtnAttr" type="primary" @click="saveHomeWork">{{homeWorkBtnStatus}}</el-button>
               <el-button>清空表单</el-button>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="作业列表" name="2">
              <el-row>
                选择要查询的班级<el-cascader v-model="searchTheClass" :options="allClass" :show-all-levels="false"></el-cascader>
                <el-button icon="el-icon-search" round @click="searchHomeWork"></el-button>
              </el-row>
                <el-card class="box-card" style="margin:10px">
                <el-row><el-tag>作业</el-tag> 班级作业表</el-row>
                <el-row v-for="(item, index) in classHomeWork" :key="index">
                  <el-row><p>{{item.name}}</p><small style="color: #909399">{{item.starttime.substring(0,10)}}到{{item.finishtime.substring(0,10)}}</small></el-row>
                  <el-row><el-button-group>
                    <el-button round @click="$store.state.homeWorkDetial=classHomeWork[index];$router.push({ name: 'HomeWorkDetial'})">预览</el-button>
                    <el-button round>编辑</el-button>
                    <el-button round @click="searchUserHomeWork(item.id)">查询</el-button>
                  </el-button-group></el-row>
                  <el-divider></el-divider>
                </el-row>
              </el-card>
              <el-divider content-position="left">提交的作业查询结果</el-divider>
              <el-collapse accordion>
                <el-collapse-item  v-for="(item, index) in userHomeWork" :key="index" :title="item.nickname" :name='index'>
                 <template slot="title">
                   <el-avatar icon="el-icon-user-solid" :src='item.headimgurl'></el-avatar>&nbsp;{{item.nickname}}&nbsp;&nbsp;<i class="header-icon el-icon-info"></i>
                 </template>
                 <el-row>创建时间：{{item.createtime}}</el-row>
                 <el-row>{{item.detial}}</el-row>
                 <el-image style="margin-top: 20px" v-for="url in item.pictures" :key="url" :src="url"></el-image>
                 <video style="width:100%;margin-top: 20px" v-if="item.video" :src="item.video" controls="controls">您的浏览器不支持 video 标签。</video>
                 <el-button @click="comment.comment=item.comment;comment.nickname = item.nickname;comment.id = item.id;commentDialogVisible = true">点评</el-button>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
           </el-tabs>
      </el-tab-pane>
  </el-tabs>
      </el-col>
    </el-row>
   </el-header>
</el-container>
</template>
<script>
import { put } from '@/utils/ali-oss'
import { getDate } from '@/utils/get-date'
export default {
  props: {
    tip: {
      type: String,
      default: '上传大小不能超过8M'
    },
    limit: {
      type: Number,
      default: 9
    },
    videoLimit: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'picture-card'
    }
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        resource: '',
        desc: ''
      },
      homeWorkBtnStatus: '立即发布',
      homeWorkBtnAttr: false,
      imgPreviewDialogImageUrl: '',
      imgPreviewDialogVisible: false,
      imgUrl: '',
      adminInfo: this.$route.params,
      schoolOption: [],
      allClass: [{}],
      allAdmin: [{}],
      allUsers: [{}],
      classHomeWork: [],
      userHomeWork: [],
      vipRequest: {waiting: [], agree: [], refuse: []},
      myForm: {},
      homeWorkForm: {fileList: [], videoList: []},
      adminForm: {},
      adminFormAuthoritys: {
        admin: false,
        user: false,
        edit: false,
        event: false
      },
      activeName: '1',
      adminTab: '1',
      userTab: '1',
      keyvalue: [{}],
      addAdminForm: {
        name: '',
        account: '',
        password: ''
      },
      saveSchoolForm: {},
      saveClassForm: {},
      vipRequestForm: {},
      authoritys: {
        admin: false,
        user: false,
        edit: false,
        event: false
      },
      comment: {comment: ''},
      myAuth: {},
      searchTheClass: '',
      editClassDialogVisible: false,
      addSchoolDialogVisible: false,
      editSchoolDialogVisible: false,
      addClassDialogVisible: false,
      addAdminDialogVisible: false,
      manageAdminDialogVisible: false,
      vipRequestDialogVisible: false,
      commentDialogVisible: false,
      fullscreenLoading: false,
      iconbtndisabled: false,
      subiconbtndisabled: true
    }
  },
  created: function () {
    this.myForm = this.adminInfo
    console.log(this.adminInfo)
    if (this.adminInfo.id === undefined) {
      this.$message('登录状态过期请重新登录')
      this.$router.push({ name: 'HelloWorld' })
    } else {
      let auth = JSON.parse(this.adminInfo.authority)
      auth.admin = !auth.admin
      auth.user = !auth.user
      auth.edit = !auth.edit
      auth.event = !auth.event
      if (!auth.addAdmin) {
        this.$http.get(process.env.url + '/api/alladmin').then(response => {
          this.allAdmin = response.data
        })
        this.$http.get(process.env.url + '/api/allschools').then(response => {
          this.schoolOption = response.data
        })
        this.$http.get(process.env.url + '/api/alltheclass').then(response => {
          this.allClass = response.data
        })
      }
      if (!auth.user) {
        this.$http.get(process.env.url + '/api/allusers').then(response => {
          this.allUsers = response.data
        })
        this.$http.get(process.env.url + '/api/allviprequest').then(response => {
          let allVipRequest = response.data
          allVipRequest.forEach(element => {
            switch (element.statu) {
              case '待审核':
                this.vipRequest.waiting.push(element)
                break
              case '已拒绝':
                this.vipRequest.refuse.push(element)
                break
              case '已同意':
                this.vipRequest.agree.push(element)
                break
            }
          })
        })
      }
      this.myAuth = auth
      console.log(this.myAuth)
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.$emit('on-remove', file, fileList)
    },
    handlePreview (file) {
      this.imgPreviewDialogImageUrl = file.url
      this.imgPreviewDialogVisible = true
      this.$emit('on-preview', file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`)
    },
    // 照片删除
    beforeRemove (file, fileList) {
      delete this.homeWorkForm.fileList[file.uid]
      console.log(this.fileList)
    },
    videoRemove (file, fileList) {
      delete this.homeWorkForm.videoList[file.uid]
    },
    handleSuccess (response, file, fileList) {
      console.log('updown succeed')
      this.$emit('on-success', file, fileList)
    },
    /**
     * 自定义上传方法
     */
    handleUpload (option) {
      // 生成的文件名称
      // let objName = getFileNameUUID()
      // 调用 ali-oss 中的方法
      // 上传时锁定发布按钮
      this.homeWorkBtnStatus = '上传中'
      this.homeWorkBtnAttr = true
      put(option.file.uid + option.file.name, option.file).then(res => {
        this.homeWorkBtnStatus = '立即发布'
        this.homeWorkBtnAttr = false
        this.homeWorkForm.fileList[option.file.uid] = res.url
        // console.log(res)
        // console.log(option)
      })
    },
    videoleUpload (option) {
      this.homeWorkBtnStatus = '上传中'
      this.homeWorkBtnAttr = true
      put(option.file.uid + option.file.name, option.file).then(res => {
        this.homeWorkBtnStatus = '立即发布'
        this.homeWorkBtnAttr = false
        this.homeWorkForm.videoList[option.file.uid] = res.url
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    updateMe (myForm) {
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          this.$http.post(process.env.url + '/api/administrator', this.myForm).then(response => {
            if (response.data.ret === 0) {
              this.$message.success(response.data.msg)
              this.$router.push({ name: 'Console', params: response.data.data })
            } else {
              this.$message.error(response.data.msg)
            }
            this.fullscreenLoading = false
          })
        }
      })
    },
    addAdmin (addAdminForm) {
      this.$refs[addAdminForm].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          let data = this.addAdminForm
          let auth = this.authoritys
          data.authority = JSON.stringify(auth)
          this.$http.post(process.env.url + '/api/newadmin', data).then(response => {
            if (response.data.ret === 0) {
              this.$message.success(response.data.msg)
              this.$http.get(process.env.url + '/api/alladmin').then(response => {
                this.allAdmin = response.data
              })
              this.addAdminDialogVisible = false
            } else {
              this.$message.error(response.data.msg)
            }
            this.fullscreenLoading = false
          })
        }
      })
    },
    manageAdmin (adminForm) {
      this.$refs[adminForm].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          let data = this.adminForm
          data.authority = JSON.stringify(this.adminFormAuthoritys)
          this.$http.post(process.env.url + '/api/manageadmin', data).then(response => {
            if (response.data.ret === 0) {
              this.$message.success(response.data.msg)
              this.manageAdminDialogVisible = false
            } else {
              this.$message.error(response.data.msg)
            }
            this.fullscreenLoading = false
          })
        }
      })
    },
    editAdmin (index) {
      this.adminFormAuthoritys = JSON.parse(this.allAdmin[index].authority)
      this.adminForm = this.allAdmin[index]
      this.manageAdminDialogVisible = true
      console.log(this.adminForm)
    },
    deleteAdmin (adminForm) {
      this.fullscreenLoading = true
      let data = this.adminForm
      data.authority = JSON.stringify(this.adminFormAuthoritys)
      this.$http.post(process.env.url + '/api/deleteadmin', data).then(response => {
        if (response.data.ret === 0) {
          this.$message.success(response.data.msg)
          this.manageAdminDialogVisible = false
          this.$http.get(process.env.url + '/api/alladmin').then(response => {
            this.allAdmin = response.data
          })
        } else {
          this.$message.error(response.data.msg)
        }
        this.fullscreenLoading = false
      })
    },
    deleteSchool (index) {
      var newSchool = {id: this.saveSchoolForm.id, label: this.saveSchoolForm.name, value: this.saveSchoolForm.name, address: this.saveSchoolForm.address, detial: this.saveSchoolForm.detial}
      this.$http.post(process.env.url + '/api/deleteschool', newSchool).then(response => {
        if (response.data.ret === 0) {
          this.$message.success(response.data.msg)
          this.$http.get(process.env.url + '/api/allschools').then(response => {
            this.schoolOption = response.data
          })
          this.addAdminDialogVisible = false
        } else {
          this.$message.error(response.data.msg)
        }
        this.fullscreenLoading = false
      })
    },
    saveSchool (saveSchoolForm) {
      this.$refs[saveSchoolForm].validate((valid) => {
        if (valid) {
          var newSchool = this.saveSchoolForm
          newSchool.label = this.saveSchoolForm.name
          newSchool.value = this.saveSchoolForm.name
          this.fullscreenLoading = true
          this.$http.post(process.env.url + '/api/saveschool', newSchool).then(response => {
            if (response.data.ret === 0) {
              this.$message.success(response.data.msg)
              this.schoolOption.push(response.data.data)
              this.addAdminDialogVisible = false
            } else {
              this.$message.error(response.data.msg)
            }
            this.fullscreenLoading = false
          })
        }
      })
    },
    editSchool (index) {
      var newSchool = this.saveSchoolForm
      newSchool.label = this.saveSchoolForm.name
      newSchool.value = this.saveSchoolForm.name
      this.$http.post(process.env.url + '/api/saveschool', newSchool).then(response => {
        if (response.data.ret === 0) {
          this.$message.success(response.data.msg)
          this.$http.get(process.env.url + '/api/allschools').then(response => {
            this.schoolOption = response.data
          })
          this.addAdminDialogVisible = false
        } else {
          this.$message.error(response.data.msg)
        }
        this.fullscreenLoading = false
      })
    },
    saveClass (saveClassForm) {
      this.$refs[saveClassForm].validate((valid) => {
        if (valid) {
          var newClass = this.saveClassForm
          newClass.label = this.saveClassForm.name
          newClass.value = this.saveClassForm.name
          newClass.school = this.saveClassForm.school[0]
          this.fullscreenLoading = true
          this.$http.post(process.env.url + '/api/savetheclass', newClass).then(response => {
            if (response.data.ret === 0) {
              this.$message.success(response.data.msg)
              this.addClassDialogVisible = false
              this.$http.get(process.env.url + '/api/alltheclass').then(response => {
                this.allClass = response.data
              })
            } else {
              this.$message.error(response.data.msg)
            }
            this.fullscreenLoading = false
          })
        }
      })
    },
    editClass (index) {
      var newClass = this.saveClassForm
      newClass.label = this.saveClassForm.name
      newClass.value = this.saveClassForm.name
      newClass.school = this.saveClassForm.school[0]
      this.$http.post(process.env.url + '/api/savetheclass', newClass).then(response => {
        if (response.data.ret === 0) {
          this.$message.success(response.data.msg)
          this.$http.get(process.env.url + '/api/alltheclass').then(response => {
            this.allClass = response.data
          })
          this.fullscreenLoading = false
          this.addAdminDialogVisible = false
        } else {
          this.$message.error(response.data.msg)
        }
        this.fullscreenLoading = false
      })
    },
    saveHomeWork () {
      this.$refs['homeWorkForm'].validate((valid) => {
        if (valid) {
          if (this.homeWorkForm.starttime <= this.homeWorkForm.finishtime) {
            let data = this.homeWorkForm
            data.pictures = []
            for (let index in data.fileList) {
              data.pictures.push(data.fileList[index])
            }
            data.pictures = JSON.stringify(data.pictures)
            for (let index in data.videoList) {
              data.video = data.videoList[index]
            }
            data.createtime = getDate(new Date())
            data.adminname = this.myForm.name
            data.theclass = data.theclass[0]
            console.log(data)
            this.fullscreenLoading = true
            this.$http.post(process.env.url + '/api/savehomework', data).then(response => {
              if (response.data.ret === 0) {
                this.$message.success(response.data.msg)
                console.log('succeed', response.data)
              } else {
                this.$message.error(response.data.msg)
              }
              this.fullscreenLoading = false
            })
          } else {
            this.$message.error('截至时间不可在开始时间之前')
            return false
          }
        }
      })
    },
    saveVipRequest (statu) {
      if (statu === '已同意' && this.vipRequestForm.theclass === null) {
        this.$message.error('必须选择班级')
        return false
      }
      this.vipRequestForm.statu = statu
      this.fullscreenLoading = true
      this.vipRequestForm.finishtime = getDate(new Date())
      this.vipRequestForm.adminname = this.myForm.name
      this.$http.post(process.env.url + '/api/saveviprequest', this.vipRequestForm).then(response => {
        if (response.data.ret === 0) {
          this.$http.get(process.env.url + '/api/allviprequest').then(response => {
            let allVipRequest = response.data
            this.vipRequest = {waiting: [], agree: [], refuse: []}
            allVipRequest.forEach(element => {
              switch (element.statu) {
                case '待审核':
                  this.vipRequest.waiting.push(element)
                  break
                case '已拒绝':
                  this.vipRequest.refuse.push(element)
                  break
                case '已同意':
                  this.vipRequest.agree.push(element)
                  break
              }
            })
          })
          this.$message.success(response.data.msg)
          this.fullscreenLoading = false
          this.vipRequestDialogVisible = false
        } else {
          this.$message.error(response.data.msg)
        }
        this.fullscreenLoading = false
      })
    },
    saveComment () {
      this.$http.post(process.env.url + '/api/commenthomework?id=' + this.comment.id + '&commentadmin=' + this.adminInfo.name + '&comment=' + this.comment.comment + '&commenttime=' + getDate(new Date())).then(response => {
        if (response.data.ret === 0) {
          this.$message.success('点评成功')
          this.commentDialogVisible = false
        } else {
          this.$message.error(response.data.msg)
        }
        this.fullscreenLoading = false
      })
    },
    searchUserHomeWork (id) {
      this.userHomeWork = []
      this.$http.get(process.env.url + '/api/userhomework?id=' + id).then(response => {
        response.data.forEach(element => {
          element.pictures = JSON.parse(element.pictures)
          this.userHomeWork.push(element)
        })
      })
    },
    searchHomeWork () {
      this.$http.get(process.env.url + '/api/classhomework?theclass=' + this.searchTheClass).then(response => {
        if (response.data.ret === 0) {
          this.classHomeWork = response.data.data
        } else {
          this.$message.error(response.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.adminname{
    position: relative;
    bottom: 13px;
    font-size: larger;
    padding-left: 40px;
}
.hello {
   text-align: center;
}
</style>
