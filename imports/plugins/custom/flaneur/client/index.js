// Initialize Bootstrap theme for Tabular tables
import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import './less/tables.less';
import './less/manage-feature-line.less';
import './templates/manageFeatureLine.html';
import './templates/manageFeatureLine.js';
