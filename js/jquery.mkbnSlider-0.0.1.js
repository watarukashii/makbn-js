
// クラスと言う概念がないので、prototypeを使う



// $.fn - $.prototype (aliasとかショートカットみたいなもの)
// $ コンストラクタ関数
// $.prototype という特殊なプロパティ
$.fn.mkbnSlider = function(options) {

	// 必要な引数が入っていなかったら初期化 ハッシュのMergeを行う
	options = $.extend({
		duration: 800,
		wait: 2000,
		isDurationRandom: true,
		isRepeat: false,
		autoPlay: true
	}, options);

	// optionに仮引数に渡させたものがはいっているかチェック
	console.log(options);

	// ホントに使えたかどうかDebugチェック
	// alert('つかえるぞおおおおおおおおおおおおおお');

	// ラッパーのdiv（ステージということにします）
	var $stage = this;
	// 本当にDebugのときにしか気をつけること(Debugツールをつかうときだけ)
	// console.log(this);

	//#mkbnの取得 ステージの中の<ul>を取得
	//セレクタ「#mkbn ul」とほぼ同じ
	var $ul = $stage.find('ul');
	//＃mkbn内の<li>をすべて取得する
	var $li = $ul.find('li');
	// <li> の幅を取得 (数値) 
	var liWidth = $li.width();
	// プロパティなので括弧はいらない
	var liLength = $li.length;
	// 外側の幅が決まります
	var ulWidth = liWidth * liLength;
	// 幅×数でマックス横幅を取得する
	var alwidth = liWidth * liLength;
	//ulにwidthをしていする 
	$ul.width(alwidth);

	// 現在中央に着ているliの番号
	var currentIndex = 0;

	// 再帰
	function slide () {
			// currentIndexに1を加算する
			// currentIndex = currentIndex +1;　と同じ意味
			currentIndex += 1;
			// 現在のliの番号がいliの数を超えた時一番最後の画像にきたら、幅と番号を初期化
			if (currentIndex > liLength - 1) {
				currentIndex = 0;
				if (options.IsRepeat === false) {
					return;
				}
			}
			// setTimeout(処理、何ミリ秒後)
			setTimeout(function(){

			//durationを決定する
			var duration = options.duration;
			var durationRandomRangeMin = 500;
			var durationRandomRangeMax = 5000;

			// duration の定義 ランダム表示
			if (options.isDurationRandom) {
				duration = Math.random() * (durationRandomRangeMax - durationRandomRangeMin) + durationRandomRangeMin;
			}

			$ul
			.animate(
				{ left: liWidth * -1 * currentIndex },
				{ duration: duration }	// {名前:変数}
			)
			// animate実行した後にそのアニメーションが実行してるか監視
			.promise()
			// animateがちゃんと実行された後に実行したい処理を入れる。
			// done(slide())だと、アニメーションが実行する前にslideが実行されてしまうため、
			// 実行したい関数を変数として明示的に指定しておく
			.done(slide);
		}, options.wait);
	}
	
	// 自動再生する場合
	if (options.autoPlay) {
		// 再帰関数を実行
		slide();		
	}
};

// 文字列に対して新しいインスタンスメソッドができる
// prototype汚染があるので、jqueryがデファクトになっている　詳しくは「prototype汚染」で検索	
// String.prototype.a = function() {
// 
// }

// クラスみたいになものに
// 'あいうえお'.a();




