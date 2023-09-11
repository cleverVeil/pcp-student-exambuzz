<template>
  <div>
    <navigationWindow />
    <div class="matheditor">
      <label for="latex">Equation Editor</label>
      <math-field
        style="border: 1px solid #009688; border-radius: 5px"
        id="formula"
        virtual-keyboard-mode="onfocus"
        text="latex"
        :options="{ smartFence: false, smartMode: true }"
        on-keystroke="displayKeystroke"
        virtual-keyboards="numeric functions symbols roman greek"
        >f(x)=</math-field
      ><br />

      <div class="form-group">
        <label for="latex">Copy Math Editor</label>
        <textarea id="latex" readonly style="width: 100%"></textarea>
      </div>
      <!-- <textarea id="latex"></textarea> -->
      Editor Usage Instruction
      <ul style="color:#f00">
        <li>Use this <span style="background:#ff0">Equation Editor</span> to build Math, Chemistry, Physics equation using the virtual keyboard.</li>
        <li>
          Copy the code in the <span style="background:#ff0">Copy Math Editor</span> and paste as it is in the
          excel.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navigationWindow from "@/components/dashboard/navigationWindow.vue";
/* import MathLive from "mathlive";
import mathLiveEditor from "@/components/pages/mathLiveEditor.vue"; */
export default {
  components: {
    navigationWindow,
    /* mathLiveEditor */
  },
  data() {
    return {};
  },
  mounted: function () {
    const mf = document.querySelector("#formula");
    const latexField = document.querySelector("#latex");
    latexField.addEventListener("input", () => mf.setValue(latexField.value));
    function updateLatex() {
      document.querySelector("#latex").value = "$$" + mf.value + "$$";
    }
    mf.addEventListener("input", updateLatex);
    updateLatex();
  },
  methods: {},
};
</script>

<style scoped>
.matheditor {
  float: right;
  width: 77%;
  margin-top: 5em;
  background: #fff;
  padding: 1em;
  border-radius: 5px;
}
.form-group > label {
  bottom: 0px;
  left: 0px;
  position: relative;
  background-color: #fff;
  font-size: 10pt;
  color: #646464;
  transition: 0.2s;
  pointer-events: none;
}

.form-control:focus ~ label {
  bottom: 55px;
}

.form-control:valid ~ label {
  bottom: 55px;
}
</style>
