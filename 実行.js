document.onreadystatechange = function () {
	if (document.readyState === "interactive") {
		頭実行();
		// let кнопка = document.createElement("button");
		// кнопка.innerHTML = "заadsfffffffffff";
		// document.body.insertAdjacentElement("afterbegin", кнопка);
		// кнопка.addEventListener("click", () => {
		// 	aaaaaaaaaa();
		// });
	}
};

document.addEventListener("virtual-refresh", function () {
	頭実行();
});

// async function aaaaaaaaaa() {
// 	let a = await fetch("http://localhost:3000", {
// 		id: 14,
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json; charset=utf-8",
// 		},
// 		// body: JSON.stringify(分析),
// 	});
// 	console.log("asdf");
// }

// aaaaaaaaaa();

async function 頭実行() {
	let 管理所HTML = `
  <div class="管理所" style=" width: 400px; position:fixed; z-index: 999; left: 75px; top: 75px;">
    <div style="display: flex; justify-content: space-between; gap:15px">
      <button class="説明文非表示" style="flex-grow:1; min-width: 0">
        説明文非表示
      </button>
      <button class="説明文表示" style="flex-grow:1; min-width: 0">
        説明文表示
      </button>
    </div>
    <div style="margin-top: 15px; display: flex; justify-content: space-between; gap:15px">
      <button class="前の話" style="flex-grow:1; min-width: 0">
        前の話
      </button>
      <button class="次の話" style="flex-grow:1; min-width: 0">
        次の話
      </button>
    </div>
    <div style="margin-top: 15px; display: flex; justify-content: space-between; gap:15px">
      <button class="必要なのだけ見せる" style="flex-grow:1; min-width: 0">
        必要なのだけ見せる
      </button>
      <button class="全部見せる" style="flex-grow:1; min-width: 0">
        全部見せる
      </button>
    </div>
  </div>`;
	let 一話のユーアールエルか = 一話のユーアールエルか確認(
		window.location.href
	);
	let 全アニメのユーアールエルか = 全アニメのユーアールエルか確認(
		window.location.href
	);
	let 紙揃いのユーアールエルか = 紙揃いのユーアールエルか確認(
		window.location.href
	);

	if (
		全アニメのユーアールエルか ||
		一話のユーアールエルか ||
		紙揃いのユーアールエルか
	) {
		let 全部 = document.querySelector(".vocabulary-list");
		let 全事項 = 全部.querySelectorAll(".entry");
		let 全説明文所 = [];

		let 管理所 = document.getElementById("根");
		if (管理所 === null) 管理所 = document.createElement("div");
		管理所.id = "根";

		管理所.innerHTML = 管理所HTML;
		let 説明文表示ボタン = 管理所.getElementsByClassName("説明文非表示")[0];
		let 説明文非表示ボタン = 管理所.getElementsByClassName("説明文表示")[0];
		let 前ボタン = 管理所.getElementsByClassName("前の話")[0];
		let 次ボタン = 管理所.getElementsByClassName("次の話")[0];
		let 必要なのだけ見せるボタン =
			管理所.getElementsByClassName("必要なのだけ見せる")[0];
		let 全部見せるボタン = 管理所.getElementsByClassName("全部見せる")[0];

		説明文非表示ボタン.w = () => {
			説明文非表示(全説明文所);
		};
		説明文表示ボタン.onclick = () => {
			説明文表示(全説明文所);
		};
		必要なのだけ見せるボタン.onclick = 必要なのだけ見せる;
		全部見せるボタン.onclick = 全部見せる;

		if (一話のユーアールエルか) {
			(async function () {
				if (await 前の話があるか()) 前ボタン.onclick = 前の話に移動;
				else 前ボタン.disabled = true;

				if (await 次の話があるか()) 次ボタン.onclick = 次の話に移動;
				else 次ボタン.disabled = true;
			})();
		} else {
			前ボタン.parentElement.remove();
		}

		document.body.insertAdjacentElement("afterbegin", 管理所);

		let 全日本語文 = document.querySelectorAll("ruby");
		for (事項 of 全日本語文) {
			if (事項.lastChild.tagName == "RT") {
				let かな = 事項.lastChild.innerHTML;
				事項.innerHTML = かな;
			}
		}

		for (事項 of 全事項) {
			let 日本語文所 = 事項.firstChild.firstChild.firstChild;
			日本語文所.classList.add("日本語文");
			let 説明文 = 事項.firstChild.lastChild;
			説明文.classList.add("説明文");
			全説明文所[全説明文所.length] = 説明文;
			説明文.onmouseover = function (e) {
				e.target.style["opacity"] = "100";
			};
			説明文.onmouseleave = function (e) {
				e.target.style["opacity"] = "0";
			};
		}

		説明文非表示(全説明文所);
	}

	// let кнопка = document.createElement("button");
	// кнопка.innerHTML = "запит";
	// document.body.insertAdjacentElement("afterbegin", кнопка);
	// кнопка.addEventListener("click", () => {
	// 	全アニメ分析(完成したアイディ);
	// });

	// let 完成したアイディ反応 = await fetch("http://localhost:5000/kansei", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json; charset=utf-8",
	// 	},
	// });
	// let 完成したアイディ = await (await 完成したアイディ反応).json();
	// console.log(完成したアイディ);
}

