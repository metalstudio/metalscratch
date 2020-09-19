<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" id='menubar' style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-submenu index="lang">
        <template slot="title">{{lang_head}}</template>
        <el-menu-item index="zhsimpled">中文简体</el-menu-item>
        <el-menu-item index="zh">中文繁體</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
    
      </el-submenu>
      <el-menu-item index='2'><i class='el-icon-discover' @click="downloadhtml"></i></el-menu-item>
    </el-menu>
    <render ref="render" v-on:full="full" v-on:back="back" v-on:refresh="getcode" :msg="render_msg"></render>
    <edtior ref="editor" v-if="edi_show"></edtior>
  </div>
</template>

<script>
import render from "./components/render.vue";
import block from "./components/block.vue";
/*function datas(h = "", u = "") {
  var res = h + u + "\n";
  return res;
}
function data_load(u = "", h) {
  return datas(h, u);
}*/
export default {
  name: "App",
  components: {
    render,
    edtior: block
  },
  data() {
    return {
      render_msg: '',
      header_html_head: "\n<html>\n",
      header_html_end: "\n</html>\n",
      header_lib_end: "\n</head>\n",
      header_content_head: "\n<body>\n<div id='render_content_i'></div><script>\n",
      header_content_end: "\n</" + "script>\n</body>\n",
      header_lib_head: "\n<head>\n",
      header:
        "<link rel='stylesheet' href='https://res.wx.qq.com/open/libs/weui/2.0.1/weui.min.css'>\n",
      io: "",
      sheader:
        "<script > window.indexlist=[]</" +
        "script>",
      language:{'zhsimpled':'中文简体','zh':"中文繁體","en":"English"},
      lang_head:'中文简体',
      edi_show:true,
      
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key)
        var r=keyPath[1];
        console.log(r)
        var editor_cursor=this.$refs.editor;
        editor_cursor.changelang(r)
        this.lang_head=this.language[r]
    },
    hello() {
      alert("hello");
    },
    parse(io) {
      this.render_msg=''
      this.$refs.render.load()
      var __this = this;
      var headers =
        this.header_html_head +
        this.header_lib_head +
        this.header +
        this.sheader +
        this.header_lib_end +
        this.header_content_head +
        io +
        this.header_content_end +
        this.header_html_end;
      console.log(headers);
      setTimeout(() => {

          __this.render_msg = headers;
          this.$refs.render.ok()
        }, 500);
      
      console.log(__this.render_msg);
      console.log("finish");
      this.$refs.render._data.loading = false;
      console.log(this.$refs.render);
    },
    full() {
      this.$root.eventHub.$emit('small')
      this.edi_show=false
      var d = document.getElementById("render");
      d.style.height = "90%";
      d.style.width = "100%";
      d.style.top = "8%";
    },
    back() {
      this.$root.eventHub.$emit('backup')
      var d = document.getElementById("render");
      d.style.height = "35%";
      d.style.width = "25%";
      d.style.top = "8%";
      this.edi_show=true;
      
      
    },
    getcode() {
      console.log("getcode started");
      console.log("getcode sent");
      var result = this.$refs.editor.run();
      console.log("getcode ok");
      this.parse(result);
    },
    downloadhtml() {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.render_msg))
        element.setAttribute('download', 'index.html')
        element.style.display = 'none'
        element.click()
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#render {
  position: fixed;
  right: 0%;
  top: 8%;
  width: 25%;
  height: 35%;

}
#render_content{
  overflow: auto;
}
#editor {
  position: fixed;
  left: 0%;
  top: 8%;
  width: 75%;
  height: 90%;
}
#menubar {
  position:fixed;
  left: 0%;
  top: 0%;
  width:100%;
  height:8%;

}
</style>
