class Dictionary {
    constructor() {
        this.words = {};
    }
    add(word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    }
    def(term) {
        return this.words[term];
    }
    delete(term) {
        delete this.words[term];
    }
    update(term, newDef) {
        if (this.words[term] !== undefined) {
            this.words[term] = newDef;
        }
    }
}
class Word {
    constructor(term, def) {
        this.term = term;
        this.def = def;
    }
}
const kimchi = new Word('kimchi', '한국 음식');
const tomato = new Word('tomato', '토마토');
const pizza = new Word('pizza', '피자');
const dict = new Dictionary();
dict.add(kimchi);
dict.add(tomato);
dict.add(pizza);
dict.def('kimchi');