async function dbに送信(分析) {
	await fetch("http://localhost:3000", {
		id: 分析["id"],
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(分析),
	});
}

async function 全アニメ分析(完成したアイディ) {
	console.warn("змінити тестову кількість");
	let アニメ数 = 4112; //4112

	let 結果 = [];
	// 12 це перший ід аніме
	for (let い = 10; い <= アニメ数; い++) {
		if (!完成したアイディ.includes(い)) {
			let 分析 = await アニメ分析(い);
			console.log(分析);
			結果.push(分析);
			dbに送信(分析);
		}
	}
	return 結果;
}

async function アニメ分析(アイディ) {
	let 概要 = null;
	try {
		概要 = await アニメ概要(アイディ);
	} catch (e) {
		console.log(`За ід ${アイディ} нічого не знайдено`);
	}
	if (概要 === null) {
		console.log(`ід ${アイディ} не аніме`);
		return null;
	}
	// console.log(概要);
	概要["список_слів"] = await 言葉分析(アイディ);
	return 概要;
}

async function アニメ概要(アイディ) {
	let ユーアールエル = `https://jpdb.io/anime/${アイディ}/`;
	// console.warn("тестовий шматок переробити");
	// let ユーアールエル = document.URL;

	let 書類 = await 内容受信(ユーアールエル);
	let 概要容器 =
		書類.getElementsByClassName("bugfix")[0].childNodes[1].childNodes[1];
	let 内容種類文字列 = 概要容器.childNodes[0].innerHTML;

	if (内容種類文字列.toLowerCase() === "anime") {
		let 結果 = {};
		let 概要詳細容器 = 概要容器.childNodes[2].childNodes[0].childNodes[0]; //tbody
		結果["id"] = アイディ;
		結果["назва"] = 概要容器.childNodes[1].innerHTML;
		結果["загалом_слів"] = 第詳細(概要詳細容器, 0);
		結果["окремих_слів"] = 第詳細(概要詳細容器, 1);
		結果["важкість"] = 第詳細(概要詳細容器, 7);

		//Враховує, чи є поле з оцінкою на МАЛ
		let 追加距離 = 0;
		if (
			概要詳細容器.childNodes[8].childNodes[0].innerHTML.toLowerCase() !==
			"mal avg. rating"
		)
			追加距離 = -2;
		if (追加距離 === 0)
			結果["МАЛ_оцінка"] = 第詳細(概要詳細容器, 8 + 追加距離);
		else 結果["МАЛ_оцінка"] = "Не вказано";

		結果["Відсоток_знайомих"] = 第詳細(概要詳細容器, 11 + 追加距離);
		結果["Відсоток_окремих_знайомих"] = 第詳細(概要詳細容器, 13 + 追加距離);

		結果["кількість_серій"] = 1;
		let 話一覧容器 = 書類.getElementsByClassName("bugfix")[0].childNodes[2];
		if (話一覧容器.tagName.toLowerCase() === "div") {
			結果["кількість_серій"] = 話一覧容器.childNodes.length;
		}
		return 結果;
	} else {
		return null;
	}

	function 第詳細(概要詳細容器, 第) {
		return 概要詳細容器.childNodes[第].childNodes[1].innerHTML;
	}
}

