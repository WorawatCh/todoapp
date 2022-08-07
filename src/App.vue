<template>
  <nav class="navbar bg-light">
    <div class="container ms-0 me-0">
      <a class="navbar-brand" href="#">
        <img src="./assets/logo.png" alt="" width="30" height="24" />
      </a>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
