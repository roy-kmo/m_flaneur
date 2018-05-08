import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Flaneur',
  name: 'flaneur',
  icon: "fa fa-comment",
  autoEnable: true,
  settings: {
    name: "Flaneur"
  },
  registry: [{
    route: "/dashboard/featureline",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageFeatureLine",
    label: "Header Feature Line",
    description: "Manage header feature line",
    icon: "fa fa-comment",
    priority: 5,
    container: "core",
    template: "manageFeatureLine"
  }, {
    route: "/dashboard/featureline",
    name: "dashboard/featureline",
    provides: ["shortcut"],
    label: "Header Feature Line",
    description: "Manage header feature line",
    icon: "fa fa-comment",
    priority: 6,
    container: "dashboard",
    template: "manageFeatureLine",
    audience: ["seller"]
  }, {
    route: "/dashboard/homepagebanner",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageHomepageBanner",
    label: "Homepage Banner",
    description: "Manage homepage banner",
    icon: "fa fa-bullhorn",
    priority: 6,
    container: "core",
    template: "manageHomepageBanner"
  }, {
    route: "/dashboard/homepagebanner",
    name: "dashboard/homepagebanner",
    provides: ["shortcut"],
    label: "Homepage Banner",
    description: "Manage homepage banner",
    icon: "fa fa-bullhorn",
    priority: 7,
    container: "dashboard",
    template: "manageHomepageBanner",
    audience: ["seller"]
  }, {
    route: "/dashboard/homepageinfo",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageHomepageInfo",
    label: "Homepage Info",
    description: "Manage homepage info",
    icon: "fa fa-info",
    priority: 7,
    container: "core",
    template: "manageHomepageInfo"
  }, {
    route: "/dashboard/homepageinfo",
    name: "dashboard/homepageinfo",
    provides: ["shortcut"],
    label: "Homepage Info",
    description: "Manage homepage info",
    icon: "fa fa-info",
    priority: 8,
    container: "dashboard",
    template: "manageHomepageInfo",
    audience: ["seller"]
  }, {
    route: "/dashboard/homepagetopsellers",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "manageHomepageTopSellers",
    label: "Homepage Top Sellers",
    description: "Manage homepage top sellers",
    icon: "fa fa-fire",
    priority: 8,
    container: "core",
    template: "manageHomepageTopSellers"
  }, {
    route: "/dashboard/homepagetopsellers",
    name: "dashboard/homepagetopsellers",
    provides: ["shortcut"],
    label: "Homepage Top Sellers",
    description: "Manage homepage top sellers",
    icon: "fa fa-fire",
    priority: 9,
    container: "dashboard",
    template: "manageHomepageTopSellers",
    audience: ["seller"]
  }, {
    route: '/cart-link/:id',
    template: 'applyCartLink'
  }]
});
