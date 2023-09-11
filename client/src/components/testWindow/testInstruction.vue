<template>
  <div class="testInstruction">
    <div>
      <b-modal
        v-model="modalState"
        id="modal-prevent-closing"
        ref="modal"
        title="Test Instruction"
        ok-title="Start Test"
        cancel-title="Dashboard"
        header-bg-variant="warning"
        header-text-variant="light"
        @cancel="cancelTest"
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        @ok="takeTest"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <ul type="ş">
            <li><strong style="color:red">Do not minimize the screen after starting the test</strong></li>
            <li><strong>Visited questions will be marked with <span style="background:#009688;color:#009688">&#9744;</span></strong></li>
            <li><strong>Bookmarked questions will be marked with <span style="background:#ff8465;color:#ff8465">&#9744;</span></strong></li>
          </ul>
          <b-form-group label="Test Code" label-for="code-input" invalid-feedback="Entered code is incorrect"
          :state="codeState">
            <b-form-input id="code-input" autocomplete="off" v-model="code" :state="codeState"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  components: {},
  props: ["testId", "testDuration", "startCode", "topicName", "testAcId"],
  data() {
    return {
      code: "",
      modalState: true,
      codeState: null
    };
  },

  mounted: function () {
    var startCode = sessionStorage.getItem("__inittest__");
    if (startCode !=null && this.$route.params !='') {
    const decryptedText = this.CryptoJS.AES.decrypt(
      startCode,
      "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
    ).toString(this.CryptoJS.enc.Utf8);

    if (decryptedText == "") {
      const encryptedText = this.CryptoJS.AES.encrypt(
        JSON.stringify(this.$route.params),
        "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
      ).toString();
      sessionStorage.setItem("__inittest__", encryptedText);
    }
    }else{
      const encryptedText = this.CryptoJS.AES.encrypt(
        JSON.stringify(this.$route.params),
        "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
      ).toString();
      sessionStorage.setItem("__inittest__", encryptedText);
    }
  },

  methods: {
    takeTest: function (bvModalEvt) {
      var self = this
      bvModalEvt.preventDefault();
      var startCode = sessionStorage.getItem("__inittest__");
      const decryptedText = this.CryptoJS.AES.decrypt(
        startCode,
        "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
      ).toString(this.CryptoJS.enc.Utf8);
      if (decryptedText != "") {
        startCode = JSON.parse(decryptedText);
        if(this.code === startCode.startCode){
          var timerr = startCode.testDuration;
      var splitter = timerr.split(":");
      let countDownDate =
        new Date().getTime() +
        parseInt(splitter[0]) * 60 * 60 * 1000 +
        parseInt(splitter[1]) * 60 * 1000;
        var now = new Date().getTime();
        var timestamp = countDownDate - now;
        var dataService = window.$cookies.get('dataPack')
       var dataToDB = {
          userserviceKey: window.$cookies.get('user_token'),
          testId: startCode.testAcId,
          name: dataService.name,
          topicname: startCode.topicName,
          testDuration: startCode.testDuration,
          timestamp: timestamp,
          teststatus: false
        }
        this.$store.dispatch("createUserTestQuestions", dataToDB).then((resp) => {
        if (resp == 0) {
          this.makeToast(
            "b-toaster-top-center",
            "Test is already submitted!",
            "danger",
            "Failure"
          );
          setTimeout(() => {
            self.$router.push({
              name: "contentUploaded",
            });
          }, 1500);
          
        } else {
          this.$router.push({
          name: "testWindow"
        });
        }
      });
        this.codeState = true
        }else{
          this.codeState = false
        }
      }
      return;
    },
    cancelTest: function () {
      this.$router.push({
        name: "contentUploaded",
      });
    },
    makeToast: function (toaster, body, variant, data) {
      this.$bvToast.toast(body, {
        title: data,
        variant: variant,
        toaster: toaster,
        solid: true,
        appendToast: false,
      });
    },
  },

  computed: {
  },
};
</script>

<style type="text/css" scoped>
.testAvailable {
  float: right;
  width: 77%;
  margin-top: 5em;
  background: #fff;
  padding: 1em;
  border-radius: 5px;
}

/* Test available card styling */
.row {
  width: 100%;
  margin: auto;
}
.column {
  width: 29%;
  display: flex;
  padding: 0.5em;
  margin: 0.2em;
}
.card {
  background-color: #fbfbfb;
  width: 100%;
}
#verticalIdentity {
  padding: 0.5em;
  background: rgb(246, 246, 246);
  color: #000;
  border-radius: 5px;
}
#verticalIdentity button {
  background: #ffff53da;
  padding-left: 1em;
  font-size: 10pt;
  border-radius: 5px;
  padding-right: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border: transparent;
}

/* card inner details */
.testduration {
  font-size: 12pt;
  margin-right: 1em;
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  background: #f57777;
  padding: 0.2em 0.5em;
  border-radius: 0 0 5px 5px;
  font-weight: bold;
}
@media screen and (max-width: 800px) {
  .testAvailable {
    width: 90%;
  }
  .column {
    width: 32%;
    margin: auto;
  }
}
@media screen and (max-width: 650px) {
  .testAvailable {
    width: 80%;
  }
  .column {
    width: 100%;
    margin: 0.2em auto;
  }
}
</style>