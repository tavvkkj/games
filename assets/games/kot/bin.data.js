
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }
  Module.expectedDataFileDownloads++;
  (function() {
   var loadPackage = function(metadata) {
  
      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'bin.data._.js';
      var REMOTE_PACKAGE_BASE = 'bin.data._.js';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
    
      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];
    
      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };
    
        var fetchedCallback = null;
        var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

        if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
          if (fetchedCallback) {
            fetchedCallback(data);
            fetchedCallback = null;
          } else {
            fetched = data;
          }
        }, handleError);
      
    function runWithFS() {
  
      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
  Module['FS_createPath']("/", "maps", true, true);

          /** @constructor */
          function DataRequest(start, end, audio) {
            this.start = start;
            this.end = end;
            this.audio = audio;
          }
          DataRequest.prototype = {
            requests: {},
            open: function(mode, name) {
              this.name = name;
              this.requests[name] = this;
              Module['addRunDependency']('fp ' + this.name);
            },
            send: function() {},
            onload: function() {
              var byteArray = this.byteArray.subarray(this.start, this.end);
              this.finish(byteArray);
            },
            finish: function(byteArray) {
              var that = this;
      
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);
  
              this.requests[this.name] = null;
            }
          };
      
              var files = metadata['files'];
              for (var i = 0; i < files.length; ++i) {
                new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
              }
      
        
      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        
          // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
    
            var files = metadata['files'];
            for (var i = 0; i < files.length; ++i) {
              DataRequest.prototype.requests[files[i].filename].onload();
            }
                Module['removeRunDependency']('datafile_bin.data._.js');

      };
      Module['addRunDependency']('datafile_bin.data._.js');
    
      if (!Module.preloadResults) Module.preloadResults = {};
    
        Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
        if (fetched) {
          processPackageData(fetched);
          fetched = null;
        } else {
          fetchedCallback = processPackageData;
        }
      
    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }
  
   }
   loadPackage({"files": [{"filename": "/tutorial_640_960.raw", "start": 0, "end": 519, "audio": 0}, {"filename": "/upgrades_infoplate_640_960.raw", "start": 519, "end": 594, "audio": 0}, {"filename": "/map_buttons_640_960.raw", "start": 594, "end": 7627, "audio": 0}, {"filename": "/bgr_door_fx.pb", "start": 7627, "end": 19073, "audio": 0}, {"filename": "/status_animations.pb", "start": 19073, "end": 33441, "audio": 0}, {"filename": "/rotate_artifact_640_960.raw", "start": 33441, "end": 44170, "audio": 0}, {"filename": "/gun_shot.pb", "start": 44170, "end": 55171, "audio": 0}, {"filename": "/obj_red_demon_view_02.pb", "start": 55171, "end": 78165, "audio": 0}, {"filename": "/exp_640_960.raw", "start": 78165, "end": 86382, "audio": 0}, {"filename": "/geffi_640_960.raw", "start": 86382, "end": 86577, "audio": 0}, {"filename": "/userinfo.pb", "start": 86577, "end": 87807, "audio": 0}, {"filename": "/char_anim.pb", "start": 87807, "end": 184394, "audio": 0}, {"filename": "/bgr_wall_cave_640_960.raw", "start": 184394, "end": 189059, "audio": 0}, {"filename": "/map_jungle_decor_640_960.raw", "start": 189059, "end": 195152, "audio": 0}, {"filename": "/retrieve_logs_02_640_960.raw", "start": 195152, "end": 195227, "audio": 0}, {"filename": "/obj_blue_demon_view_02.pb", "start": 195227, "end": 197515, "audio": 0}, {"filename": "/splash_zepto_640_960.raw", "start": 197515, "end": 199682, "audio": 0}, {"filename": "/eye_retual_640_960.raw", "start": 199682, "end": 200671, "audio": 0}, {"filename": "/decor_metro_640_960.raw", "start": 200671, "end": 207384, "audio": 0}, {"filename": "/totemius_640_960.raw", "start": 207384, "end": 209411, "audio": 0}, {"filename": "/button_top_640_960.raw", "start": 209411, "end": 209768, "audio": 0}, {"filename": "/strings.xml", "start": 209768, "end": 1508393, "audio": 0}, {"filename": "/inventory_640_960.raw", "start": 1508393, "end": 1508958, "audio": 0}, {"filename": "/char_anim_3.pb", "start": 1508958, "end": 1624074, "audio": 0}, {"filename": "/obj_blue_demon.pb", "start": 1624074, "end": 1625801, "audio": 0}, {"filename": "/result_eye_dust_640_960.raw", "start": 1625801, "end": 1626014, "audio": 0}, {"filename": "/lady_painsworth_640_960.raw", "start": 1626014, "end": 1627707, "audio": 0}, {"filename": "/obj_bat_640_960.raw", "start": 1627707, "end": 1628958, "audio": 0}, {"filename": "/logs_spares_640_960.raw", "start": 1628958, "end": 1629551, "audio": 0}, {"filename": "/obj_gravity.pb", "start": 1629551, "end": 1654980, "audio": 0}, {"filename": "/Single_Sleeve.ttf", "start": 1654980, "end": 1670832, "audio": 0}, {"filename": "/decor_forest_640_960.raw", "start": 1670832, "end": 1674691, "audio": 0}, {"filename": "/popup_cust_640_960.raw", "start": 1674691, "end": 1676018, "audio": 0}, {"filename": "/flash.pb", "start": 1676018, "end": 1697236, "audio": 0}, {"filename": "/trap_change_02_640_960.raw", "start": 1697236, "end": 1697821, "audio": 0}, {"filename": "/bgr_wall_ice_640_960.raw", "start": 1697821, "end": 1708074, "audio": 0}, {"filename": "/biff_640_960.raw", "start": 1708074, "end": 1708345, "audio": 0}, {"filename": "/obj_red_demon_view_03.pb", "start": 1708345, "end": 1740268, "audio": 0}, {"filename": "/Skranji_Regular.ttf", "start": 1740268, "end": 1948192, "audio": 0}, {"filename": "/roopa_640_960.raw", "start": 1948192, "end": 1948843, "audio": 0}, {"filename": "/KGWhattheTeacherWants.ttf", "start": 1948843, "end": 1996919, "audio": 0}, {"filename": "/obj_gun_homing_view_02.pb", "start": 1996919, "end": 2003882, "audio": 0}, {"filename": "/missions_640_960.raw", "start": 2003882, "end": 2009921, "audio": 0}, {"filename": "/bgr_door_640_960.raw", "start": 2009921, "end": 2018988, "audio": 0}, {"filename": "/little_totem_cust_640_960.raw", "start": 2018988, "end": 2020011, "audio": 0}, {"filename": "/gems_640_960.raw", "start": 2020011, "end": 2024252, "audio": 0}, {"filename": "/decor_ice_640_960.raw", "start": 2024252, "end": 2034845, "audio": 0}, {"filename": "/decor_presets_640_960.raw", "start": 2034845, "end": 2034920, "audio": 0}, {"filename": "/popup_mine_640_960.raw", "start": 2034920, "end": 2036495, "audio": 0}, {"filename": "/pross_upgrade_cust.pb", "start": 2036495, "end": 2065805, "audio": 0}, {"filename": "/special_gem_02.pb", "start": 2065805, "end": 2088639, "audio": 0}, {"filename": "/bgr_ground_jungle_640_960.raw", "start": 2088639, "end": 2097548, "audio": 0}, {"filename": "/leaderboards_640_960.raw", "start": 2097548, "end": 2097925, "audio": 0}, {"filename": "/obj_gun.pb", "start": 2097925, "end": 2100959, "audio": 0}, {"filename": "/event.pb", "start": 2100959, "end": 2293953, "audio": 0}, {"filename": "/shop_02_640_960.raw", "start": 2293953, "end": 2294784, "audio": 0}, {"filename": "/buttons_640_960.raw", "start": 2294784, "end": 2305285, "audio": 0}, {"filename": "/cell.pb", "start": 2305285, "end": 2333210, "audio": 0}, {"filename": "/missy_640_960.raw", "start": 2333210, "end": 2333789, "audio": 0}, {"filename": "/char_anim_640_960.raw", "start": 2333789, "end": 2339814, "audio": 0}, {"filename": "/splash_marker_640_960.raw", "start": 2339814, "end": 2339889, "audio": 0}, {"filename": "/popup_trap_640_960.raw", "start": 2339889, "end": 2347092, "audio": 0}, {"filename": "/popup_level.pb", "start": 2347092, "end": 2533063, "audio": 0}, {"filename": "/obj_gun_640_960.raw", "start": 2533063, "end": 2537326, "audio": 0}, {"filename": "/obj_mouse.pb", "start": 2537326, "end": 2543418, "audio": 0}, {"filename": "/obj_fly_view_02.pb", "start": 2543418, "end": 2548970, "audio": 0}, {"filename": "/orbeusus_640_960.raw", "start": 2548970, "end": 2549379, "audio": 0}, {"filename": "/popup_league.pb", "start": 2549379, "end": 2668956, "audio": 0}, {"filename": "/emperor_lurk.pb", "start": 2668956, "end": 2683346, "audio": 0}, {"filename": "/FuturaLTPro-MediumCond.otf", "start": 2683346, "end": 2731894, "audio": 0}, {"filename": "/change_traps_button.pb", "start": 2731894, "end": 2742219, "audio": 0}, {"filename": "/bgr_ground_metro_640_960.raw", "start": 2742219, "end": 2748120, "audio": 0}, {"filename": "/clutter_640_960.raw", "start": 2748120, "end": 2758249, "audio": 0}, {"filename": "/logs_640_960.raw", "start": 2758249, "end": 2758970, "audio": 0}, {"filename": "/auric.pb", "start": 2758970, "end": 2766809, "audio": 0}, {"filename": "/icons_640_960.raw", "start": 2766809, "end": 2809516, "audio": 0}, {"filename": "/obj_gun_homing.pb", "start": 2809516, "end": 2816479, "audio": 0}, {"filename": "/result_screen_02.pb", "start": 2816479, "end": 3076331, "audio": 0}, {"filename": "/obj_bat.pb", "start": 3076331, "end": 3086687, "audio": 0}, {"filename": "/red_whizbang.pb", "start": 3086687, "end": 3088767, "audio": 0}, {"filename": "/upgrade_process_640_960.raw", "start": 3088767, "end": 3090294, "audio": 0}, {"filename": "/valletta_640_960.raw", "start": 3090294, "end": 3090647, "audio": 0}, {"filename": "/obj_fly_view_03.pb", "start": 3090647, "end": 3099406, "audio": 0}, {"filename": "/obj_gun_homing_640_960.raw", "start": 3099406, "end": 3103681, "audio": 0}, {"filename": "/missions_animation.pb", "start": 3103681, "end": 3124342, "audio": 0}, {"filename": "/popup_trap_views_640_960.raw", "start": 3124342, "end": 3127085, "audio": 0}, {"filename": "/door.pb", "start": 3127085, "end": 3142936, "audio": 0}, {"filename": "/change_traps_02.pb", "start": 3142936, "end": 3169744, "audio": 0}, {"filename": "/obj_fly_640_960.raw", "start": 3169744, "end": 3174659, "audio": 0}, {"filename": "/bgr_wall_jungle_640_960.raw", "start": 3174659, "end": 3180266, "audio": 0}, {"filename": "/event_640_960.raw", "start": 3180266, "end": 3181513, "audio": 0}, {"filename": "/offers_640_960.raw", "start": 3181513, "end": 3182092, "audio": 0}, {"filename": "/pers_cust_interface_640_960.raw", "start": 3182092, "end": 3182441, "audio": 0}, {"filename": "/map_jungle_markers_640_960.raw", "start": 3182441, "end": 3182516, "audio": 0}, {"filename": "/processing_assets_640_960.raw", "start": 3182516, "end": 3186229, "audio": 0}, {"filename": "/gems.pb", "start": 3186229, "end": 3192478, "audio": 0}, {"filename": "/guild_battle_640_960.raw", "start": 3192478, "end": 3193209, "audio": 0}, {"filename": "/splash_640_960.jpeg", "start": 3193209, "end": 3194468, "audio": 0}, {"filename": "/door_640_960.raw", "start": 3194468, "end": 3195829, "audio": 0}, {"filename": "/char_anim_7.pb", "start": 3195829, "end": 3329172, "audio": 0}, {"filename": "/bgr_ground_cave_640_960.raw", "start": 3329172, "end": 3337083, "audio": 0}, {"filename": "/rastin_640_960.raw", "start": 3337083, "end": 3337336, "audio": 0}, {"filename": "/gpx.resources", "start": 3337336, "end": 3347736, "audio": 0}, {"filename": "/gold_640_960.raw", "start": 3347736, "end": 3349009, "audio": 0}, {"filename": "/emperor_lurk_640_960.raw", "start": 3349009, "end": 3349596, "audio": 0}, {"filename": "/guild_battle_castle_640_960.raw", "start": 3349596, "end": 3353375, "audio": 0}, {"filename": "/door_light_640_960.raw", "start": 3353375, "end": 3356780, "audio": 0}, {"filename": "/guild_battle.pb", "start": 3356780, "end": 3617210, "audio": 0}, {"filename": "/jace_640_960.raw", "start": 3617210, "end": 3617529, "audio": 0}, {"filename": "/map_cave_decor_640_960.raw", "start": 3617529, "end": 3632920, "audio": 0}, {"filename": "/attack_screen_640_960.raw", "start": 3632920, "end": 3632995, "audio": 0}, {"filename": "/biff.pb", "start": 3632995, "end": 3637154, "audio": 0}, {"filename": "/decor_fire_640_960.raw", "start": 3637154, "end": 3647739, "audio": 0}, {"filename": "/bgr_ground_ice_640_960.raw", "start": 3647739, "end": 3656602, "audio": 0}, {"filename": "/result_screen_objects.pb", "start": 3656602, "end": 3696167, "audio": 0}, {"filename": "/obj_red_demon.pb", "start": 3696167, "end": 3716229, "audio": 0}, {"filename": "/boosts_640_960.raw", "start": 3716229, "end": 3717408, "audio": 0}, {"filename": "/char_anim_4.pb", "start": 3717408, "end": 3780092, "audio": 0}, {"filename": "/door_ui_640_960.raw", "start": 3780092, "end": 3780167, "audio": 0}, {"filename": "/processing_ani.pb", "start": 3780167, "end": 3785277, "audio": 0}, {"filename": "/map_fire_markers_640_960.raw", "start": 3785277, "end": 3785352, "audio": 0}, {"filename": "/lock_640_960.raw", "start": 3785352, "end": 3787647, "audio": 0}, {"filename": "/info_plate_640_960.raw", "start": 3787647, "end": 3787846, "audio": 0}, {"filename": "/bgr_door_anim.pb", "start": 3787846, "end": 3790460, "audio": 0}, {"filename": "/little_gem_640_960.raw", "start": 3790460, "end": 3794139, "audio": 0}, {"filename": "/popup_trap.pb", "start": 3794139, "end": 3890512, "audio": 0}, {"filename": "/settings_640_960.raw", "start": 3890512, "end": 3890727, "audio": 0}, {"filename": "/obj_red_demon_640_960.raw", "start": 3890727, "end": 3898624, "audio": 0}, {"filename": "/obj_gravity_640_960.raw", "start": 3898624, "end": 3899605, "audio": 0}, {"filename": "/totem_head_640_960.raw", "start": 3899605, "end": 3900660, "audio": 0}, {"filename": "/upgrades_castle_640_960.raw", "start": 3900660, "end": 3902521, "audio": 0}, {"filename": "/upgrade_process.pb", "start": 3902521, "end": 3935638, "audio": 0}, {"filename": "/popup_gem_640_960.raw", "start": 3935638, "end": 3937331, "audio": 0}, {"filename": "/tap_fx.pb", "start": 3937331, "end": 3939850, "audio": 0}, {"filename": "/obj_gun_view_03.pb", "start": 3939850, "end": 3941618, "audio": 0}, {"filename": "/khalaad-al-arabeh_0.ttf", "start": 3941618, "end": 3990262, "audio": 0}, {"filename": "/bgr_ground_forest_640_960.raw", "start": 3990262, "end": 3995953, "audio": 0}, {"filename": "/gem_dust.pb", "start": 3995953, "end": 4020171, "audio": 0}, {"filename": "/auric_640_960.raw", "start": 4020171, "end": 4020590, "audio": 0}, {"filename": "/red_whizbang_640_960.raw", "start": 4020590, "end": 4021771, "audio": 0}, {"filename": "/jace.pb", "start": 4021771, "end": 4026107, "audio": 0}, {"filename": "/popup_mine.pb", "start": 4026107, "end": 4085740, "audio": 0}, {"filename": "/totemius.pb", "start": 4085740, "end": 4096991, "audio": 0}, {"filename": "/guild_640_960.raw", "start": 4096991, "end": 4099142, "audio": 0}, {"filename": "/gun_shot_640_960.raw", "start": 4099142, "end": 4107385, "audio": 0}, {"filename": "/chat_640_960.raw", "start": 4107385, "end": 4107874, "audio": 0}, {"filename": "/char_anim_6.pb", "start": 4107874, "end": 4189336, "audio": 0}, {"filename": "/decor_cave_640_960.raw", "start": 4189336, "end": 4192947, "audio": 0}, {"filename": "/decor_jungle_640_960.raw", "start": 4192947, "end": 4206400, "audio": 0}, {"filename": "/obj_blue_demon_view_03.pb", "start": 4206400, "end": 4209254, "audio": 0}, {"filename": "/bgr_wall_forest_640_960.raw", "start": 4209254, "end": 4213797, "audio": 0}, {"filename": "/traps_640_960.raw", "start": 4213797, "end": 4220884, "audio": 0}, {"filename": "/popup_640_960.raw", "start": 4220884, "end": 4228031, "audio": 0}, {"filename": "/rastin.pb", "start": 4228031, "end": 4233591, "audio": 0}, {"filename": "/map_fire_decor_640_960.raw", "start": 4233591, "end": 4239050, "audio": 0}, {"filename": "/map_ice_markers_640_960.raw", "start": 4239050, "end": 4239125, "audio": 0}, {"filename": "/obj_ricochet.pb", "start": 4239125, "end": 4241008, "audio": 0}, {"filename": "/totem_640_960.raw", "start": 4241008, "end": 4242071, "audio": 0}, {"filename": "/totem_cust.pb", "start": 4242071, "end": 4898758, "audio": 0}, {"filename": "/fx_gold.pb", "start": 4898758, "end": 4932248, "audio": 0}, {"filename": "/start_ritual.pb", "start": 4932248, "end": 4977678, "audio": 0}, {"filename": "/special_gem_01.pb", "start": 4977678, "end": 4999326, "audio": 0}, {"filename": "/popup_guild_battle.pb", "start": 4999326, "end": 5038481, "audio": 0}, {"filename": "/pross_upgrade_cust_640_960.raw", "start": 5038481, "end": 5039056, "audio": 0}, {"filename": "/pers_cust_interface_popup_640_960.raw", "start": 5039056, "end": 5039215, "audio": 0}, {"filename": "/roopa.pb", "start": 5039215, "end": 5060934, "audio": 0}, {"filename": "/tap_fx_640_960.raw", "start": 5060934, "end": 5065855, "audio": 0}, {"filename": "/orbeusus.pb", "start": 5065855, "end": 5078952, "audio": 0}, {"filename": "/map_forest_decor_640_960.raw", "start": 5078952, "end": 5081561, "audio": 0}, {"filename": "/gap_map_640_960.raw", "start": 5081561, "end": 5082116, "audio": 0}, {"filename": "/CMP05ZPC.otf", "start": 5082116, "end": 5108200, "audio": 0}, {"filename": "/map_city_markers_640_960.raw", "start": 5108200, "end": 5108275, "audio": 0}, {"filename": "/char_anim_2.pb", "start": 5108275, "end": 5223372, "audio": 0}, {"filename": "/coppa_640_960.raw", "start": 5223372, "end": 5226355, "audio": 0}, {"filename": "/obj_fly.pb", "start": 5226355, "end": 5232092, "audio": 0}, {"filename": "/bgr_wall_fire_640_960.raw", "start": 5232092, "end": 5238689, "audio": 0}, {"filename": "/popup_upgrade_640_960.raw", "start": 5238689, "end": 5242602, "audio": 0}, {"filename": "/button_top.pb", "start": 5242602, "end": 5248636, "audio": 0}, {"filename": "/missy.pb", "start": 5248636, "end": 5255019, "audio": 0}, {"filename": "/map_cave_markers_640_960.raw", "start": 5255019, "end": 5255094, "audio": 0}, {"filename": "/exp.pb", "start": 5255094, "end": 5276277, "audio": 0}, {"filename": "/special_gems_640_960.raw", "start": 5276277, "end": 5278728, "audio": 0}, {"filename": "/bgr_ground_fire_640_960.raw", "start": 5278728, "end": 5285007, "audio": 0}, {"filename": "/noise_640_960.raw", "start": 5285007, "end": 5285342, "audio": 0}, {"filename": "/popup_restore_lock_picks_640_960.raw", "start": 5285342, "end": 5291193, "audio": 0}, {"filename": "/popup_cust.pb", "start": 5291193, "end": 5357273, "audio": 0}, {"filename": "/hud_640_960.raw", "start": 5357273, "end": 5358224, "audio": 0}, {"filename": "/obj_mouse_640_960.raw", "start": 5358224, "end": 5359285, "audio": 0}, {"filename": "/ADL85.otf", "start": 5359285, "end": 5452057, "audio": 0}, {"filename": "/popup_league_640_960.raw", "start": 5452057, "end": 5453890, "audio": 0}, {"filename": "/edit_screen_640_960.raw", "start": 5453890, "end": 5454331, "audio": 0}, {"filename": "/obj_ricochet_640_960.raw", "start": 5454331, "end": 5456222, "audio": 0}, {"filename": "/invinsius_640_960.raw", "start": 5456222, "end": 5456599, "audio": 0}, {"filename": "/sleema_640_960.raw", "start": 5456599, "end": 5456800, "audio": 0}, {"filename": "/popup_gem.pb", "start": 5456800, "end": 5649794, "audio": 0}, {"filename": "/prison_door.pb", "start": 5649794, "end": 5673671, "audio": 0}, {"filename": "/map_forest_markers_640_960.raw", "start": 5673671, "end": 5673746, "audio": 0}, {"filename": "/popup_upgrade.pb", "start": 5673746, "end": 5785289, "audio": 0}, {"filename": "/result_screen_02_640_960.raw", "start": 5785289, "end": 5794834, "audio": 0}, {"filename": "/hot_spot.pb", "start": 5794834, "end": 5796514, "audio": 0}, {"filename": "/inventory_cell_640_960.raw", "start": 5796514, "end": 5796975, "audio": 0}, {"filename": "/popup_level_640_960.raw", "start": 5796975, "end": 5808000, "audio": 0}, {"filename": "/obj_ricochet_view_03.pb", "start": 5808000, "end": 5816737, "audio": 0}, {"filename": "/lady_painsworth.pb", "start": 5816737, "end": 5822376, "audio": 0}, {"filename": "/gameconfig.pb", "start": 5822376, "end": 5845007, "audio": 0}, {"filename": "/sleema.pb", "start": 5845007, "end": 5847131, "audio": 0}, {"filename": "/map_city_decor_640_960.raw", "start": 5847131, "end": 5854364, "audio": 0}, {"filename": "/char_anim_1.pb", "start": 5854364, "end": 5968741, "audio": 0}, {"filename": "/status_edit_animations.pb", "start": 5968741, "end": 5987548, "audio": 0}, {"filename": "/obj_gun_view_02.pb", "start": 5987548, "end": 5990775, "audio": 0}, {"filename": "/invinsius.pb", "start": 5990775, "end": 6001726, "audio": 0}, {"filename": "/guild_battle_widget_640_960.raw", "start": 6001726, "end": 6002393, "audio": 0}, {"filename": "/char_anim_5.pb", "start": 6002393, "end": 6117490, "audio": 0}, {"filename": "/totem_break.pb", "start": 6117490, "end": 6190468, "audio": 0}, {"filename": "/obj_blue_demon_640_960.raw", "start": 6190468, "end": 6199235, "audio": 0}, {"filename": "/platforms_640_960.raw", "start": 6199235, "end": 6200358, "audio": 0}, {"filename": "/status_animations_640_960.raw", "start": 6200358, "end": 6201377, "audio": 0}, {"filename": "/obj_ricochet_view_02.pb", "start": 6201377, "end": 6206726, "audio": 0}, {"filename": "/chest_result_02.pb", "start": 6206726, "end": 6217955, "audio": 0}, {"filename": "/valletta.pb", "start": 6217955, "end": 6226183, "audio": 0}, {"filename": "/geffi.pb", "start": 6226183, "end": 6227851, "audio": 0}, {"filename": "/bgr_wall_metro_640_960.raw", "start": 6227851, "end": 6234032, "audio": 0}, {"filename": "/finish_zone_640_960.raw", "start": 6234032, "end": 6243419, "audio": 0}, {"filename": "/league_640_960.raw", "start": 6243419, "end": 6246320, "audio": 0}, {"filename": "/obj_gun_homing_view_03.pb", "start": 6246320, "end": 6253283, "audio": 0}, {"filename": "/little_totem_cust.pb", "start": 6253283, "end": 6532336, "audio": 0}, {"filename": "/map_ice_decor_640_960.raw", "start": 6532336, "end": 6538577, "audio": 0}, {"filename": "/maps/2-1.proto", "start": 6538577, "end": 6539012, "audio": 0}, {"filename": "/maps/4-11.proto", "start": 6539012, "end": 6539572, "audio": 0}, {"filename": "/maps/5-17.proto", "start": 6539572, "end": 6540166, "audio": 0}, {"filename": "/maps/1-9.proto", "start": 6540166, "end": 6540877, "audio": 0}, {"filename": "/maps/1-4.proto", "start": 6540877, "end": 6541494, "audio": 0}, {"filename": "/maps/3-14.proto", "start": 6541494, "end": 6542080, "audio": 0}, {"filename": "/maps/1-5.proto", "start": 6542080, "end": 6542894, "audio": 0}, {"filename": "/maps/4-14.proto", "start": 6542894, "end": 6543511, "audio": 0}, {"filename": "/maps/6-16.proto", "start": 6543511, "end": 6544070, "audio": 0}, {"filename": "/maps/4-3.proto", "start": 6544070, "end": 6544597, "audio": 0}, {"filename": "/maps/5-12.proto", "start": 6544597, "end": 6545156, "audio": 0}, {"filename": "/maps/3-16.proto", "start": 6545156, "end": 6545910, "audio": 0}, {"filename": "/maps/5-6.proto", "start": 6545910, "end": 6546497, "audio": 0}, {"filename": "/maps/4-10.proto", "start": 6546497, "end": 6546993, "audio": 0}, {"filename": "/maps/6-11.proto", "start": 6546993, "end": 6547650, "audio": 0}, {"filename": "/maps/5-7.proto", "start": 6547650, "end": 6548266, "audio": 0}, {"filename": "/maps/5-14.proto", "start": 6548266, "end": 6549046, "audio": 0}, {"filename": "/maps/3-4.proto", "start": 6549046, "end": 6549633, "audio": 0}, {"filename": "/maps/2-10.proto", "start": 6549633, "end": 6550410, "audio": 0}, {"filename": "/maps/3-3.proto", "start": 6550410, "end": 6550815, "audio": 0}, {"filename": "/maps/6-6.proto", "start": 6550815, "end": 6551447, "audio": 0}, {"filename": "/maps/1-14.proto", "start": 6551447, "end": 6552174, "audio": 0}, {"filename": "/maps/4-6.proto", "start": 6552174, "end": 6552678, "audio": 0}, {"filename": "/maps/4-4.proto", "start": 6552678, "end": 6553206, "audio": 0}, {"filename": "/maps/1-3.proto", "start": 6553206, "end": 6553705, "audio": 0}, {"filename": "/maps/3-2.proto", "start": 6553705, "end": 6554046, "audio": 0}, {"filename": "/maps/2-15.proto", "start": 6554046, "end": 6554599, "audio": 0}, {"filename": "/maps/1-8.proto", "start": 6554599, "end": 6555127, "audio": 0}, {"filename": "/maps/6-12.proto", "start": 6555127, "end": 6555721, "audio": 0}, {"filename": "/maps/3-11.proto", "start": 6555721, "end": 6556096, "audio": 0}, {"filename": "/maps/5-10.proto", "start": 6556096, "end": 6556753, "audio": 0}, {"filename": "/maps/1-1.proto", "start": 6556753, "end": 6557097, "audio": 0}, {"filename": "/maps/3-5.proto", "start": 6557097, "end": 6557572, "audio": 0}, {"filename": "/maps/2-6.proto", "start": 6557572, "end": 6558094, "audio": 0}, {"filename": "/maps/1-11.proto", "start": 6558094, "end": 6558773, "audio": 0}, {"filename": "/maps/2-7.proto", "start": 6558773, "end": 6559511, "audio": 0}, {"filename": "/maps/1-13.proto", "start": 6559511, "end": 6560191, "audio": 0}, {"filename": "/maps/5-4.proto", "start": 6560191, "end": 6560815, "audio": 0}, {"filename": "/maps/2-16.proto", "start": 6560815, "end": 6561397, "audio": 0}, {"filename": "/maps/tutorial02.pb", "start": 6561397, "end": 6561684, "audio": 0}, {"filename": "/maps/3-12.proto", "start": 6561684, "end": 6562220, "audio": 0}, {"filename": "/maps/2-2.proto", "start": 6562220, "end": 6562592, "audio": 0}, {"filename": "/maps/5-11.proto", "start": 6562592, "end": 6563239, "audio": 0}, {"filename": "/maps/4-8.proto", "start": 6563239, "end": 6563766, "audio": 0}, {"filename": "/maps/1-16.proto", "start": 6563766, "end": 6564539, "audio": 0}, {"filename": "/maps/4-1.proto", "start": 6564539, "end": 6565097, "audio": 0}, {"filename": "/maps/6-1.proto", "start": 6565097, "end": 6565781, "audio": 0}, {"filename": "/maps/4-16.proto", "start": 6565781, "end": 6566430, "audio": 0}, {"filename": "/maps/4-15.proto", "start": 6566430, "end": 6566925, "audio": 0}, {"filename": "/maps/6-13.proto", "start": 6566925, "end": 6567484, "audio": 0}, {"filename": "/maps/5-1.proto", "start": 6567484, "end": 6567874, "audio": 0}, {"filename": "/maps/6-9.proto", "start": 6567874, "end": 6568677, "audio": 0}, {"filename": "/maps/6-5.proto", "start": 6568677, "end": 6569328, "audio": 0}, {"filename": "/maps/5-9.proto", "start": 6569328, "end": 6569924, "audio": 0}, {"filename": "/maps/4-13.proto", "start": 6569924, "end": 6570540, "audio": 0}, {"filename": "/maps/6-10.proto", "start": 6570540, "end": 6571083, "audio": 0}, {"filename": "/maps/2-5.proto", "start": 6571083, "end": 6571891, "audio": 0}, {"filename": "/maps/6-14.proto", "start": 6571891, "end": 6572513, "audio": 0}, {"filename": "/maps/2-3.proto", "start": 6572513, "end": 6573160, "audio": 0}, {"filename": "/maps/1-6.proto", "start": 6573160, "end": 6573749, "audio": 0}, {"filename": "/maps/3-8.proto", "start": 6573749, "end": 6574125, "audio": 0}, {"filename": "/maps/1-12.proto", "start": 6574125, "end": 6574810, "audio": 0}, {"filename": "/maps/5-13.proto", "start": 6574810, "end": 6575406, "audio": 0}, {"filename": "/maps/2-12.proto", "start": 6575406, "end": 6576133, "audio": 0}, {"filename": "/maps/6-7.proto", "start": 6576133, "end": 6576843, "audio": 0}, {"filename": "/maps/tutorial01.pb", "start": 6576843, "end": 6577115, "audio": 0}, {"filename": "/maps/5-5.proto", "start": 6577115, "end": 6577678, "audio": 0}, {"filename": "/maps/1-7.proto", "start": 6577678, "end": 6578480, "audio": 0}, {"filename": "/maps/3-9.proto", "start": 6578480, "end": 6579070, "audio": 0}, {"filename": "/maps/2-8.proto", "start": 6579070, "end": 6579658, "audio": 0}, {"filename": "/maps/1-10.proto", "start": 6579658, "end": 6580367, "audio": 0}, {"filename": "/maps/1-15.proto", "start": 6580367, "end": 6581107, "audio": 0}, {"filename": "/maps/2-4.proto", "start": 6581107, "end": 6581522, "audio": 0}, {"filename": "/maps/4-12.proto", "start": 6581522, "end": 6582136, "audio": 0}, {"filename": "/maps/6-8.proto", "start": 6582136, "end": 6582761, "audio": 0}, {"filename": "/maps/4-5.proto", "start": 6582761, "end": 6583318, "audio": 0}, {"filename": "/maps/6-2.proto", "start": 6583318, "end": 6583970, "audio": 0}, {"filename": "/maps/6-3.proto", "start": 6583970, "end": 6584649, "audio": 0}, {"filename": "/maps/1-2.proto", "start": 6584649, "end": 6585326, "audio": 0}, {"filename": "/maps/2-13.proto", "start": 6585326, "end": 6585852, "audio": 0}, {"filename": "/maps/5-16.proto", "start": 6585852, "end": 6586484, "audio": 0}, {"filename": "/maps/2-14.proto", "start": 6586484, "end": 6587085, "audio": 0}, {"filename": "/maps/6-15.proto", "start": 6587085, "end": 6587654, "audio": 0}, {"filename": "/maps/3-1.proto", "start": 6587654, "end": 6588148, "audio": 0}, {"filename": "/maps/6-4.proto", "start": 6588148, "end": 6588706, "audio": 0}, {"filename": "/maps/2-11.proto", "start": 6588706, "end": 6589323, "audio": 0}, {"filename": "/maps/3-7.proto", "start": 6589323, "end": 6589817, "audio": 0}, {"filename": "/maps/5-2.proto", "start": 6589817, "end": 6590478, "audio": 0}, {"filename": "/maps/3-6.proto", "start": 6590478, "end": 6590943, "audio": 0}, {"filename": "/maps/2-9.proto", "start": 6590943, "end": 6591556, "audio": 0}, {"filename": "/maps/3-10.proto", "start": 6591556, "end": 6592175, "audio": 0}, {"filename": "/maps/4-9.proto", "start": 6592175, "end": 6592666, "audio": 0}, {"filename": "/maps/3-13.proto", "start": 6592666, "end": 6593282, "audio": 0}, {"filename": "/maps/5-15.proto", "start": 6593282, "end": 6593807, "audio": 0}, {"filename": "/maps/5-3.proto", "start": 6593807, "end": 6594407, "audio": 0}, {"filename": "/maps/5-8.proto", "start": 6594407, "end": 6595056, "audio": 0}, {"filename": "/maps/4-2.proto", "start": 6595056, "end": 6595561, "audio": 0}, {"filename": "/maps/3-15.proto", "start": 6595561, "end": 6596035, "audio": 0}, {"filename": "/maps/4-7.proto", "start": 6596035, "end": 6596560, "audio": 0}], "remote_package_size": 6596560, "package_uuid": "2840e58c-2f83-4bc6-94d6-ba5f46f35465"});
  
  })();
  