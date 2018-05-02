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
  }]
});