async function 言葉分析(アイディ) {
	let 全結果 = [];
	let ユーアールエル = `https://jpdb.io/anime/${アイディ}/a/vocabulary-list?show_only=new,learning,overdue,failed,locked&sort_by=by-frequency-global`;

	let 書類 = await 内容受信(ユーアールエル);
	let 全部 = 書類.querySelector(".vocabulary-list");

	let 事項数容器 = 全部.previousElementSibling;
	if (事項数容器.tagName.toLowerCase() === "div")
		事項数容器 = 事項数容器.previousElementSibling;
	let 事項数 = parseInt(/from (\d+) entries/i.exec(事項数容器.innerHTML)[1]);
	let 回数 = Math.ceil(事項数 / 50);

	for (let i = 0; i < 回数; i++) {
		let a = 次のвідступ(ユーアールエル, i);
		let doc = await 内容受信(a);
		全結果 = [...全結果, ...内容分析(doc)];
	}
	return 全結果;
}

function 内容分析(書類) {
	let 全結果 = [];

	let 空想全部 = 書類.querySelector(".vocabulary-list");
	let 空想全事項 = 空想全部.querySelectorAll(".entry");

	for (事項 of 空想全事項) {
		let 空想日本語文所 = 事項.firstChild.firstChild.firstChild;
		let 結果 = "";
		for (い of 空想日本語文所.children) 結果 += い.firstChild.nodeValue;
		全結果.push(結果);
	}
	return 全結果;
}

async function 内容受信(ユーアールエル) {
	let a = await fetch(ユーアールエル);
	let t = await a.text();
	let parser = new DOMParser();
	let doc = parser.parseFromString(t, "text/html");
	return doc;
}

function перебір(全事項) {
	for (事項 of 全事項) {
		let 日本語文所 = 事項.firstChild.firstChild.firstChild;
		let 結果 = "";
		for (い of 日本語文所.children) 結果 += い.innerHTML;
		結果 = ひらがな化(結果);
		console.log(結果);
	}
}

function 次のвідступ(ユーアールエル, 度) {
	let [裸ユーアール, 追加情報] =
		裸ユーアールエルと追加情報を分ける(ユーアールエル);
	let 分析済み = 追加情報分析(追加情報);
	分析済み["offset"] =
		parseInt(分析済み["offset"] ? 分析済み["offset"] : 0) + 50 * 度;
	let a = 裸ユーアール + 追加情報文字列生成(分析済み);
	return a;
}

function ひらがな化(カタカナ) {
	let 結果 = "";
	for (let い of カタカナ) {
		let 新値 = い;
		let コード = い.charCodeAt(0);
		if (コード >= 12450 && コード <= 12534) {
			コード -= 96;
			新値 = String.fromCharCode(コード);
		}
		結果 += 新値;
	}
	return 結果;
}

function 一話のユーアールエルか確認(ユーアールエル) {
	return /https:\/\/jpdb\.io\/anime\/[^\/]+\/[^\/]+\/[\d]+.+/i.test(
		ユーアールエル
	);
}

function 全アニメのユーアールエルか確認(ユーアールエル) {
	return /https:\/\/jpdb\.io\/anime\/[^\/]+\/[^\/]+\/vocabulary-list.*/i.test(
		ユーアールエル
	);
}

function 紙揃いのユーアールエルか確認(ユーアールエル) {
	return /https:\/\/jpdb\.io\/deck.*/i.test(ユーアールエル);
}

function 説明文非表示(全説明文所) {
	for (あ of 全説明文所) {
		あ.style["opacity"] = "0";
	}
}

function 説明文表示(全説明文所) {
	for (あ of 全説明文所) {
		あ.style["opacity"] = "100";
	}
}

