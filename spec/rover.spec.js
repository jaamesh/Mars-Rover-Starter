const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let rvPosition = 5;
  let rover = new Rover(rvPosition);
  let name = "Test message with two commands";
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message(name, commands);

  test("constructor sets position and default values for mode and generatorWatts", () => {
    expect(rover.position === rvPosition && rover.mode === "NORMAL" && rover.generatorWatts === 110).toBe(true);
  });

  test("response returned by receiveMessage contains the name of the message", () => {
    expect(rover.receiveMessage(message).message === message.name).toBe(true);
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    expect(rover.receiveMessage(message).results.length === message.commands.length).toBe(true);
  });

  test("responds correctly to the status check command", () => {
    let response = rover.receiveMessage(new Message("Give status check", [new Command('STATUS_CHECK')]));
    expect(response.results[0].roverStatus.mode === rover.mode && response.results[0].roverStatus.generatorWatts === rover.generatorWatts && response.results[0].roverStatus.position === rover.position).toBe(true);
  });
  
  test("responds correctly to the mode change command", () => {
    let response = rover.receiveMessage(new Message("Let's change mode", [new Command('MODE_CHANGE', 'LOW_POWER')]));
    let checkLowPower = response.results[0].completed && rover.mode === "LOW_POWER";
    response = rover.receiveMessage(new Message("Let's change mode", [new Command('MODE_CHANGE', 'NORMAL')]));
    let checkNormal = response.results[0].completed && rover.mode === "NORMAL";
    response = rover.receiveMessage(new Message("Let's try a bad mode", [new Command('MODE_CHANGE', 'GROOT')]));
    let checkBadMode = response.results[0].completed && rover.mode === "GROOT";
    expect(checkLowPower && checkNormal && !checkBadMode).toBe(true);
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let response = rover.receiveMessage(new Message("Let's move", [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', rvPosition)]));
    response = rover.receiveMessage(new Message("Let's go to low power", [new Command('MODE_CHANGE', 'LOW_POWER')]));
    response = rover.receiveMessage(new Message("Let's move", [new Command('MOVE', 11)]));
    expect(!response.results[0].completed && rover.position === rvPosition).toBe(true);
  });

  test("responds with the position for the move command", () => {
    let response = rover.receiveMessage(new Message("Let's move", [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', rvPosition + 11)]));
    expect(response.results[0].completed && rover.position === rvPosition + 11).toBe(true);
  });
  
  
});
