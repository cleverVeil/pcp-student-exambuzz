<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      style="box-shadow: 0 0 10px #ccc;position:fixed;z-index:100;width:100%;background:#fff"
    >
      <b-navbar-brand href="/">
        <p style="line-height: 14px; margin-bottom: 0em">
          <img src="../../assets/img/bradingBlack.png" width=" 170"/>
        </p>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
 -->
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content style="border: 2px solid #009688">
              <em
                ><img
                  class="dropbtn"
                  id="usercontentbig"
                  src="../../assets/img/userIcon.png"
                  alt="User"
                  style="
                    width: 35px;
                    border: 2px solid #009688;
                    border-radius: 100px;
                  "
              /></em>
            </template>
            <b-dropdown-item @click="profileModal = true">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOutModal = true">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-navbar-nav right>
            <b-nav-item href="#"><img
                  class="dropbtn"
                  id="usercontentbig"
                  src="../../assets/img/bell.svg"
                  alt="User"
                  style="
                    width: 28px;
                    margin-top:3px;
                  "
              /></b-nav-item>
            <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <!-- Modals for navbar -->

    <!-- Profile Modal -->
    <b-modal v-model="profileModal" title="Profile" centered hide-footer header-bg-variant="info" header-text-variant="light">
          <div style="margin:auto">
            <table style="width:100%">
              <tr>
                <td>Name</td>
                <td><input style="width:100%" type="text" :value="name" readonly/></td>
              </tr>
              <tr>
                <td>Username</td>
                <td><input style="width:100%" type="text" :value="username" readonly/></td>
              </tr>
              <tr>
                <td>Department</td>
                <td><input style="width:100%" type="text" :value="department" readonly/></td>
              </tr>
              <tr>
                <td>Division</td>
                <td><input style="width:100%" type="text" :value="division" readonly/></td>
              </tr>
            </table>
            <b-button variant="info" style="float:right" @click="changePasswordModal = true" v-on:click="profileModal = false">Change Password</b-button>
      </div>
    </b-modal>
    <!-- End of profile Modal -->

    <!-- Change Password Modal -->
    <b-modal v-model="changePasswordModal" title="Change Password" header-bg-variant="info" header-text-variant="light" @ok="changePassword">
      <table style="width:100%">
              <tr>
                <td>Current Password</td>
                <td><input style="width:100%" type="text" id="currentPasswd"/></td>
              </tr>
              <tr>
                <td>New Password</td>
                <td><input style="width:100%" type="text" id="newPasswd"/></td>
              </tr>
              <tr>
                <td>Retype New Password</td>
                <td><input style="width:100%" type="text" id="retypenewPasswd"/></td>
              </tr>
            </table>
    </b-modal>
    <!-- Change Password Modal -->




    <!-- SignOut Modal -->
    <b-modal v-model="signOutModal" title="Logout" header-bg-variant="danger" header-text-variant="light" @ok="logout">
      <p class="my-4">Are you sure you want to logout!</p>
    </b-modal>
    <!-- SignOut Modal -->
    <!-- End of navbar Modals -->


    <!-- large SideBar navigation -->
    <b-sidebar
      v-model="sideBar"
      v-if="changeSizes"
      sticky
      bg-variant="info"
      shadow
      z-index=1
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
    >
      <template style="background:#f00">
        <div class="p-3 dataSideMenu">
          <!-- <b-button style="background: #009688" block>
            Add Content
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/content.png"
              alt="C"
              style="width: 22px;float:right; margin-top: 0em;margin-right:3em"
            />
          </b-button> -->
        
        <div class="mt-5">
            <b-button style="background: rgb(246, 246, 246);color:#000" block v-on:click="getToContentPage()">
            <span style="float:left">Test Available</span>
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/test.svg"
              alt="C"
              style="width: 22px;float:right; margin-top: 0em;margin-right:5em"
            />
          </b-button><br>
          <!-- <b-button style="background: rgb(246, 246, 246);color:#009688" block>
            <span style="float:left">Results</span>
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/results.png"
              alt="C"
              style="width: 22px;float:right; margin-top: 0em;margin-right:5em"
            />
          </b-button><br> -->
          <b-button style="background: rgb(246, 246, 246);color:#000" block v-on:click="goToMathEditor()">
            <span style="float:left">Math Editor</span>
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/mathEditor.png"
              alt="C"
              style="width: 22px;float:right; margin-top: 0em;margin-right:5em"
            />
          </b-button>
        </div>
          
        </div>
      </template>
      <template #footer="{}">
        <div style="border-top: 1px solid #fff" class="p-1">
          <b-button v-on:click="changeSize()" style="background:#fff"
            ><img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/resize.svg"
              alt="C"
              style="width: 30px"
          /></b-button>
        </div>
      </template>
    </b-sidebar>

    <!-- small SideBar navigation -->
    <b-sidebar
      v-model="sideBar"
      sticky
      v-if="!changeSizes"
      z-index="1"
      no-slide
      aria-labelledby="sidebar-no-header-title"
      width="4em"
      bg-variant="info"
      no-header
    >
      <template>
        <div class="p-1 dataSideMenu">
          <!-- <b-button variant="primary" style="background: #009688" block>
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/content.png"
              alt="C"
              style="width: 30px; margin-left: -0.2em"
            />
          </b-button> -->
           <div class="mt-5">
            <b-button style="background: rgb(246, 246, 246);color:#000" block v-on:click="getToContentPage()">
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/test.svg"
              alt="C"
              style="width: 22px;"
            />
          </b-button><br>
          <!-- <b-button style="background: rgb(246, 246, 246);color:#009688" block>
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/results.png"
              alt="C"
              style="width: 22px;"
            />
          </b-button><br> -->
          <b-button style="background: rgb(246, 246, 246);color:#009688" block v-on:click="goToMathEditor()">
            <img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/mathEditor.png"
              alt="C"
              style="width: 22px;"
            />
          </b-button>
        </div>
        </div>
      </template>
      <template #footer="{}">
        <div style="border-top: 1px solid #fff" class="p-1">
          <b-button v-on:click="changeSize()" style="background:#fff"
            ><img
              class="dropbtn"
              id="usercontentbig"
              src="../../assets/img/resize.svg"
              alt="C"
              style="width: 30px"
          /></b-button>

        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script type="text/javascript">
