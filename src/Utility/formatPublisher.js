export const formatPublisher = (publisher) => {
  if (publisher.includes(",")) {
    const beforeComma = publisher.split(",")[0].trim();
    const wordsBeforeComma = beforeComma.split(" ");

    if (wordsBeforeComma.length >= 2) {
      return `${wordsBeforeComma[0]}, ${wordsBeforeComma[1].slice(0, 3)}...`;
    }

    return publisher;
  }

  const words = publisher.trim().split(" ");
  if (words.length >= 2) {
    return `${words[0]} ${words[1].slice(0, 3)}...`;
  }

  return publisher;
};
