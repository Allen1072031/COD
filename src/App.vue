<script setup>
import {RouterView} from "vue-router";
</script>
<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="https://www.geberconsulting.com/images/2018/07/11/clients-logo-size_-1-56.jpg" alt="" width="128"
             height="64" class="d-inline-block">
        工業技術研究院 AD/COD
      </a>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-1 px-sm-2 px-0 bg-dark">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">Overview</span>
          </a>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <a href="#" class="nav-link align-middle px-0">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">    <router-link
                  to="/cod">COD</router-link></span>
              </a>
            </li>
            <li>
              <a href="#" class="nav-link px-0 align-middle">
                <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline"> <router-link
                  to="/ad">AD</router-link></span></a>
            </li>
          </ul>
          <hr>
        </div>
      </div>
      <div class="col py-3">
        <router-view/>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'App',
  // components: {HelloWorld},
}
</script>

<style>

</style>
