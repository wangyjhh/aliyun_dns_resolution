# @wangyjhh/dnsr

A security group rule management tool for Alibaba Cloud ESC implemented based on the official SDK.

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

Alibaba Cloud security group rule management tool.

Options:
  -v, --version                      Output version number.
  -h, --help                         display help for command

Commands:
  config <tpye>                      Configuration
  list|ls                            Review the security group rules.
  add|ad                             Add the security group rules.
  remove|rm                          Remove the security group rules.
  modify|mo                          Modify the security group rules.
  help [command]                     display help for command
```
## Example

Enter the command and fill in the necessary information according to the command line instructions

#### Get config
```bash
dnsr config get
```
#### Set config
```bash
dnsr config set
```
#### Default config
```bash
dnsr config default
```
#### Remove config
```bash
dnsr config remove
```
#### Clear config
```bash
dnsr config clear
```
#### Get Security group rules list
```bash
dnsr list
```
```bash
# The following commands will also work
dnsr ls
```
#### Add Security group rules
```bash
dnsr add
```
```bash
# The following commands will also work
dnsr ad
dnsr insert
```
#### Remove Security group rules
```bash
dnsr remove
```
```bash
# The following commands will also work
dnsr rm
dnsr delete
```
#### Modify Security group rules
```bash
dnsr modify
```
```bash
# The following commands will also work
dnsr mo
dnsr edit
```
