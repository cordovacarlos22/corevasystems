import en from "@/dictionaries/en";
import es from "@/dictionaries/es";

const dictionaries = {
  en,
  es,
};

export function getDictionary(lang) {
  return dictionaries[lang] || en;
}