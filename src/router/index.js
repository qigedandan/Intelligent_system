import { createRouter, createWebHashHistory } from "vue-router";

import Analyse from "../analyse/Analyse.vue";
import Basic from "../analyse/Basic.vue";
import eryi from "../analyse/eryi.vue";
import erer from "../analyse/erer.vue";
import ersan from "../analyse/ersan.vue";
import san from "../analyse/san.vue";
import si from "../analyse/si.vue";
import wu from "../analyse/wu.vue";

import Home from "../components/Home.vue";
import Project from "../components/Project.vue";
import Code from "../components/Code.vue";
import index from "../components/index.vue";

import Origin from "../origin/Origin.vue";
import one from "../origin/one.vue";
import two from "../origin/two.vue";
import three from "../origin/three.vue";
import four from "../origin/four.vue";
import five from "../origin/five.vue";
import six from "../origin/six.vue";

import Login from "../components/Login.vue";
import Subsystem from "../components/Subsystem.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/home", redirect: "/home/index" },
  { path: "/login", component: Login },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "", component: index },
      {
        path: "project",
        component: Project,
      },
      {
        path: "code",
        component: Code,
      },
      {
        path: "index",
        component: index,
      },
      {
        path: "subsystem",
        component: Subsystem,
      },
    ],
  },

  {
    path: "/analyse",
    component: Analyse,
    children: [
      {
        path: "1",
        component: Basic,
      },
      {
        path: "21",
        component: eryi,
      },
      {
        path: "22",
        component: erer,
      },
      {
        name: "list",
        path: "23",
        component: ersan,
      },
      {
        path: "3",
        component: san,
      },
      // {
      //     path:'4',
      //     component:si
      // },
      // {
      //     path:'5',
      //     component:wu
      // },
    ],
  },
  {
    path: "/origin",
    component: Origin,
    children: [
      // {
      //     path:'1',
      //     component:one
      // },
      // {
      //     path:'2',
      //     component:two
      // },
      {
        path: "3",
        component: three,
      },
      {
        path: "4",
        component: four,
      },
      {
        path: "5",
        component: five,
      },

      {
        path: "6",
        component: six,
      },
    ],
  },
];

const router = new createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
