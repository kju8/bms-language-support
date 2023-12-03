# bms格式支持

## 特点

- 语法高亮
- 悬停信息（只有一行）
- 支持缩进
- 支持命令
  - RANDOM/IF Block
    (``#RANDOM``， ``#SETRANDOM``， ``#ENDRANDOM``， ``#IF``， ``#ELSEIF``， ``#ELSE``， ``#IF``)
  - SWITCH Block
    (``#SWITCH``， ``#SETSWITCH``， ``#ENDSW``， ``#CASE``， ``#SKIP``， ``#DEF``)
  - Major&Minor Definition Commands
    ``#PLAYER``， ``#RANK``， ``#DEFEXRANK``， ``#EXRANK``， ``#TOTAL``， ``#VOLWAV``， ``STAGEFILE``， ``#BANNER``， ``#BACKBMP``，``#CHARFILE``， ``#PLAYLEVEL``， ``#DIFFICULTY``， ``#TITLE``， ``#SUBTITLE``， ``#ARTIST``， ``#SUBARTIST``， ``#MAKER``， ``#GENRE``， ``#COMMENT``， ``#TEXT``， ``#SONG``， ``#BPM``， ``#EXBPM``， ``#BASEBPM``， ``#STOP``， ``#STP``， ``#LNTYPE``， ``#LNOBJ``， ``#LNMODE``， ``#OCT/FP``， ``#WAV``， ``#BMP``， ``#SCROLL``， ``#SPEED``
- 支持通道
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

## 计划

- 更多命令支持
  - ``#OPTION``， ``#CHANGEOPTION``， ``#WAVCMD``， ``#EXWAV``， ``#CDDA``， ``#MIDIFILE``， ``#EXBMP``， ``#BGA``， ``#@BGA``， ``#POORBGA``， ``#SWBGA``， ``#ARGB``， ``#VIDEOFILE``， ``#VIDEOf/s``， ``#VIDEOCOLORS``， ``#VIDEODLY``， ``#MOVIE``， ``#SEEK``， ``#ExtChr``， ``#MATERIALSWAV``， ``#MATERIALSBMP``， ``#DIVIDEPROP``， ``#CHARSET``, etc...
- 通道悬停信息
- 添加片段
- 添加衬垫
- 预览 (!?)
- 英语支持

## 发行日志

### 0.1.3

- 重新修复 03 通道错误

### 0.1.2

- 增加 SC&SP 通道
- 修复 SCROLL&SPEED 悬停信息
- 修复 03 通道错误
- 修复 README (thx [hitkey](https://hitkey.nekokan.dyndns.info/diary1908.php#D190807))

### 0.1.1

- 修复 README

### 0.1.0

- 添加悬停信息
- 修复 ``#BPMxx``
- 增加 ``#LNMODE`` 支持

### 0.0.1

- 首次发布

## 特别鸣谢

[BMS command memo](https://hitkey.nekokan.dyndns.info/cmds.htm) [(Japanese Version)](https://hitkey.nekokan.dyndns.info/cmdsJP.htm)
