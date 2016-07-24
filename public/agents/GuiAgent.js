/**
	* Custom agent prototype
	* @param {String} id
	* @constructor
	* @extend eve.Agent
*/
function GuiAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
	
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	
	//prepare l'affichage
    this.makeUi();
}

// extend the eve.Agent prototype
GuiAgent.prototype = Object.create(eve.Agent.prototype);
GuiAgent.prototype.constructor = GuiAgent;

/**
	* Send a greeting to an agent
	* @param {String} to
*/
GuiAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
	* Handle incoming greetings. This overloads the default receive,
	* so we can't use GuiAgent.on(pattern, listener) anymore
	* @param {String} from     Id of the sender
	* @param {*} message       Received message, a JSON object (often a string)
*/
GuiAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
	
    if (message.indexOf('Hello') === 0) {
		// reply to the greeting
		this.send(from, 'Hi ' + from + ', nice to meet you!');
	}
    
	
};

GuiAgent.prototype.makeUi = function(){
    
    ////////////////////////////////////////////////
    //CHAT
    ////////////////////////////////////////////////
    var roomsBlock = document.createElement("DIV");
	roomsBlock.style="float:left;width:100px;border-right:1px solid black;height:300px;padding:10px;overflow:scroll-y;"
	// roomsBlock.className = "rooms";
    document.body.appendChild(roomsBlock);
	
	var roomtitle=document.createElement("B");
	roomtitle.innerHTML="ROOMS";
	roomsBlock.appendChild(roomtitle);
	
	var roomsDiv=document.createElement("DIV");
	roomsDiv.setAttribute("id","rooms");
	roomsBlock.appendChild(roomsDiv);
	
	var convBlock = document.createElement("DIV");
	convBlock.style="float:left;width:300px;height:250px;overflow:scroll-y;padding:10px;";
	// roomsBlock.className = "rooms";
    document.body.appendChild(convBlock);
	
	var convDiv = document.createElement("DIV");
	convDiv.setAttribute("id","conversation");
    convBlock.appendChild(convDiv);
	
	var convInput = document.createElement("INPUT");
	convInput.setAttribute("id","data");
	convInput.style="width:200px;";
    convBlock.appendChild(convInput);
	
	var datasendBtn = document.createElement("INPUT");
	datasendBtn.setAttribute("id","datasend");
	datasendBtn.type="button";
	datasendBtn.value="send";
    convBlock.appendChild(datasendBtn);
};
