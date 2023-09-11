<template>
  <div>
    <div class="activeTests">
      <b-overlay
        :show="activeshow"
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
                      v-b-tooltip.hover
                      title="Start of the test"
                      style="
                        font-size: 12pt;
                        height: 1.9em;
                        overflow: hidden;
                        background: #009688;
                        color: #fff;
                        width: 7em;
                        padding: 2px 0.5em;
                        margin-top: 1.8em;
                        margin-left: -0.5em;
                        border-radius: 0 5px 5px 0;
                        font-weight: 500;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ value[2] }}
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
                    <span
                      v-if="value[3]"
                      style="position: absolute; bottom: 3em; right: 12px"
                    >
                      <img
                        v-b-tooltip.hover
                        title="Important test"
                        class="dropbtn"
                        src="../../assets/img/star.svg"
                        alt="Imp"
                        style="width: 25px"
                      />
                    </span>
                    <div style="display: flex">
                      <button
                        style="
                          width: 100%;
                          margin-top: 0em;
                          background: #ddb31e;
                          color: #fff;
                        "
                        v-on:click="takeTest(key, value[1], value[5], value[0], value[6])"
                      >
                        Take Test
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
  components: {
  },
  data() {
    return {
      availableTest: {},
      saveData: {},
      isEmpty: true,
      isActivated: false,
      startCode: "",
      testId: "",
      activeshow: false,
    };
  },

  mounted: function () {
    this.getActiveTestData();
  },

  methods: {
    takeTest: function (testId, testDuration, startCode, topicName, testAcId) {
      this.$router.push({
        name: "testInstruction",
        params: { testId: testId, testDuration: testDuration, startCode: startCode, topicName: topicName, testAcId: testAcId },
      });
    },
    getActiveTestData: function () {
      var self = this;
      this.activeshow = true;
      var cookie = window.$cookies.get('dataPack');
      var data = {
        sessionId : cookie.userserviceKey,
        department: cookie.department,
        division: cookie.division
      }
      this.$store.dispatch("getActiveTestData", data).then((resp) => {
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
            temp[2] = element.startDate;
            temp[3] = element.impStatus;
            temp[4] = element.reviewStatus;
            temp[5] = element.startCode;
            temp[6] = element.testId;
            this.availableTest[element.testReferId] = temp;
            this.saveData[element.testReferId] = element;
          }
        }
        setTimeout(function () {
          self.activeshow = false;
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