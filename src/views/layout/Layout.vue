<script setup>
import Aside from './components/Aside.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Main from './components/Main.vue';
</script>

<template>
    <div class="common-layout">
      <el-container>
        <Aside></Aside>
        <el-container>
          <Header></Header>
          <Main></Main>
          <Footer></Footer>
        </el-container>
      </el-container>
    </div>
  </template>

<style scoped>
.el-container {
  height: 100vh;
  width: 100vw;
}
.el-container .el-container {
  display: flex;
  flex-direction: column;
}
</style>