# @wangyjhh/dnsr

A domain records management tool for Alibaba Cloud DNS implemented based on the official SDK.

## Install
```bash
# npm
npm i @wangyjhh/dnsr -g

# pnpm
pnpm add @wangyjhh/dnsr -g
```
## Usage

```html
Usage: dnsr [options] [command]

Alibaba Cloud Domain Records management tool.

Options:
  -v, --version                      Output version number.
  -h, --help                         display help for command

Commands:
  config <tpye>                      Configuration
  list|ls                            Review the domain records.
  add|ad                             Add the domain records.
  remove|rm                          Remove the domain records.
  modify|mo                          Modify the domain records.
  help [command]                     display help for command
```
## Example

Enter the command and fill in the necessary information according to the command line instructions

#### Get Config
```bash
dnsr config get
```
#### Set Config
```bash
dnsr config set
```
#### Default Config
```bash
dnsr config default
```
#### Remove Config
```bash
dnsr config remove
```
#### Clear Config
```bash
dnsr config clear
```
#### Get Domain Records List
```bash
dnsr list
```
```bash
# The following commands will also work
dnsr ls
```
#### Add Domain Records
```bash
dnsr add
```
```bash
# The following commands will also work
dnsr ad
dnsr insert
```
#### Remove Domain Records
```bash
dnsr remove
```
```bash
# The following commands will also work
dnsr rm
dnsr delete
```
#### Modify Domain Records
```bash
dnsr modify
```
```bash
# The following commands will also work
dnsr mo
dnsr edit
```
