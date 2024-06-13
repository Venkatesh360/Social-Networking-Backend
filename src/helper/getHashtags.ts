export const getHashtags = (text:string) => {
    const hashtags = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '#') {
        let hashtag = "";
        i++; // Skip the # symbol
        while (i < text.length && text[i].match(/^[a-zA-Z0-9_]+$/)) {
          hashtag += text[i];
          i++;
        }
        if (hashtag.length > 0) {
          hashtags.push(hashtag.trim());
        }
      }
    }
    return hashtags;
  }
  