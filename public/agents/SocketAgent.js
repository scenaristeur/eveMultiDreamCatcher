/**
	* Custom agent prototype
	* @param {String} id
	* @constructor
	* @extend eve.Agent
*/
function SocketAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
	this.socket= io.connect();
	
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	this.initSocket();
}

// extend the eve.Agent prototype
SocketAgent.prototype = Object.create(eve.Agent.prototype);
SocketAgent.prototype.constructor = SocketAgent;

/**
	* Send a greeting to an agent
	* @param {String} to
*/
SocketAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
	* Handle incoming greetings. This overloads the default receive,
	* so we can't use SocketAgent.on(pattern, listener) anymore
	* @param {String} from     Id of the sender
	* @param {*} message       Received message, a JSON object (often a string)
*/
SocketAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
	
	
	console.log(message);
	switch(message.action) {
		case "emit":
        console.log(message.data);
		this.socket.emit(message.channel,message.data);
		
        break;
		
		default:
        console.log("non traite par "+this);
		console.log(message);
		/*  if (message.indexOf('Hello') === 0) {
			// reply to the greeting
			this.send(from, 'Hi ' + from + ', nice to meet you!');
		}*/
		
		
	}
};

SocketAgent.prototype.getSocket = function(){
	return this.socket;
};

SocketAgent.prototype.initSocket=function(){
	var me=this;
	switchRoom=function(room){
		me.socket.emit('switchRoom', room);
	}
	
	
	me.socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		me.socket.emit('adduser', prompt("What's your name?"));
	});
	
	// listener, whenever the server emits 'updatechat', this updates the chat body
	me.socket.on('updatechat', function (username, data) {
		$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});
	console.log(me);
	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	me.socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});
	
};

SocketAgent.prototype.switchRoom=function(room){
	this.socket.emit('switchRoom', room);
}
