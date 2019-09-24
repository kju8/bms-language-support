import * as nls from 'vscode-nls';
export let localize = nls.loadMessageBundle();

import stripIndent = require('strip-indent');
import { localizeTempKey , descriptionObj , bmsCommand } from './types';

import * as url from 'url';
import * as path from 'path';

function localizeTemp(strings: TemplateStringsArray, ...keys: localizeTempKey[]) {
	return (function (defaultStrings: {[_key: string]: string}) {
		let resultFormatStrings: string[][] = [[strings[0]]];
		let resultFormatCallback: localizeTempKey[] = [];
		keys.forEach(function (key, i) {
			if (typeof key === "number" || typeof key === "function") {
				resultFormatStrings.push([strings[i + 1]]);
				resultFormatCallback.push(key);
			}
			else {
				let value = stripIndent(localize(key, defaultStrings[key])).replace(/\n/g, "\\n");
				resultFormatStrings[resultFormatStrings.length - 1].push(value, strings[i + 1]);
			}
		});
		return (function (obj: descriptionObj ,...args: string[]) : string{
			let result: string[] = [resultFormatStrings[0].join('')];
			for (let i = 1; i < resultFormatStrings.length; i++) {
				let resultFormatCallbackSingle = resultFormatCallback[i - 1];
				if (typeof resultFormatCallbackSingle === "function") {
					result.push(resultFormatCallbackSingle(obj, ...args), resultFormatStrings[i].join(''));
				}
			}
			return stripIndent(result.join('')).replace(/\\n/g, "\n");
		});
	});
}

