<template>
  <div>
    <fixedNavigationWindowReview @clicked="onClickChild" />
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
          <strong>Press "OK" to submit the test</strong><br />
          <strong>Press "Cancel" to resume the test</strong>
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
          <strong>Test has been reviewed successfully!</strong>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script type="text/javascript">
import fixedNavigationWindowReview from "../testReviewWindow/fixedNavigationWindowReview.vue";
import fullscreen from "vue-fullscreen";
import Vue from "vue";
Vue.use(fullscreen);
export default {
  components: {
    fixedNavigationWindowReview,
  },
  props:["testId","testDuration"],
  data() {
    return {
      timer: 5,
      modalshow: false,
      finishTest: false,
      successFinish: false
    };
  },

  mounted: function () {
    window.addEventListener(
      "orientationchange",
      function () {
        if (window.orientation == 90) {
          alert("Please use in portrait mode for better experience");
        }
      },
      false
    );
    //this.getTestData();

    /* end of check for the keys press function */
  },

  methods: {
    /* getTestData: function(){
      console.log(this.testid);
      
    }, */
    onClickChild(value) {
      if (value == "finishTest") {
		this.finishTest = false;
		this.successFinish = false;
        this.finishTester();
      }
    },
    finishTester: function () {
      if (!this.finishTest) {
        this.show = false;
        this.successFinish = false;
        this.modalshow = true;
      }
    },
    submitTest: function () {
      var self = this;
      this.modalshow = false;
      this.finishTest = true;
      this.successFinish = true;
      setTimeout(function () {
        self.successFinish = false;
        self.$router.push({ name: "contentUploaded" }).catch(() => {
          console.log("");
        });
      }, 2 * 1000); // Hide after 2 secs
    },
    resumeTest: function () {
      this.modalshow = false;
      this.show = false;
      this.successFinish = false;
      this.finishTest = false;
    },
    takeToDashboard: function () {
      this.$router.push({ path: "/" }).catch(() => {
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