function 前の話のユーアールエル() {
	let 本来ユーアールエル = document.URL;
	let 正規表現 =
		/(https:\/\/jpdb.io\/anime\/[^\/]+\/[^\/]+\/)([\d]+)([^?]*)(.*)/i;
	let 検索結果 = 正規表現.exec(本来ユーアールエル);
	let 追加情報 = 追加情報分析(検索結果[4]);
	追加情報["offset"] = "0";
	return (
		検索結果[1] +
		(parseInt(検索結果[2], 10) - 10) +
		検索結果[3] +
		追加情報文字列生成(追加情報)
	);
}

function 次の話のユーアールエル() {
	let 本来ユーアールエル = document.URL;
	let 正規表現 =
		/(https:\/\/jpdb.io\/anime\/[^\/]+\/[^\/]+\/)([\d]+)([^?]*)(.*)/i;
	let 検索結果 = 正規表現.exec(本来ユーアールエル);
	let 追加情報 = 追加情報分析(検索結果[4]);
	追加情報["offset"] = "0";
	return (
		検索結果[1] +
		(parseInt(検索結果[2], 10) + 10) +
		検索結果[3] +
		追加情報文字列生成(追加情報)
	);
}

async function 前の話があるか() {
	let 返事 = await fetch(前の話のユーアールエル());
	if (返事.status === 404) return false;
	return true;
}

async function 次の話があるか() {
	let 返事 = await fetch(次の話のユーアールエル());
	if (返事.status === 404) return false;
	return true;
}

function 前の話に移動() {
	window.location.replace(前の話のユーアールエル());
}

function 次の話に移動() {
	window.location.replace(次の話のユーアールエル());
}

function 追加情報分析(追加情報文字列) {
	let 結果 = {};
	if (追加情報文字列 === null) return new Object();
	追加情報文字列 = "&" + 追加情報文字列.match(/[^?]+/);
	let 追加情報分析正規表現 = /&(.+?)=([^&#]+)/g;
	while ((い = 追加情報分析正規表現.exec(追加情報文字列)) !== null) {
		結果[い[1]] = い[2];
	}
	return 結果;
}

function 裸ユーアールエルと追加情報を分ける(ユーアールエル) {
	let 追加情報正規表現 = /[?].+/i;
	let 追加情報 = ユーアールエル.match(追加情報正規表現);
	let 裸ユーアールエル = ユーアールエル.match(/[^?]+/i);
	return [裸ユーアールエル[0], 追加情報 === null ? null : 追加情報[0]];
}

function 追加情報文字列生成(追加情報オブジェクト) {
	let 結果 = "?";
	for (let い in 追加情報オブジェクト)
		結果 += い + "=" + 追加情報オブジェクト[い] + "&";
	return 結果;
}

function 必要なのだけ見せる() {
	let [裸ユーアール, 追加情報文字列] = 裸ユーアールエルと追加情報を分ける(
		document.URL
	);
	if (追加情報文字列 === null)
		window.location.replace(
			裸ユーアール + "?show_only=new,learning,overdue,failed,locked"
		);
	else {
		let 追加情報オブジェクト = 追加情報分析(追加情報文字列);
		if (
			追加情報オブジェクト["show_only"] !==
			"new,learning,overdue,failed,locked"
		) {
			追加情報オブジェクト["offset"] = "0";
			追加情報オブジェクト["show_only"] =
				"new,learning,overdue,failed,locked";

			let 新追加情報文字列 = 追加情報文字列生成(追加情報オブジェクト);

			window.location.replace(裸ユーアール + 新追加情報文字列);
		}
	}
}

function 全部見せる() {
	let [裸ユーアール, 追加情報文字列] = 裸ユーアールエルと追加情報を分ける(
		document.URL
	);
	if (追加情報文字列 === null)
		window.location.replace(
			裸ユーアール + "?show_only=new,learning,overdue,failed,locked"
		);
	else {
		let 追加情報オブジェクト = 追加情報分析(追加情報文字列);
		if ("show_only" in 追加情報オブジェクト) {
			追加情報オブジェクト["offset"] = "0";
			delete 追加情報オブジェクト["show_only"];

			let 新追加情報文字列 = 追加情報文字列生成(追加情報オブジェクト);

			window.location.replace(裸ユーアール + 新追加情報文字列);
		}
	}
}
