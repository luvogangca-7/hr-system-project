<template>
  <header v-if="hideDash">
    <div class="header-cont">
      <!-- Hamburger icon on the left -->
      <button
        class="hamburger"
        @click="toggleSidebar"
        v-show="isMobile"
        aria-label="Toggle sidebar"
      >
        <i class="bi bi-list"></i>
      </button>
      <h1 class="logo">ModernTech Solutions</h1>
      <!-- Logout button always visible -->
      <button class="butn" @click="showLogoutModal">Logout</button>
    </div>
  </header>
  <div id="app-layout">
    <!-- Sidebar: show on desktop or if toggled on mobile -->
    <navbar-comp
      :hide-dash="hideDash"
      v-show="!isMobile || sidebarOpen"
      class="sidebar"
    />
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
  data() {
    return {
      sidebarOpen: false,
      isMobile: false
    }
  },
  computed: {
    hideDash() {
      return this.$route.path !== '/';
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    showLogoutModal() {
      const modal = new bootstrap.Modal(this.$refs.logoutModal);
      modal.show();
    },
    logOut() {
      this.$router.push('/');
      const modal = bootstrap.Modal.getInstance(this.$refs.logoutModal);
      modal.hide();
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 753;
      if (!this.isMobile) this.sidebarOpen = false;
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
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
}

.hamburger {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  display: none;
  cursor: pointer;
  margin-right: 18px;
}

.logo {
  color: white;
  margin-right: auto;
}

.butn {
  background-color: #36424e;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 6px;
  margin-left: auto;
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
  margin: 10px auto;
  background: #f9f9f9;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  max-width: 1100px;
  width: 100%;
}

/* Tablet screens */
@media (max-width: 900px) {
  .main-page {
    padding: 18px;
    max-width: 100%;
  }
}

/* Mobile screens */
@media (max-width: 600px) {
  .main-page {
    padding: 8px 2px;
    border-radius: 0;
    margin: 0;
    box-shadow: none;
  }
}

.page-wrapper {
  padding: 20px;
}

@media (max-width: 768px) {
  header {
    height: 60px;
  }
  .header-cont {
    padding: 0 8px;
  }
  .logo {
    font-size: 1.1rem;
  }
  .butn {
    padding: 6px;
    font-size: 0.9rem;
  }
}

footer {
  background: #af2727;
  color: #fff;
  text-align: center;
  padding: 20px 40px;
  font-size: 1rem;
}

@media (max-width: 768px) {
  footer {
    padding: 12px 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  footer {
    padding: 8px 4px;
    font-size: 0.8rem;
  }
}

/* Hamburger icon styles */
@media (max-width: 752px) {
  .hamburger {
    display: block;
  }
  /* Remove this so logout button is always visible */
  /* .butn {
    display: none;
  } */
  .sidebar {
    position: fixed;
    left: 0;
    top: 60px; /* match header height on mobile */
    height: calc(100% - 60px);
    z-index: 1001;
    background: #2c3e50;
    width: 220px;
    transition: transform 0.3s;
  }
}
</style>