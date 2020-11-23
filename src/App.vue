<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand :to="{ name: 'home' }" class="d-flex align-items-center">
        <!-- <img src="img/aoc.svg" height="40px" class="d-inline-block align-top mr-3" alt="Advent of code"> -->
        Advent of Code
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
    <b-container class="mt-3">
      <router-view/>
    </b-container>
  </div>
</template>

<style lang="scss">
// Import the bootswatch theme
$primary: #c0392b;
@import '~bootswatch/dist/united/variables';
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
@import '~bootswatch/dist/united/bootswatch';
</style>
