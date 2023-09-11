<template>
  <div>
    <div class="recentTests">
      <b-overlay
        :show="recentshow"
        rounded="sm"
      >
        <div>
          <div class="container-fluid">
            <div v-if="isEmpty">Nothing to show</div>
            <div v-else class="row" style="padding: 0em" :key="isActivated">
              <div
                v-for="(value, key) in availableTest"
                class="column"
                style="padding: 0.1em"
                :key="key"
              >
                <div class="card">
                  <div id="verticalIdentity">
                    <span
                      v-b-tooltip.hover
                      title="Test Duration"
                      class="testduration"
                      >{{ value[1] }}</span
                    >
                    <p
                      v-if="value[2]"
                      v-b-tooltip.hover
                      title="Status of the test"
                      style="
                        font-size: 12pt;
                        height: 1.9em;
                        overflow: hidden;
                        background: #a1a1a1;
                        color: #fff;
                        width: 8em;
                        padding: 2px 0.5em;
                        margin-top: 1.8em;
                        margin-left: -0.5em;
                        border-radius: 0 5px 5px 0;
                        font-weight: 800;
                        text-overflow: ellipsis;
                      "
                    >
                      Compeleted
                    </p>
                    <p
                      style="
                        font-size: 10pt;
                        height: 1.5em;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                    >
                      <span
                        v-b-tooltip.hover
                        title="Topic name"
                        style="
                          font-weight: 800;
                          color: #000;
                          width: 7em;
                          text-overflow: ellipsis;
                          overflow: hidden;
                        "
                        >{{ value[0] }}</span
                      >
                    </p>
                    <div style="display: flex">
                      <button
                        style="
                          width: 100%;
                          margin-top: 0em;
                          background: #009688;
                          color: #fff;
                        "
                        v-on:click="viewTestStats(key, value[1])"
                      >
                        View Stats
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <template #overlay>
          <div class="text-center">
            <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
            <p id="cancel-label">Please wait...</p>
          </div>
        </template>
      </b-overlay>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  components: {},
  data() {
    return {
      availableTest: {},
      saveData: {},
      isEmpty: true,
      isActivated: false,
      recentshow: false,
      testId: "",
    };
  },

  mounted: function () {
    this.recentTestData();
  },

  methods: {
    viewTestStats: function (testId, testDuration) {
      this.$router.push({
        name: "testWindowReview",
        params: { testId: testId, testDuration: testDuration},
      });
    },
    recentTestData: function () {
      var cookie = window.$cookies.get('user_token');
      var sessionId = cookie;
      var self = this;
      this.recentshow = true;
      this.$store.dispatch("getRecentTest", sessionId).then((resp) => {
        if (resp == 0) {
          this.makeToast(
            "b-toaster-top-center",
            "Something went wrong!",
            "danger",
            "Failure"
          );
        } else if (resp == "No tests uploaded yet" && this.availableTest) {
          this.makeToast(
            "b-toaster-top-center",
            "Nothing to show",
            "info",
            "No Data"
          );
        } else {
          this.isActivated = true;
          this.isEmpty = false;
          this.saveData = resp;
          for (let index = 0; index < resp.length; index++) {
            var temp = [];
            const element = resp[index];
            temp[0] = element.topicname;
            temp[1] = element.testDuration;
            temp[2] = element.teststatus;
            this.availableTest[element.testId] = temp;
            this.saveData[element.testId] = element;
          }
        }

        setTimeout(function () {
          self.recentshow = false;
        }, 1500);
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
/* .testAvailable {
  float: right;
  width: 77%;
  margin-top: 5em;
  background: #fff;
  padding: 1em;
  border-radius: 5px;
}
 */
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

/* Upload Content generic */
.or-seperator {
  clear: both;
  margin: 20px 0 10px;
  text-align: center;
  border-top: 1px solid #ccc;
}
.or-seperator strong {
  padding: 5px 10px;
  color: #fff;
  font-size: 10pt;
  font-weight: 500;
  border-radius: 5px;
  background: #009688;
  position: relative;
  top: -11px;
  z-index: 1;
}
.form-group > label {
  bottom: 34px;
  left: 15px;
  position: relative;
  background-color: #fff;
  padding: 2px 5px 0px 0px;
  font-size: 12pt;
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

/* end of generic section */
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