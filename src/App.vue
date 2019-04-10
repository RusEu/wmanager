<template>
  <div id="app" class="scrollbar">
    <MenuComponent msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuComponent from './components/menu/menu.component.vue';

@Component({
  components: {
    MenuComponent,
  },
})
export default class App extends Vue {}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.scrollbar {
	margin-left: 30px;
	float: left;
	height: 300px;
	background: #F5F5F5;
  overflow-y: scroll;
}
::-webkit-scrollbar {     
        background-color: #fff;
        width: 8px;
}

::-webkit-scrollbar-thumb:window-inactive,
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #FFF;
	background-image: -webkit-gradient(linear,
									   40% 0%,
									   75% 84%,
									   from(#4D9C41),
									   to(#19911D),
                     color-stop(.6,#54DE5D));
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #000;
  border: 1px solid #FFF;
  height: 100vh;
  width: calc(100% - 8px);
  overflow-x: hidden;
  opacity: 0.9;
  color: #FFF;
  padding: 0;
  margin: 0;
}
</style>
