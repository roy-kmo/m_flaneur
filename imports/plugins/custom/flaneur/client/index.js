// Initialize Bootstrap theme for Tabular tables
import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import './less/tables.less';
import './less/manage-feature-line.less';
import './less/manage-homepage-banner.less';
import './less/manage-homepage-info.less';
import './less/manage-homepage-top-sellers.less';
import './templates/manageFeatureLine.html';
import './templates/manageFeatureLine';
import './templates/manageHomepageBanner.html';
import './templates/manageHomepageBanner';
import './templates/manageHomepageInfo.html';
import './templates/manageHomepageInfo';
import './templates/manageHomepageTopSellers.html';
import './templates/manageHomepageTopSellers';
import './templates/intercom.html';
import '../lib/schemas/productsSchema';
import './components/FlaneurProductAdmin';

Meteor.startup(function () {
  Blaze.render(Template.intercom, $('body')[0]);
});
