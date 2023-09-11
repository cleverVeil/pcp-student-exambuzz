<template>
  <div :key="questionIndex">
    {{getQuestionIndex()}}
    <b-progress class="alignTestWindow" :max="max" show-value>
      <b-progress-bar v-bind:value="getValue()" variant="success" animated>{{
        getValue()
      }}</b-progress-bar>
    </b-progress>
    <div id="testWindow">
      <div id="bookmark">
        <img
          v-if="flag == false"
          v-on:click="flagUp()"
          id="flagId"
          src="../../assets/img/bookmarkTrans.png"
          height="30px"
        />
        <img
          v-else
          v-on:click="flagUp()"
          id="flagId"
          src="../../assets/img/bookmark.png"
          height="30px"
        />
      </div>
      <div v-if="isQuestionLoaded" :key="currentIndex">
        <div id="question">
          <p style="font-weight: bold">Question</p>
          <span style="font-weight:800">{{currentIndex}} : </span>
          <vue-mathjax :formula="questionTemp">
            <span>
            {{
              questionTemp
            }}
          </span>
          </vue-mathjax>
        </div>
        <div id="answers">
          <p style="font-weight: bold">Answers</p>
          <table>
            <p></p>
            <tr>
              <td
                id="tracckesid"
                v-on:click="answerClicked('tracckesid')"
              >
                <span style="margin-left: -1em; color: #009688">&#10148;</span>
                <vue-mathjax :formula="optionATemp">
                  <span>
                  {{
                    optionATemp
                  }}
                </span>
                </vue-mathjax>
                
              </td>
              <hr />
            </tr>
            <tr>
              <td
                id="tracckesie"
                v-on:click="answerClicked('tracckesie')"
              >
                <span style="margin-left: -1em; color: #009688">&#10148;</span>
                
                <vue-mathjax :formula="optionBTemp">
                  <span>
                  {{
                    optionBTemp
                  }}
                </span>
                </vue-mathjax>
              </td>
              <hr />
            </tr>
            <tr v-if="optionCTemp != ''">
              <td
                id="tracckesif"
                v-on:click="answerClicked('tracckesif')">
                <span style="margin-left: -1em; color: #009688">&#10148;</span>
                
                <vue-mathjax :formula="optionCTemp">
                  <span>
                  {{
                    optionCTemp
                  }}
                </span>
                </vue-mathjax>
              </td>
              <hr />
            </tr>
            <tr v-if="optionDTemp !=''">
              <td
                id="tracckesig"
                v-on:click="answerClicked('tracckesig')">
                <span style="margin-left: -1em; color: #009688">&#10148;</span>
                
                <vue-mathjax :formula="optionDTemp">
                  <span>
                  {{
                    optionDTemp
                  }}
                </span>
                </vue-mathjax>
              </td>
              <hr />
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <span style="font-weight:800">Marked Answer</span> :
                  <span>
                  {{
                    answerMarked
                  }}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span style="font-weight:800">Correct answer</span>  : {{
                  this.saveQuestionData[this.tempQuestionSection][
                    this.currentIndex
                  ].correctAnswer
                }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { VueMathjax } from 'vue-mathjax'
export default {
  components: {
    'vue-mathjax': VueMathjax
  },
  props: ["questionId","questionIndex","sectionKey"],
  data() {
    return {
      flag: false,
      currentIndex:1,
      formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$',
      testId: this.$route.params.testId,
      per: "%",
      userId: window.$cookies.get('user_token'),
      max: 100,
      tempQuestionId: 0,
      tempQuestionIndex: 1,
      tempQuestionSection: "",
      sectionKick : "",
      isQuestionLoaded: false,
      allSections: [],
      totalQuestions: 0,
      saveQuestionData: {},
      questionTemp:'',
      optionATemp:'',
      optionBTemp:'',
      optionCTemp:'',
      optionDTemp:'',
      answerMarked:''
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

    this.getTestData();
    this.getQuestionIndex();
  },

  methods: {
    getQuestionIndex: function(){
      this.currentIndex = this.questionIndex;
      var typer =  typeof this.sectionKey 
      if(typer == "string"){
        var splitter = this.sectionKey.split(",");
        this.tempQuestionSection = splitter[0];
      }
      if(this.saveQuestionData[this.tempQuestionSection] != undefined){
      this.questionTemp = this.saveQuestionData[this.tempQuestionSection][this.currentIndex].question+''
      this.optionATemp = this.saveQuestionData[this.tempQuestionSection][this.currentIndex ].optionA+''
      this.optionBTemp = this.saveQuestionData[this.tempQuestionSection][this.currentIndex].optionB+''
      this.optionCTemp = this.saveQuestionData[this.tempQuestionSection][this.currentIndex].optionC+''
      this.optionDTemp = this.saveQuestionData[this.tempQuestionSection][this.currentIndex].optionD+''
      this.answerMarked = this.saveQuestionData[this.tempQuestionSection][this.currentIndex].answer+'' || ""
      }

    },
    getTestData: function () {
      var cookie = window.$cookies.get('user_token');
      var data = {
          servicekey: cookie,
          testId: this.testId
      }
      this.$store.dispatch("getDoneTestQuestions", data).then((resp) => {
        if (resp == 0) {
          this.makeToast(
            "b-toaster-top-center",
            "Something went wrong!",
            "danger",
            "Failure"
          );
        } else {
          this.$emit("sectionData", { section: resp });
          var testQuestion = {
        testId: this.testId,
        userserviceKey: this.userId,
      };
      var counterlet = 0;
      this.$store
        .dispatch("getShutDownQuestionData", testQuestion)
        .then((resp) => {
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
        });
        }
      });
    },
    answerClicked: function (answerClick) {
      var parent = document.getElementById(answerClick).parentNode.parentNode;
      for (var i = 1; i < parent.childElementCount; i++) {
        parent.childNodes[i].childNodes[0].style.background = "#fff";
        parent.childNodes[i].childNodes[0].style.color = "#000";
      }

      document.getElementById(answerClick).style.background = "#009688";
      document.getElementById(answerClick).style.color = "#fff";
    },
    flagUp: function () {
      var indexer = this.currentIndex;
      var flagger = null;
      if (this.flag == false) {
        this.flag = true;
        flagger = this.flag;
        this.$emit("childToParent", { flag: flagger, indexer });
      } else {
        this.flag = false;
        flagger = this.flag;
        this.$emit("childToParent", { flagger, indexer });
      }
    },
    getValue: function () {

      var temp =
        100 *
        (this.currentIndex / this.totalQuestions);

      temp = Math.floor(temp) + "%";
      return temp;
    },
  },

  computed: {},
};
</script>

<style type="text/css" scoped>
#testWindow {
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
    height:40em;
    overflow: auto;
  }
  .alignTestWindow {
    width: 100%;
  }
}
</style>