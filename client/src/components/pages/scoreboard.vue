<template>
  <div class="scoreboard">
    <div>
      <b-modal
        v-model="modalState"
        id="modal-prevent-closing"
        ref="modal"
        title="Test Result"
        ok-title="Dashboard"
        ok-only
        header-bg-variant="success"
        header-text-variant="light"
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        @ok="takeToDashboard"
      >
        <PieChart :key="counter" :data="chartData" :options="chartOptions"></PieChart>
        <div style="margin-top:1em;">
          
          <table style="width:100%;text-align:center">
            <tr v-for="(data, index) in chartData.labels" :key="data">
              <td style="width:50%;font-size:15pt">
                {{data}}
              </td>
              <td style="width:50%;font-size:15pt;fonct-weight:600">
                {{chartData.datasets[0].data[index]}}
              </td>
            </tr>
          </table>
          <hr>
          <table style="width:100%;text-align:center">
            <tr>
              <td style="width:50%;font-size:15pt">
                Total Marks
              </td>
              <td style="width:50%;font-size:15pt">
                {{total}}
              </td>
            </tr>
          </table>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script type="text/javascript">
import PieChart from "@/components/pages/piechart.vue";
export default {
  components: {
    PieChart,
  },
  props: [],
  data() {
    return {
      modalState: true,
      counter: 0,
      testId: "",
      total: 0,
      userId: window.$cookies.get('user_token'),
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "Test Data",
            backgroundColor: ["#00D8FF","#41B883", "#E46651", "#00D8FA","#41BA83", "#E46151"],
            data: [],
          },
        ],
      },
    };
  },
  mounted: function () {
     var startCode = sessionStorage.getItem("__inittest__");
    const decryptedText = this.CryptoJS.AES.decrypt(
      startCode,
      "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
    ).toString(this.CryptoJS.enc.Utf8);
    if (decryptedText != "") {
      startCode = JSON.parse(decryptedText);
      this.testId = startCode.testAcId;
    }
    this.getResult();
  },

  methods: {
    getResult: function(){
     
      var data = {
        testId: this.testId,
        userserviceKey: this.userId
      }
      var wrong = 0;
      this.$store.dispatch("getTestResult", data)
      .then((resp)=>{
        /* [total, wrong, correct] */
        /* this.chartData.labels.push("Wrong");
        this.chartData.datasets[0].data.push(wrong) */
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          this.counter++
          this.chartData.labels.push(Object.keys(element)[0]);
          this.chartData.datasets[0].data.push(element[Object.keys(element)[0]][2])
          this.total = this.total + element[Object.keys(element)[0]][2]
          wrong = wrong +element[Object.keys(element)[0]][1]
        }
        this.chartData.labels.push("Wrong");
        this.chartData.datasets[0].data.push(wrong)
      });
    },
    takeToDashboard: function (bvModalEvt) {
      var data = {
        testId: this.testId,
        userserviceKey: this.userId,
        total: this.total
      }
      bvModalEvt.preventDefault();
      sessionStorage.removeItem("__inittest__");
      this.$store.dispatch("finishTest", data)
      .then(()=>{
        this.$router.push({
          name: "contentUploaded",
        });
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

  computed: {},
};
</script>

<style type="text/css" scoped>
table tr:nth-child(odd){
  background:#e9fffd;
}
table tr td{
  padding:0.5em;
}
</style>