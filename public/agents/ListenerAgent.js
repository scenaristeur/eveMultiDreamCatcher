  /**
   * Custom agent prototype
   * @param {String} id
   * @constructor
   * @extend eve.Agent
   */
   
  function ListenerAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	
	this.addListeners();
  }

  // extend the eve.Agent prototype
  ListenerAgent.prototype = Object.create(eve.Agent.prototype);
  ListenerAgent.prototype.constructor = ListenerAgent;

  /**
   * Send a greeting to an agent
   * @param {String} to
   */
  ListenerAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
  };

  /**
   * Handle incoming greetings. This overloads the default receive,
   * so we can't use ListenerAgent.on(pattern, listener) anymore
   * @param {String} from     Id of the sender
   * @param {*} message       Received message, a JSON object (often a string)
   */
  ListenerAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');

    if (message.indexOf('Hello') === 0) {
      // reply to the greeting
      this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
    

  };
  
  ListenerAgent.prototype.addListeners=function(){
	  		// when the client clicks SEND
			
			var me=this;
		$('#datasend').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			// tell server to execute 'sendchat' and send along one parameter
			//socket.emit('sendchat', message);
			data={ action:"emit",
				channel:"sendchat",
				data:message
				};
			me.send('socketAgent', "Hello Socket");
			me.send('socketAgent', data);

		});

		// when the client hits ENTER on their keyboard
		$('#data').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#datasend').focus().click();
			}
		});
	  
	  
	  };
	  

