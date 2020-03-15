# Hexlet project Gendiff

[![Node CI](https://github.com/bondiano/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/bondiano/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/c231f8a3989bcd465d2a/maintainability)](https://codeclimate.com/github/bondiano/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c231f8a3989bcd465d2a/test_coverage)](https://codeclimate.com/github/bondiano/frontend-project-lvl2/test_coverage)

Simple CLI-tool for take difference between configuration files. Support formats: `*.json`, `*.yaml`, `*.ini`.

[Read more about this education project](https://ru.hexlet.io/professions/frontend/projects/46).

## Installation

Install all dependencies:
```sh
make install
```

Create package:
```sh
make publish
```

Install packages:
```sh
npm link
```

## Run tests

```sh
$ make test
```

## Usage

### Help

For get help run:
```sh
gendiff --help
```

### Simple run

To compare two files run:
```sh
gendiff [options] <pathToFirstFile> <pathToSecondFile>
```

### Supported output formats

To specify output format add `--format` flag and type of the output:
```sh
gendiff --format [type] <pathToFirstFile> <pathToSecondFile>
```

Supported `[type]`: __diff__(*default*), __plain__, __json__

### Examples

#### Diff format

With JSON input

[![asciicast](https://asciinema.org/a/JJHxbXDbZifHmNFG1gQbGlyuk.svg)](https://asciinema.org/a/JJHxbXDbZifHmNFG1gQbGlyuk)

With Yaml input

[![asciicast](https://asciinema.org/a/0z66pSXFIrRxA1C50JDcwZVFH.svg)](https://asciinema.org/a/0z66pSXFIrRxA1C50JDcwZVFH)

With Ini input

[![asciicast](https://asciinema.org/a/c4MFiA0EvqWH2ECYkfSGCejsN.svg)](https://asciinema.org/a/c4MFiA0EvqWH2ECYkfSGCejsN)

#### Plain format

[![asciicast](https://asciinema.org/a/ola7gYqPGUDCSVt8LWtumL01K.svg)](https://asciinema.org/a/ola7gYqPGUDCSVt8LWtumL01K)

#### Json format

[![asciicast](https://asciinema.org/a/FxBvurWsRwCTxARhIRSwdPzYj.svg)](https://asciinema.org/a/FxBvurWsRwCTxARhIRSwdPzYj)