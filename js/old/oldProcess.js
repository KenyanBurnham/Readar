
function getSum(total, num) {
    return total + num;
}

function filterToLowerCase(a){
    a = a.toLowerCase();
    return a;
}

function removeWhiteSpace(a){
    a = a.replace(/[\W_]+/g," ");
    return a;
}

function filterWithRegEx(a){
    a = a.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    a = a.replace(/^y/, '');
    a = a.match(/[aeiouy]{1,2}/g).length;
    return a;
}

function getSyllableCount(a){
    if (a.length <= 3) {
        return 1;
    }else if(a.length == 0){
        return 0;
    }else {
        a = filterWithRegEx(a);
        return a;
    }
}

function getWordLength(a){
    a = a.length;
    return a;
}

function processSentence(a){
    let w = 0;
    let x = [];
    let y = [];
    let z = [];
    let b = a.split(" ");
    for (let i = 0; i < b.length; i++) {
        //Filter Input
        let c = filterToLowerCase(b[i]);
        c = removeWhiteSpace(c);
        c = c.trim();
        //Build word array
        x[i] = c;
        //Build Syllable Array
        y[i] = getSyllableCount(c);
        //Build word length array
        z[i] = getWordLength(c);
    }
    let Sentence = {
        source: a,
        words: x,
        syllables: y,
        sumSyllables: y.reduce(getSum),
        sumWords: b.length,
        sizes: z,
        breath: ((y.reduce(getSum))/(b.length)).toFixed(2),
    };
    return Sentence;
}
