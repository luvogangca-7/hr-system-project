<template>
  <header v-if="hideDash">
    <div class="header-cont">
      <h1 class="logo">ModernTech Solutions</h1>
      <button class="butn" @click="showLogoutModal">Logout</button>
    </div>
  </header>
  <div id="app-layout">
    <navbar-comp :hide-dash="hideDash"/>
    <main class="main-content">
      <!-- Bootstrap Modal -->
      <div class="modal fade" ref="logoutModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Logout</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" @click="logOut">Yes</button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
      <router-view/>
    </main>
    
  </div>
  <footer-comp/>
</template>
<script>
import FooterComp from './components/FooterComp.vue';
import NavbarComp from './components/NavbarComp.vue';
import * as bootstrap from 'bootstrap';

export default {
  components: { NavbarComp, FooterComp },
  computed: {
    hideDash() {
      return this.$route.path !== '/';
    }
  },
  methods: {
    showLogoutModal() {
      const modal = new bootstrap.Modal(this.$refs.logoutModal);
      modal.show();
    },
    logOut() {
      this.$router.push('/');
      // hide the modal after pressing yes
      const modal = bootstrap.Modal.getInstance(this.$refs.logoutModal);
      modal.hide();
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
  background-color: #af2727;
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
  background-color: #36424e;
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
  margin: 5px 5px;
  border-radius: 10px;
}

.sidebar a.router-link-exact-active {
  background: #af2727;
  color: #fff;
  border-radius: 10px;
  margin: 5px 5px;
}

.sidebar a:hover {
  background: #ae4444;
  border-radius: 10px;
  margin: 5px 5px;
  transition: transform 0.2ms ease-in-out;
}

h1 {
  font-weight: 700;
}

.main-content {
  flex: 1;
  padding: 10px 40px;
  background: #f7f7f7;
}

.main-page {
  /* max-width: 700px; */
  margin: 10px auto;
  background: #f9f9f9;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
}

.page-wrapper {
  padding: 20px;
}
</style>