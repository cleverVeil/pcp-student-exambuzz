import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mime from "mime-types";
/*import router from '../router/index'
import vueCookie from 'vue-cookies'*/
/*Vue.use(vueCookie)*/
Vue.use(Vuex);
axios.defaults.headers.post["Content-Type"] = "application/json";
const userAxios = axios.create({
	/* https://dataserverpccoer.exambuzz.co.in/ */
	baseURL: 'https://dataserverpccoer.exambuzz.co.in/'
});

const authAxios = axios.create({
	/* https://pccoerauth.exambuzz.co.in/ */
	// baseURL: 'https://pccoerauth.exambuzz.co.in/'
	baseURL: 'http://localhost:4002'
});
const store = new Vuex.Store(
	{
		state: {
		},
		mutations: {
		},
		getters: {

		},
		actions: {/*****************************************/
			/*Action created for user login token*/
			/*****************************************/

			verifyUser(context, status) {
				var resp = null;
				const ans = authAxios.post("login", status.credentials)
					.then(response => {
						resp = response.data
						if (resp != "failure") {
							return resp;
						} else {
							return 0;
						}

					}).catch(err => {
						console.log("axios response " + err)
						return 0;
					})
				return ans;
			},
			changeUserPasswd(context, changePasswordCred){
				var resp = null;
				const ans = authAxios.post("changePassword", changePasswordCred.credentials)
					.then(response => {
						resp = response.data
						if (resp != "failure") {
							return resp;
						} else {
							return 0;
						}

					}).catch(err => {
						console.log("axios response " + err)
						return 0;
					})
				return ans;
			},
			forgotUserPasswd(context, forgotPasswordCred){
				var resp = null;
				const ans = authAxios.post("forgotPassword", forgotPasswordCred.credentials)
					.then(response => {
						resp = response.data
						if (resp != "failure") {
							return resp;
						} else {
							return 0;
						}

					}).catch(err => {
						console.log("axios response " + err)
						return 0;
					})
				return ans;
			},
			getActiveTestData(context, getDataForSessionId) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getTestData", {
					params: {
						servicekey: getDataForSessionId
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			getNotes(context, getNotesOfDepartment) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getNotes", {
					params: {
						notesFinder: getNotesOfDepartment
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			getTestQuestions(context, getDataForTestId) {
				var postProductDataToDB = userAxios.get("secure2/facultyRecord/getTestQuestions", {
					params: {
						testId: getDataForTestId
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			createUserTestQuestions(context, individualTestData) {
				var postProductDataToDB = userAxios.put("secure2/studentRecord/createUserTestQuestions", individualTestData)
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			updateTimer(context, timerdata) {
				var postProductDataToDB = userAxios.put("secure2/studentRecord/updateTimer", timerdata)
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			getTimerData(context, getTimerData) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getTimerData", {
					params: {
						data: getTimerData
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			updateQuestionsStatus(context, questionUpdatedStatus) {
				var postProductDataToDB = userAxios.put("secure2/studentRecord/updateQuestionsStatus", questionUpdatedStatus)
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			getTestResult(context, getTestRslt) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getSingleTestResult", {
					params: {
						data: getTestRslt
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			getShutDownQuestionData(context, getQuestionData) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getShutDownQuestionData", {
					params: {
						data: getQuestionData
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			finishTest(context, finishTestStatus) {
				var postProductDataToDB = userAxios.put("secure2/studentRecord/finishTest", finishTestStatus)
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			downloadNotes(context, downloadNotesFile) {
				var splitter = downloadNotesFile.file.split("/")
				var mime1 = mime.contentType(splitter[splitter.length - 1]);
				var postProductDataToDB = userAxios.get("secure2/facultyRecord/downloadNotes", {
					params: {
						data: downloadNotesFile
					},
					headers: {
						'Content-Disposition': `attachment; filename="${splitter[splitter.length - 1]}"`,
						'Content-Type': mime1,
					},
					responseType: "arraybuffer"
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							var blob = new Blob([response.data], { type: mime1 });
							return blob;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
			getRecentTest(context, getDataForSessionId) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getRecentTest", {
					params: {
						servicekey: getDataForSessionId
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},

			getDoneTestQuestions(context, data) {
				var postProductDataToDB = userAxios.get("secure2/studentRecord/getDoneTestQuestions", {
					params: {
						testId: data.testId,
						servicekey: data.servicekey
					}
				})
					.then(response => {
						var resp = response.data;
						if (resp == "failure") {
							return 0;
						} else {
							return resp;
						}
					}).catch(err => {
						console.log("checkUser " + err)
						return 0;
					})
				return postProductDataToDB;
			},
		}

	});

export default store;


