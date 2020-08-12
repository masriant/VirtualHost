public enum enLanguage {
  Indonesian = 0, English = 1
}

public static string Greetings(enLanguage bahasa) {
  string timeSpeak = "";
  if (DateTime.Now.Hour >= 0 && DateTime.Now.Hour < 11) {
    switch (bahasa) {
      case enLanguage.Indonesian:
        timeSpeak = "pagi";
        break;

      case enLanguage.English:
        timeSpeak = "morning";
        break;
    }
  } else if (DateTime.Now.Hour >= 11 && DateTime.Now.Hour < 15) {
    switch (bahasa) {
      case enLanguage.Indonesian:
        timeSpeak = "siang";
        break;

      case enLanguage.English:
        timeSpeak = "day";
        break;
    }
  } else if (DateTime.Now.Hour >= 15 && DateTime.Now.Hour < 19) {
    switch (bahasa) {
      case enLanguage.Indonesian:
        timeSpeak = "sore";
        break;

      case enLanguage.English:
        timeSpeak = "afternoon";
        break;
    }
  } else {
    switch (bahasa) {
      case enLanguage.Indonesian:
        timeSpeak = "malam";
        break;

      case enLanguage.English:
        timeSpeak = "evening";
        break;
    }
  }

  switch (bahasa) {
    case enLanguage.Indonesian:
      timeSpeak = "Selamat " + timeSpeak;
      break;

    case enLanguage.English:
      timeSpeak = "Good " + timeSpeak;
      break;
  }

  return timeSpeak;
}