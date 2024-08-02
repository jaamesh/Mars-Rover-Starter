class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
  isEqual(command) {
    return command.commandType === this.commandType && command.value === this.value;
  }

 }
 
 module.exports = Command;