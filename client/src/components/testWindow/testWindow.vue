<template>
  <div>
    <!-- <button type="button" style="" @click="toggle" id="drum">.</button> -->
    <fullscreen
      style="background: #e7fdfb"
      ref="fullscreen"
      @change="fullscreenChange"
    >
      <fixedNavigationWindow style="background: #f00" @clicked="onClickChild" />
    </fullscreen>

    <!-- Fullscreen Modal -->
    <b-modal
      v-model="show"
      centered
      title="WARNING"
      ok-only
      ok-title-html="OK"
      @ok="takeToFullScreen"
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <div class="modal-body">
        <form ref="form" @submit.stop.prevent="takeToFullScreen">
          <strong
            >Press "OK" to start the test within {{ timer }} seconds, else
            test will be submitted</strong
          >
        </form>
      </div>
    </b-modal>

    <!-- Finish Test Modal -->
    <b-modal
      v-model="modalshow"
      centered
      id="modal-scoped"
      title="ATTENTION"
      ok-title-html="Submit"
      @ok="submitTest"
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
      cancel-title-html="Resume"
      @cancel="resumeTest"
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <div class="modal-body">
        <form ref="form" @submit.stop.prevent="submitTest">
          <strong>Click "OK" to submit the test</strong><br />
          <strong>Click "Cancel" to resume the test</strong>
        </form>
      </div>
    </b-modal>

    <!-- Success Test Finish -->
    <b-modal
      v-model="successFinish"
      centered
      title="Success"
      no-close-on-esc
      hide-header-close
      ok-only
      ok-title-html="Dashboard"
      @ok="takeToDashboard()"
      no-close-on-backdrop
      header-bg-variant="success"
      header-text-variant="light"
    >
      <div class="modal-body">
        <form ref="form">
          <strong>Test has been submitted successfully!</strong>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script type="text/javascript">
import fixedNavigationWindow from "../testWindow/fixedNavigationWindow.vue";
import fullscreen from "vue-fullscreen";
import Vue from "vue";
Vue.use(fullscreen);
export default {
  components: {
    fixedNavigationWindow,
  },
  props: ["testId", "testDuration"],
  data() {
    return {
      fullscreen: false,
      show: false,
      timer: 5,
      modalshow: false,
      finishTest: false,
      successFinish: false,
    };
  },

  mounted: function () {
    if (
      window.performance.getEntriesByType("navigation")[0].type === "reload"
    ) {
      this.show = true;
      this.start();
    }
    /* function to check the orientation of the device */
    window.addEventListener(
      "orientationchange",
      function () {
        if (window.orientation == 90) {
          alert("Please use in portrait mode for better experience");
        }
      },
      false
    );
    /* end of the orientation function */
    /* Function to check if the test screen is ful or not */

    this.start();

    /* end of fullscreen function */

    /* check for the keys press function */

 /*    window.addEventListener(
      "keydown",
      function (event) {
        if (event.defaultPrevented) {
          return;
        }

        var handled = false;
        if (event.key !== undefined) {
          if (
            event.key == "Escape" ||
            event.key == "Meta" ||
            event.key == "Enter" ||
            event.key == "Shift"
          ) {
            handled = true;
          } else if (event.key === "F12") {
            handled = true;
          } else if (
            ((event.ctrlKey || event.key === "Meta") &&
              event.key === "Shift" &&
              event.key === "i") ||
            event.key === "Dead"
          ) {
            handled = true;
          }
        }

        if (handled) {
          self.show = true;
          event.preventDefault();
        }
      },
      true
	); */

    /* end of check for the keys press function */
  },

  methods: {
    start: function () {
      var self = this;
      this.successFinish = false;
      if (this.finishTest && this.show && this.modalshow) {
        this.show = false;
        this.modalshow = true;
        this.successFinish = false;
        //this.takeToFullScreen();
      } else if (!this.finishTest && this.modalshow) {
        this.successFinish = false;
        /* self.modalshow = false; */
        /* self.takeToFullScreen(); */
      } else {
        this.show = true;
        this.successFinish = false;
        setTimeout(function () {
          self.show = false; // Use your variable name
          self.successFinish = true;
        }, 10 * 1000); // Hide after 5 secs
        this.successFinish = false;
      }
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
      function exitHandler() {
        this.successFinish = false;
        if (
          !document.fullscreenElement &&
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        ) {
          if (self.finishTest && self.show && self.modalshow) {
            self.show = false;
            self.modalshow = true;
            self.successFinish = false;
            //self.takeToFullScreen();
          } else if (!self.finishTest && self.modalshow) {
            self.successFinish = false;
            /* self.modalshow = false; */
            /* self.takeToFullScreen(); */
          } else {
            if (self.finishTest) {
              self.show = false;
              self.successFinish = true;
            } else {
              self.show = true;
              self.successFinish = false;
              setTimeout(function () {
                self.show = false; // Use your variable name
                self.successFinish = true;
              }, 10 * 1000); // Hide after 5 secs
              self.successFinish = false;
            }
          }
        }
      }
    },
    toggle() {
      this.$refs["fullscreen"].toggle();
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    takeToFullScreen: function () {
      this.toggle();
    },
    onClickChild: function (value) {
      if (value == "finishTest") {
        this.finishTest = false;
        this.successFinish = false;
        this.finishTester();
      } else if (value == "finishTestTimer") {
        this.finishTest = false;
        this.successFinish = false;
        this.finishTesterTimer();
      }
    },
    finishTester: function () {
      if (!this.finishTest) {
        this.show = false;
        this.successFinish = false;
        this.modalshow = true;
        this.takeToFullScreen();
      }
    },
    finishTesterTimer: function () {
      this.finishTest = true;
      this.show = false;
      this.successFinish = false;
      this.modalshow = false;
      this.takeToFullScreen();
    },
    submitTest: function () {
      var self = this;
      this.modalshow = false;
      this.finishTest = true;
      this.successFinish = true;
      setTimeout(function () {
        self.successFinish = false;
        self.$router.push({ name: "scoreboard" }).catch(() => {
          console.log("");
        });
      }, 2 * 1000); // Hide after 2 secs
    },
    resumeTest: function () {
      this.modalshow = false;
      this.show = false;
      this.successFinish = false;
      this.finishTest = false;
      this.takeToFullScreen();
    },
    takeToDashboard: function () {
      this.$router.push({ name: "scoreboard" }).catch(() => {
        console.log("");
      });
    },
  },

  computed: {},
};
</script>

<style type="text/css" scoped>
#drum {
  position: absolute;
  z-index: 999;
  bottom: 0;
}
</style>