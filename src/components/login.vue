<template>
	<div class="main">
		<div class="login-wrap">
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="username">
			   	<el-input type="password" v-model="ruleForm2.username" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
			    <el-button @click="resetForm('ruleForm2')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<style lang="scss">
	html,
	body {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.main {
		width: 100%;
		height: 100%;
		background: url(../images/login_bg.jpg) no-repeat 0 0 / cover;
		.login-wrap {
			border-radius: 10px;
			padding: 20px 20px 10px 0;
			width: 450px;
			background: #fff;
			box-sizing: border-box;
		}
	}
</style>
<script>
   export default {
    data() {
      var username = (rule, value, callback) => {
      	value === '' ? callback(new Error('请输入用户名')) : callback();
      };
      var pass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== this.ruleForm2.username) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          pass: ''
        },
        rules2: {
          username: [
            { validator: username, trigger: 'blur' }
          ],
          pass: [
            { validator: pass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>