<template>
  <div id="editor" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <!-- xml ='https://developers.google.com/blockly/xml' id='toolbox' style='display: none'>
    <category name='Logic' colour='%{BKY_LOGIC_HUE}'>
      <block type='controls_if'></block>
      <block type='logic_compare'></block>
      <block type='logic_operation'></block>
      <block type='logic_negate'></block>
      <block type='logic_boolean'></block>
    </category>
    <category name='Loops' colour='%{BKY_LOOPS_HUE}'>
      <block type='controls_repeat_ext'>
        <value name='TIMES'>
          <block type='math_number'>
            <field name='NUM'>10</field>
          </block>
        </value>
      </block>
      <block type='controls_whileUntil'></block>
    </category>
    <category name='Math' colour='%{BKY_MATH_HUE}'>
      <block type='math_number'>
        <field name='NUM'>123</field>
      </block>
      <block type='math_arithmetic'></block>
      <block type='math_single'></block>
    </category>
    <category name='Text' colour='%{BKY_TEXTS_HUE}'>
      <block type='text'></block>
      <block type='text_length'></block>
      <block type='text_print'></block>
    </category>
    </xml-->
    <div id="ed" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></div>
  </div>
</template>
<script>
import xmlparse from "vkbeautify";
import ed from "blockly";
import zhsimpled from "blockly/msg/zh-hans";
import zh from "blockly/msg/zh-hant";
import en from "blockly/msg/en";

console.log(zh);
console.log(en);

var Blockly = ed;
Blockly.Blocks["webview"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("String")
      .appendField("访问");
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4e6ef2");
    this.setTooltip("在你的程序中访问网页");
  }
};
Blockly.Blocks["button_primary"] = {
  init: function() {
    this.appendValueInput("VALUE")
      .setCheck("String")
      .appendField("普通按钮");
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#07c160");
    this.setTooltip("在你的程序中出现按钮");
  }
};
Blockly.JavaScript["webview"] = function (block) {
  // String or array length.
  var argument0 =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
  console.log(argument0);
  var ex =
    "var v=document.createElement('iframe');v.scrolling=true;v.src='https://" +
    argument0 +
    "';var p=document.getElementById('render_content_i');p.appendChild(v);v.style='position:absolute;left:0%;top:0%;width:100%;height:100%';p=null;v=null;";
  console.log([ex, Blockly.JavaScript.ORDER_MEMBER]);
  return ex;
};
Blockly.JavaScript["button_primary"] = function(block) {
  // String or array length.
  var argument0 =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
  console.log(argument0);
  var ex =
    "var v=document.createElement('button');v.className='weui-btn weui-btn_primary';var p=document.getElementById('render_content_i');p.appendChild(v);v.innerText="+argument0+";v=null;p=null;";
  console.log([ex, Blockly.JavaScript.ORDER_MEMBER]);
  return ex;
};
export default {
  data() {
    return {
      cursor: null,
      parse: xmlparse,
      xml: "",
      d: ""
    };
  },
  mounted() {
    var Blockly = ed;
    var __this = this;
    
    this.$http.get("/lib/block.xml").then(
      function(response) {
        // 响应成功回调
        __this.d = response.body;
        console.log(response.body);

        ed.setLocale(zhsimpled);
        __this.cursor = ed.inject("editor", { toolbox: this.d });
        if (this.xml == "") {
          ed.Xml.domToWorkspace(document.getElementById("ed"), __this.cursor);
        } else {
          console.log(__this.xml);
          const xml = Blockly.Xml.textToDom(this.xml);
          // 回显数据
          ed.Xml.domToWorkspace(xml, this.cursor);
          console.log("backup is ok");
        }
        setInterval(() => {
          var Blockly = ed;
          const xml = Blockly.Xml.workspaceToDom(this.cursor);
          const xmlText = Blockly.Xml.domToText(xml);
          this.xml = xmlText;
          console.log("small is ok");
        }, 1000);

        this.$root.eventHub.$on("small", () => {
          this.small();
        });
        this.$root.eventHub.$on("backup", () => {
          this.backup();
        });
        this.$on("getcode", e => {
          console.log(e);
          console.log("generate code 1");
          this.run();
        });
      },
      function(response) {
        // 响应错误回调
        console.log(response);
      }
    );
  },
  methods: {
    run() {
      // Generate JavaScript code and run it.
      console.log("generate code");
      window.LoopTrap = 1000;
      ed.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
      var code = ed.JavaScript.workspaceToCode(this.cursor);
      ed.JavaScript.INFINITE_LOOP_TRAP = null;
      console.log("generate code ok");

      return code;
    },
    changelang(io) {
      var l = { zhsimpled: zhsimpled, zh: zh, en: en };
      ed.setLocale(l[io]);
    },
    small() {
      var Blockly = ed;
      const xml = Blockly.Xml.workspaceToDom(this.cursor);
      const xmlText = Blockly.Xml.domToText(xml);
      this.xml = xmlText;
    },
    backup() {
      var Blockly = ed;
      this.cursor.clear();
      const xml = Blockly.Xml.textToDom(this.xml);
      // 回显数据
      ed.Xml.domToWorkspace(xml, this.cursor);
      console.log("backup is ok");
    }
  }
};
</script>
<style>
</style>
