const myObject = {
  name: "myObject",
  message: "This is a custom error message",
  code: -2,
};
Error.captureStackTrace(myObject);
const v = myObject.stack; // Similar to `new Error().stack`
console.log(v);
