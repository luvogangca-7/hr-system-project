<template>
<div class="login-wrapper">
    <div class="loginForm">
        <h2>Please Login</h2>
        <form>
            <label for="name">Username</label>
            <input v-model="name" placeholder="Enter Username" required>
            <br>
            <label for="name">Password</label>
            <input v-model="password" placeholder="password" required>
            <br>
            <button @click="login">Sign In</button>
            <br><br><br>
            <button>Remember Me</button>  
            <p v-if="error">{{ error }}</p>
        </form>
    </div>
 </div>
</template>

<script>
export default{
    data(){
        return {
            name: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login(){
            if(this.name === 'LikhonaBenayo'&& this.password ==='hr_project') {
                this.error = '',
                this.$router.push('/dashboard');
            } else {
                this.error = 'invalid username or password'
            }
        }
    }
}
</script>

<style>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  /* Add your logo as a background image */
  background: url('@/assets/mts-logo.jpg') no-repeat center center fixed;
  background-size: 400px 400px;
  /* fallback color */
  background-color: aquamarine;
}

.loginForm{
    background-color: palevioletred;
    width: 400px;
    height: 280px;
    align-items: center;
    z-index: 1;
    opacity: 0.97;
}

:root{
    background-color: aquamarine;
}

.loginForm button:nth-of-type(2) {
  background-color: #fff;
  color: #13599f;
  border: 2px solid #1a4b7d;
  border-radius: 5px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s, color 0.2s;
}

.loginForm button:nth-of-type(2):hover {
  background-color: #1e90ff;
  color: #fff;
}
</style>