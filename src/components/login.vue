<template>
	<div class="login-main">
		<div class="login-wrap">
			<el-form :model="logonFrom" status-icon :rules="rules2" ref="logonFrom" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="username">
			   	<el-input type="text" v-model="logonFrom.username" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="logonFrom.pass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('logonFrom')">提交</el-button>
			    <el-button @click="resetForm('logonFrom')">重置</el-button>
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
	.login-main {
    position: relative;
		width: 100%;
		height: 100%;
		background: url('../images/login_bg.jpg') no-repeat 0 0 / cover;
		.login-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
			border-radius: 10px;
			padding: 45px 30px 10px 0;
			width: 450px;
			background: #fff;
			box-sizing: border-box;
      transform: translate(-50%, -50%);
		}
	}
</style>
<script>
   export default {
    data() {
      let empty = /\s+/,
          username = (rule, value, callback) => {
        	value === '' ? callback(new Error('请输入用户名')) : empty.test(value) ? callback(new Error('用户名不能有空格')) : callback();
          },
          pass = (rule, value, callback) => {
            value === '' ? callback(new Error('请输入密码')) : empty.test(value) || value.length < 6 ? callback(new Error('密码至少6位，且不能有空格')) : callback();
          };
      return {
        logonFrom: {
          username: '',
          pass: ''
        },
        rules2: {
          username: [
            { validator: username, trigger: 'blur,change' }
          ],
          pass: [
            { validator: pass, trigger: 'blur,change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            window.location = '/home';
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