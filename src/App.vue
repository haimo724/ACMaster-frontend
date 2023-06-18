<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view/>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  height: 100vh;
}
body{
  margin:0;
}
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