let __definitions = new Map<RegExp, bmsCommand>();
__definitions.set(/#player/i, {
	title: "#PLAYER _[1-4]_",
	support: {"lr2": false, "nanasi": false, "beatoraja": true, "qms":false, "bemuse": "Only 1"},
	descriptionTemp:
	localizeTemp`
	${'definition.player'}

	1. ${(function(o,i){return i=="1" ?  "**" : "";})}Single Play${(function(o,i){return i=="1" ?  "**" : "";})}
	2. ${(function(o,i){return i=="2" ?  "**" : "";})}Couple Play${(function(o,i){return i=="2" ?  "**" : "";})}
	3. ${(function(o,i){return i=="3" ?  "**" : "";})}Double Play${(function(o,i){return i=="3" ?  "**" : "";})}
	4. ${(function(o,i){return i=="4" ?  "**" : "";})}Battle Play${(function(o,i){return i=="4" ?  "**" : "";})}

	${'definition.player.caution'}
	`,
	defaultStrings: {
		"definition.player": "プレイヤー数を指定します。省略時は1です。",
		"definition.player.caution": "近年のプレイヤーは、実際に配置されたノートからプレイヤー数を推測し、この値を使いません。\\\nまた、ほとんどのプレイヤーは2〜4を同一視します。"
	},
	link: [{
		name: localize("definition.player.link.name", "BMS Command Memo (JP)"),
		url: localize("definition.player.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#PLAYER")
	}]
});
__definitions.set(/#rank/i, {
	title: "#RANK _[0-3]|4_",
	support: {"lr2":"[0-3]", "nanasi": true, "beatoraja": true, "qms":"[0-3]", "bemuse":false},
	descriptionTemp:
	localizeTemp`
	${'definition.rank'}

	0. ${(function(o,i){return i=="0" ?  "**" : "";})}Very Hard${(function(o,i){return i=="0" ?  "**" : "";})}
	1. ${(function(o,i){return i=="1" ?  "**" : "";})}Hard${(function(o,i){return i=="1" ?  "**" : "";})}
	2. ${(function(o,i){return i=="2" ?  "**" : "";})}Normal${(function(o,i){return i=="2" ?  "**" : "";})}
	3. ${(function(o,i){return i=="3" ?  "**" : "";})}Easy${(function(o,i){return i=="3" ?  "**" : "";})}
	4. ${(function(o,i){return i=="4" ?  "**" : "";})}Very Easy${(function(o,i){return i=="4" ?  "**" : "";})}
	`,
	defaultStrings: {
		"definition.rank": "判定幅を指定します。大きな数字ほど広く、簡単になります。",
		"definition.rank.veryeasy": "LR2は対応していません。"
	},
	link: [{
		name: localize("definition.rank.link.name", "BMS Command Memo (JP)"),
		url: localize("definition.rank.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#RANK")
	}]
});
__definitions.set(/#DEFEXRANK/i, {
	title: "#DEFEXRANK _number_",
	support: {"lr2": false, "nanasi": true, "beatoraja": "△", "qms": false, "bemuse":false},
	descriptionTemp:
	localizeTemp`
	${'definition.defexrank'}

	${'definition.defexrank.caution'}

	|RANK LEVEL|#RANK|#DEFEXRANK (nanasi)|#DEFEXRANK (beatoraja)|
	|:--------:|----:|------------------:|---------------------:|
	|VERY HARD|0|48|33|
	|HARD|1|64|50|
	|NORMAL|2|**100**|75|
	|EASY|3|120|**100**|
	|VERY EASY|4|160|133|
	`,
	defaultStrings: {
		"definition.defexrank": "NORMAL判定を100とした相対的な判定幅を指定します。",
		"definition.defexrank.caution": "ただしNORMAL以外の#RANKとの対応は本体に差がある他、beatorajaではEASYを100とした相対値としています。"
	},
	link: [
		{
			name: localize("definition.defexrank.link1.name", "BMS Command Memo (JP)"),
			url: localize("definition.defexrank.link1.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#DEFEXRANK")
		},
		{
			name: localize("definition.defexrank.link1.name", "beatoraja 楽曲製作者向け資料"),
			url: localize("definition.defexrank.link2.url", "https://github.com/exch-bms2/beatoraja/wiki/%E6%A5%BD%E6%9B%B2%E8%A3%BD%E4%BD%9C%E8%80%85%E5%90%91%E3%81%91%E8%B3%87%E6%96%99#bms%E6%8B%A1%E5%BC%B5%E5%AE%9A%E7%BE%A9")
		}
	]
});
__definitions.set(/#EXRANK[0-9A-Z]{0,2}/i, {
	title: "#EXRANK_[01-ZZ]_ _number_",
	support: {"lr2": false, "nanasi": true, "beatoraja": false, "qms": false, "bemuse": false},
	channel: "A0",
	descriptionTemp:
	localizeTemp`
	${"definition.exrank"}
	`,
	defaultStrings: {
		"definition.exrank": "動的に判定幅を変更します。指定はDEFEXRANKと同じです。"
	},
	link: [{
		"name": localize("definition.exrank.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.exrank.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#EXRANK")
	}]
});
__definitions.set(/#TOTAL/i, {
	title: "#TOTAL _number_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms":true, "bemuse":false},
	descriptionTemp:
	localizeTemp`
	${'definition.total'}
	`,
	"defaultStrings": {
		"definition.total": "ゲージの増加量を指定します。\n\nNORMALゲージにおいて、すべてのノーツを最善の判定で演奏された場合、_number_%ゲージは増加します。その他の判定やゲージにおいての影響は本体に依存します。"
	},
	link: [{
		"name": localize("definition.total.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.total.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#TOTAL")
	}]
});
__definitions.set(/#VOLWAV/i, {
	"title": "#VOLWAV _number_",
	"support": {"lr2": false, "nanasi": false, "beatoraja": true, "qms": false, "bemuse": false},
	"descriptionTemp":
	localizeTemp`
	${'definition.volwav'}
	`,
	"defaultStrings": {
		"definition.volwav": "**#WAV[00-ZZ]**で定義された音声ファイルはすべて_number_%の音量で再生されます。"
	},
	"link": [{
		"name": localize("definition.volwav.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.volwav.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#VOLWAV")
	}]
});
__definitions.set(/#STAGEFILE/i, {
	"title": "#STAGEFILE _imagefile_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": false},
	"descriptionTemp":
	localizeTemp`
	${'definition.stagefile'}
	`,
	"defaultStrings": {
		"definition.stagefile": "読み込み画面で表示される画像を設定します。"
	},
	"link": [{
		"name": localize("definition.stagefile.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.stagefile.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#TOTAL")
	}]
});
__definitions.set(/#BANNER/i, {
	title: "#BANNER _imagefile_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": false},
	"descriptionTemp":
	localizeTemp`
	${'definition.banner'}
	`,
	"defaultStrings": {
		"definition.banner": "選曲画面に表示されるバナー画像を設定します。標準サイズは300px × 80pxです。"
	},
	"link": [{
		"name": localize("definition.banner.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.banner.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BANNER")
	}]
});
__definitions.set(/#BACKBMP/i, {
	title: "#BACKBMP _imagefile_",
	support: {"lr2": "△", "nanasi": true, "beatoraja": "△", "qms": true, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.backbmp'}

	${'definition.backbmp.caution'}
	`,
	defaultStrings: {
		"definition.backbmp": "プレイスキンの背景を設定します。",
		"definition.backbmp.caution": "LR2やbeatorajaではデフォルトスキンでは使用されていませんが、スキンからこの画像を読み込むことができるため、一部のスキンではプレイ直前の曲情報の表示のために使用しています。"
	},
	link: [
		{
			name: localize("definition.backbmp.link1.name", "BMS Command Memo (JP)"),
			url: localize("definition.backbmp.link1.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BANNER")
		},
		{
			name: localize("definition.backbmp.link2.name", "LR2用スキン「OVER ACTiVE DX+」における仕様"),
			url: localize("definition.backbmp.link2.url", "http://right-stick.sub.jp/backbmp/index.html")
		}
	]
});
__definitions.set(/#CHARFILE/i, {
	title: "#CHARFILE _characterfile_",
	support: {"lr2": false, "nanasi": false, "beatoraja": false, "qms": false, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.charfile'}
	`,
	defaultStrings: {
		"definition.charfile": "プレイ画面の左右に表示するキャラクターファイル(.chp)を設定します。"
	},
	link: [
		{
			name: localize("definition.charfile.link1.name", "BMS Command Memo (JP)"),
			url: localize("definition.charfile.link1.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#CHARFILE")
		},
		{
			name: localize("definition.charfile.link2.name", "続！てきとうなキャラ作成講座"),
			url: localize("definition.charfile.link2.url", "https://web.archive.org/web/20090509183309/http://m-nekomi.cool.ne.jp/newpage/mu2/Make2.htm")
		}
	]
});
__definitions.set(/#PLAYLEVEL/i, {
	"title": "#PLAYLEVEL _number_",
	"support": {"lr2": true, "nanasi": "_number\\|string_", "beatoraja": true, "qms": true, "bemuse": true},
	"descriptionTemp":
	localizeTemp`
	${'definition.playlevel'}

	${'definition.playlevel.defacto'}
	`,
	"defaultStrings": {
		"definition.playlevel": "選曲画面に表示される難易度表記を設定します。",
		"definition.playlevel.defacto": "`beatmaniaIIDX`に倣い、1〜12の範囲で設定することが一般的ですが、譜面形態に応じ`beatmania`に合わせ9段階にすることや、`pop'n Music`に合わせた50段階を設定することもできます。\\\nナナシグルーヴでは文字列も許容します。"
	},
	"link": [{
		"name": localize("definition.playlevel.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.playlevel.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#PLAYLEVEL")
	}]
});
__definitions.set(/#DIFFICULTY/i, {
	"title": "#DIFFICULTY _[1-5]_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": "_[1-4] or 5_"},
	"descriptionTemp":
	localizeTemp`
	${'definition.difficulty'}

	1. ${(function(o,i){return i=="1" ?  "**" : ""; })}EASY${(function(o,i){return i=="1" ?  "**" : ""; })}
	2. ${(function(o,i){return i=="2" ?  "**" : ""; })}NORMAL${(function(o,i){return i=="2" ?  "**" : ""; })}
	3. ${(function(o,i){return i=="3" ?  "**" : ""; })}HYPER${(function(o,i){return i=="3" ?  "**" : ""; })}
	4. ${(function(o,i){return i=="4" ?  "**" : ""; })}ANOTHER${(function(o,i){return i=="4" ?  "**" : ""; })}
	5. ${(function(o,i){return i=="5" ?  "**" : ""; })}INSANE${(function(o,i){return i=="5" ?  "**" : ""; })}
	`,
	"defaultStrings": {
		"definition.difficulty": "楽曲内での難易度種別を指定します。"
	},
	"link": [{
		"name": localize("definition.difficulty.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.difficulty.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#DIFFICULTY")
	}]
});
__definitions.set(/#TITLE/i, {
	"title": "#TITLE _string_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	"descriptionTemp":
	localizeTemp`
	${'definition.title'}
	`,
	"defaultStrings": {
		"definition.title": "楽曲タイトルを指定します。"
	},
	"link": [{
		"name": localize("definition.title.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.title.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#TITLE")
	}]
});
__definitions.set(/#SUBTITLE/i, {
	"title": "#SUBTITLE _string_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	"descriptionTemp":
	localizeTemp`
	${'definition.subtitle'}
	`,
	"defaultStrings": {
		"definition.subtitle": "副題を指定します。"
	},
	"link": [{
		"name": localize("definition.subtitle.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.subtitle.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#SUBTITLE")
	}]
});
__definitions.set(/#ARTIST/i, {
	"title": "#ARTIST _string_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	"descriptionTemp":
	localizeTemp`
	${'definition.artist'}
	`,
	"defaultStrings": {
		"definition.artist": "アーティストを指定します。"
	},
	"link": [{
		"name": localize("definition.artist.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.artist.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#ARTIST")
	}]
});
__definitions.set(/#SUBARTIST/i, {
	"title": "#SUBARTIST _string_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	"descriptionTemp":
	localizeTemp`
	${'definition.subartist'}
	`,
	"defaultStrings": {
		"definition.subartist": "協力者を指定します。"
	},
	"link": [{
		"name": localize("definition.subartist.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.subartist.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#SUBARTIST")
	}]
});
__definitions.set(/#GENRE/i, {
	"title": "#GENRE _string_",
	"support": {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	"descriptionTemp":
	localizeTemp`
	${'definition.genre'}
	`,
	"defaultStrings": {
		"definition.genre": "楽曲のジャンルを指定します。"
	},
	"link": [{
		"name": localize("definition.genre.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.genre.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#GENRE")
	}]
});
__definitions.set(/#COMMENT/i, {
	"title": "#COMMENT _\"string\"_",
	"support": {"lr2": false, "nanasi": true, "beatoraja": false, "qms": false, "bemuse": false},
	"descriptionTemp":
	localizeTemp`
	${'definition.comment'}
	`,
	"defaultStrings": {
		"definition.comment": "選曲画面に表示される楽曲への1行コメントです。"
	},
	"link": [{
		"name": localize("definition.comment.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.comment.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#COMMENT")
	}]
});
__definitions.set(/#TEXT(?!00)[0-9A-Z]{0,2}/i, {
	"title": "#TEXT_[01-ZZ]_ _\"string\"_",
	"support": {"lr2": false, "nanasi": true, "beatoraja": false, "qms": false, "bemuse": false},
	"channel": 99,
	"descriptionTemp":
	localizeTemp`
	${'definition.text'}
	`,
	"defaultStrings": {
		"definition.text": "プレイ中に表示されるテキストを指定します。"
	},
	"link": [{
		"name": localize("definition.text.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.text.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#TEXTXX")
	}]
});
__definitions.set(/#TEXT00/i, {
	title: "#TEXT_00_ _\"string\"_",
	support: {"lr2": false, "nanasi": true, "beatoraja": false, "qms": false, "bemuse": false},
	channel: 99,
	descriptionTemp:
	localizeTemp`
	${'definition.text00'}
	`,
	defaultStrings: {
		"definition.text00": "ミス時に表示されるテキストを指定します。"
	},
	link: [{
		"name": localize("definition.text.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.text.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#TEXTXX")
	}]
});
__definitions.set(/#SONG(?!00)[0-9A-Z][0-9A-Z]/i, {
	title: "#SONG_[01-ZZ]_ _\"string\"_",
	support: {"lr2": false, "nanasi": false, "beatoraja": false, "qms": false, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.song'}

	${'definition.song.caution'}
	`,
	defaultStrings: {
		"definition.song": "プレイ中に表示されるテキストを指定します。",
		"definition.song.caution": "旧式のコマンドです。使用しないでください。"
	},
	link: [{
		"name": localize("definition.song.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.song.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#SONGXX")
	}]
});
__definitions.set(/#BPM$/i, {
	title: "#BPM _number_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	descriptionTemp:
	localizeTemp`
	${'definition.bpm'}
	`,
	defaultStrings: {
		"definition.bpm": "楽曲のテンポを定義します。"
	},
	link: [{
		"name": localize("definition.bpm.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.bpm.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BPM")
	}]
});
__definitions.set(/#BPM(?!00)[0-9A-Z]{1,2}$/i, {
	title: "#BPM_[01-ZZ]_ _number_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	channel: "08",
	descriptionTemp:
	localizeTemp`
	${'definition.bpm'}
	`,
	defaultStrings: {
		"definition.bpm": "楽曲の途中でのテンポ変化を定義します。"
	},
	link: [{
		"name": localize("definition.bpm.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.bpm.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BPMXX")
	}]
});
__definitions.set(/#EXBPM(?!00)[0-9A-Z]{0,2}/i, {
	title: "#EXBPM_[01-ZZ]_ _number_",
	support: {"lr2": false, "nanasi": true, "beatoraja": false, "qms": false, "bemuse": false},
	channel: "08",
	descriptionTemp:
	localizeTemp`
	${'definition.exbpm'}
	`,
	defaultStrings: {
		"definition.exbpm": "楽曲の途中でのテンポ変化を定義します。BMSCのための#BPM[01-ZZ]のエイリアスのため、使用は非推奨です。	"
	},
	link: [{
		"name": localize("definition.exbpm.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.exbpm.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#EXBPMXX")
	}]
});
__definitions.set(/#BASEBPM/i, {
	title: "#BASEBPM _number_",
	support: {"lr2": false, "nanasi": false, "beatoraja": false, "qms": false, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.basebpm'}
	`,
	defaultStrings: {
		"definition.basebpm": "スクロール速度の標準値を指定します。"
	},
	link: [{
		"name": localize("definition.basebpm.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.basebpm.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BASEBPM")
	}]
});
__definitions.set(/#STOP(?!00)[0-9A-Z]{0,2}/i, {
	title: "#STOP_[01-ZZ]_ _number_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	channel: "09",
	descriptionTemp:
	localizeTemp`
	${'definition.stop'}
	`,
	defaultStrings: {
		"definition.stop": "一定時間スクロールを停止するオブジェクトを定義します。_number_は4/4拍子における全音符を192とした時間です。したがって小節長ではなくBPMに依存します。"
	},
	link: [{
		"name": localize("definition.stop.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.stop.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#STOPXX")
	}]
});
__definitions.set(/#STP/i, {
	title: "#STP _xxx_(_.yyy_) _zzzz_",
	support: {"lr2": false, "nanasi": false, "beatoraja": false, "qms": false, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.stp'}

	|  |  |  |
	|:--:|:--:|:--|
	|xxx|[000-999]|${'definition.stp.measure'}|
	|yyy|[000-999]|${'definition.stp.position'}|
	|zzzz| |${'definition.stp.length'}|
	`,
	defaultStrings: {
		"definition.stp": "bemaniaDX タイプの STP シーケンスを定義します。",
		"definition.stp.measure": "小節 (bemaniaDXでは最大399)",
		"definition.stp.position": "1000等分した小節内での位置 (省略可能。省略した場合0)",
		"definition.stp.length": "停止長 (ms)"
	},
	link: [{
		"name": localize("definition.stp.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.stp.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#STP")
	}]
});
__definitions.set(/#LNTYPE/i, {
	title: "#LNTYPE _1|2_",
	support: {"lr2": "only 1", "nanasi": "only 1", "beatoraja": "only 1", "qms": "only 1", "bemuse": "only 1"},
	descriptionTemp:
	localizeTemp`
	${'definition.lntype'}
	`,
	defaultStrings: {
		"definition.lntype": "ロングノートチャンネル#xxx51-59,61-69の記法がRDNタイプ(LNTYPE 1)であるかMGQタイプ(LNTYPE 2)であるかを指定します。ただしMGQタイプは旧式のため、RDNタイプか#LNOBJを使用してください。",
	},
	link: [{
		"name": localize("definition.lntype.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.lntype.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#LNTYPE-1")
	}]
});
__definitions.set(/#LNOBJ/i, {
	title: "#LNOBJ _[01-ZZ]_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	channel: "11-19,21-29",
	descriptionTemp:
	localizeTemp`
	${'definition.lnobj'}
	`,
	defaultStrings: {
		"definition.lnobj": "RDNタイプ #2のLNで使用されるオブジェクトを記述します。#LNOBJで定義されたオブジェクトを通常オブジェクトとして配置すると、その直前からそこまでのLNとして配置されます。",
	},
	link: [{
		"name": localize("definition.lnobj.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.lnobj.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#LNOBJ")
	}]
});
__definitions.set(/#LNMODE/i, {
	title: "#LNMODE _[1-3]_",
	support: {"lr2": false, "nanasi": false, "beatoraja": true, "qms": false, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.lnmode'}

	- 1 : Long Note  
		${'definition.lnmode.ln'}
	- 2 : Charge Note  
		${'definition.lnmode.cn'}
	- 3 : Hell Charge Note  
		${'definition.lnmode.hcn'}
	`,
	defaultStrings: {
		"definition.lnmode": "図表内のロングノーツの種類を明示的に示します。記述されていない場合、プレイヤーが自由に選択することができます。",
		"definition.lnmode.ln": "始点での判定のみで、終点で離す必要のないノーツです。",
		"definition.lnmode.cn": "始点と終点に判定があり、適切に押し続け適切に離す必要のあるノーツです。",
		"definition.lnmode.hcn": "常に判定があり、押し続けている間回復し、離し続けている間ゲージは減り続けます。",
	},
	link: [{
		"name": localize("definition.lnmode.link.name", "beatoraja 楽曲製作者向け資料"),
		"url": localize("definition.lnmode.link.url", "https://github.com/exch-bms2/beatoraja/wiki/%E6%A5%BD%E6%9B%B2%E8%A3%BD%E4%BD%9C%E8%80%85%E5%90%91%E3%81%91%E8%B3%87%E6%96%99#bms%E6%8B%A1%E5%BC%B5%E5%AE%9A%E7%BE%A9")
	}]
});
__definitions.set(/#OCT\/FP/i, {
	title: "#OCT/FP",
	support: {"lr2": false, "nanasi": true, "beatoraja": false, "qms": false, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.octfp'}
	`,
	defaultStrings: {
		"definition.octfp": "このBMSが7鍵盤Double Playではなくオクターブ/フットペダルモードであることを示します。オクターブ/フットペダルモードは13個の鍵盤(11-15,18,19,22-25,28,29)、2個のスクラッチ(16,26)、1個のフットペダル(21)を使用するモードです。",
	},
	link: [{
		"name": localize("definition.octfp.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.octfp.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#OCT-FP")
	}]
});
__definitions.set(/#WAV(?!00)[0-9A-Z]{0,2}/i, {
	title: "#WAV_[01-ZZ]_ _wavfile_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	channel: "01,11-19,21-29,31-39,41-49,51-59,61-69",
	descriptionTemp:
	localizeTemp`
	${'definition.wav'}
	`,
	defaultStrings: {
		"definition.wav": "音声ファイルを定義します。"
	},
	link: [{
		"name": localize("definition.wav.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.wav.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#WAVXX")
	}]
});
__definitions.set(/#WAV00/i, {
	title: "#WAV_00_ _soundfile_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": false},
	channel: "D1-D9,E1-E9",
	descriptionTemp:
	localizeTemp`
	${'definition.mine'}
	`,
	defaultStrings: {
		"definition.mine": "地雷を踏んだときの音を定義します。"
	},
	link: [{
		"name": localize("definition.mine.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.mine.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#LANDMINE")
	}]
});
__definitions.set(/#BMP(?!00)[0-9A-Z]{0,2}/i, {
	title: "#BMP_[01-ZZ]_ _imagefile_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": true},
	channel: "04,06,07,0A",
	descriptionTemp:
	localizeTemp`
	${'definition.bmp'}
	`,
	defaultStrings: {
		"definition.bmp": "BGAで使用される画像・動画ファイルを定義します。"
	},
	link: [{
		"name": localize("definition.bmp.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.bmp.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BMPXX")
	}]
});
__definitions.set(/#BMP00/i, {
	title: "#BMP_00_ _soundfile_",
	support: {"lr2": true, "nanasi": true, "beatoraja": true, "qms": true, "bemuse": false},
	descriptionTemp:
	localizeTemp`
	${'definition.missimage'}
	`,
	defaultStrings: {
		"definition.missimage": "チャンネル06で定義されるまでのデフォルトのミス画像を定義します。"
	},
	link: [{
		"name": localize("definition.missimage.link.name", "BMS Command Memo (JP)"),
		"url": localize("definition.missimage.link.url", "https://hitkey.nekokan.dyndns.info/cmdsJP.htm#BMPXX")
	}]
});
__definitions.set(/#SCROLL(?!00)[0-9A-Z]{0,2}/i, {
	title: "#SCROLL_[01-ZZ]_ _number_",
	support: {"lr2": false, "nanasi": false, "beatoraja": true, "qms": false, "bemuse": true},
	channel: "SC",
	descriptionTemp:
	localizeTemp`
	${'definition.scroll'}
	`,
	defaultStrings: {
		"definition.scroll": "オブジェクトの論理的位置やテンポを変更せずに、表示上の位置とスクロール速度を伸縮することができるオブジェクトを定義します。"
	},
	link: [{
		"name": localize("definition.scroll.link.name", "Bemuse's BMS Extensions"),
		"url": localize("definition.scroll.link.url", "https://bemuse.ninja/project/docs/bms-extensions.html#speed-and-scroll-segments")
	}]
});
__definitions.set(/#SPEED(?!00)[0-9A-Z]{0,2}/i, {
	title: "#SPEED_[01-ZZ]_ _number_",
	support: {"lr2": false, "nanasi": false, "beatoraja": false, "qms": false, "bemuse": true},
	channel: "SP",
	descriptionTemp:
	localizeTemp`
	${'definition.speed'}
	`,
	defaultStrings: {
		"definition.speed": "通過するとハイスピードに倍率を乗算することができるオブジェクトを配置します。"
	},
	link: [{
		"name": localize("definition.speed.link.name", "Bemuse's BMS Extensions"),
		"url": localize("definition.speed.link.url", "https://bemuse.ninja/project/docs/bms-extensions.html#speed-and-scroll-segments")
	}]
});

let supportFunc = (function(player: boolean | string | undefined){
	if(typeof player === "boolean" || player === undefined){
		return player ? "○" : "✗";
	}else{
		return player;
	}
});

__definitions.forEach(function(value: bmsCommand, key: RegExp, map: Map<RegExp, bmsCommand>){
	value.description = value.descriptionTemp(value.defaultStrings);

	let supportObj = value.support;
	if(supportObj !== undefined){
		value.supportText =
		stripIndent(`
		|LR2|ナナシグルーヴ|beatoraja|QMS-Player|Bemuse|
		|:-:|:-----------:|:-------:|:--------:|:----:|
		|${supportFunc(supportObj.lr2)}|${supportFunc(supportObj.nanasi)}|${supportFunc(supportObj.beatoraja)}|${supportFunc(supportObj.qms)}|${supportFunc(supportObj.bemuse)}|
		`);
	}

	let linkArray = value.link;
	if(linkArray !== undefined){
		value.linkText = "\n---\n### Details\n";
		if(linkArray.length <= 1){
			value.linkText += `[${linkArray[0].name}](${linkArray[0].url})`;
		}else{
			for (let i = 0; i < linkArray.length; i++){
				value.linkText += `- [${linkArray[i].name}](${linkArray[i].url})\n`;
			}
		}
	}

	map.set(key, value);
});

export let definitions = __definitions;