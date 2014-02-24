"use strict";angular.module("batuApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("batuApp").controller("MainCtrl",["$scope",function(a){var b=localStorage.getItem("videoCollection");a.videoCollection=b?JSON.parse(b):[{name:"Rhythm",link:"t1DZfMfJ63M",start:0,level:0,group:"Samba Reggae"},{name:"#1",link:"7rEyS90qpDk",start:3,level:0,group:"Samba Reggae"},{name:"#2",link:"eCuYHYdLc_s",start:3,level:0,group:"Samba Reggae"},{name:"#3",link:"IbC5kEUIgF4",start:3.2,level:0,group:"Samba Reggae"},{name:"#4",link:"IvLXoWs00Rs",start:3.3,level:0,group:"Samba Reggae"},{name:"#5",link:"nNRm_SVo86k",start:3.3,level:0,group:"Samba Reggae"},{name:"#6",link:"weM6f7ctNXw",start:1,level:0,group:"Samba Reggae"},{name:"#7",link:"2zzzRiy7L4Y",start:3,level:0,group:"Samba Reggae"},{name:"#8",link:"ie_t_uJTibA",start:3.3,level:0,group:"Samba Reggae"},{name:"Rhythm",link:"50n0xLkV9Mo",start:0,level:0,group:"Reggae"},{name:"#1",link:"abJh99APBaA",start:3,level:0,group:"Reggae"},{name:"#2",link:"qm-UvTyLN-E",start:3,level:0,group:"Reggae"},{name:"Rhythm",link:"5d47OFYeb-g",start:0,level:0,group:"Rumba"},{name:"#1",link:"9ncjTGtMe20",start:3,level:0,group:"Rumba"},{name:"#2",link:"qRsHZaeIOi4",start:3,level:0,group:"Rumba"},{name:"Rhythm",link:"_tVO56JlUxs",start:0,level:0,group:"Raggamuffin"},{name:"#1",link:"rar-4aSxGYA",start:3,level:0,group:"Raggamuffin"},{name:"#2",link:"VDZBlD8O6Ys",start:3,level:0,group:"Raggamuffin"},{name:"#3",link:"RBWNcaVV_8M",start:3,level:0,group:"Raggamuffin"},{name:"#4",link:"oAmaXFqRAIQ",start:1,level:0,group:"Raggamuffin"},{name:"Rhythm",link:"FSJGTKDc114",start:0,level:0,group:"3:2"},{name:"#1",link:"OxAVUPt-Wi8",start:3,level:0,group:"3:2"},{name:"#2",link:"2WlFXCWJcWg",start:2,level:0,group:"3:2"},{name:"#3",link:"O7_rwXjkLzA",start:3,level:0,group:"3:2"},{name:"#4",link:"AjIq4s8m2WU",start:3,level:0,group:"3:2"},{name:"#5",link:"FU2L-U9ky44",start:3,level:0,group:"3:2"},{name:"#6",link:"IzSZO7JTqhE",start:3,level:0,group:"3:2"},{name:"Rhythm",link:"OuuvDFOEBKU",start:0,level:0,group:"Timbalada"},{name:"#1",link:"AVuHBHYFV_8",start:3,level:0,group:"Timbalada"},{name:"#2",link:"NWF1521xMb4",start:3,level:0,group:"Timbalada"},{name:"#1",link:"gEMcKbgZ0No",start:0,level:0,group:"Samba de Roda"}],a.groupedCollection=_.groupBy(a.videoCollection,"group")}]).directive("youtube",function(){return{restrict:"E",template:'<div id="youtubeWrapper"><h3 id="timer" data-ng-hide="timer == 0">Starting video in {{timer}}s</h3><div id="ytplayer"></div><p class="buttonSet"><a class="btn btn-lg btn-success" data-ng-click="currentVideo.level = 1;nextVideo()">Got it!</a><a class="btn btn-lg btn-danger" data-ng-click="currentVideo.level = -1;nextVideo()">Mark as Tough</a><a id="clear" class="btn btn-lg btn-primary" data-ng-click="clearHistory()">Clear Practice History</a></p></div>',scope:{videos:"="},controller:["$scope","$element","$timeout",function(a,b,c){function d(){var b=function(){a.timeOutPromise=c(function(){a.timer>0?(a.timer--,a.$apply(),b()):a.player.seekTo(a.currentVideo.start).playVideo()},1e3)};a.player.seekTo(.1).pauseVideo(),b()}function e(b){0==b.data&&a.nextVideo()}a.nextVideo=function(){localStorage.setItem("videoCollection",JSON.stringify(a.videos)),c.cancel(a.timeOutPromise);var b=a.getRandomVideo();a.timer=15,a.player.loadVideoById(b.link),d()},a.clearHistory=function(){for(var b=0;b<a.videos.length;b++){var c=a.videos[b];c.level=0}localStorage.removeItem("videoCollection")},a.getRandomVideo=function(){var a=0,b=!1;for(this.currentVideo=this.videos[Math.floor(Math.random()*this.videos.length)];this.currentVideo.skill>0&&0==b;)this.currentVideo=this.videos[Math.floor(Math.random()*this.videos.length)],a++,a!==this.videos.length&&(b=!0);return this.currentVideo},a.onYoutubeReady=function(){a.currentVideo=a.getRandomVideo(),a.player=new YT.Player("ytplayer",{videoId:a.currentVideo.link,playerVars:{modestbranding:1,wmode:"opaque"},events:{onReady:d,onStateChange:e}})}}],link:function(a){a.timer=15;var b=document.createElement("script"),c=document.getElementsByTagName("script")[0];b.src="https://www.youtube.com/player_api",c.parentNode.insertBefore(b,c),window.onYouTubePlayerAPIReady=a.onYoutubeReady}}});