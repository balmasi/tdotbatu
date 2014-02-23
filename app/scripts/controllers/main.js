'use strict';

angular.module('batuApp')
  .controller('MainCtrl', function ($scope) {
    $scope.videoCollection = [
        { link: "0KSOMA3QBU0", start: 30 },
        { link: "hHimjVYsd6I", start: 20},
        { link: "kHue-HaXXzg", start: 10 },

//      { link: "t1DZfMfJ63M", start: 0 },
//      { link: "7rEyS90qpDk", start: 0 },
//      { link: "eCuYHYdLc_s", start: 0 },
//      { link: "IbC5kEUIgF4", start: 0 },
//      { link: "IvLXoWs00Rs", start: 0 },
//      { link: "nNRm_SVo86k", start: 0 },
//      { link: "weM6f7ctNXw", start: 0 },
//      { link: "2zzzRiy7L4Y", start: 0 },
//      { link: "ie_t_uJTibA", start: 0 },
//      { link: "50n0xLkV9Mo", start: 0 },
//      { link: "abJh99APBaA", start: 0 },
//      { link: "qm-UvTyLN-E", start: 0 },
//      { link: "5d47OFYeb-g", start: 0 },
//      { link: "9ncjTGtMe20", start: 0 },
//      { link: "qRsHZaeIOi4", start: 0 },
//      { link: "n7ogS7chMis", start: 0 },
//      { link: "_tVO56JlUxs", start: 0 },
//      { link: "rar-4aSxGYA", start: 0 },
//      { link: "VDZBlD8O6Ys", start: 0 },
//      { link: "RBWNcaVV_8M", start: 0 },
//      { link: "oAmaXFqRAIQ", start: 0 },
//      { link: "FSJGTKDc114", start: 0 },
//      { link: "OxAVUPt-Wi8", start: 0 },
//      { link: "2WlFXCWJcWg", start: 0 },
//      { link: "O7_rwXjkLzA", start: 0 },
//      { link: "AjIq4s8m2WU", start: 0 },
//      { link: "FU2L-U9ky44", start: 0 },
//      { link: "IzSZO7JTqhE", start: 0 },
//      { link: "OuuvDFOEBKU", start: 0 },
//      { link: "AVuHBHYFV_8", start: 0 },
//      { link: "NWF1521xMb4", start: 0 },
//      { link: "gEMcKbgZ0No", start: 0 }
    ];

  }).directive('youtube',function(){
    return {
      restrict: 'E',
      template:'<h1>{{timer}}</h1><div id="ytplayer"></div>',
      scope: {
        videos: "="
      },
      controller: function($scope, $element, $timeout) {
        function onPlayerReady(e) {
          var timerClick = function(){
            $timeout(function() {
              if ($scope.timer > 0 ) {
                $scope.timer--;
                console.log($scope.timer);
                $scope.$apply();
                timerClick();
              }
              else{
                onTimeEnd();
              }
            } , 1000);
          };
          var onTimeEnd = function(){
            $scope.player.seekTo($scope.currentVideo.start).playVideo();
          };

          $scope.player.seekTo(0.5).pauseVideo();
          timerClick();
        }

        $scope.getRandomVideo = function(){
          this.currentVideo =  this.videos[Math.floor(Math.random()* this.videos.length)];
          return this.currentVideo;
        };

        $scope.onYoutubeReady= function () {
          $scope.player = new YT.Player('ytplayer', {
            videoId: $scope.getRandomVideo().link,
            events: {
              'onReady': onPlayerReady
            }
          });
        };
      },

      link: function(scope, element, attr){
        scope.timer = 10;

        var tag = document.createElement('script');
        var firstScriptTag = document.getElementsByTagName('script')[0];
        tag.src = "https://www.youtube.com/player_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = scope.onYoutubeReady;
      }
    }
  });
