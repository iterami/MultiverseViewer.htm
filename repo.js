'use strict';

function repo_escape(){
    audio_state_all(!core_menu_open);
}

function repo_init(){
    core_repo_init({
      'events': {
        'level_load_file': {
          'onclick': function(){
              const element = document.getElementById('level_file');
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
                        document.title = (webgl_properties.title || element.files[0].name) +  ' - ' + core_repo_title;

                    }else{
                        element.value = null;
                    }
                },
                'type': 'readAsText',
              });
          },
        },
        'level_load_textarea': {
          'onclick': function(){
              core_menu_lock = false;
              const text = document.getElementById('level_textarea').value.trim() || '{}';
              const level_json = JSON.parse(text[0] === "'"
                ? text.slice(1, -1)
                : text);
              webgl_level_load({
                'character': -1,
                'json': level_json,
              });
              document.title = level_json.title
                ? level_json.title + ' - ' + core_repo_title
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
          'down': function(){
              webgl_character_automove();
          },
        },
      },
      'menu_lock': true,
      'pointerbinds': {
        'contextmenu': {},
        'pointermove': {
          'todo': function(){
              webgl_controls_pointer();
          },
        },
        'pointerup': {
          'todo': webgl_pick_entity,
        },
        'wheel': {
          'todo': webgl_controls_wheel,
        },
      },
      'storage_controls': true,
      'tabs': {
        'load': {
          'content': '<input id=level_file type=file><button id=level_load_file type=button>Load Level from File</button><br>'
            + '<button id=level_load_textarea type=button>Load Level from Textarea</button><br><textarea id=level_textarea></textarea>',
          'default': true,
          'group': 'core_menu',
          'label': 'Load Levels',
        },
      },
      'title': 'MultiverseViewer.htm',
    });
}
