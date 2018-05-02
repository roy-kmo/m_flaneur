import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Color Houses',
  name: 'color-houses',
  icon: "fa fa-home",
  autoEnable: true,
  settings: {
    name: "Color Houses"
  },
  registry: [{
    route: "/dashboard/color-houses",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "colorHouses",
    label: "Color Houses",
    description: "Manage color houses",
    icon: "fa fa-home",
    priority: 5,
    container: "core",
    template: "colorHouses"
  }, {
    route: "/dashboard/color-houses",
    name: "dashboard/color-houses",
    provides: ["shortcut"],
    label: "Color Houses",
    description: "Manage color houses",
    icon: "fa fa-home",
    priority: 6,
    container: "dashboard",
    template: "colorHouses",
    audience: ["seller"]
  }]
});
