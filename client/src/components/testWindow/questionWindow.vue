<template>
  <div :key="questionIndex">
    {{ getQuestionIndex() }}
    <b-progress class="alignTestWindow" :max="max" show-value>
      <b-progress-bar v-bind:value="getValue()" variant="success" animated>{{
        getValue()
      }}</b-progress-bar>
    </b-progress>
    <div id="testWindow" :key="newUpdater">
      <div v-if="isQuestionLoaded" :key="currentIndex">
        <div id="bookmark" :key="updater">
          <img
            v-if="
              !this.saveQuestionData[this.tempQuestionSection][
                this.currentIndex
              ].bookmark
            "
            v-on:click="bookmarkFlag()"
            id="flagId"
            src="../../assets/img/bookmarkTrans.png"
            height="30px"
          />
          <img
            v-if="
              this.saveQuestionData[this.tempQuestionSection][this.currentIndex]
                .bookmark
            "
            v-on:click="bookmarkFlag()"
            id="flagId"
            src="../../assets/img/bookmark.png"
            height="30px"
          />
        </div>
        <div id="question">
          <p style="font-weight: bold">Question</p>
          <span style="font-weight: 800">{{ currentIndex }} :</span>
          <vue-mathjax :formula="questionTemp">
            <span>
              {{ questionTemp }}
            </span>
          </vue-mathjax>
        </div>
        <div id="answers">
          <p style="font-weight: bold">Answers</p>
          <table style="content: '&#10148;'">
            <p></p>
            <tr>
              <td id="A" v-on:click="answerClicked('A')">
                <vue-mathjax :formula="optionATemp">
                  <span>
                    {{ optionATemp }}
                  </span>
                </vue-mathjax>
                <!-- {{
                  this.saveQuestionData[this.tempQuestionSection][
                    this.currentIndex
                  ].optionA
                }} -->
              </td>
              <hr />
            </tr>
            <tr>
              <td id="B" v-on:click="answerClicked('B')">
                <vue-mathjax :formula="optionBTemp">
                  <span>
                    {{ optionBTemp }}
                  </span>
                </vue-mathjax>
                <!-- {{
                  this.saveQuestionData[this.tempQuestionSection][
                    this.currentIndex
                  ].optionB
                }} -->
              </td>
              <hr />
            </tr>
            <tr v-if="optionCTemp != ''">
              <td id="C" v-on:click="answerClicked('C')">
                <vue-mathjax :formula="optionCTemp">
                  <span>
                    {{ optionCTemp }}
                  </span>
                </vue-mathjax>
                <!-- {{
                  this.saveQuestionData[this.tempQuestionSection][
                    this.currentIndex
                  ].optionC
                }} -->
              </td>
              <hr />
            </tr>
            <tr v-if="optionDTemp != ''">
              <td id="D" v-on:click="answerClicked('D')">
                <vue-mathjax :formula="optionDTemp">
                  <span>
                    {{ optionDTemp }}
                  </span>
                </vue-mathjax>
                <!-- {{
                  this.saveQuestionData[this.tempQuestionSection][
                    this.currentIndex
                  ].optionD
                }} -->
              </td>
              <hr />
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { VueMathjax } from "vue-mathjax";
export default {
  components: {
    "vue-mathjax": VueMathjax,
  },
  props: ["questionId", "questionIndex", "sectionKey"],
  data() {
    return {
      flag: false,
      currentIndex: 1,
      testId: "",
      testReferId: "",
      per: "%",
      max: 100,
      tempQuestionId: 0,
      tempQuestionIndex: 1,
      tempQuestionSection: "",
      sectionKick: "",
      isQuestionLoaded: false,
      allSections: [],
      totalQuestions: 0,
      newUpdater:0,
      userId: window.$cookies.get('user_token'),
      updater: 0,
      saveQuestionData: {},
      questionTemp: "",
      optionATemp: "",
      optionBTemp: "",
      optionCTemp: "",
      optionDTemp: "",
      explanationTemp: "",
    };
  },

  mounted: function () {
    var testWindowSize = document.getElementById("testWindow");
    testWindowSize.style.height =
      "" + window.innerHeight - (testWindowSize.offsetTop + 20) + "px";
    window.addEventListener("resize", function () {
      testWindowSize.style.height =
        "" + window.innerHeight - (testWindowSize.offsetTop + 20) + "px";
    });
    this.updater += 1;
    var startCode = sessionStorage.getItem("__inittest__");
    const decryptedText = this.CryptoJS.AES.decrypt(
      startCode,
      "QIMv5SbVsoLoAfaK3nCUHK5X5bI27Pa4"
    ).toString(this.CryptoJS.enc.Utf8);
    if (decryptedText != "") {
      startCode = JSON.parse(decryptedText);
      this.testId = startCode.testAcId;
      this.testReferId = startCode.testId;
    }
    //this.getTestData();
    var self = this
    var x = setInterval(function () {
          self.newUpdater +=1
          self.getStartData();
          if (self.newUpdater == 3) {
            clearInterval(x);
          }
        }, 500);

  },

  methods: {
    getStartData: function () {
      var testQuestion = {
        testId: this.testId,
        userserviceKey: this.userId,
      };
      var counterlet = 0;
      this.$store
        .dispatch("getShutDownQuestionData", testQuestion)
        .then((resp) => {
          if (resp == 0) {
            this.getTestData();
          } else {
            for (let index = 0; index < resp.length; index++) {
              const element = resp[index];
              if (index == 0) {
                this.updater += 1;
                this.tempQuestionSection = element.section;
                this.sectionKick = element.section;
              }
              var tempObject = {};
              for (
                let counter = 0;
                counter < element.question.length;
                counter++
              ) {
                counterlet += 1;
                this.updater += 1;
                const elementCounter = element.question[counter];
                tempObject[counterlet] = {
                  currentIndex: counterlet,
                  index: elementCounter.index,
                  question: elementCounter.question,
                  optionA: elementCounter.optionA,
                  optionB: elementCounter.optionB,
                  optionC: elementCounter.optionC,
                  optionD: elementCounter.optionD,
                  marks: elementCounter.marks,
                  visited: elementCounter.visited,
                  answer: elementCounter.answer,
                  correctAnswer: elementCounter.correctAnswer,
                  markerQuestionId: elementCounter.markerQuestionId,
                  bookmark: elementCounter.bookmark,
                };
              }
              this.saveQuestionData[element.section] = tempObject;
            }
            this.totalQuestions = counterlet;
            this.isQuestionLoaded = true;
            this.$emit("startData", { section: resp });
          }
        });
    },
    getQuestionIndex: function () {
      this.currentIndex = this.questionIndex;
      var typer = typeof this.sectionKey;
      if (typer == "string") {
        var splitter = this.sectionKey.split(",");
        this.tempQuestionSection = splitter[0];
      }
      if (this.saveQuestionData[this.tempQuestionSection] != undefined) {
        //this.saveQuestionData[this.tempQuestionSection][this.currentIndex].currentIndex = this.currentIndex;
        /* if (
          this.saveQuestionData[this.tempQuestionSection][this.currentIndex]
            .markerQuestionId != ""
        ) { */
          var answerClick = this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].markerQuestionId;
          if (document.getElementById(answerClick) != null) {
            var parent = document.getElementById(answerClick).parentNode
              .parentNode;
            for (var i = 1; i < parent.childElementCount; i++) {
              parent.childNodes[i].childNodes[0].style.background = "#fff";
              parent.childNodes[i].childNodes[0].style.color = "#000";
            }
            document.getElementById(answerClick).style.background = "#009688";
            document.getElementById(answerClick).style.color = "#fff";
          }
          this.questionTemp = this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].question +'';
          this.optionATemp = this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].optionA+'';
          this.optionBTemp = this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].optionB+'';
          this.optionCTemp = this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].optionC+'';
          this.optionDTemp = this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].optionD+'';
          this.explanationTemp =
            this.saveQuestionData[this.tempQuestionSection][this.currentIndex]
              .explanation+'' || "";
          this.saveQuestionData[this.tempQuestionSection][
            this.currentIndex
          ].visited = true;
          var testQuestion = {
            testId: this.testId,
            userserviceKey: this.userId,
            section: this.tempQuestionSection,
            currIndex: this.currentIndex,
            question: this.saveQuestionData[this.tempQuestionSection][
              this.currentIndex
            ],
          };
          this.$store.dispatch("updateQuestionsStatus", testQuestion);
        //}
      }
    },
    getTestData: function () {
      this.$store.dispatch("getTestQuestions", this.testReferId).then((resp) => {
        if (resp == 0) {
          this.makeToast(
            "b-toaster-top-center",
            "Something went wrong!",
            "danger",
            "Failure"
          );
        } else {
          this.$emit("sectionData", { section: resp });
          var counter = 0;
          for (
            let index = 1;
            index < Object.keys(resp.questions[0]).length;
            index++
          ) {
            const element = resp.section[index-1].sectionName;
            var indexObj = Object.keys(resp.questions[0])[index]
            if (index == 1) {
              this.tempQuestionSection = element;
              this.sectionKick = element;
            }
            var tempObject = {};
            for (
              let indexNumber = 0;
              indexNumber < resp.questions[0][indexObj].length;
              indexNumber++
            ) {
              
              counter = counter + 1;
              const elementNubmer = resp.questions[0][indexObj][indexNumber];
              tempObject[counter] = {
                currentIndex: counter,
                index: elementNubmer.index,
                question: elementNubmer.question,
                optionA: elementNubmer.optionA,
                optionB: elementNubmer.optionB,
                optionC: elementNubmer.optionC || "",
                optionD: elementNubmer.optionD || "",
                marks: elementNubmer.marks,
                visited: false,
                answer: "",
                correctAnswer: elementNubmer.answer,
                markerQuestionId: "",
                bookmark: false,
              };
            }
            this.saveQuestionData[element] = tempObject;
          }
          this.totalQuestions = counter;
          this.isQuestionLoaded = true;
          var testQuestion = {
            testId: this.testId,
            userserviceKey: this.userId,
            question: this.saveQuestionData,
          };
          this.$store.dispatch("updateQuestionsStatus", testQuestion);
        }
      });
    },
    answerClicked: function (answerClick) {
      var parent = null;
      parent = document.getElementById(answerClick).parentNode.parentNode;
      for (var ins = 1; ins < parent.childElementCount; ins++) {
        parent.childNodes[ins].childNodes[0].style.background = "#fff";
        parent.childNodes[ins].childNodes[0].style.color = "#000";
      }
      document.getElementById(answerClick).style.background = "#009688";
      document.getElementById(answerClick).style.color = "#fff";
      this.saveQuestionData[this.tempQuestionSection][
        this.currentIndex
      ].markerQuestionId = answerClick;
      this.saveQuestionData[this.tempQuestionSection][
        this.currentIndex
      ].answer = answerClick;

      var testQuestion = {
        testId: this.testId,
        userserviceKey: this.userId,
        section: this.tempQuestionSection,
        currIndex: this.currentIndex,
        visited: true,
        question: this.saveQuestionData[this.tempQuestionSection][
          this.currentIndex
        ],
      };
      this.$store.dispatch("updateQuestionsStatus", testQuestion);
    },
    bookmarkFlag: function () {
      this.updater += 1;
      var indexer = this.currentIndex;
      this.saveQuestionData[this.tempQuestionSection][
        this.currentIndex
      ].bookmark = !this.saveQuestionData[this.tempQuestionSection][
        this.currentIndex
      ].bookmark;
      var flagger = this.saveQuestionData[this.tempQuestionSection][
        this.currentIndex
      ].bookmark;
      this.$emit("childToParent", { flag: flagger, indexer });
    },
    getValue: function () {
      var temp = 100 * (this.currentIndex / this.totalQuestions);

      temp = Math.floor(temp) + "%";
      return temp;
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
#testWindow {
  /* border: 2px solid #009688; */
  background: #fff;
  padding: 1em;
  width: 75%;
  height: 100vh;
  overflow: auto;
  border-radius: 0 0 10px 10px;
}
.alignTestWindow {
  width: 75%;
  border-radius: 10px 10px 0 0;
}
::-webkit-scrollbar {
  display: none;
}
#question {
  word-wrap: break-word;
}
#bookmark {
  margin-top: -1em;
  float: right;
}
#answers {
  margin-top: 1em;
}
table {
  width: 100%;
}
table tr{
  border-bottom: 1px solid #ccc;
}
table tr td {
  padding: 2em;
  cursor: pointer;
  background: #fff;
}
#buttons {
  float: right;
  margin: auto;
  margin-top: 1em;
}
.travelButtons {
  background: #961e00;
  color: #fff;
  margin-left: 1em;
  width: 8em;
  height: 3em;
}
.travelButtons:hover {
  color: #fff;
  box-shadow: 0 10px 20px #ccc;
}
table tr td:hover {
  /* box-shadow: 0 10px 20px #a1a1a1; */
  border-left: 5px solid #009688;
  border-right: 5px solid #009688;
  background: rgb(241, 241, 241);
}
/*Responsive Mobile Layout*/
@media (max-width: 800px) {
  #testWindow {
    width: 100%;
    height: 40em;
  }
  .alignTestWindow {
    width: 100%;
  }
}
</style>