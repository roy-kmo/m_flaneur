import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Colors',
  name: 'colors',
  icon: "fa fa-bullseye",
  autoEnable: true,
  settings: {
    name: "Colors"
  },
  registry: [{
    route: "/dashboard/colors",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "colors",
    label: "Colors",
    description: "Manage colors",
    icon: "fa fa-bullseye",
    priority: 4,
    container: "core",
    template: "colors"
  }, {
    route: "/dashboard/colors",
    name: "dashboard/colors",
    provides: ["shortcut"],
    label: "Colors",
    description: "Manage colors",
    icon: "fa fa-bullseye",
    priority: 5,
    container: "dashboard",
    template: "colors",
    audience: ["seller"]
  }]
});
