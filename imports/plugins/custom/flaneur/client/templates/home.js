import { Template } from "meteor/templating";
import HomeContainer from '../containers/HomeContainer';

Template.home.helpers({
  HomeContainer () {
    return HomeContainer;
  }
});
