var SocialMention, idoit, ___GLOBALS = [];
/**
 *  @author deveedutta@gmail.com
 *  @source github.com/deveedutta
 *  @brief closure enclosing the self-authored SocialMention JS plugin
 *  @license private
 *  @warning SocialMention, idoit, ___GLOBALS are global values and 
 *  should not be altered/used/tampered elsewhere in the app. And, 
 *  the callback function's name is I-do-it, not IDIOT.
 */
(function(win, doc){
	var abbrv
	//Event Sp.
	, ael    = "addEventListener"
	, rel    = "removeListener"
	, trgr   = "trigger"
	
	//DOM Sp.
	, body   = doc.body
	, ael    = "appendChild"
	, cel    = "createElement"
	, pel    = "parentElement"
	, gid    = "getElementById"
	, gtg    = "getElementsByTagName"
	, qs     = "querySelector"
	, qsa    = "querySelectorAll"
	, oh     = "offsetHeight"
	, ow     = "offsetWidth"
	, sty    = "style"
	, sto    = "setTimeout"
	, cto    = "clearTimeout"
	
	//Math, Strings
	, M      = Math
	, flr    = "floor"
	, tstr   = "toString"
	, iof    = "indexOf"
	, tlc    = "toLowerCase"
	, jn     = "join"
	, slc    = "slice"
	, splt   = "split"
	, cat    = "charAt"
	
	//Object, Prop.
	, apl    = "apply"
	, call   = "call"
	, hop    = "hasOwnProperty"
	, prot   = "prototype"
	
	//Plugin Specific
	, _response = null
	;
	function initrequest() {
		var options  = this.options
		, _req       = doc[cel]("script");
		
		this.callbackflag = true;
		
		//Query  : url encoded query terms 
		this.query   =  (function(query){
			query = query.length && query[iof](" ") && query[splt](" ")[jn]("+");
			// console.log("query", query);
			return query;
		})(this.query || options.query);
		
		
		
		//Format : { json, php, xml, rss, csv }
		this.format   = (function(format){
			return format && format[tlc] || "json";
		})(this.format || options.format)
		
		
		
		//Language: set to null to avoid troublesome UNICODE
		//this.language = options.language || "fr";
		this.language = "null";
		
		
		
		//Search Type { blogs, microblogs, bookmarks, comments, events, images, news, videos, audio, questions, networks, all }
		//Type :  Comman Separated Values String
		this.searchType = this.searchType || options.searchType;
		this.searchtype = (function(searchtypes){
			searchtypes = "," + searchtypes;
			searchtypes = searchtypes.split(",").join("&t[]=");
			// console.log("searchtypes", searchtypes);
			return searchtypes;
		})(this.searchType);
		
		//Source { twitter, youtube}
		//Type :  Comman Separated Values String
		this.source  = this.source || options.source;
		this.sources = (function(sources){
			sources = "," + sources;
			sources = sources.split(",").join("&src[]=");
			// console.log("sources", sources);
			return sources;
		})(this.source);
		
		
		
		//Callback Function name: Type String
		this.callback = this.callback || options.callback || "";
		
		
		_req.src = [
			this.URL,
			"?q=",
			this.query,
			"&f=",
			this.format,
			this.searchtype,
			this.sources,
			"&lang=",
			this.language,
			"&callback=idoit"
		].join("");
		body[ael](_req);
		_req.onload = function(){
			// window.console && console.log("social-mention response loaded");
		}
	}
	function SocialMention(options){
		this.id = Math.round(new Date().valueOf() * Math.random()) + "";
		this.options = options;
		var _path = initrequest.call(this);

		___GLOBALS.push(this);
	}
	
	//PS: this function's name is not IDIOT
	
	SocialMention.prototype = {
		// URL           : "http://socialmention.com/search",
		URL           : "http://localhost/project/hacker-earth/response.html",
		callback      : "", 
		callbackflag  : false, 
		format        : null,
		id            : null,
		query         : null,
		response      : null,
		searchType    : null,
		initRequest   : function(){
			initrequest.call(this);
		},
		reinitRequest : function(){
			initrequest.call(this);
		},
	}
	function idoit ( info ) {
		for(var i=0; i < ___GLOBALS.length; i++){
			// console.log("___GLOBALS[i]", ___GLOBALS[i].id, "flag", ___GLOBALS[i].callbackflag);
			if(___GLOBALS[i].callbackflag === true){
				window[___GLOBALS[i].callback](info);
				___GLOBALS[i].callbackflag = false;
			}
		}
	}
	
	win.idoit         = idoit;
	win.SocialMention = SocialMention;
})(this, document);

/******************************************************************************
 *  
 * END OF PLUGIN : USER CODE COMES NEXT
 *
*******************************************************************************/

	function myCallBack(data){
		// USE any free plugin to render templates here
		var div = document.getElementById("results");
		var item = data.items;
		var str = "";
		for(var i=0; i<item.length; i++){
		var items = item[i];
		console.log(items);
			str += [
				"<div class='result clearfix'>",
					"<div class='icon'>",
						"<img class='icon sentiment' title='Sentiment: 0 (neutral)' ",
							"src='img/sentiment_neutral.png' height='16' width='16'>",
						"<img class='icon' src='",
						items.favicon,
						"' height='16' width='16'>",
					"</div>",
					"<div class='body'>",
						"<h3>",
							"<a ",
								"href='",
								items.link,
								"' target='_blank' title='",
								items.description.slice(0, 100),
								"'>",
								items.description.slice(0, 100) || "No Text",
							"</a>",
						"</h3>",
						"<div class='description'>",
						// items.description,
						"</div>",
					"<div class='info'>",
						"<p>",
							"<a href=",
								"'",
								items.user_link,
								"'",
								" target='_blank' class='link'>",
								items.user_link,
							"</a>",
							"<br />",
							// 59 seconds ago - by ,
							"<img src=",
							"'",
							items.user_image || "",
							"'",
							" class='user_image'>",
							// @nakata____ on ,
							"<a href='http://",
							items.domain,
							"'>",
							items.domain,
							"</a>",
						"</p>",
					"</div>",
			"</div>",
		"</div>"
		].join("");
	}
	div.innerHTML = str;
	}
	
	//searchType = { blogs, microblogs, bookmarks, comments, events, images, news, videos, audio, questions, networks, all }	
	var options = {
		query          : "iphone apps",
		responseFormat : "JSON",
		searchType     : "blogs",
		source         : "twitter",
		callback       : "myCallBack",
	};
	var search = new SocialMention(options);
	search.initRequest();
	
	
	//Altering request params
	search.searchType = "blogs,microblogs";
	search.source     = "twitter,youtube";
	search.reinitRequest();