const EventEmmiter = require('events');

class TestApplication extends EventEmmiter{
    loadApplication(message){
        console.log(message);
        this.emit('loadApplication', 'Finished!');
    }
}
module.exports = TestApplication;