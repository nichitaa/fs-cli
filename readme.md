> Pasecinic Nichita - FAF 192
>
> 07.11.2021
>
> CLI - with some default file system functionalities that a SO would have.

To install:

```bash
$ git clone <url_to_this_repo>
$ cd fs-cli # cd into the root of the project

$ npm run build
$ # or 
$ tsc # compile it
$ npm i -g . # install the cli globally
$ so --help # check that it works 
```

Available commands:

```bash
$ # ldir - list the content of current working directory 
$ so ldir

$ # ndir - create new folder in current working directory 
$ so ndir newFolder/otherFolder

$ # nfile - create new file in current working directory
$ so nfile index.ts
```

![recording2](https://github.com/nichitaa/fs-cli/blob/main/gif/gif.gif)
