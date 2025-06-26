<template>
  <header v-if="hideDash">
    <div class="header-cont" >
       <h1 class="logo">ModernTech Solutions</h1>
       <button class="butn">Logout</button>
    </div>
  </header>
  <div id="app-layout">

    <navbar-comp :hide-dash="hideDash"/>
    
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>
<script>
import NavbarComp from './components/NavbarComp.vue';

export default {
  components: {
    NavbarComp
  },
  computed: {
    hideDash(){
      return this.$route.path !== '/'
    }
  }
}

</script>


<style>
#app-layout {
  display: flex;
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #42b983;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

.header-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  color: white;
}

.butn {
  background-color: #2c3e50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 6px;
}

.sidebar {
  width: 220px;
  background: #2c3e50;
  color: #fff;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
  padding: 15px 30px;
  font-weight: bold;
  transition: background 0.2s;
}

.sidebar a.router-link-exact-active {
  background: #42b983;
  color: #fff;
  border-radius: 10px;
  margin: 5px 5px;
}

.sidebar a:hover {
  background: #34495e;
  border-radius: 10px;
  margin: 5px 5px;
}

.main-content {
  flex: 1;
  padding: 40px;
  background: #f7f7f7;
}
</style>