import { Reaction } from '/server/api';

Reaction.registerPackage({
  label: 'Bedding Builder',
  name: 'bedding-builder',
  icon: "fa fa-sun-o",
  autoEnable: true,
  settings: {
    name: "Bedding Builder"
  },
  registry: [
    {
      route: '/design-your-bedding',
      template: 'beddingBuilder'
    }
  ]
});
