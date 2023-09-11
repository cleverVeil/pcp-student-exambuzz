<template>
  <div class="backStart" style="background:#0e2a47">
    <div class="exambuzznavbar">
      <b-navbar
        toggleable="lg"
        type="light"
        style=" padding: 1.5em"
      >
        <b-navbar-brand style="color: #fff; margin-left: 5%" href="/"
          ><img src="../assets/img/brading.png" width="170"/></b-navbar-brand
        >
        <b-navbar-nav class="ml-auto" right style="margin-right: 5%">
          <b-button
            @click="loginModal = true"
            style="padding: 0.4em 2em; background: #2ae27f; color: #000;"
            >Login</b-button
          >
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="d-flex">
      <div>
        <div
          class="mainHeaderData align-items-center"
        >
          <strong style="font-size: 25pt;line-height:55px">
            A platform created to give<br> <span style="background:#fff;color:#0e2a47;padding:0px 5px;border-radius:5px">every student</span> an opportunity<br> to <span style="background:#fff;color:#0e2a47;padding:0px 5px;border-radius:5px">
            step up their knowledge.</span> </strong
          ><br />
          <p></p>
          <b-button style="padding: 1em 3em; background: #2ae27f; color: #000"
            >Request Demo</b-button
          >
        </div>

        <div class="headerImage">
          <img src="../assets/img/jumbotron.png" style="width:100%"/>
        </div>
      </div>
    </div>

        <div class="row infoSection" style="width:100%;">
          <div class="column">
            <div class="row inside" style="width: 100%;">
          <div class="columnFeature">
            <div class="card">
              <img
                src="../assets/img/customize.png"
                width="80"
                style="margin: 0 auto"
              />
              <span
                style="
                  position: absolute;
                  bottom: 1em;
                  left: 0;
                  width: 100%;
                  text-align: center;
                "
                >Customized Test</span
              >
            </div>
          </div>
          <div class="columnFeature">
            <div class="card">
              <img
                src="../assets/img/evaluator.png"
                width="80"
                style="margin: 0 auto"
              />
              <span
                style="
                  position: absolute;
                  bottom: 1em;
                  left: 0;
                  width: 100%;
                  text-align: center;
                "
                >Smart Evaluation</span
              >
            </div>
          </div>
          <div class="columnFeature">
            <div class="card">
              <img
                src="../assets/img/study.png"
                width="80"
                style="margin: 0 auto"
              />
              <span
                style="
                  position: absolute;
                  bottom: 1em;
                  left: 0;
                  width: 100%;
                  text-align: center;
                "
                >Study Material</span
              >
            </div>
          </div>
          <div class="columnFeature">
            <div class="card">
              <img
                src="../assets/img/math.png"
                width="80"
                style="margin: 0 auto"
              />
              <span
                style="
                  position: absolute;
                  bottom: 1em;
                  left: 0;
                  width: 100%;
                  text-align: center;
                "
                >Equation Editor</span
              >
            </div>
          </div>
        </div>
          </div>
          <div class="column">
            <h3> <span style="background:#0e2a47;color:#fff;padding:0.2em 1em;border-radius:5px">Features</span></h3>
            <table class="importanceOfExambuzz">
              <tr>
                <td><span style="font-size:20pt;margin-left:-1.5em">&#128737; </span>Create, Edit, Delete test as per the requirement and schedule.</td>
              </tr>
              <tr>
                <td><span style="font-size:20pt;margin-left:-1.5em">&#128737; </span>Evalute a student, class, or deparment and improve your goals.</td>
              </tr>
              <tr>
                <td><span style="font-size:20pt;margin-left:-1.5em">&#128737; </span>Share important study materials and assignments with students.</td>
              </tr>
              <tr>
                <td><span style="font-size:20pt;margin-left:-1.5em">&#128737; </span>Create custom equations with smart equation editor.</td>
              </tr>
            </table>
          </div>
        
      </div>
   
   
    <!-- Login Modal -->

    <b-modal
      v-model="loginModal"
      title="Login"
      header-bg-variant="success"
      header-text-variant="light"
      ok-only
      ok-title="Go"
      @ok="navigateToDashboard"
    >
    <b-form-group ref="form">
        <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span class="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                name="username"
                v-model="username"
                id="username"
                placeholder="Username"
                required="required"
              />
            </div>
            
          </div>

      <div>
        <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span class="fa fa-lock"></span>
                </span>
              </div>
              <input
                :type="typeSet"
                class="form-control"
                name="password"
                v-model="password"
                id="password"
                placeholder="Password"
                required="required"
              />
              <div v-if="typeSet == 'password'" v-on:click="isPassShown" class="input-group-append">
                <span class="input-group-text">
                  <span class="fa fa-eye"></span>
                </span>
              </div>
              <div v-if="typeSet == 'text'" v-on:click="isPassShown" class="input-group-append">
                <span class="input-group-text">
                  <span class="fa fa-eye-slash"></span>
                </span>
              </div>
            </div>
            
          </div>
            <button class="forgotButton" @click="forgotPasswordModal = true" v-on:click="loginModal = false">Forgot Password ?</button>
      </div>
      </b-form-group>
    </b-modal>
    <!-- End of Login Modal -->


     <!-- Forgot Password Modal -->
    <b-modal v-model="forgotPasswordModal" title="Forgot Password" header-bg-variant="info" header-text-variant="light" @ok="forgotPassword">
      <table style="width:100%">
              <tr>
                <td>Username</td>
                <td><input style="width:100%" type="text" id="username"/></td>
              </tr>
              <tr>
                <td>Email Id</td>
                <td><input style="width:100%" type="email" id="emailid"/></td>
              </tr>
            </table>
    </b-modal>
    <!-- Forgot Password Modal -->


    <div class="footer">
      <div class="syncbit">
        Developed by
        <span style="margin-left: 1em" @click="openSyncbit()"
          ><img src="../assets/img/syncbit.png" width="150"
        /></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  components: {},
  data() {
    return {
      loginModal: false,
      username:'',
      password:'',
      typeSet:'password',
      forgotPasswordModal: false
    };
  },

  mounted: function () {},

  methods: {
    openSyncbit: function () {
      window.open("https://www.syncbittech.com", "_blank");
    },
    isPassShown: function(){
      if(this.typeSet == 'password')
        this.typeSet = 'text'
      else
        this.typeSet = 'password'
    },
    navigateToDashboard: function (bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.username.length !=0 && this.password.length != 0) {
        var credentials = {
          username: this.username,
          password: this.password
        }
        this.$store
          .dispatch("verifyUser", {
            credentials: credentials,
          })
          .then((resp) => {
            if (resp == 0) {
              this.makeToast(
                "b-toaster-top-right",
                "Incorrect username or password.",
                "danger",
                "Failure"
              );
            } else {
              if(resp.role != 'student'){
                this.makeToast(
                  "b-toaster-top-right",
                  "Incorrect username or password.",
                  "danger",
                  "Failure"
                );
              }else{
                window.$cookies.set('user_token', resp.userserviceKey, { expires: 7 })
              window.$cookies.set('dataPack', resp, { expires: 7 })
              setTimeout(() => {
                this.$router
                  .push({
                    name: "contentUploaded",
                  })
                  .catch((e) => {
                    console.log("routing err " + e);
                  });
              }, 1000);
              } 
            }
          });
      }else{
        this.makeToast(
          "b-toaster-top-right",
          "Make sure all the fields are properly filled.",
          "danger",
          "Please fill all the fields"
        );
      }
      return
    },
    forgotPassword:function(){
      var username = document.getElementById('username').value
      var emailid = document.getElementById('emailid').value
        var credentials ={
          username: username,
          emailid: emailid,
        }
        this.$store
          .dispatch("forgotUserPasswd", {
            credentials: credentials,
          }).then((resp)=>{
            this.makeToast(
              "b-toaster-top-right",
              resp,
              "info",
              "Information"
            );
          })
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
        usernameState() {
          return this.username.length > 2 ? true : false
        },
        passwordState() {
          return this.password.length > 0;
        },
  },
};
</script>

