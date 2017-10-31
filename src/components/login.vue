<template>
	<div>
		<el-button>默认按钮</el-button>
		<h1>123</h1>
		<router-link to='/home'>123</router-link>
	</div>
</template>
<style lang="scss">
	h1 {
		background: red;
		transform: scale(1)
	}
</style>
<script>
  import axios from 'axios';
  export default {
  	mounted(){
	  	console.log(axios)
  	}
  };
</script>