<template>
  <div style="background: #e7fdfb">
    <div id="leftQuestionPanel" class="slideIn" :key="isActivated">
      <div id="sectionalData">
        <div id="finishTest">
          <h4>Test</h4>
          <button v-on:click="finishTest()">Finish</button>
        </div>
        <div class="allSection" v-for="(value, key) in sectionData" :key="key">
          <hr v-if="key != 'Section 1'" />
          <div class="sectional" :id="key">
            <h5>{{ key }}</h5>
            <div class="container-fluid">
              <div class="row">
                <div
                  class="col-4"
                  v-for="keyQuestion in value"
                  :key="keyQuestion[0]"
                >
                  <div v-on:click="getQuestionDisplayed(keyQuestion[0], key)" :id="keyQuestion[0]" class="card activer">
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
      <questionWindowReview :questionIndex="currentIndex" :sectionKey="keyData" v-on:childToParent="onChildClick" v-on:sectionData="sectionDetails" />
    </div>
  </div>
</template>

<script type="text/javascript">
import questionWindowReview from "../testReviewWindow/questionWindowReview.vue";
export default {
  components: {
    questionWindowReview,
  },
  data() {
    return {
      sectionCount: 3,
      totalQuestions: 20,
      questionsSolved: 15,
      questionsRemaining: 0,
      isActivated: false,
      sectionData: {},
      currentIndex:1,
      keyData: "",
      testDuration: this.$route.params.testDuration,
      currentSection: "",
      allSections: [],
    };
  },

  mounted: function () {
    this.keyData = this.allSections;
    this.questionsRemaining = this.totalQuestions - this.questionsSolved;
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

    window.document.onclick = function (event) {
      if (window.innerWidth <= 800) {
        if (!event.target.matches("#pullOver") && document.getElementById("leftQuestionPanel") != null) {
          document.getElementById("leftQuestionPanel").style.left = "-20em";
          document.getElementById("pullOver").style.left = "-1em";
        }
      }
    };
  },

  methods: {
    next: function () {
      if(this.totalQuestions !=this.currentIndex){
        this.currentIndex += 1;

      var indexKeys = Object.keys(this.sectionData)

      for (let index = 0; index < indexKeys.length; index++) {
        const element = indexKeys[index];
        for (let indexNumber = 0; indexNumber < this.sectionData[element].length; indexNumber++) {
          const elementNubmer = this.sectionData[element][indexNumber];
          if(elementNubmer[0] == this.currentIndex){
            document.getElementById(this.currentIndex).style.border = "3px solid #009688";
            this.keyData = element
            for (let i = 0; i < document.getElementsByClassName('sectional').length; i++) {
              document.getElementsByClassName('sectional')[i].style.background = "#fff";
            }
            document.getElementById(element).style.background = "#d1f6f3";
          }
          
        }
      }
      }
    },
    prev: function () {
      var indexKeys = Object.keys(this.sectionData)
      if(this.currentIndex == 1){
        this.currentIndex = 1;
        

      for (let index = 0; index < indexKeys.length; index++) {
        const element = indexKeys[index];
        for (let indexNumber = 0; indexNumber < this.sectionData[element].length; indexNumber++) {
          const elementNubmer = this.sectionData[element][indexNumber];
          if(elementNubmer[0] == this.currentIndex){
            this.keyData = element
            for (let i = 0; i < document.getElementsByClassName('sectional').length; i++) {
              document.getElementsByClassName('sectional')[i].style.background = "#fff";
            }
            document.getElementById(element).style.background = "#d1f6f3";
          }
          
        }
      }
      }else if(this.currentIndex >1){
        this.currentIndex -= 1;

      for (let index = 0; index < indexKeys.length; index++) {
        const element = indexKeys[index];
        for (let indexNumber = 0; indexNumber < this.sectionData[element].length; indexNumber++) {
          const elementNubmer = this.sectionData[element][indexNumber];
          if(elementNubmer[0] == this.currentIndex){
            this.keyData = element
            for (let i = 0; i < document.getElementsByClassName('sectional').length; i++) {
              document.getElementsByClassName('sectional')[i].style.background = "#fff";
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
    },
    onChildClick(value) {
      /* console.log(value) */
      var ele = document.getElementById(value.indexer);
      if (value.flag == true) ele.style.border = "3px solid #ff8465";
      else ele.style.border = "1px solid #009688";
    },
    finishTest: function () {
      this.$emit("clicked", "finishTest");
    },
    sectionDetails: function(data){
      var counter = 0;
      var indexKeys =data.section.questions
      for (let index = 0; index < indexKeys.length; index++) {
        const element = indexKeys[index];
        this.allSections[index] = element;
        var tempArray = [];
        for (let indexNumber = 0; indexNumber < element.question.length; indexNumber++) {
          counter = counter + 1
          const elementNubmer =  element.question[indexNumber];
          tempArray[indexNumber] = [counter, elementNubmer.index]
        } 
        this.sectionData[element.section] = tempArray
      }
      this.totalQuestions = counter;
      this.isActivated = true
    },
    getQuestionDisplayed: function(questionIndex, sectionKey){
      /* console.log(document.getElementsByClassName('activer')) */
      if(document.getElementById(questionIndex)!=undefined){
        document.getElementById(questionIndex).style.border = "3px solid #009688";
        document.getElementById(questionIndex).style.color = "#000";
      }else{
        document.getElementById(questionIndex).style.background = "#fff";
        document.getElementById(questionIndex).style.color = "#000";
      }
        
      this.currentIndex = questionIndex;
      this.keyData = sectionKey;
    }
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
.sectional{
  padding:0.5em;
  border-radius: 5px;
}
#buttons {
  float: right;
  margin-right:-12.5% ;
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
  font-size: 14pt;
  font-weight: bold;
  margin-top: -1.5em;
  padding: 1.3em 1em 0.1em 1em;
  color: #fff;
  background: #f00;
  max-width: 10em;
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
    margin-right:0% ;
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
