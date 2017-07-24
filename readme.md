## Burn Contrib Banner ##

### NPM Install 
>> npm install -g burn-contrib-banner --save-dev

### Basic Usage
go to the root work directory and run below
`>> burn`

### Parameters 
- waiting for the end frames of banners (milisecond) `--delay` / `-d`
- folders banners (array separate ",") `--folder` / `-f`
- turn on zip feature (boolean) `--zip` / `-z`
- trun on capture feature (boolean) `--zip` / `-z`
- selector element to be burn (selector DOM) `--selector` / `-s`

### Example Parameters Usage: 
`>> burn -d 10000 -f "drive/folder_target" -z true -c false -s #container`