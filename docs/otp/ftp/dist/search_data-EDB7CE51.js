searchData={"items":[{"type":"module","title":"ftp","doc":"A File Transfer Protocol client.\n\nThis module implements a client for file transfer according to a subset of the\nFile Transfer Protocol (FTP), see [RFC 959](http://www.ietf.org/rfc/rfc959.txt).\n\nThe FTP client always tries to use passive FTP mode and only resort to active\nFTP mode if this fails. This default behavior can be changed by start option\n[mode](`m:ftp#mode`).\n\nFor a simple example of an FTP session, see [FTP User's Guide](ftp_client.md).\n\nIn addition to the ordinary functions for receiving and sending files (see\n`recv/2`, `recv/3`, `send/2`, and `send/3`) there are functions for receiving\nremote files as binaries (see `recv_bin/2`) and for sending binaries to be\nstored as remote files (see `send_bin/3`).\n\nA set of functions is provided for sending and receiving contiguous parts of a\nfile to be stored in a remote file. For send, see `send_chunk_start/2`,\n`send_chunk/2`, and `send_chunk_end/1`. For receive, see `recv_chunk_start/2`\nand `recv_chunk/`).\n\nThe return values of the following functions depend much on the implementation\nof the FTP server at the remote host. In particular, the results from `ls` and\n`nlist` varies. Often real errors are not reported as errors by `ls`, even if,\nfor example, a file or directory does not exist. `nlist` is usually more strict,\nbut some implementations have the peculiar behaviour of responding with an error\nif the request is a listing of the contents of a directory that exists but is\nempty.\n\n[](){: id=service_start }","ref":"ftp.html"},{"type":"module","title":"FTP CLIENT START/STOP - ftp","doc":"The FTP client can be started and stopped dynamically in runtime by calling the\n`ftp` application API `ftp:open(Host, Options)` and `ftp:close(Client)`.","ref":"ftp.html#module-ftp-client-start-stop"},{"type":"module","title":"Data Types - ftp","doc":"The following type definitions are used by more than one function in the FTP\nclient API:\n\n`t:pid()` = identifier of an FTP connection\n\n`t:string()` = list of ASCII characters\n\n[](){: id=account }","ref":"ftp.html#module-data-types"},{"type":"module","title":"ERRORS - ftp","doc":"The possible error reasons and the corresponding diagnostic strings returned by\n`formaterror/1` are as follows:\n\n- **`echunk`** - Synchronization error during chunk sending according to one of\n  the following:\n\n  - A call is made to `send_chunk/2` or `send_chunk_end/1` before a call to\n    `send_chunk_start/2`.\n  - A call has been made to another transfer function during chunk sending, that\n    is, before a call to `send_chunk_end/1`.\n\n- **`eclosed`** - The session is closed.\n\n- **`econn`** - Connection to the remote server is prematurely closed.\n\n- **`ehost`** - Host is not found, FTP server is not found, or connection is\n  rejected by FTP server.\n\n- **`elogin`** - User is not logged in.\n\n- **`enotbinary`** - Term is not a binary.\n\n- **`epath`** - No such file or directory, or directory already exists, or\n  permission denied.\n\n- **`etype`** - No such type.\n\n- **`euser`** - Invalid username or password.\n\n- **`etnospc`** - Insufficient storage space in system \\[452].\n\n- **`epnospc`** - Exceeded storage allocation (for current directory or dataset)\n  \\[552].\n\n- **`efnamena`** - Filename not allowed \\[553].","ref":"ftp.html#module-errors"},{"type":"module","title":"SEE ALSO - ftp","doc":"`m:file` `m:filename` and J. Postel and J. Reynolds: File Transfer Protocol\n([RFC 959](http://www.ietf.org/rfc/rfc959.txt)).","ref":"ftp.html#module-see-also"},{"type":"function","title":"ftp.account/2","doc":"Sets the account for an operation, if needed.\n\n[](){: id=append } [](){: id=append2 } [](){: id=append3 }","ref":"ftp.html#account/2"},{"type":"function","title":"ftp.append/2","doc":"","ref":"ftp.html#append/2"},{"type":"function","title":"ftp.append/3","doc":"Transfers the file `LocalFile` to the remote server. If `RemoteFile` is\nspecified, the name of the remote file that the file is appended to is set to\n`RemoteFile`, otherwise to `LocalFile`. If the file does not exists, it is\ncreated.\n\n[](){: id=append_bin }","ref":"ftp.html#append/3"},{"type":"function","title":"ftp.append_bin/3","doc":"Transfers the binary `Bin` to the remote server and appends it to the file\n`RemoteFile`. If the file does not exist, it is created.\n\n[](){: id=append_chunk }","ref":"ftp.html#append_bin/3"},{"type":"function","title":"ftp.append_chunk/2","doc":"Transfers the chunk `Bin` to the remote server, which appends it to the file\nspecified in the call to `append_chunk_start/2`.\n\nFor some errors, for example, file system full, it is necessary to call\n`append_chunk_end` to get the proper reason.\n\n[](){: id=append_chunk_start }","ref":"ftp.html#append_chunk/2"},{"type":"function","title":"ftp.append_chunk_end/1","doc":"Stops transfer of chunks for appending to the remote server. The file at the\nremote server, specified in the call to `append_chunk_start/2`, is closed by the\nserver.\n\n[](){: id=cd }","ref":"ftp.html#append_chunk_end/1"},{"type":"function","title":"ftp.append_chunk_start/2","doc":"Starts the transfer of chunks for appending to the file `RemoteFile` at the\nremote server. If the file does not exist, it is created.\n\n[](){: id=append_chunk_end }","ref":"ftp.html#append_chunk_start/2"},{"type":"function","title":"ftp.cd/2","doc":"Changes the working directory at the remote server to `Dir`.\n\n[](){: id=close }","ref":"ftp.html#cd/2"},{"type":"function","title":"ftp.close/1","doc":"Ends an FTP session, created using function [open](`m:ftp#open`).\n\n[](){: id=delete }","ref":"ftp.html#close/1"},{"type":"function","title":"ftp.delete/2","doc":"Deletes the file `File` at the remote server.\n\n[](){: id=append }","ref":"ftp.html#delete/2"},{"type":"function","title":"ftp.formaterror/1","doc":"Given an error return value `{error, AtomReason}`, this function returns a\nreadable string describing the error.\n\n[](){: id=lcd }","ref":"ftp.html#formaterror/1"},{"type":"function","title":"ftp.lcd/2","doc":"Changes the working directory to `Dir` for the local client.\n\n[](){: id=lpwd }","ref":"ftp.html#lcd/2"},{"type":"function","title":"ftp.lpwd/1","doc":"Returns the current working directory at the local client.\n\n[](){: id=ls } [](){: id=ls1 } [](){: id=ls2 }","ref":"ftp.html#lpwd/1"},{"type":"function","title":"ftp.ls/1","doc":"","ref":"ftp.html#ls/1"},{"type":"function","title":"ftp.ls/2","doc":"Returns a list of files in long format.\n\n`Dir` can be a directory or a file. The `Dir` string can contain wildcards.\n\n`ls/1` implies the current remote directory of the user.\n\nThe format of `Listing` depends on the operating system. On UNIX, it is\ntypically produced from the output of the `ls -l` shell command.\n\n[](){: id=mkdir }","ref":"ftp.html#ls/2"},{"type":"function","title":"ftp.mkdir/2","doc":"Creates the directory `Dir` at the remote server.\n\n[](){: id=nlist } [](){: id=nlist1 } [](){: id=nlist2 }","ref":"ftp.html#mkdir/2"},{"type":"function","title":"ftp.nlist/1","doc":"","ref":"ftp.html#nlist/1"},{"type":"function","title":"ftp.nlist/2","doc":"Returns a list of files in short format.\n\n`Pathname` can be a directory or a file. The `Pathname` string can contain\nwildcards.\n\n`nlist/1` implies the current remote directory of the user.\n\nThe format of `Listing` is a stream of filenames where each filename is\nseparated by   or  . Contrary to function `ls`, the purpose of `nlist`\nis to enable a program to process filename information automatically.\n\n[](){: id=open }","ref":"ftp.html#nlist/2"},{"type":"function","title":"ftp.open/1","doc":"","ref":"ftp.html#open/1"},{"type":"function","title":"ftp.open/2","doc":"Starts a FTP client process and opens a session with the FTP server at `Host`.\n\nA session opened in this way is closed using function [close](`m:ftp#close`).\n\nThe available configuration options are as follows:\n\n- **\\{host, Host\\}** - [](){: id=host } Host = `string() | ip_address()`\n\n- **\\{port, Port\\}** - [](){: id=port } Default is `0` which aliases to `21` or\n  `990` when used with [`{tls_sec_method,ftps}`](`m:ftp#open`)).\n\n- **\\{mode, Mode\\}** - [](){: id=mode } Default is `passive`.\n\n- **\\{verbose, Verbose\\}** - [](){: id=verbose } Determines if the FTP\n  communication is to be verbose or not.\n\n  Default is `false`.\n\n- **\\{debug, Debug\\}** - [](){: id=debug } Debugging using the dbg toolkit.\n\n  Default is `disable`.\n\n- **\\{ipfamily, IpFamily\\}** - [](){: id=ipfamily } With `inet6fb4` the client\n  behaves as before, that is, tries to use IPv6, and only if that does not work\n  it uses IPv4).\n\n  Default is `inet` (IPv4).\n\n- **\\{timeout, Timeout\\}** - [](){: id=timeout } Connection time-out.\n\n  Default is `60000` (milliseconds).\n\n- **\\{dtimeout, DTimeout\\}** - [](){: id=dtimeout } Data connect time-out. The\n  time the client waits for the server to connect to the data socket.\n\n  Default is `infinity`.\n\n- **\\{tls, TLSOptions\\}** - [](){: id=tls_options } The FTP session is\n  transported over `tls` (`ftps`, see\n  [RFC 4217](http://www.ietf.org/rfc/rfc4217.txt)). The list `TLSOptions` can be\n  empty. The function `ssl:connect/3` is used for securing both the control\n  connection and the data sessions.\n\n- **\\{tls_sec_method, TLSSecMethod\\}** - [](){: id=tls_sec_method } When set to\n  `ftps` will connect immediately with SSL instead of upgrading with STARTTLS.\n  This suboption is ignored unless the suboption `tls` is also set.\n\n  Default is `ftpes`\n\n- **\\{tls_ctrl_session_reuse, boolean()\\}** - [](){: id=tls_ctrl_session_reuse }\n  When set to `true` the client will re-use the TLS session from the control\n  channel on the data channel as enforced by many FTP servers as\n  ([proposed and implemented first by vsftpd](https://scarybeastsecurity.blogspot.com/2009/02/vsftpd-210-released.html)).\n\n  Default is `false`.\n\n- **\\{sock_ctrl, SocketCtrls :: \\[SocketControl :: gen_tcp:option()]\\}** -\n  Passes options from `SocketCtrls` down to the underlying transport layer\n  (tcp).\n\n  [gen_tcp:option()](`t:gen_tcp:option/0`) except for `ipv6_v6only`, `active`,\n  `packet`, `mode`, `packet_size` and `header`.\n\n  Default value is `SocketCtrls = []`.\n\n- **\\{sock_data_act, \\[SocketControl]\\}** - Passes options from\n  `[SocketControl]` down to the underlying transport layer (tcp).\n\n  `sock_data_act` uses the value of `sock_ctrl` as default value.\n\n- **\\{sock_data_pass, \\[SocketControl]\\}** - Passes options from\n  `[SocketControl]` down to the underlying transport layer (tcp).\n\n  `sock_data_pass` uses the value of `sock_ctrl` as default value.\n\n- **\\{progress, Progress\\}** - [](){: id=progress } Progress =\n  `ignore | {Module, Function, InitialData}`\n\n  `Module = atom()`, `Function = atom()`\n\n  `InitialData = term()`\n\n  Default is `ignore`.\n\n  Option `progress` is intended to be used by applications that want to create\n  some type of progress report, such as a progress bar in a GUI. Default for the\n  progress option is `ignore`, that is, the option is not used. When the\n  progress option is specified, the following happens when `ftp:send/[3,4]` or\n  `ftp:recv/[3,4]` are called:\n\n  - Before a file is transferred, the following call is made to indicate the\n    start of the file transfer and how large the file is. The return value of\n    the callback function is to be a new value for the `UserProgressTerm` that\n    will be used as input the next time the callback function is called.\n\n    `Module:Function(InitialData, File, {file_size, FileSize})`\n\n  - Every time a chunk of bytes is transferred the following call is made:\n\n    `Module:Function(UserProgressTerm, File, {transfer_size, TransferSize})`\n\n  - At the end of the file the following call is made to indicate the end of the\n    transfer:\n\n    `Module:Function(UserProgressTerm, File, {transfer_size, 0})`\n\n  The callback function is to be defined as follows:\n\n  `Module:Function(UserProgressTerm, File, Size) -> UserProgressTerm`\n\n  `UserProgressTerm = term()`\n\n  `File = string()`\n\n  `Size = {transfer_size, integer()} | {file_size, integer()} | {file_size, unknown}`\n\n  For remote files, `ftp` cannot determine the file size in a platform\n  independent way. In this case the size becomes `unknown` and it is left to the\n  application to determine the size.\n\n  > ##","ref":"ftp.html#open/2"},{"type":"function","title":"Note {: class=info } - ftp.open/2","doc":">\n  > The callback is made by a middleman process, hence the file transfer is not\n  > affected by the code in the progress callback function. If the callback\n  > crashes, this is detected by the FTP connection process, which then prints\n  > an info-report and goes on as if the progress option was set to `ignore`.\n\n  The file transfer type is set to the default of the FTP server when the\n  session is opened. This is usually ASCII mode.\n\n  The current local working directory (compare `lpwd/1`) is set to the value\n  reported by `file:get_cwd/1`, the wanted local directory.\n\n  The return value `Pid` is used as a reference to the newly created FTP client\n  in all other functions, and they are to be called by the process that created\n  the connection. The FTP client process monitors the process that created it\n  and terminates if that process terminates.\n\n[](){: id=pwd }","ref":"ftp.html#open/2-note-class-info"},{"type":"function","title":"ftp.pwd/1","doc":"Returns the current working directory at the remote server.\n\n[](){: id=recv } [](){: id=recv2 } [](){: id=recv3 }","ref":"ftp.html#pwd/1"},{"type":"function","title":"ftp.quote/2","doc":"> ##","ref":"ftp.html#quote/2"},{"type":"function","title":"Note {: class=info } - ftp.quote/2","doc":">\n> The telnet end of line characters, from the FTP protocol definition, CRLF, for\n> example, \"\\\\\\\\r\\\\\\\\n\" has been removed.\n\nSends an arbitrary FTP command and returns verbatim a list of the lines sent\nback by the FTP server. This function is intended to give application accesses\nto FTP commands that are server-specific or that cannot be provided by this FTP\nclient.\n\n> ##","ref":"ftp.html#quote/2-note-class-info"},{"type":"function","title":"Note {: class=info } - ftp.quote/2","doc":">\n> FTP commands requiring a data connection cannot be successfully issued with\n> this function.","ref":"ftp.html#quote/2-note-class-info"},{"type":"function","title":"ftp.recv/2","doc":"","ref":"ftp.html#recv/2"},{"type":"function","title":"ftp.recv/3","doc":"Transfers the file `RemoteFileName` from the remote server to the file system of\nthe local client. If `LocalFileName` is specified, the local file will be\n`LocalFileName`, otherwise `RemoteFileName`.\n\nIf the file write fails, the command is aborted and `{error, term()}` is\nreturned. However, the file is _not_ removed.\n\n[](){: id=recv_bin }","ref":"ftp.html#recv/3"},{"type":"function","title":"ftp.recv_bin/2","doc":"Transfers the file `RemoteFile` from the remote server and receives it as a\nbinary.\n\n[](){: id=recv_chunk_start }","ref":"ftp.html#recv_bin/2"},{"type":"function","title":"ftp.recv_chunk/1","doc":"Receives a chunk of the remote file (`RemoteFile` of `recv_chunk_start`). The\nreturn values have the following meaning:\n\n- `ok` = the transfer is complete.\n- `{ok, Bin}` = just another chunk of the file.\n- `{error, Reason}` = transfer failed.\n\n[](){: id=rename }","ref":"ftp.html#recv_chunk/1"},{"type":"function","title":"ftp.recv_chunk_start/2","doc":"Starts transfer of the file `RemoteFile` from the remote server.\n\n[](){: id=recv_chunk }","ref":"ftp.html#recv_chunk_start/2"},{"type":"function","title":"ftp.rename/3","doc":"Renames `Old` to `New` at the remote server.\n\n[](){: id=rmdir }","ref":"ftp.html#rename/3"},{"type":"function","title":"ftp.rmdir/2","doc":"Removes directory `Dir` at the remote server.\n\n[](){: id=send } [](){: id=send2 } [](){: id=send3 }","ref":"ftp.html#rmdir/2"},{"type":"function","title":"ftp.send/2","doc":"","ref":"ftp.html#send/2"},{"type":"function","title":"ftp.send/3","doc":"Transfers the file `LocalFileName` to the remote server. If `RemoteFileName` is\nspecified, the name of the remote file is set to `RemoteFileName`, otherwise to\n`LocalFileName`.\n\n[](){: id=send_bin }","ref":"ftp.html#send/3"},{"type":"function","title":"ftp.send_bin/3","doc":"Transfers the binary `Bin` into the file `RemoteFile` at the remote server.\n\n[](){: id=send_chunk }","ref":"ftp.html#send_bin/3"},{"type":"function","title":"ftp.send_chunk/2","doc":"Transfers the chunk `Bin` to the remote server, which writes it into the file\nspecified in the call to `send_chunk_start/2`.\n\nFor some errors, for example, file system full, it is necessary to to call\n`send_chunk_end` to get the proper reason.\n\n[](){: id=send_chunk_start }","ref":"ftp.html#send_chunk/2"},{"type":"function","title":"ftp.send_chunk_end/1","doc":"Stops transfer of chunks to the remote server. The file at the remote server,\nspecified in the call to `send_chunk_start/2` is closed by the server.\n\n[](){: id=type }","ref":"ftp.html#send_chunk_end/1"},{"type":"function","title":"ftp.send_chunk_start/2","doc":"Starts transfer of chunks into the file `RemoteFile` at the remote server.\n\n[](){: id=send_chunk_end }","ref":"ftp.html#send_chunk_start/2"},{"type":"function","title":"ftp.type/2","doc":"Sets the file transfer type to `ascii` or `binary`. When an FTP session is\nopened, the default transfer type of the server is used, most often `ascii`,\nwhich is default according to [RFC 959](http://www.ietf.org/rfc/rfc959.txt).\n\n[](){: id=user3 }","ref":"ftp.html#type/2"},{"type":"function","title":"ftp.user/3","doc":"Performs login of `User` with `Pass`.\n\n[](){: id=user4 }","ref":"ftp.html#user/3"},{"type":"function","title":"ftp.user/4","doc":"Performs login of `User` with `Pass` to the account specified by `Account`.\n\n[](){: id=quote }","ref":"ftp.html#user/4"},{"type":"extras","title":"FTP Release Notes","doc":"# FTP Release Notes","ref":"notes.html"},{"type":"extras","title":"Ftp 1.2 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-2"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Fixes the documentation for the `ftp` module and updates the typing of `ftp`\n  functions that return errors.\n\n  The documentation has been improved and the types of the functions are now\n  read from source code, instead of being hard-coded in XML.\n\n  Functions returning errors of the form `{error, Reason :: 'ehost' | ...}` are\n  now similar to other modules, i.e., `{error, Reason :: term()}`. If one wants\n  to understand the error, one must call the function\n  `ftp:formaterror({error, Reason})`.\n\n  Own Id: OTP-18359 Aux Id: PR-6545\n\n#","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Improvements and New Features - FTP Release Notes","doc":"- Deprecates `dbg:stop_clear/0` because it is simply a function alias to\n  `dbg:stop/0`\n\n  Own Id: OTP-18478 Aux Id: GH-6903\n\n- Remove deprecated functions in OTP-26\n\n  Own Id: OTP-18541","ref":"notes.html#improvements-and-new-features"},{"type":"extras","title":"Ftp 1.1.4 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-1-4"},{"type":"extras","title":"Improvements and New Features - FTP Release Notes","doc":"- Replace size/1 with either tuple_size/1 or byte_size/1\n\n  The `size/1` BIF is not optimized by the JIT, and its use can result in worse\n  types for Dialyzer.\n\n  When one knows that the value being tested must be a tuple, `tuple_size/1`\n  should always be preferred.\n\n  When one knows that the value being tested must be a binary, `byte_size/1`\n  should be preferred. However, `byte_size/1` also accepts a bitstring (rounding\n  up size to a whole number of bytes), so one must make sure that the call to\n  `byte_size/` is preceded by a call to `is_binary/1` to ensure that bitstrings\n  are rejected. Note that the compiler removes redundant calls to `is_binary/1`,\n  so if one is not sure whether previous code had made sure that the argument is\n  a binary, it does not harm to add an `is_binary/1` test immediately before the\n  call to `byte_size/1`.\n\n  Own Id: OTP-18432 Aux Id:\n  GH-6672,PR-6793,PR-6784,PR-6787,PR-6785,PR-6682,PR-6800,PR-6797,PR-6798,PR-6799,PR-6796,PR-6813,PR-6671,PR-6673,PR-6684,PR-6694,GH-6677,PR-6696,PR-6670,PR-6674","ref":"notes.html#improvements-and-new-features"},{"type":"extras","title":"Ftp 1.1.3 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-1-3"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Fixes calls to `ftp:nlist/2` returning `{error, epath}` when the file / folder\n  exists\n\n  Own Id: OTP-18409 Aux Id: PR-6721,ERIERL-908","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.1.2 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-1-2"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- fix unexpected result `ok` when calling `ftp:nlist` repeatedly\n\n  Own Id: OTP-18252 Aux Id: GH-5823","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.1.1 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-1-1"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- An unexpected timeout message on the FTP control channel was observed in a\n  real system and could not be associated with anything that was expected to\n  happen, so we will ignore but info log such unexpected messages.\n\n  Own Id: OTP-17989 Aux Id: ERIERL-767","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.1 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-1"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Use OTP supervisor as intended, avoiding surprising behavior as the killing of\n  the user's process. Also, FTP state handling logic is improved to avoid race\n  conditions that could result in unexpected errors.\n\n  Own Id: OTP-16926 Aux Id: ERL-1450, GH-4473\n\n- Missing runtime dependencies has been added to this application.\n\n  Own Id: OTP-17243 Aux Id: PR-4557\n\n#","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Improvements and New Features - FTP Release Notes","doc":"- Add support for FTPES (explicit FTP over TLS).\n\n  Own Id: OTP-15523 Aux Id: OTP-15352, PR-1968","ref":"notes.html#improvements-and-new-features"},{"type":"extras","title":"Ftp 1.0.5 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-5"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Avoid timing issue when setting active once on a socket that is being closed\n  by the peer.\n\n  Own Id: OTP-16734 Aux Id: OTP-16697, ERIERL-496","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.0.4.1 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-4-1"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Avoid timing issue when setting active once on a socket that is being closed\n  by the peer.\n\n  Own Id: OTP-16734 Aux Id: OTP-16697, ERIERL-496","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.0.4 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-4"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- A possibly infinite loop is removed.\n\n  Own Id: OTP-16243 Aux Id: PR-2436, OTP-16056\n\n#","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Improvements and New Features - FTP Release Notes","doc":"- Removed compiler warnings.\n\n  Own Id: OTP-16318 Aux Id: OTP-16183","ref":"notes.html#improvements-and-new-features"},{"type":"extras","title":"Ftp 1.0.3 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-3"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- A possibly infinite loop when receiving messages divided in parts is removed.\n\n  Own Id: OTP-16056","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.0.2.2 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-2-2"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- A possibly infinite loop is removed.\n\n  Own Id: OTP-16243 Aux Id: PR-2436, OTP-16056","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.0.2.1 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-2-1"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- A possibly infinite loop when receiving messages divided in parts is removed.\n\n  Own Id: OTP-16056","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.0.2 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-2"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Fixed timing related bug that could make ftp functions behave badly.\n\n  Own Id: OTP-15659 Aux Id: ERIERL-316","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"Ftp 1.0.1 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0-1"},{"type":"extras","title":"Fixed Bugs and Malfunctions - FTP Release Notes","doc":"- Improved documentation.\n\n  Own Id: OTP-15190","ref":"notes.html#fixed-bugs-and-malfunctions"},{"type":"extras","title":"FTP 1.0 - FTP Release Notes","doc":"#","ref":"notes.html#ftp-1-0"},{"type":"extras","title":"First released version - FTP Release Notes","doc":"- Inets application was split into multiple smaller protocol specific\n  applications. The FTP application is a standalone FTP client with the same\n  functionality as FTP client in Inets.\n\n  Own Id: OTP-14113","ref":"notes.html#first-released-version"},{"type":"extras","title":"Introduction","doc":"# Introduction","ref":"introduction.html"},{"type":"extras","title":"Purpose - Introduction","doc":"An `FTP` client.","ref":"introduction.html#purpose"},{"type":"extras","title":"Prerequisites - Introduction","doc":"It is assumed that the reader is familiar with the Erlang programming language,\nconcepts of OTP, and has a basic understanding of the FTP protocol.","ref":"introduction.html#prerequisites"},{"type":"extras","title":"FTP Client","doc":"# FTP Client","ref":"ftp_client.html"},{"type":"extras","title":"Getting Started - FTP Client","doc":"FTP clients are considered to be rather temporary. Thus, they are only started\nand stopped during runtime and cannot be started at application startup. The FTP\nclient API is designed to allow some functions to return intermediate results.\nThis implies that only the process that started the FTP client can access it\nwith preserved sane semantics. If the process that started the FTP session dies,\nthe FTP client process terminates.\n\nThe client supports IPv6 as long as the underlying mechanisms also do so.\n\nThe following is a simple example of an FTP session, where the user `guest` with\npassword `password` logs on to the remote host `erlang.org`:\n\n```erlang\n      1> ftp:start().\n      ok\n      2> {ok, Pid} = ftp:open([{host, \"erlang.org\"}]).\n      {ok,<0.22.0>}\n      3> ftp:user(Pid, \"guest\", \"password\").\n      ok\n      4> ftp:pwd(Pid).\n      {ok, \"/home/guest\"}\n      5> ftp:cd(Pid, \"appl/examples\").\n      ok\n      6> ftp:lpwd(Pid).\n      {ok, \"/home/fred\"}.\n      7> ftp:lcd(Pid, \"/home/eproj/examples\").\n      ok\n      8> ftp:recv(Pid, \"appl.erl\").\n      ok\n      9> ftp:close(Pid).\n      ok\n      10> ftp:stop().\n      ok\n```\n\nThe file `appl.erl` is transferred from the remote to the local host. When the\nsession is opened, the current directory at the remote host is `/home/guest`,\nand `/home/fred` at the local host. Before transferring the file, the current\nlocal directory is changed to `/home/eproj/examples`, and the remote directory\nis set to `/home/guest/appl/examples`.","ref":"ftp_client.html#getting-started"}],"content_type":"text/plain"}