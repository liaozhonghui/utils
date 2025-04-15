const cause = new Error("The remote HTTP server responded with a 500 status");
const symptom = new Error("The message failed to send", { cause });

console.error(symptom);
