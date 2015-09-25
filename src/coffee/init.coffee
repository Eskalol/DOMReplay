class DomReplay
  constructor: (debugmode) ->
    console.log "debugmode is set to #{debugmode}"
    @util = new Util(debugmode)

    @PASSIVE_STATE
    @RECORD_STATE = 1
    @REPLAY_STATE = 2
    @current_operating_state = @PASSIVE_STATE


  set_operating_state_replay: ->
    @current_operating_state = @REPLAY_STATE

  set_operating_state_record: ->
    @current_operating_state = @RECORD_STATE

  set_operating_state_passive: ->
    @current_operating_state = @PASSIVE_STATE

  operating_state_is_recording: ->
    @current_operating_state == @RECORD_STATE

  operating_state_is_replaying: ->
    @current_operating_state == @REPLAY_STATE

  operating_state_is_passive: ->
    @current_operating_state == @PASSIVE_STATE

  initialize_tracking: () ->
    if @operating_state_is_recording()
      @util.debug "cancelling initialization of recording due to recording already being in progress."
      return
    @util.debug 'running initial load!'

    time = setInterval( () =>
      @util.debug 'running readyState-check'
      if document.readyState != 'complete'
        @util.debug 'document not yet ready - postponing initialization'
        return
      clearInterval time
      @initialize_modules()
      return
      100)

  initialize_modules: ->
    @util.debug "running initialize_modules"
    @storage = new Storage this
    @handler = new Handler this
    @dom_loader = new DOMLoader this

    @dom_loader.initialize_buttons()
    @dom_loader.initialize_links()

    @dom_loader.initialize_mutation_observer()
    @util.debug "all modules initialized"
    @set_operating_state_record()

  initialize_playback: ->
    @replay = new Replay this
    @replay.play()

@setup_test_buttons = (domreplay_object) ->
  ###
  A simple function to add a couple of buttons after the initial loading of elements has occurred.
  This is to simulate elements created by other frameworks, such as AngularJS and jQuery.
  ###
  build_buttons = () ->
    domreplay_object.util.debug "settings up test buttons"
    main_container = document.getElementById "main_container"

    row_div = document.createElement "div"
    row_div.className = "row"
    row_div.id = "autogen_row"

    col_div = document.createElement "div"
    col_div.className = "col-xs-10 col-xs-offset-1"
    col_div.id = "autogen_col"

    header = document.createElement "h2"
    header.innerText = "Autogenerated elements:"
    header.id = "autogen_header"

    test_button = document.createElement "button"
    test_button.className = "btn btn-primary"
    test_button.innerText = "I am generated by JS"
    test_button.id = "test_button"
    test_button.name = "test_button"

    replay_button = document.createElement "button"
    replay_button.id = "replay_button"
    replay_button.className = "btn btn-warning"
    replay_button.innerText = "Trigger replay"
    replay_button.setAttribute 'DomReplayIgnore', null
    replay_button.addEventListener 'click', () ->
      domreplay_object.initialize_playback()
    , false

    main_container.appendChild row_div
    row_div.appendChild col_div
    col_div.appendChild header
    col_div.appendChild test_button
    col_div.appendChild replay_button
    return

  # delay to ensure this is executed _after_ the initial loading of elements has occurred.
  time = setInterval( () =>
    build_buttons()
    clearInterval time
    return
    500)

  return

@DOMReplay_initial_load = (debugmode) ->
  dr = new DomReplay(debugmode)
  dr
