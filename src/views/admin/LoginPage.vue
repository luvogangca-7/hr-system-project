<template>
  <div class="login-wrapper">
    <div class="roles">
      <button @click="$store.commit('adminRole')">Admin</button>
      <button @click="$store.commit('staffRole')">Staff</button>
    </div>
    <div class="login-box">
      <h2>{{$store.state.isAdmin? 'Welcome Admin' : 'Welcome Staff'}}</h2>
      <form @submit.prevent="$store.state.isAdmin? loginAdmin() : loginStaff()">
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
    loginAdmin() {
        // Simple authentication logic: checks hardcoded credentials
        if(this.username === "admin" && this.password === "1234") {
            this.error ='',
            // If credentials are correct, navigate to dashboard
            this.$router.push('/admin/dashboard')
        }else{
            // Otherwise, show error message
            this.error = 'invalid username or password'
        }
    },
    loginStaff(){

      if(this.username === "user" && this.password === "1234") {
            this.error ='',
            // If credentials are correct, navigate to dashboard
            this.$router.push('/staff/mydashboard')
        }else{
            // Otherwise, show error message
            this.error = 'invalid username or password'
        }
    }
    
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
  min-height: 100vh;
  width: 100vw;
  background-image: url('/src/views/pics/mts-logo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
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
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  color:#fff;
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