## Global node package for compiling banner's asstes ##

### NPM Install 
`npm install -g burn-contrib-banner`

### Basic Usage
go to the root work directory and type command
`burn` then hit enter

### Parameters 
- type of burn (string) `--type / -t`
- numbers of image png to be gif `--range / -r` (agif only)
- waiting for the end frames of the banners timelines (milisecond) `--delay` / `-d`
- banner directory (array separate ",") `--folder` / `-f`
- turn on zip feature (boolean) `--zip` / `-z`
- trun on capture feature (boolean) `--zip` / `-z`
- selector element to be burn (selector DOM) `--selector` / `-s`
- determine image quality (int) `--quality` / `-q`

### Example Parameters Usage: 
`>> burn -d 10000 -f "drive/folder_target" -z true -c false -s #container -q 100`

#### Backup image as gif 
`>> burn -t gif`

#### Backup image as animation gif 
`>> burn -t agif`
