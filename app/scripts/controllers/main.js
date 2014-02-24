'use strict';

angular.module('batuApp')
  .controller('MainCtrl', function ($scope) {
    $scope.videoCollection = [
      { name: "Rhythm", link: "t1DZfMfJ63M", start: 0, level: 0, group: "Samba Reggae"},
      { name: "#1", link: "7rEyS90qpDk", start: 3, level: 0, group: "Samba Reggae" },
      { name: "#2", link: "eCuYHYdLc_s", start: 3, level: 0, group: "Samba Reggae" },
      { name: "#3", link: "IbC5kEUIgF4", start: 3.2, level: 0, group: "Samba Reggae" },
      { name: "#4", link: "IvLXoWs00Rs", start: 3.3, level: 0, group: "Samba Reggae" },
      { name: "#5", link: "nNRm_SVo86k", start: 3.3, level: 0, group: "Samba Reggae" },
      { name: "#6", link: "weM6f7ctNXw", start: 1, level: 0, group: "Samba Reggae" },
      { name: "#7", link: "2zzzRiy7L4Y", start: 3, level: 0, group: "Samba Reggae" },
      { name: "#8", link: "ie_t_uJTibA", start: 3.3, level: 0, group: "Samba Reggae" },
      { name: "Rhythm", link: "50n0xLkV9Mo", start: 0, level: 0, group: "Reggae" },
      { name: "#1", link: "abJh99APBaA", start: 3, level: 0, group: "Reggae" },
      { name: "#2", link: "qm-UvTyLN-E", start: 3, level: 0, group: "Reggae" },
      { name: "Rhythm", link: "5d47OFYeb-g", start: 0, level: 0, group: "Rumba" },
      { name: "#1", link: "9ncjTGtMe20", start: 3, level: 0, group: "Rumba" },
      { name: "#2", link: "qRsHZaeIOi4", start: 3, level: 0, group: "Rumba" },
      { name: "Rhythm", link: "_tVO56JlUxs", start: 0, level: 0, group: "Raggamuffin" },
      { name: "#1", link: "rar-4aSxGYA", start: 3, level: 0, group: "Raggamuffin" },
      { name: "#2", link: "VDZBlD8O6Ys", start: 3, level: 0, group: "Raggamuffin" },
      { name: "#3", link: "RBWNcaVV_8M", start: 3, level: 0, group: "Raggamuffin" },
      { name: "#4", link: "oAmaXFqRAIQ", start: 1, level: 0, group: "Raggamuffin" },
      { name: "Rhythm", link: "FSJGTKDc114", start: 0, level: 0, group: "3:2" },
      { name: "#1", link: "OxAVUPt-Wi8", start: 3, level: 0, group: "3:2" },
      { name: "#2", link: "2WlFXCWJcWg", start: 2, level: 0, group: "3:2" },
      { name: "#3", link: "O7_rwXjkLzA", start: 3, level: 0, group: "3:2" },
      { name: "#4", link: "AjIq4s8m2WU", start: 3, level: 0, group: "3:2" },
      { name: "#5", link: "FU2L-U9ky44", start: 3, level: 0, group: "3:2" },
      { name: "#6", link: "IzSZO7JTqhE", start: 3, level: 0, group: "3:2" },
      { name: "Rhythm", link: "OuuvDFOEBKU", start: 0, level: 0, group: "Timbalada" },
      { name: "#1", link: "AVuHBHYFV_8", start: 3, level: 0, group: "Timbalada" },
      { name: "#2", link: "NWF1521xMb4", start: 3, level: 0, group: "Timbalada" },
      { name: "#1", link: "gEMcKbgZ0No", start: 0, level: 0, group: "Samba de Roda" }]

    $scope.groupedCollection = _.groupBy($scope.videoCollection, 'group');

  }).directive('youtube',function(){
    return {
      restrict: 'E',
      template:
        '<div id="youtubeWrapper">' +
          '<h3 id="timer" data-ng-hide="timer == 0">Starting video in {{timer}}s</h3>'+
          '<div id="ytplayer"></div>' +
          '</div>'+
          '<p class="buttonSet">' +
          '<a class="btn btn-lg btn-success" data-ng-click="currentVideo.level = 1;nextVideo()">Got it!</a>' +
          '<a class="btn btn-lg btn-danger" data-ng-click="currentVideo.level = -1;nextVideo()">Mark as Tough</a>' +
          '</p>',
      scope: {
        videos: "="
      },
      controller: function($scope, $element, $timeout) {

        function startVideo(){
          var timerClick = function(){
            $timeout(function() {
              if ($scope.timer > 0 ) {
                $scope.timer--;
                $scope.$apply();
                timerClick();
              }
              else{
                $scope.player.seekTo($scope.currentVideo.start).playVideo();
              }
            } , 1000);
          };

          $scope.player.seekTo(0.1).pauseVideo();
          timerClick();
        }

        function nextIfFinished(e){
          if (e.data == 0){
            $scope.nextVideo();
          }
        }

        $scope.nextVideo = function() {
          var nextVideo = $scope.getRandomVideo();
          $scope.timer = 15;
          $scope.player.loadVideoById(nextVideo.link);
          startVideo();
        };

        $scope.getRandomVideo = function(){
          var numWatchedChecked = 0,
            exhaustedList = false;

          this.currentVideo =  this.videos[Math.floor(Math.random()* this.videos.length)];

          while ( this.currentVideo.skill > 0 && exhaustedList == false) {
            this.currentVideo =  this.videos[Math.floor(Math.random()* this.videos.length)];
            numWatchedChecked++;

            if (numWatchedChecked !== this.videos.length) exhaustedList = true;
          }

          return this.currentVideo;
        };

        $scope.onYoutubeReady= function () {
          $scope.currentVideo = $scope.getRandomVideo();
          $scope.player = new YT.Player('ytplayer', {
            videoId: $scope.currentVideo.link,
            playerVars: {
              modestbranding: 1,
              wmode: "opaque"
            },
            events: {
              'onReady': startVideo,
              'onStateChange': nextIfFinished
            }
          });

        };
      },

      link: function(scope, element, attr){
        scope.timer = 15;
        var tag = document.createElement('script');
        var firstScriptTag = document.getElementsByTagName('script')[0];
        tag.src = "https://www.youtube.com/player_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = scope.onYoutubeReady;
      }
    }
  });
