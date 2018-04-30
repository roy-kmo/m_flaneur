import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Pages',
  name: 'pages',
  icon: "fa fa-sun-o",
  autoEnable: true,
  settings: {
    name: "Pages"
  },
  registry: [{
    route: "/dashboard/pages",
    provides: ["dashboard"],
    workflow: "coreWorkflow",
    name: "pages",
    label: "Pages",
    description: "Manage pages",
    icon: "fa fa-file-o",
    priority: 1,
    container: "core",
    template: "pages"
  }, {
    route: "/dashboard/pages",
    name: "dashboard/pages",
    provides: ["shortcut"],
    label: "Pages",
    description: "Manage pages",
    icon: "fa fa-file-o",
    priority: 2,
    container: "dashboard",
    template: "pages",
    audience: ["seller"]
  }]
});