<style type="text/css" scoped>
/* 0E2A47 */
.backStart {
  height: 90vh;
  background: #0e2a47;
}
.infoSection{
  margin-top:1em;
  clear: both;
}
.row {
  width: 100%;
  margin: auto;
  padding:1em;
}
.column {
  width: 40%;
  padding:1em;
  margin:auto;
}
.one {
  width: 65%;
}
.mainHeaderData{
  float:left;
  width:45%;
  color: #fff;
  margin-left: 7%;
  margin-top: 10%
}
.importanceOfExambuzz{
  margin-top:2em;
  
}
.importanceOfExambuzz tr td{
  font-size: 15pt;
  padding: 0.5em;
  
}
.card {
  padding: 2em;
  width: 12em;
  height:12em;
  max-width: 12em;
  max-height: 12em;
  margin: auto;
}
.card::before{
  width:12em;
  height:12em;
  position:absolute;
  content: '';
  background: #2ae27f;
  z-index:-1;
  opacity: 0.2;
  border-radius: 5px;
  margin-top:-2.5em;
  margin-left:-1em;
  transform: rotate(5deg);
}
.columnFeature {
  width: 45%;
  padding: 0.5em;
}
.syncbit {
  text-align: center;
  padding: 1.6em;
  color: #fff;
  cursor: pointer;
  background: #0e2a47;
}
.forgotButton{
  background:#fff;
  border:none;
  color:#000;
}
/* Labels landers */
.form-group {
  padding: 0 1em;
}
.form-group > label {
  bottom: 34px;
  left: 15px;
  position: relative;
  background-color: #fff;
  padding: 0px 5px 0px 5px;
  font-size: 10pt;
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
/* End of labels landers */
/* Home page herok image */
.headerImage {
  float:right;
  width:50%;
  margin-top:-32%;
  margin-right:3%;
  overflow:hidden;
  margin-bottom:3em;
}
@media (max-width: 1200px) {
  .column {
    width: 95%;
  }
  .one {
    width: 78%;
  }
}
@media (max-width: 800px) {
  .headerImage img {
    width: 90%;
  }
  .column {
    width: 100%;
    margin-top: 1em;
    padding:0;
  }
  .inside{
    padding:0;
    margin-top:2em;
  }
  .columnFeature {
    width: 50%;
    padding: 0.5em;
  }
  .card {
    width: 11em;
    height:11em;
  }
  .card::before{
    width:10em;
    height:10em;
  }
  .importanceOfExambuzz tr td{
    padding-left:1.5em;
  }
}
@media (max-width: 650px) {
  .mainHeaderData{
    width:90%;
    color: #fff;
    margin-left: 7%;
    margin-top: 10%
  }
  .headerImage {
    width:100%;
    margin-top:-7%;
    margin-bottom:0em;
  }
}
/* end of hero image */
</style>