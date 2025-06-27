<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2>Welcome Back</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input class="input" id="username" v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input class="input" id="password" v-model="password" type="password" required />
        </div>
        <button class="submit" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
        // Simple authentication logic: checks hardcoded credentials
        if(this.username === "admin" && this.password === "1234") {
            this.error ='',
            // If credentials are correct, navigate to dashboard
            this.$router.push('/dashboard')
        }else{
            // Otherwise, show error message
            this.error = 'invalid username or password'
        }
    },
  },
};
</script>
<style>
.footer-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #111;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  font-size: 1rem;
  letter-spacing: 1px;
  z-index: 100;
}
.login-wrapper {
  height: 100vh;
  background-image: url('../assets/mts-logo.jpg'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  position: relative;
  top: -100px;
  background: rgba(255, 255, 255, 0.2); /* Transparent white */
  backdrop-filter: blur(10px); /* Glass effect */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 300px;
  color: #fff;
  /* Animation for login box appearance */
  animation: appear 2s 0.2s ease forwards;
  opacity: 0;
}
.login-box h2 {
  text-align: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #fff;
}
.input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
}
.submit {
  width: 100%;
  padding: 10px;
  background-color: #ffffffaa;
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
.submit:hover {
  background-color: #ffffffcc;
}

.main-content {
  padding: 0;
}

/* Keyframes for login box animation */
@keyframes appear {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
    transform: translateY(100px);
  }
  
}
</style>