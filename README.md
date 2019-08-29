# avero-sdet-challenge

This is a minimal example for a code test for Avero. The ask was to verify that the API contact was upheld as advertised by the OpenAPI specification. The following API endpoints have been contract tested:
  * `/v1/core/businesses`
  * `/v1/core/businesses/{businessIds}`
  * `/v1/sales/summary-sales`

:warning: This is only testing the contract beween the spec and what the API actually returns. This is in no way meant to be a functional test suite. :warning:

## Getting Started

These instructions will get you a copy of the project up and running the contract tests on your local machine.

### Prerequisites

* **Docker**: If you still need to install this, you might want to check out [the Docker documentation](https://docs.docker.com/install/).
* **NPM**: If you still need to install this, you might want to check out [NPM](https://www.npmjs.com/get-npm).
* Get a local copy of the repository and navigate to the project directory.

### Steps to run the mock Avero Public API and tests:

1. Run the script to setup the mock API and run the tests:
  ``` bash
    bin/setup.sh
  ```   
2. To just run the tests after setup run:
```bash
    npm test
```

## Issues/Discrepancies Found
### Bugs:
* The test to GET multiple businesses with comma separated ids fails. This is because the path is not defined for the OpenAPI spec. The api response returns with a 200
 and a decent response, but since the contract is not upheld, I have the test break.

## Improvements
* Make it so any baseurl can be passed along with the params so different environments can be tested.
* add more tests that test unhappy paths
* add a linter
* clean up code to make less repetitive

## Built With
* [Chai](https://www.chaijs.com/)
* [ChaiHTTP](https://www.chaijs.com/plugins/chai-http/)
* [Mocha](https://mochajs.org/)
* [Chai-openapi-response-validator](https://github.com/RuntimeTools/chai-openapi-response-validator)


## Author

* **Becca Vasil** - :cake:
