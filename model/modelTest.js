// ModelTest constructor
// a test is an object with a name, an input, an output, and a function.
class ModelTest {
  constructor(testName, testInputs, testOutput, testFunction) {
    if (typeof testName != 'string') {
      throw new Error('tests require a string Name');
    } else if (!Array.isArray(testInputs)) {
      throw new Error('test inputs must be stored within an array');
    } else if (typeof testFunction != 'function') {
      throw new Error('tests require a testing function');
    }
    this._name = testName;
    this._testInputs = testInputs;
    this._testOutput = testOutput;
    this._testFunction = testFunction;
  }
  get Name() {
    return this._name;
  }
  runTestVerbose() {
    if(JSON.stringify(this._testFunction(...this._testInputs)) != JSON.stringify(this._testOutput)) {
      throw new Error(this._name + " failed");
    } else {
      console.log(this._name + " succeeded");
    }
  }
  runTest() {
    if(JSON.stringify(this._testFunction(...this._testInputs)) != JSON.stringify(this._testOutput)) {
      throw new Error(this._name + " failed");
    }
  }
}

let modelTestArr = [];
function runAllModelTests() {
  for(let i=0; i<modelTestArr.length; i++) {
    modelTestArr[i].runTest();
  }
  console.log('All test passed')
}
function runAllModelTestsVerbose() {
  for(let i=0; i<modelTestArr.length; i++) {
    modelTestArr[i].runTestVerbose();
  }
  console.log('All test passed')
}
