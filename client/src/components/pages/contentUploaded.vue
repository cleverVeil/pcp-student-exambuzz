<template>
  <div>
    <navigationWindow />

    <div class="uploadedContent">
      <div>
        <h4>Content Available</h4>
        <hr />

        <!-- Tabs with card integration -->
        <b-card no-body>
          <b-tabs v-model="tabIndex" small card>

            <!-- Active Test tab -->
            <b-tab title="Active Test">
             <activeTest/>
            </b-tab>

            <!-- Upload Notes tab -->

            <b-tab title="Recent Tests"> 
              <recentTests/>
            </b-tab>
            
            <!-- Uploaded Notes tab -->

            <b-tab title="Notes"> 
              <notesUploaded/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import notesUploaded from "@/components/pages/notesUploaded.vue";
import recentTests from '@/components/pages/recentTests.vue'
import activeTest from '@/components/pages/activeTests.vue'
import navigationWindow from "@/components/dashboard/navigationWindow.vue";
export default {
  components: {
    notesUploaded,
    recentTests,
    activeTest,
    navigationWindow,
  },
  data() {
    return {
      tabIndex: 0,
    };
  },

  mounted: function () {},

  methods: {
  },

  computed: {
    
  },
};
</script>

<style type="text/css" scoped>
.uploadedContent {
  float: right;
  width: 77%;
  margin-top: 5em;
  background: #fff;
  padding: 1em;
  border-radius: 5px;
}

/* Upload Content generic */
.or-seperator {
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

.addSection {
  background: rgb(35, 200, 35);
  border: none;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 10px;
  cursor: pointer;
  margin-top: -2em;
}
.removeSection {
  background: rgb(255, 167, 84);
  border: none;
  color: #fff;
  padding: 0em 0.5em;
  border-radius: 10px;
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  .uploadedContent {
    width: 90%;
  }
  .column {
    width: 32%;
    margin: auto;
  }
}
@media screen and (max-width: 650px) {
  .uploadedContent {
    width: 85%;
  }
  .column {
    width: 100%;
    margin: 0.2em auto;
  }
}
</style>