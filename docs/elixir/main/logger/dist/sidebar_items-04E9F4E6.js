sidebarNodes={"extras":[{"group":"","headers":[{"anchor":"modules","id":"Modules"}],"id":"api-reference","title":"API Reference"}],"modules":[{"group":"","id":"Logger","nodeGroups":[{"key":"types","name":"Types","nodes":[{"anchor":"t:level/0","id":"level/0","title":"level()"},{"anchor":"t:message/0","id":"message/0","title":"message()"},{"anchor":"t:metadata/0","id":"metadata/0","title":"metadata()"},{"anchor":"t:report/0","id":"report/0","title":"report()"}]},{"key":"functions","name":"Functions","nodes":[{"anchor":"add_backend/2","id":"add_backend/2","title":"add_backend(backend, opts \\\\ [])"},{"anchor":"add_handlers/1","id":"add_handlers/1","title":"add_handlers(app)"},{"anchor":"add_translator/1","id":"add_translator/1","title":"add_translator(translator)"},{"anchor":"alert/2","id":"alert/2","title":"alert(message_or_fun, metadata \\\\ [])"},{"anchor":"bare_log/3","id":"bare_log/3","title":"bare_log(level, message_or_fun, metadata \\\\ [])"},{"anchor":"compare_levels/2","id":"compare_levels/2","title":"compare_levels(left, right)"},{"anchor":"configure/1","id":"configure/1","title":"configure(options)"},{"anchor":"configure_backend/2","id":"configure_backend/2","title":"configure_backend(backend, options)"},{"anchor":"critical/2","id":"critical/2","title":"critical(message_or_fun, metadata \\\\ [])"},{"anchor":"debug/2","id":"debug/2","title":"debug(message_or_fun, metadata \\\\ [])"},{"anchor":"default_formatter/1","id":"default_formatter/1","title":"default_formatter(overrides \\\\ [])"},{"anchor":"delete_all_module_levels/0","id":"delete_all_module_levels/0","title":"delete_all_module_levels()"},{"anchor":"delete_application_level/1","id":"delete_application_level/1","title":"delete_application_level(appname)"},{"anchor":"delete_module_level/1","id":"delete_module_level/1","title":"delete_module_level(module)"},{"anchor":"delete_process_level/1","id":"delete_process_level/1","title":"delete_process_level(pid)"},{"anchor":"disable/1","id":"disable/1","title":"disable(pid)"},{"anchor":"emergency/2","id":"emergency/2","title":"emergency(message_or_fun, metadata \\\\ [])"},{"anchor":"enable/1","id":"enable/1","title":"enable(pid)"},{"anchor":"enabled?/1","id":"enabled?/1","title":"enabled?(pid)"},{"anchor":"error/2","id":"error/2","title":"error(message_or_fun, metadata \\\\ [])"},{"anchor":"flush/0","id":"flush/0","title":"flush()"},{"anchor":"get_module_level/1","id":"get_module_level/1","title":"get_module_level(mod)"},{"anchor":"get_process_level/1","id":"get_process_level/1","title":"get_process_level(pid)"},{"anchor":"info/2","id":"info/2","title":"info(message_or_fun, metadata \\\\ [])"},{"anchor":"level/0","id":"level/0","title":"level()"},{"anchor":"log/3","id":"log/3","title":"log(level, message_or_fun, metadata \\\\ [])"},{"anchor":"metadata/0","id":"metadata/0","title":"metadata()"},{"anchor":"metadata/1","id":"metadata/1","title":"metadata(keyword)"},{"anchor":"notice/2","id":"notice/2","title":"notice(message_or_fun, metadata \\\\ [])"},{"anchor":"put_application_level/2","id":"put_application_level/2","title":"put_application_level(appname, level)"},{"anchor":"put_module_level/2","id":"put_module_level/2","title":"put_module_level(mod, level)"},{"anchor":"put_process_level/2","id":"put_process_level/2","title":"put_process_level(pid, level)"},{"anchor":"remove_backend/2","id":"remove_backend/2","title":"remove_backend(backend, opts \\\\ [])"},{"anchor":"remove_translator/1","id":"remove_translator/1","title":"remove_translator(translator)"},{"anchor":"reset_metadata/1","id":"reset_metadata/1","title":"reset_metadata(keyword \\\\ [])"},{"anchor":"warn/2","id":"warn/2","title":"warn(message_or_fun, metadata \\\\ [])"},{"anchor":"warning/2","id":"warning/2","title":"warning(message_or_fun, metadata \\\\ [])"}]}],"sections":[{"anchor":"module-levels","id":"Levels"},{"anchor":"module-message","id":"Message"},{"anchor":"module-metadata","id":"Metadata"},{"anchor":"module-configuration","id":"Configuration"},{"anchor":"module-erlang-otp-handlers","id":"Erlang/OTP handlers"},{"anchor":"module-backends-and-backwards-compatibility","id":"Backends and backwards compatibility"}],"title":"Logger"},{"group":"","id":"Logger.Formatter","nodeGroups":[{"key":"types","name":"Types","nodes":[{"anchor":"t:date/0","id":"date/0","title":"date()"},{"anchor":"t:date_time_ms/0","id":"date_time_ms/0","title":"date_time_ms()"},{"anchor":"t:pattern/0","id":"pattern/0","title":"pattern()"},{"anchor":"t:time_ms/0","id":"time_ms/0","title":"time_ms()"}]},{"key":"functions","name":"Functions","nodes":[{"anchor":"compile/1","id":"compile/1","title":"compile(pattern_or_function)"},{"anchor":"format/5","id":"format/5","title":"format(pattern_or_function, level, message, timestamp, metadata)"},{"anchor":"format_date/1","id":"format_date/1","title":"format_date(date_tuple)"},{"anchor":"format_event/2","id":"format_event/2","title":"format_event(log_event, truncate)"},{"anchor":"format_time/1","id":"format_time/1","title":"format_time(time_ms_tuple)"},{"anchor":"new/1","id":"new/1","title":"new(options \\\\ [])"},{"anchor":"prune/1","id":"prune/1","title":"prune(binary)"},{"anchor":"system_time_to_date_time_ms/2","id":"system_time_to_date_time_ms/2","title":"system_time_to_date_time_ms(system_time, utc_log? \\\\ false)"},{"anchor":"truncate/2","id":"truncate/2","title":"truncate(chardata, n)"}]}],"sections":[{"anchor":"module-formatting","id":"Formatting"}],"title":"Logger.Formatter"},{"group":"","id":"Logger.Translator","nodeGroups":[{"key":"callbacks","name":"Callbacks","nodes":[{"anchor":"c:translate/4","id":"translate/4","title":"translate(level, level, arg3, report)"}]},{"key":"functions","name":"Functions","nodes":[{"anchor":"translate/4","id":"translate/4","title":"translate(min_level, level, kind, message)"}]}],"sections":[],"title":"Logger.Translator"},{"group":"Deprecated","id":"Logger.Backends.Console","sections":[],"title":"Logger.Backends.Console"}],"tasks":[]}