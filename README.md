# bms-language-support

## Features

- Syntax Highlight
- Hover Infomation(Only Comannd Line)

- Support Indent
- Support Command
  - RANDOM/IF Block
    (``#RANDOM``, ``#SETRANDOM``, ``#ENDRANDOM``, ``#IF``, ``#ELSEIF``, ``#ELSE``, ``#IF``)
  - SWITCH Block
    (``#SWITCH``, ``#SETSWITCH``, ``#ENDSW``, ``#CASE``, ``#SKIP``, ``#DEF``)
  - Major&Minor Definition Commands
    ``#PLAYER``, ``#RANK``, ``#DEFEXRANK``, ``#EXRANK``, ``#TOTAL``, ``#VOLWAV``, ``STAGEFILE``, ``#BANNER``, ``#BACKBMP``,``#CHARFILE``, ``#PLAYLEVEL``, ``#DIFFICULTY``, ``#TITLE``, ``#SUBTITLE``, ``#ARTIST``, ``#SUBARTIST``, ``#MAKER``, ``#GENRE``, ``#COMMENT``, ``#TEXT``, ``#SONG``, ``#BPM``, ``#EXBPM``, ``#BASEBPM``, ``#STOP``, ``#STP``, ``#LNTYPE``, ``#LNOBJ``, ``#LNMODE``, ``#OCT/FP``, ``#WAV``, ``#BMP``, ``#SCROLL``, ``#SPEED``
- Support Placement Channel
  - ``01``(BGM Channel)
  - ``02``(Measure Length)
  - ``03``(BPM), ``08``(BPMxx)
  - ``09``(STOP)
  - ``04``(BGA Base), ``06``(BGA Missed), ``07``(BGA Layer), ``0A``(BGA Layer2)
  - ``11-19``(1P Notes), ``21-29``(2P Notes)
  - ``31-39``(1P Invisible), ``41-49``(2P Invisible)
  - ``51-59``(1P Longnotes), ``61-69``(2P Longnotes)
  - ``D1-D9``(1P Mines), ``E1-E9``(2P Mines)
  - ``99``(TEXT)
  - ``A0``(JUDGE)
  - ``SC``(SCROLL), ``SP``(SPEED)

## TO-DO

- More Commands
  - ``#OPTION``, ``#CHANGEOPTION``, ``#WAVCMD``, ``#EXWAV``, ``#CDDA``, ``#MIDIFILE``, ``#EXBMP``, ``#BGA``, ``#@BGA``, ``#POORBGA``, ``#SWBGA``, ``#ARGB``, ``#VIDEOFILE``, ``#VIDEOf/s``, ``#VIDEOCOLORS``, ``#VIDEODLY``, ``#MOVIE``, ``#SEEK``, ``#ExtChr``, ``#MATERIALSWAV``, ``#MATERIALSBMP``, ``#DIVIDEPROP``, ``#CHARSET``, etc...
- Channel Hover Infomation
- Add Snippet
- Add Linter
- Preview (!?)
- English Support

## Release Notes

### 0.1.3

- Re-Fix 03 Channel Error

### 0.1.2

- Add SC&SP Channel
- Fix SCROLL&SPEED Hover
- Fix 03 Channel Error
- Fix README (thx [hitkey](https://hitkey.nekokan.dyndns.info/diary1908.php#D190807))

### 0.1.1

- Fix README

### 0.1.0

- Add Hover Infomation
- Fix ``#BPMxx``
- Add ``#LNMODE`` Support

### 0.0.1

- Initial release

## Thanks

[BMS command memo](https://hitkey.nekokan.dyndns.info/cmds.htm) [(Japanese Version)](https://hitkey.nekokan.dyndns.info/cmdsJP.htm)
