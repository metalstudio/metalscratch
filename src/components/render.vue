<!-- 引入样式 -->

<!-- 引入组件库 -->

<template>
  <div
    id="render"
    style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    v-loading="loading"
  >
    <div
      id="render_bar"
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-button icon="el-icon-video-play" @click="refresh()" circle size="mini"></el-button>
    </div>
    <div
      id="render_content"
      v-append="msg"
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    ></div>
    <div
      id="render_buttom_bar"
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-button icon="el-icon-full-screen" @click="fclick()" class="fullscreen"></el-button>
    </div>
  </div>
</template>
<style>
#render_bar {
  position: absolute;
  left: 0%;
  top: 0%;
  height: 14%;
  width: 100%;
  background-color: #ffffff;
}
#render_content {
  position: absolute;
  left: 0%;
  top: 14%;
  height: 70%;
  width: 100%;
  background-color: #ffffff;
}
#render_buttom_bar {
  position: absolute;
  left: 0%;
  top: 84%;
  height: 16%;
  width: 100%;
  background-color: #ffffff;
}
.fullscreen {
  position: absolute;
  right: 0%;
  bottom: 0%;

  background-color: #ffffff;
}
</style>
<script>
/*var getCoordInDocument = function(e) {
    e = e || window.event;
    var x = e.pageX || (e.clientX +
      (document.documentElement.scrollLeft
      || document.body.scrollLeft));
    var y= e.pageY || (e.clientY +
      (document.documentElement.scrollTop
      || document.body.scrollTop));
    return {'x':x,'y':y};
  }*/
export default {
  name: "render",
  props:{'msg':String},
  data() {
    return {
      loading: false,
      full: false,
      msg_end:'',
      
    };
  },
  methods: {
    load(){
      this.loading=true
    },
    refresh(){
      this.$emit('refresh')
    },
    fullscreen() {
      this.$emit("full");
    },
    backscreen() {
      this.$emit("back");
    },

    fclick() {
      if (this.full == false) {
        this.full = true;
        this.fullscreen();
      } else {
        this.full = false;
        this.backscreen();
      }
    },
    ok(){
      setTimeout(() => {

         this.loading=false
        }, 2000);
    },
  }
};
</script>