  /**
   * Custom agent prototype
   * @param {String} id
   * @constructor
   * @extend eve.Agent
   */
  function MainAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
  }

  // extend the eve.Agent prototype
  MainAgent.prototype = Object.create(eve.Agent.prototype);
  MainAgent.prototype.constructor = MainAgent;

  /**
   * Send a greeting to an agent
   * @param {String} to
   */
  MainAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
  };

  /**
   * Handle incoming greetings. This overloads the default receive,
   * so we can't use MainAgent.on(pattern, listener) anymore
   * @param {String} from     Id of the sender
   * @param {*} message       Received message, a JSON object (often a string)
   */
  MainAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');

    if (message.indexOf('Hello') === 0) {
      // reply to the greeting
      this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
    

  };
