# Common bash commands

`cd` - Change directory, e.g. `cd /public/themes/`

`ls` - List files & directories

::: tip
Useful flags:
`-a` - Include directory entries whose names begin with a dot (.).
`-l` - List in long format.
:::

`cat &lt;file&gt;` - Print the contents of a file out, e.g. `cat statamic.log` will output the entire file

`tail &lt;file&gt;` - Print the content of a file out, similar to `cat`, e.g. `tail stamic.log`

::: tip
Useful flags:
`-f` - Do not stop when end of file is reached, but rather to wait for additional data to be appended to the input
:::

`rm <file/dir>` - Remove a file

::: tip
Useful flags:
`-d` - Attempt to remove directories as well as other types of files.
`-R` - Has `-d` implied, recursively removes descendant directories/files.
`-f` - Attempt to remove the files without prompting for confirmation, regardless of the file's permissions.
:::

`mkdir &lt;new dir name&gt;` - Make a new directory in the current directory, e.g. `mkdir pictures`
::: tip
Useful flags:
`-p` - Specify a longer path to create multiple directories at once. e.g. `mkdir -p assets/images/svg`

`rmdir &lt;existing dir name&gt;` - Remove a directory

`pwd` - Displays the path to the current directory.

`touch &lt;file&gt;` - Create a new file

`cp` - Copy specified file to a new named file. Use -r flag to copy a directory.

`mv &lt;source&gt; &lt;renamed source&gt;` - Rename a specified file or directory.
`mv &lt;source&gt; &lt;new location&gt;` - Move a specified directory, e.g. `mv README.md ../public/`