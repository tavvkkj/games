/**
 * CoolGames SDK config. Do not change the values!
 */
var enableAds = false;
var adChannel = "hallpass_0001-battleship";
var adFreq = "AD-FREQ";
var adId = "AD-SET";
var firstAd = "FIRST-AD";
var partner = "PARTNER";
var preroll = "PRE-SET";

/**
 * CoolGames game config. Will be provided
 */
var gameName = "Battleship";
var gameCategory = "Strategy";
var developerId = "";
var gameCode = "0001-battleship";

/**
 * Load SDK
 * NOTE: path is relative and will work only after the game is published
//  */
// (function(w, d) {
//   w.Booster = w.Booster || {};
//   var s = d.createElement("script");
//   var p = d.getElementsByTagName("script")[0];
//   s.async = 1;
//   s.src = "https://cdn.games.mobinozer.com/shared/booster/staging/api.js";
//   // s.src = "/shared/booster/api.js";
//   s.setAttribute("id", "booster-api");
//   p.parentNode.insertBefore(s, p);
// })(window, document);

/**
 * Will be automatically called when SDK is loaded
 */
// Booster.ready = function() {
//   new Booster.Init({
//     orientation: "portrait"
//   });

//   adSense = new Booster.Ad({
//     channelID: adChannel
//   });

//   community = new Booster.Community({
//     position: 1,
//     gameCode: gameCode
//   });

//   analytics = new Booster.Analytics({
//     gameName: gameName,
//     gameId: gameCode,
//     gameCategory: gameCategory,
//     developer: developerId
//   });

//   moregames = new Booster.Moregames();

//   /**
//    * Start the game
//    */
//   Booster.onSplashFinishedEvent = function() {
//   	window.boosterReady = true;
//   };

window.boosterReady = true;

//   /**
//    * Add a game pause handler
//    */
//   Booster.onOpenTab = function() {

//   	console.log("booster-on-open-tab");
//   };

//   /**
//    * Add a game unpause handler
//    */
//   Booster.onCloseTab = function() {

//   	console.log("booster-on-close-tab");
//   };
// };

// window.RewardedVideoConfig = {
//   AdTech: {  
//     adtechZones: {   
//       mobile: "4103",
//          desktop: "4102"
//         
//     } 
//   },
//    HyperMx: {  
//     descriptor: {   
//       frameClass: "adFrame",
//          adClass: "hypermx",
//          width: 800,
//          height: 540  
//     },
//       distId: "80801205",
//       siteId: "coolgames" 
//   }
// }

