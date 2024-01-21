'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'level-load-file': {
          'onclick': function(){
              const element = document.getElementById('level-file');
              if(element.files.length === 0){
                  return;
              }
              core_menu_lock = false;
              core_file({
                'file': element.files[0],
                'todo': function(event){
                    if(webgl_level_load({
                        'character': -1,
                        'json': JSON.parse(event.target.result),
                      })){
                        document.title = webgl_properties['title']
                          ? webgl_properties['title'] + ' - ' + core_repo_title
                          : core_repo_title;

                    }else{
                        element.value = null;
                    }
                },
                'type': 'readAsText',
              });
          },
        },
        'level-load-textarea': {
          'onclick': function(){
              core_menu_lock = false;
              const level_json = JSON.parse(document.getElementById('level-textarea').value);
              webgl_level_load({
                'character': -1,
                'json': level_json,
              });
              document.title = level_json['title']
                ? level_json['title'] + ' - ' + core_repo_title
                : core_repo_title;
          },
        },
        'screenshot': {
          'onclick': webgl_screenshot,
        },
      },
      'info': '<button id=screenshot type=button>Screenshot</button>',
      'keybinds': {
        'Backquote': {
          'todo': function(){
              webgl_characters[webgl_character_id]['automove'] = !webgl_characters[webgl_character_id]['automove'];
          },
        },
      },
      'menu': true,
      'menu-lock': true,
      'mousebinds': {
        'contextmenu': {
          'preventDefault': true,
        },
        'mousemove': {
          'todo': webgl_camera_handle,
        },
        'mouseup': {
          'todo': webgl_pick_entity,
        },
        'mousewheel': {
          'todo': webgl_camera_zoom,
        },
      },
      'tabs': {
        'load': {
          'content': '<input id=level-file type=file><button id=level-load-file type=button>Load Level from File</button><br>'
            + '<button id=level-load-textarea type=button>Load Level from Textarea</button><br><textarea id=level-textarea>{}</textarea>',
          'default': true,
          'group': 'core-menu',
          'label': 'Load Levels',
        },
      },
      'title': 'MultiverseViewer.htm',
    });
}

function repo_logic(){
}
