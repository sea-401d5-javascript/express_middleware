const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const Router = require('../lib/router.js');
const router = new Router();
require('../server.js');
