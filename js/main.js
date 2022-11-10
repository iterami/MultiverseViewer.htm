'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'level-load-file': {
          'onclick': function(){
              const files = document.getElementById('level-file').files;
              if(files.length === 0){
                  return;
              }
              core_file({
                'file': files[0],
                'todo': function(event){
                    webgl_level_load({
                      'character': -1,
                      'json': JSON.parse(event.target.result),
                    });
                    document.title = webgl_properties['title'] || core_repo_title;
                },
                'type': 'readAsText',
              });
          },
        },
        'level-load-textarea': {
          'onclick': function(){
              const level_json = JSON.parse(document.getElementById('level-textarea').value);
              webgl_level_load({
                'character': -1,
                'json': level_json,
              });
              document.title = level_json['title'] || core_repo_title;
          },
        },
      },
      'keybinds': {
        70: {},
        192: {
          'todo': function(){
              webgl_characters[webgl_character_id]['automove'] = !webgl_characters[webgl_character_id]['automove'];
          },
        },
      },
      'menu': true,
      'mousebinds': {
        'contextmenu': {
          'preventDefault': true,
        },
        'mousedown': {
          'todo': webgl_camera_handle,
        },
        'mousemove': {
          'preventDefault': true,
          'todo': webgl_camera_handle,
        },
        'mouseup': {
          'todo': function(){
              if(webgl_character_level() < -1){
                  return;
              }
              webgl_pick_entity({
                'x': core_mouse['down-x'],
                'y': core_mouse['down-y'],
              });
          },
        },
        'mousewheel': {
          'todo': webgl_camera_zoom,
        },
      },
      'tabs': {
        'load': {
          'content': '<input id=level-file type=file><input id=level-load-file type=button value="Load Level from File"><br>'
            + '<input id=level-load-textarea type=button value="Load Level from Textarea"><br><textarea id=level-textarea>{}</textarea>',
          'default': true,
          'group': 'core-menu',
          'label': 'Load Levels',
        },
      },
      'title': 'MultiverseViewer.htm',
    });
    webgl_storage_init();
}