export default {
  components: {},
  data() {
    return {
      sideBar: false,
      changeSizes: true,
      profileModal: false,
      signOutModal: false,
      name: '',
      division:'',
      department:'',
      username:'',
      changePasswordModal: false
    };
  },

  mounted: function () {
      this.sideBar = true
    if (window.innerWidth > 800) {
      this.changeSizes = true
    }else{
        this.changeSizes = false
    }
    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) {
        this.changeSizes = true
      }else
        this.changeSizes = false
    });

    var cookie = window.$cookies.get('dataPack');
    if(cookie == null || cookie == undefined){
      this.$router.push({name: "home"});
    } else{
      if(cookie.role == 'student'){
        this.name = cookie.name;
        this.department = cookie.department;
        this.division = cookie.division
        this.username = cookie.username
      }
    }
  },

  methods: {
    changeSize: function () {
      this.changeSizes = !this.changeSizes;
    },
    goToMathEditor: function () {
      this.$router.push({
        name: "mathEditor",
      });
    },
    getToContentPage: function () {
      this.$router.push({
        name: "contentUploaded",
      });
    },
    changePassword:function(){
      var currPasswd = document.getElementById('currentPasswd').value
      var newPasswd = document.getElementById('newPasswd').value
      var retypenewPasswd = document.getElementById('retypenewPasswd').value

      if(newPasswd != retypenewPasswd){
        this.makeToast(
            "b-toaster-top-right",
            "New password and retyped passwords do not match",
            "danger",
            "No Data"
          );
      }else{
        var credentials ={
          username: this.username,
          currentPassword: currPasswd,
          newPassword: newPasswd,
          retypePassword: retypenewPasswd 
        }
        this.$store
          .dispatch("changeUserPasswd", {
            credentials: credentials,
          }).then((resp)=>{
            console.log(resp);
            this.makeToast(
              "b-toaster-top-right",
              resp,
              "info",
              "Information"
            );
          })
      }
    },
    logout:function(){
      window.$cookies.remove("dataPack");
      window.$cookies.remove("user_token");
      this.$router.push({
        name: "home",
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
.dataSideMenu {
  margin-top: 5em;

}
.smallNavBar {
  width: 3em;
  background: rgb(246, 246, 246);
}
table tr td{
  padding:0.5em;
}
</style>