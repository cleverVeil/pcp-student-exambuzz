<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted: function () {
    const spacing = '10px';
    const styles = `padding:${spacing};background:white;color:red;font-weight:800;border: 1px solid red;font-size:2em;`
    console.log("%c Close this tab, If you do not understand it",styles);
  },
}
</script>

<style>
  html,body{
    background:#f1f3f6ff;
    margin:0;
    font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    padding:0;
  }
  @media screen and (max-width: 350px) {
  html,body{
    width:350px;
  }
}
</style>
