import { Component, OnInit } from '@angular/core';
import { BlossomScene, myBlossomSceneConfig } from './sakura/sakura.component';

interface Gojuon {
    hiragana: string;
    katakana: string;
    romaji: string;
    sign?: string;
}

const GOJUON: Gojuon[] = [
    { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
    { hiragana: 'い', katakana: 'イ', romaji: 'i' },
    { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
    { hiragana: 'え', katakana: 'エ', romaji: 'e' },
    { hiragana: 'お', katakana: 'オ', romaji: 'o' },
    { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
    { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
    { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
    { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
    { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
    { hiragana: 'さ', katakana: 'サ', romaji: 'sa' },
    { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
    { hiragana: 'す', katakana: 'ス', romaji: 'su' },
    { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
    { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
    { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
    { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
    { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
    { hiragana: 'て', katakana: 'テ', romaji: 'te' },
    { hiragana: 'と', katakana: 'ト', romaji: 'to' },
    { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
    { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
    { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
    { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
    { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
    { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
    { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
    { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
    { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
    { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
    { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
    { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
    { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
    { hiragana: 'め', katakana: 'メ', romaji: 'me' },
    { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
    { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
    { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
    { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
    { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
    { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
    { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
    { hiragana: 'れ', katakana: 'レ', romaji: 're' },
    { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
    { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
    { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
    { hiragana: 'ん', katakana: 'ン', romaji: 'n' }
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'goj-on-web';

    private sounds = {
        correct: new Audio('assets/music/correct_1.mp3'),
        music_easy: new Audio('assets/music/music_easy.mp3'),
        music_hard: new Audio('assets/music/music_hard.mp3'),
        wrong: new Audio('assets/music/wrong_1.mp3'),
        win: new Audio('assets/music/win.mp3'),
        game_start: new Audio('assets/music/drum_hit.mp3')
    };

    gojuon: Gojuon[] = [];

    cards: any = [];

    selected: any = null;

    score: number = 0;

    selectCard(card: any) {
        if (this.selected) {
            if (card.romaji === this.selected.romaji) {
                this.sounds.correct.play();
                card.done = true;
                this.selected.done = true;
                this.score += 1;

                // finished!
                if (this.score === this.gojuon.length) {
                    this.sounds.win.play();
                }
            } else {
                this.sounds.wrong.play();
            }
            this.selected.active = false;
            this.selected = null;
        } else {
            card.active = true;
            this.selected = card;
        }
    }

    shuffle(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    menuItems: any = [
        {
            label: '【あア】Hiragana / Katakana',
            keys: ['hiragana', 'katakana']
        },
        {
            label: '【あa】Hiragana / Romaji',
            keys: ['hiragana', 'romaji']
        },
        {
            label: '【アa】Katakana / Romaji',
            keys: ['katakana', 'romaji']
        },
        {
            label: '【あアa】Hiragana/Katakana / Romaji',
            keys: ['hiragana', 'katakana', 'romaji']
        }
    ];

    selectMode(keys: (keyof Gojuon)[]): void {
        this.sounds.game_start.play();

        this.selected = null;

        this.gojuon = [...GOJUON];

        this.sounds.music_easy.load();
        this.sounds.music_hard.load();

        if (keys.length === 3) {
            this.sounds.music_hard.play();
        } else {
            this.sounds.music_easy.play();
        }

        const g1: Gojuon[] = [];
        const g2: Gojuon[] = [];

        this.gojuon.forEach(item => {
            const randomIndex = Math.floor(Math.random() * keys.length);

            let newKeys;

            if (keys.length === 2) {
                newKeys = keys;
            } else {
                newKeys = keys.slice(0, randomIndex).concat(keys.slice(randomIndex + 1));
            }

            g1.push({ ...item, sign: item[newKeys[0]] });
            g2.push({ ...item, sign: item[newKeys[1]] });
        });

        this.shuffle(g1);
        this.shuffle(g2);

        this.cards = [...g1, ...g2];
    }

    ngOnInit(): void {
        new BlossomScene(myBlossomSceneConfig);
    }
}
