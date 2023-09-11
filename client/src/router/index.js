import fixedNavigationWindow from '../components/testWindow/fixedNavigationWindow.vue'
import questionWindow from '../components/testWindow/questionWindow.vue'
import testWindow from '../components/testWindow/testWindow.vue'
import testWindowReview from '../components/testReviewWindow/testWindowReview.vue'
import fixedNavigationWindowReview from '../components/testReviewWindow/fixedNavigationWindowReview.vue'
import questionWindowReview from '../components/testReviewWindow/questionWindowReview.vue'
import testInstruction from '../components/testWindow/testInstruction.vue'
import navigationWindow from '../components/dashboard/navigationWindow.vue'
import contentUploaded from '../components/pages/contentUploaded.vue'
import notesUploaded from '../components/pages/notesUploaded.vue'
import mathEditor from '../components/pages/mathEditor.vue'
import activeTest from '../components/pages/activeTests.vue'
import recentTest from '../components/pages/recentTests.vue'
import scoreboard from '../components/pages/scoreboard.vue'
import home from '../components/home.vue'

import Router from 'vue-router'
/*import store from '../store/store'*/
import Vue from 'vue'


Vue.use(Router)
const router = new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			path: '/home',
			name: 'home',
			component: home
		},
		{
			path: '/fixedNavigationWindow',
			name: 'fixedNavigationWindow',
			component: fixedNavigationWindow
		},
		{
			path: '/questionWindow',
			name: 'questionWindow',
			component: questionWindow
		},
		{
			path: '/testWindow',
			name: 'testWindow',
			component: testWindow,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/testWindowReview/:testId/:testDuration',
			name: 'testWindowReview',
			component: testWindowReview
		},
		{
			path: '/fixedNavigationWindowReview',
			name: 'fixedNavigationWindowReview',
			component: fixedNavigationWindowReview
		},
		{
			path: '/questionWindowReview',
			name: 'questionWindowReview',
			component: questionWindowReview
		},
		{
			path: '/testInstruction',
			name: 'testInstruction',
			component: testInstruction,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/navigationWindow',
			name: 'navigationWindow',
			component: navigationWindow
		},
		{
			path: '/',
			name: 'contentUploaded',
			component: contentUploaded,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/activeTest',
			name: 'activeTest',
			component: activeTest,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/notesUploaded',
			name: 'notesUploaded',
			component: notesUploaded,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/recentTest',
			name: 'recentTest',
			component: recentTest,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/scoreboard',
			name: 'scoreboard',
			component: scoreboard,
			beforeEnter: (to, from, next) => {
				var cookie = window.$cookies.get('user_token');
				if (cookie == null || cookie == undefined) {
					next({ name: 'home' });
				} else {
					next();
				}
			}
		},
		{
			path: '/mathEditor',
			name: 'mathEditor',
			component: mathEditor
		}/*,
	{
		path:'*',
		redirect:'/notFound'
	}*/
	]
})


export default router;