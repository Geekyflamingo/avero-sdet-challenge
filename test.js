'use strict';
const chai = require('chai');
const path = require('path');
const { expect } = chai;

const chaiResponseValidator = require('chai-openapi-response-validator');
const pathToApiSpec = path.resolve('yaml/public_api_sdet_exercise.yaml');
const baseURL = 'http://localhost:9000'

chai.use(require('chai-http'));
chai.use(chaiResponseValidator(pathToApiSpec));


describe('valid OpenAPI file', function () {
  it('returns a function', function () {
    expect(chaiResponseValidator(pathToApiSpec)).to.be.a('function');
  });
});

describe('GET /v1/core/request', function() {
  describe('GET for /v1/core/businesses and /v1/core/businesses/{businessIds}', function () {
    it('should satisfy the OpenAPI spec for all businesses', function(done) {
      chai.request(baseURL)
      .get('/v1/core/businesses')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a single buisness', function(done) {
      chai.request(baseURL)
      .get('/v1/core/businesses/7047')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a couple of buisnesses', function(done) {
      chai.request(baseURL)
      .get('/v1/core/businesses/7047,6925')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
  });
  describe('GET for /v1/sales/summary-sales and /v1/sales/summary-sales+params', function () {
    it('should satisfy the OpenAPI spec for all SummarySales', function(done) {
      chai.request(baseURL)
      .get('/v1/sales/summary-sales')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a SummarySales of a specific businessId', function(done) {
      chai.request(baseURL)
      .get('/v1/sales/summary-sales?buisnessIds=7047')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a SummarySales of multiple businessIds', function(done) {
      chai.request(baseURL)
      .get('/v1/sales/summary-sales?buisnessIds=7047,6925')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a SummarySales of a specific businessDay', function(done) {
      chai.request(baseURL)
      .get('/v1/sales/summary-sales?businessDays=2019-05-29')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a SummarySales of a specific buisness aspect', function(done) {
      chai.request(baseURL)
      .get('/v1/sales/summary-sales?include=aspects.mealPeriods')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
    it('should satisfy the OpenAPI spec for a SummarySales using all of the params', function(done) {
      chai.request(baseURL)
      .get('/v1/sales/summary-sales?businessIds=7047,6925&businessDays=2019-05-29&include=aspects.mealPeriods')
      .end(function(err,res){
        expect(res.status).to.equal(200);
        expect(res).to.satisfyApiSpec;
        done();
      });
    });
  });
});
describe('res matches a path but none of its HTTP methods', function () {
  describe('HEAD HTTP method for all paths', function () {
    it('should throw an error for /v1/sales/summary-sales', function (done) {
      chai.request(baseURL)
      .head('/v1/sales/summary-sales?businessIds=7047,6925&businessDays=2019-05-29&include=aspects.mealPeriods')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'HEAD\' method defined for path \'/v1/sales/summary-sales\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses', function (done) {
      chai.request(baseURL)
      .head('/v1/core/businesses')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'HEAD\' method defined for path \'/v1/core/businesses\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses/{buisnessIds}', function (done) {
      chai.request(baseURL)
      .head('/v1/core/businesses/7047')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'HEAD\' method defined for path \'/v1/core/businesses/{businessIds}\' in OpenAPI spec');
        done();
      });
    });
  });
  describe('POST HTTP method for all paths', function () {
    it('should throw an error for /v1/sales/summary-sales', function (done) {
      chai.request(baseURL)
      .post('/v1/sales/summary-sales?businessIds=7047,6925&businessDays=2019-05-29&include=aspects.mealPeriods')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'POST\' method defined for path \'/v1/sales/summary-sales\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses', function (done) {
      chai.request(baseURL)
      .post('/v1/core/businesses')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'POST\' method defined for path \'/v1/core/businesses\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses/{buisnessIds}', function (done) {
      chai.request(baseURL)
      .post('/v1/core/businesses/7047')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'POST\' method defined for path \'/v1/core/businesses/{businessIds}\' in OpenAPI spec');
        done();
      });
    });
  });
  describe('PUT HTTP method for all paths', function () {
    it('should throw an error for /v1/sales/summary-sales', function (done) {
      chai.request(baseURL)
      .put('/v1/sales/summary-sales?businessIds=7047,6925&businessDays=2019-05-29&include=aspects.mealPeriods')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'PUT\' method defined for path \'/v1/sales/summary-sales\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses', function (done) {
      chai.request(baseURL)
      .put('/v1/core/businesses')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'PUT\' method defined for path \'/v1/core/businesses\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses/{buisnessIds}', function (done) {
      chai.request(baseURL)
      .put('/v1/core/businesses/7047')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'PUT\' method defined for path \'/v1/core/businesses/{businessIds}\' in OpenAPI spec');
        done();
      });
    });
  });
  describe('DELETE HTTP method for all paths', function () {
    it('should throw an error for /v1/sales/summary-sales', function (done) {
      chai.request(baseURL)
      .delete('/v1/sales/summary-sales?businessIds=7047,6925&businessDays=2019-05-29&include=aspects.mealPeriods')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'DELETE\' method defined for path \'/v1/sales/summary-sales\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses', function (done) {
      chai.request(baseURL)
      .delete('/v1/core/businesses')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'DELETE\' method defined for path \'/v1/core/businesses\' in OpenAPI spec');
        done();
      });
    });
    it('should throw an error for /v1/core/businesses/{buisnessIds}', function (done) {
      chai.request(baseURL)
      .delete('/v1/core/businesses/7047')
      .end(function(err,res){
        const assertion = () => expect(res).to.not.satisfyApiSpec;
        expect(assertion).to.throw('No \'DELETE\' method defined for path \'/v1/core/businesses/{businessIds}\' in OpenAPI spec');
        done();
      });
    });
  });
});
