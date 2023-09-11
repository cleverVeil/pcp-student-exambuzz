<template>
  <div style="background: #e7fdfb">
    <div id="leftQuestionPanel" class="slideIn" :key="isActivated">
      <div id="sectionalData">
        <div id="finishTest">
          <h4>Test</h4>
          <button v-on:click="finishTest()">Finish</button>
        </div>
        <div class="allSection" v-for="(value, key) in sectionData" :key="key">
          <hr />
          <div class="sectional" :id="key" >
            <h5>{{ key }}</h5>
            <div class="container-fluid">
              <div class="row">
                <div
                  class="col-4"
                  v-for="keyQuestion in value"
                  :key="keyQuestion[0]"
                >
                  <div
                    v-on:click="getQuestionDisplayed(keyQuestion[0], key)"
                    :id="keyQuestion[0]"
                    class="card activer"
                    :key="isCorrectKey"
                  >
                    <p>{{ keyQuestion[0] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="topSectionDisplay" class="settle">
      <div id="pullOver" v-on:click="getQuestionsOut()">&#10097;</div>
      <div id="innerView" style="width: 100%">
        <div id="timer">
          <p>{{ testDuration }}</p>
        </div>
        <div id="buttons">
          <button
            title="Previous question"
            class="btn travelButtons"
            style="transform: rotate(180deg); color: #009688"
            @click="prev"
          >
            &#10132;
          </button>
          <button
            title="Next question"
            class="btn travelButtons"
            style="background: #009688; color: #fff"
            @click="next"
          >
            &#10132;
          </button>
        </div>
      </div>
      <questionWindow
        :questionIndex="currentIndex"
        :sectionKey="keyData"
        v-on:childToParent="onChildClick"
        v-on:sectionData="sectionDetails"
        v-on:startData="sectionalData"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import questionWindow from "../testWindow/questionWindow.vue";
export default {
  components: {
    questionWindow,
  },
  data() {
    return {
      sectionCount: 3,
      totalQuestions: 0,
      isActivated: false,
      sectionData: {},
      currentIndex: 1,
      keyData: "",
      testId: "",
      isCorrectKey: 0,
      userId: window.$cookies.get('user_token'),
      testDuration: "",
      currentSection: "",
      queUpdater:0,
      allSections: [],
      allStartDuration: "",
    };
  },

  mounted: function () {
    this.keyData = this.allSections;
    if (window.innerWidth > 800) {
      document.getElementById("innerView").style.width =
        "" + window.innerWidth - 500 + "px";
    }
    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) {
        document.getElementById("innerView").style.width =
          "" + window.innerWidth - 500 + "px";
      }
    });

    var startCode = sessionStorage.getItem("__inittest__");
    const decryptedText = this.CryptoJS.AES.decrypt(
      startCode,
      "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
    ).toString(this.CryptoJS.enc.Utf8);
    if (decryptedText != "") {
      startCode = JSON.parse(decryptedText);
      this.testId = startCode.testAcId;
      this.allStartDuration = startCode.testDuration;
    }

    window.document.onclick = function (event) {
      if (window.innerWidth <= 800) {
        if (
          !event.target.matches("#pullOver") &&
          document.getElementById("leftQuestionPanel") != null
        ) {
          document.getElementById("leftQuestionPanel").style.left = "-20em";
          document.getElementById("pullOver").style.left = "-1em";
        }
      }
    };
    this.getTimer();

    var self = this
    var x = setInterval(function () {
          self.queUpdater +=1
          self.getQuestionsOut();
          if (self.queUpdater == 3) {
            clearInterval(x);
          }
    }, 500);

  },

  methods: {
    getTimer: function () {
      var userTimer = {
        testId: this.testId,
        userserviceKey: this.userId,
      };
      this.$store.dispatch("getTimerData", userTimer).then((resp) => {
        // Find the distance between now and the count down date
        if (resp.time != undefined && resp.time != null) {
          var distance = parseInt(resp.time);
          // Time calculations for hours, minutes and seconds
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Output the result in an element with id="demo"
          this.testDuration = hours + ":" + minutes + ":" + seconds + " hours";
        } else {
          this.testDuration = this.allStartDuration;
        }
        this.setTimer();
      });
    },
    setTimer: function () {
      var self = this;
      // Set the date we're counting down to
      if (this.testDuration != "") {
        var timerr = this.testDuration;
        var splitter = timerr.split(":");
        let countDownDate =
          new Date().getTime() +
          parseInt(splitter[0]) * 60 * 60 * 1000 +
          parseInt(splitter[1]) * 60 * 1000;
        // Update the count down every 1 second
        var x = setInterval(function () {
          // Get today's date and time
          var now = new Date().getTime();
          // Find the distance between now and the count down date
          var distance = countDownDate - now;
          // Time calculations for hours, minutes and seconds
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Output the result in an element with id="demo"
          self.testDuration = hours + ":" + minutes + ":" + seconds;
          // If the count down is over, write some text
          if (distance < 0) {
            clearInterval(x);
            self.testDuration = "Expired";
            self.$emit("clicked", "finishTestTimer");
          } else {
            var userTimer = {
              testId: self.testId,
              userserviceKey: self.userId,
              timestamp: distance,
            };
            self.$store.dispatch("updateTimer", userTimer);
          }
        }, 1000);
      }
    },
    next: function () {
      if (this.totalQuestions != this.currentIndex) {
        this.currentIndex += 1;

        var indexKeys = Object.keys(this.sectionData);
        for (let index = 0; index < indexKeys.length; index++) {
          const element = indexKeys[index];
          for (
            let indexNumber = 0;
            indexNumber < this.sectionData[element].length;
            indexNumber++
          ) {
            const elementNubmer = this.sectionData[element][indexNumber];
            if (elementNubmer[0] == this.currentIndex) {
              document.getElementById(this.currentIndex).style.border =
                "3px solid #009688";
              this.keyData = element;
              for (
                let i = 0;
                i < document.getElementsByClassName("sectional").length;
                i++
              ) {
                document.getElementsByClassName("sectional")[
                  i
                ].style.background = "#fff";
              }
              document.getElementById(element).style.background = "#d1f6f3";
            }
          }
        }
        var sectionsAnalysis = (Object.keys(this.sectionData));
          for (let index = 0; index < sectionsAnalysis.length; index++) {
            const element = this.sectionData[sectionsAnalysis[index]];
            for (let index = 0; index < element.length; index++) {
              const value = element[index];
              var ele = document.getElementById(value[0]);
              if(ele !=null){
                if (value[2]) ele.style.border = "3px solid #009688"; 
                if (value[3]) ele.style.border = "3px solid #ff8465";
              }

            }
      }
      }
    },
    prev: function () {
      var indexKeys = Object.keys(this.sectionData);
      if (this.currentIndex == 1) {
        this.currentIndex = 1;

        for (let index = 0; index < indexKeys.length; index++) {
          const element = indexKeys[index];
          for (
            let indexNumber = 0;
            indexNumber < this.sectionData[element].length;
            indexNumber++
          ) {
            const elementNubmer = this.sectionData[element][indexNumber];
            if (elementNubmer[0] == this.currentIndex) {
              this.keyData = element;
              for (
                let i = 0;
                i < document.getElementsByClassName("sectional").length;
                i++
              ) {
                document.getElementsByClassName("sectional")[
                  i
                ].style.background = "#fff";
              }
              document.getElementById(element).style.background = "#d1f6f3";
            }
          }
        }
      } else if (this.currentIndex > 1) {
        this.currentIndex -= 1;

        for (let index = 0; index < indexKeys.length; index++) {
          const element = indexKeys[index];
          for (
            let indexNumber = 0;
            indexNumber < this.sectionData[element].length;
            indexNumber++
          ) {
            const elementNubmer = this.sectionData[element][indexNumber];
            if (elementNubmer[0] == this.currentIndex) {
              this.keyData = element;
              for (
                let i = 0;
                i < document.getElementsByClassName("sectional").length;
                i++
              ) {
                document.getElementsByClassName("sectional")[
                  i
                ].style.background = "#fff";
              }
              document.getElementById(element).style.background = "#d1f6f3";
            }
          }
        }
      }
    },
    getQuestionsOut: function () {
      document.getElementById("leftQuestionPanel").style.left = "0";
      document.getElementById("pullOver").style.left = "12.5em";
      var sectionsAnalysis = (Object.keys(this.sectionData));
          for (let index = 0; index < sectionsAnalysis.length; index++) {
            const element = this.sectionData[sectionsAnalysis[index]];
            for (let index = 0; index < element.length; index++) {
              const value = element[index];
              var ele = document.getElementById(value[0]);
              if(ele !=null){
                if (value[2]) ele.style.border = "3px solid #009688"; 
                if (value[3]) ele.style.border = "3px solid #ff8465";
              }

            }
      }
    },
    onChildClick(valueMark) {
      var ele = document.getElementById(valueMark.indexer);
      var sectionsAnalysis = (Object.keys(this.sectionData));
      for (let index = 0; index < sectionsAnalysis.length; index++) {
        const element = this.sectionData[sectionsAnalysis[index]];
        for (let indexNumber = 0; indexNumber < element.length; indexNumber++) {
          const value = element[indexNumber];
          if(value[0] == valueMark.indexer){
            this.sectionData[sectionsAnalysis[index]][indexNumber][3] = valueMark.flag;
          }
        }
      }
      if (valueMark.flag) ele.style.border = "3px solid #ff8465";
      if (!valueMark.flag) ele.style.border = "3px solid #009688";
    },
    finishTest: function () {
      this.$emit("clicked", "finishTest");
    },
    sectionDetails: function (data) {
      var counter = 0;
      var indexKeys = Object.keys(data.section.questions[0]);
      for (let index = 1; index < indexKeys.length; index++) {
        const element = indexKeys[index];
        this.allSections[index] = element;
        var tempArray = [];
        //this.sectionData[element] = element.numberOfQuestions;
        for (
          let indexNumber = 0;
          indexNumber < data.section.questions[0][indexKeys[index]].length;
          indexNumber++
        ) {
          counter = counter + 1;
          const elementNubmer =data.section.questions[0][indexKeys[index]][indexNumber];
          tempArray[indexNumber] = [counter, elementNubmer.index, false, false];

        }
        this.sectionData[data.section.section[index-1].sectionName] = tempArray;
      }
      this.totalQuestions = counter;
      this.isActivated = true;
    },
    sectionalData: function (data) {
      var counterlet = 0;
      for (let index = 0; index < data.section.length; index++) {
        const element = data.section[index];
        this.allSections[index] = element.section;
        var tempArray = [];
        //this.sectionData[element.section] = element.question.length;
        for (let counter = 0; counter < element.question.length; counter++) {
          counterlet += 1;
          const elementCounter = element.question[counter];
          tempArray[counter] = [counterlet, elementCounter.index, elementCounter.visited, elementCounter.bookmark];
        }
        this.sectionData[element.section] = tempArray;
      }
      this.totalQuestions = counterlet;
      this.isActivated = true;
      
    },
    getQuestionDisplayed: function (questionIndex, sectionKey) {
      if (document.getElementById(questionIndex) != undefined) {
        var sectionsAnalysis = (Object.keys(this.sectionData));
      for (let index = 0; index < sectionsAnalysis.length; index++) {
        const element = this.sectionData[sectionsAnalysis[index]];
        for (let indexNumber = 0; indexNumber < element.length; indexNumber++) {
          const value = element[indexNumber];
          if(value[0] == questionIndex){
            if(!value[3]){
              document.getElementById(questionIndex).style.border =
              "3px solid #009688";
            }
          }
        }
      } 
      document.getElementById(questionIndex).style.color = "#000";
      } else {
        document.getElementById(questionIndex).style.background = "#fff";
        document.getElementById(questionIndex).style.color = "#000";
      }

      this.currentIndex = questionIndex;
      this.keyData = sectionKey;
    },
  },

  computed: {},
};
</script>

