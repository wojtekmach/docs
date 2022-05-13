sidebarNodes={"extras":[{"group":"","headers":[{"anchor":"modules","id":"Modules"}],"id":"api-reference","title":"API Reference"},{"group":"","headers":[{"anchor":"features","id":"Features"},{"anchor":"usage","id":"Usage"},{"anchor":"acknowledgments","id":"Acknowledgments"},{"anchor":"license","id":"License"}],"id":"readme","title":"Req"},{"group":"","headers":[{"anchor":"v0-3-0-dev","id":"v0.3.0-dev"},{"anchor":"v0-2-2-2022-04-04","id":"v0.2.2 (2022-04-04)"},{"anchor":"v0-2-1-2021-11-24","id":"v0.2.1 (2021-11-24)"},{"anchor":"v0-2-0-2021-11-08","id":"v0.2.0 (2021-11-08)"},{"anchor":"v0-1-1-2021-07-16","id":"v0.1.1 (2021-07-16)"},{"anchor":"v0-1-0-2021-07-15","id":"v0.1.0 (2021-07-15)"}],"id":"changelog","title":"CHANGELOG"}],"modules":[{"group":"","id":"Req","nodeGroups":[{"key":"types","name":"Types","nodes":[{"anchor":"t:url/0","id":"url/0"}]},{"key":"functions","name":"Functions","nodes":[{"anchor":"default_options/0","id":"default_options/0"},{"anchor":"default_options/1","id":"default_options/1"},{"anchor":"delete!/2","id":"delete!/2"},{"anchor":"get!/2","id":"get!/2"},{"anchor":"head!/2","id":"head!/2"},{"anchor":"new/1","id":"new/1"},{"anchor":"patch!/2","id":"patch!/2"},{"anchor":"post!/2","id":"post!/2"},{"anchor":"put!/2","id":"put!/2"},{"anchor":"request!/1","id":"request!/1"},{"anchor":"request!/2","id":"request!/2"},{"anchor":"request/1","id":"request/1"},{"anchor":"request/2","id":"request/2"}]}],"sections":[{"anchor":"module-examples","id":"Examples"}],"title":"Req"},{"group":"","id":"Req.Request","nodeGroups":[{"key":"types","name":"Types","nodes":[{"anchor":"t:t/0","id":"t/0"}]},{"key":"functions","name":"Functions","nodes":[{"anchor":"append_error_steps/2","id":"append_error_steps/2"},{"anchor":"append_request_steps/2","id":"append_request_steps/2"},{"anchor":"append_response_steps/2","id":"append_response_steps/2"},{"anchor":"get_header/2","id":"get_header/2"},{"anchor":"get_private/3","id":"get_private/3"},{"anchor":"halt/1","id":"halt/1"},{"anchor":"merge_options/2","id":"merge_options/2"},{"anchor":"prepend_error_steps/2","id":"prepend_error_steps/2"},{"anchor":"prepend_request_steps/2","id":"prepend_request_steps/2"},{"anchor":"prepend_response_steps/2","id":"prepend_response_steps/2"},{"anchor":"put_header/3","id":"put_header/3"},{"anchor":"put_private/3","id":"put_private/3"},{"anchor":"register_options/2","id":"register_options/2"},{"anchor":"registered_options/1","id":"registered_options/1"},{"anchor":"run!/1","id":"run!/1"},{"anchor":"run/1","id":"run/1"}]}],"sections":[{"anchor":"module-the-low-level-api","id":"The Low-level API"},{"anchor":"module-the-request-struct","id":"The Request Struct"},{"anchor":"module-steps","id":"Steps"},{"anchor":"module-writing-plugins","id":"Writing Plugins"},{"anchor":"module-adapter","id":"Adapter"}],"title":"Req.Request"},{"group":"","id":"Req.Response","nodeGroups":[{"key":"types","name":"Types","nodes":[{"anchor":"t:t/0","id":"t/0"}]},{"key":"functions","name":"Functions","nodes":[{"anchor":"get_header/2","id":"get_header/2"},{"anchor":"get_private/3","id":"get_private/3"},{"anchor":"put_private/3","id":"put_private/3"}]}],"sections":[],"title":"Req.Response"},{"group":"","id":"Req.Steps","nodeGroups":[{"key":"request-steps","name":"Request steps","nodes":[{"anchor":"auth/1","id":"auth/1"},{"anchor":"cache/1","id":"cache/1"},{"anchor":"compress_body/1","id":"compress_body/1"},{"anchor":"compressed/1","id":"compressed/1"},{"anchor":"encode_body/1","id":"encode_body/1"},{"anchor":"put_base_url/1","id":"put_base_url/1"},{"anchor":"put_params/1","id":"put_params/1"},{"anchor":"put_plug/1","id":"put_plug/1"},{"anchor":"put_range/1","id":"put_range/1"},{"anchor":"put_user_agent/1","id":"put_user_agent/1"},{"anchor":"run_finch/1","id":"run_finch/1"}]},{"key":"response-steps","name":"Response steps","nodes":[{"anchor":"decode_body/1","id":"decode_body/1"},{"anchor":"decompress_body/1","id":"decompress_body/1"},{"anchor":"follow_redirects/1","id":"follow_redirects/1"},{"anchor":"handle_http_errors/1","id":"handle_http_errors/1"},{"anchor":"output/1","id":"output/1"}]},{"key":"error-steps","name":"Error steps","nodes":[{"anchor":"retry/1","id":"retry/1"}]}],"sections":[],"title":"Req.Steps"}],"tasks":[]}