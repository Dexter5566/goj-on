import { Component, OnInit } from '@angular/core';
import { BlossomScene, myBlossomSceneConfig } from './sakura/sakura.component';
import goujuon from './quiz/goujuon.json';
import textbook from './quiz/textbook.json';
import other from './quiz/other.json';
interface Quiz {
    key1: string;
    key2: string;
    key3?: string;
    sign?: string;
    group?: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private utter: SpeechSynthesisUtterance) {
        this.utter.lang = 'ja-JP';
        this.utter.rate = 1.0;
        this.utter.pitch = 1.1;
    }

    title = 'goj-on-web';

    private sounds = {
        correct: new Audio('assets/music/correct_1.mp3'),
        music_easy: new Audio('assets/music/music_easy.mp3'),
        music_hard: new Audio('assets/music/music_hard.mp3'),
        wrong: new Audio('assets/music/wrong_1.mp3'),
        win: new Audio('assets/music/win.mp3'),
        game_start: new Audio('assets/music/drum_hit.mp3')
    };

    questions: Quiz[] = [];

    synth = window.speechSynthesis;

    // ***********GAME***********
    cards: any = [];

    selected: any = null;

    score: number = 0;

    selectCard(card: any) {
        if (card.group === 'g2' && !/[a-zA-Z]/.test(card.sign)) {
            setTimeout(
                () => {
                    this.utter.text = card.sign;
                    this.synth.speak(this.utter);
                },
                this.selected ? 500 : 0
            );
        }

        // if (this.selected?.group === card.group) return;

        if (this.selected) {
            if (card.key1 === this.selected.key1) {
                this.sounds.correct.load();
                this.sounds.correct.play();
                card.done = true;
                this.selected.done = true;
                this.score += 1;

                // finished!
                if (this.score === this.questions.length) {
                    setTimeout(() => {
                        this.sounds.win.play();
                    }, 500);
                }
            } else {
                this.sounds.wrong.load();
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

    // ***********MENU***********
    menuItems: any = [
        {
            label: 'あ/ア',
            pool: goujuon.map(c => ({ key1: c.key1, key2: c.key2 }))
        },
        {
            label: 'あ/a',
            pool: goujuon.map(c => ({ key1: c.key1, key3: c.key3 }))
        },
        {
            label: 'ア/a',
            pool: goujuon.map(c => ({ key2: c.key2, key3: c.key3 }))
        },
        {
            label: 'あ/ア/a',
            pool: goujuon
        },
        ...textbook.concat(other).map(item => ({
            label: item.label,
            pool: item.words
        }))
    ];

    selectMode(pool: Quiz[]): void {
        this.sounds.game_start.play();

        // init
        this.selected = null;
        this.questions.length = 0;
        this.score = 0;

        this.questions = [...pool];

        this.sounds.music_easy.load();
        this.sounds.music_hard.load();

        if (Math.random() < 0.5) {
            this.sounds.music_hard.play();
        } else {
            this.sounds.music_easy.play();
        }

        const g1: Quiz[] = [];
        const g2: Quiz[] = [];

        this.questions.forEach(item => {
            const keys: string[] = Object.keys(item);

            const randomIndex = Math.floor(Math.random() * keys.length);

            let newKeys;

            if (keys.length < 3) {
                newKeys = keys;
            } else {
                newKeys = keys.slice(0, randomIndex).concat(keys.slice(randomIndex + 1));
            }

            g1.push({ ...item, sign: Object.values(item)[0], group: 'g1' });
            g2.push({ ...item, sign: Object.values(item)[1], group: 'g2' });
        });

        this.shuffle(g1);
        this.shuffle(g2);

        this.cards = [...g1, ...g2];

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        this.sounds.music_easy.volume = 0.2;
        this.sounds.music_hard.volume = 0.2;

        new BlossomScene(myBlossomSceneConfig);
    }
}
