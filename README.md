# Gauge tests for Bahmni NDHM compliance

Functional tests for the NDHM compliance feature of Bahmni.

# Pre-requisites
* [Node-js](https://nodejs.org/en/)
* [Gauge](https://docs.getgauge.io/installing.html)
* Install Taiko `npm install -g taiko`

# Execution
* npm install
* `gauge run --env ci --tags 'core' specs -v`
> `--tags` allows us to choose the tests to run from the test suite. 
    In this command we are running only the `Bahmni core product` tests from the test suite. 

> `--env` allows us to change the environment parameter as per the requirement. 

> The HTML reports can be found in `./reports/html-report` after the run.
