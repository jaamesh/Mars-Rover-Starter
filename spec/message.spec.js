const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    let name = "Test message with two commands";
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];

    it("throws error if name is NOT passed into constructor as the first parameter", function() {
      expect( function() { new Message();}).toThrow(new Error('Name required.'));
    });
  
    test("constructor sets name", () => {
      expect(new Message(name).name).toBe(name);
    });
  
    test("contains a commands array passed into the constructor as the 2nd argument", () => {
      let message = new Message(name, commands);
        expect(message.commands.length === commands.length && commands.every(function(element, i) {
            return element.isEqual(message.commands[i]); 
        })).toBe(true)
    });
    
});
