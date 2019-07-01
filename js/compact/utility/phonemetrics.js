/** ============================================================================
        Gets syllable count using regular expression
=============================================================================**/
function filterWithRegEx(a){
    if(a != null){
        a = a.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        // Removes capital Y's
        a = a.replace(/^y/, '');
        //Produces a length that accounts for dipthongs
        a = a.match(/[aeiouy]{1,2}/g).length;
    }else{
        console.log(a);
    }
    return a;
}

/** ============================================================================
        Gets count of syllables by calling filterWithReqEx
=============================================================================**/
function getSyllableCount(a){
    if (a.length <= 3) {
        // If the word is less or equal to three,
        // then it assumes it is only one syllable long
        return 1;
    }else if(a.length == 0){
        // If the word isn't a word, returns zero
        return 0;
    }else {
        // For any word that is more than three characters
        // Get a count using filterWithExpression
        a = filterWithRegEx(a);
        return a;
    }
}