<style type="text/css" scoped>
#leftQuestionPanel {
  width: 20em;
  padding: 0.5em 1em 1em 1em;
  left: 0;
  background: #fff;
  height: 100%;
  box-shadow: 0 10px 10px #ccc;
  /* border-right: 5px solid #009688; */
  position: fixed;
  z-index: 2;
  overflow-y: auto;
  transition: 0.5s;
}
#topSectionDisplay {
  position: fixed;
  top: 0;
  left: 20em;
  right: 0;
  z-index: 1;
  padding: 1em;
  width: 100%;
  transition: 0.5s;
}
.sectional {
  padding: 0.5em;
  border-radius: 5px;
}
#buttons {
  float: right;
  margin-right: -12.5%;
  margin-bottom: 1em;
  margin-top: -3em;
}
.travelButtons {
  /* background: #009688; */
  color: #000;
  margin-left: 1em;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: 2px solid #009688;
}
.row {
  width: 100%;
}
#questionData {
  display: flex;
}
.allSection {
  margin-top: 1em;
}
#pullOver {
  width: 2.5em;
  border-radius: 0 10px 20px 0;
  height: 4em;
  padding-top: 1.1em;
  padding-left: 1.5em;
  margin: auto;
  position: absolute;
  top: 25em;
  left: -1em;
  cursor: pointer;
  z-index: 3;
  font-size: 18pt;
  color: #fff;
  transition: 0.5s;
  background: #009688;
}
#timer {
  font-size: 16pt;
  font-weight: bold;
  margin-top: -1.5em;
  padding: 1.3em 1em 0.1em 1em;
  color: #fff;
  background: #f00;
  width: 6em;
  border-radius: 0 0 10px 10px;
}
#finishTest {
  width: 100%;
  display: flex;
}
#finishTest button {
  padding: 0.5em;
  width: 8em;
  margin-left: 7em;
  border-radius: 5px;
  background-color: #fff;
  border: 2px solid #009688;
}
#finishTest button:hover {
  color: #fff;
  background: #009688;
}
/*Question Data Section*/

.container-fluid {
  display: block;
}
.card {
  text-align: center;
  padding-top: 0.7em;
  vertical-align: middle;
  margin-top: 0.5em;
  border-radius: 100px;
  border: 1px solid #7d7d7d;
}
.card:hover {
  background-color: #7d7d7d;
  color: #fff;
  cursor: pointer;
}

/*Responsive Mobile version*/
@media (max-width: 800px) {
  #leftQuestionPanel {
    left: -20em;
    transition: 0.5s;
  }
  #buttons {
    margin-right: 0%;
  }
  #topSectionDisplay {
    left: 0em;
    transition: 0.5s;
  }
}
@media (min-width: 800px) {
  #pullOver {
    display: none;
  }
  /* #finishTest {
    float: right;
    margin-top: -6em;
    margin-right: -11em;
  } */
  #finishTest button {
    padding: 0.5em;
    width: 8em;
    border-radius: 5px;
    background-color: #fff;
    border: 2px solid #009688;
  }
}
</style>
