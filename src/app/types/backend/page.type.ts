import { OptionType } from './../../components/select/select.component';
export interface IPage {
  _id: string;
  page: string;
  type: 'content' | 'documents';
  createdAt: Date;

  // Kontentlar (faqat type == 'content' bo‘lsa)
  contents?: {
    [lang: string]: {
      _id: string;
      title: string;
      description: string;
      content: string;
    };
  };

  // Hujjat guruhlari (faqat type == 'documents' bo‘lsa)
  documents?: {
    title?: string;
    documentIds: {
      _id: string;
      title: string;
      type: 'pdf' | 'excel' | 'word';
      document: string;
    }[];
  }[];
}

export const options: OptionType[] = [
  {
    "value": "bosh-sahifa",
    "label": "Bosh sahifa"
  },
  {
    "value": "jamiyat",
    "label": "Jamiyat"
  },
  {
    "value": "jamiyat-haqida",
    "label": "Jamiyat haqida"
  },
  {
    "value": "ish-grafigi",
    "label": "Ish grafigi"
  },
  {
    "value": "guvohnoma-va-sertifikatlar",
    "label": "Guvohnoma va sertifikatlar"
  },
  {
    "value": "bank-rekvizitlari",
    "label": "Bank rekvizitlari"
  },
  {
    "value": "zarbdor-elevatori-aj-predmeti-va-maqsadi",
    "label": "ZARBDOR ELEVATORI\" AJ predmeti va maqsadi"
  },
  {
    "value": "tashkiliy-tuzilma",
    "label": "Tashkiliy tuzilma"
  },
  {
    "value": "kuzatuv-kengashi",
    "label": "Kuzatuv kengashi"
  },
  {
    "value": "boshqaruv",
    "label": "Boshqaruv"
  },
  {
    "value": "taftish-komissiyasi",
    "label": "Taftish komissiyasi"
  },
  {
    "value": "shoba-va-tobe-xojalik-jamiyatlari",
    "label": "Sho'ba va tobe xo'jalik jamiyatlari"
  },
  {
    "value": "aksiyador-va-investorlarga",
    "label": "Aksiyador va investorlarga"
  },
  {
    "value": "guvohnoma",
    "label": "Guvohnoma"
  },
  {
    "value": "korporativ-hujjatlar",
    "label": "Korporativ hujjatlar"
  },
  {
    "value": "kapital-tuzilmasi",
    "label": "Kapital tuzilmasi"
  },
  {
    "value": "affillangan-shaxslar",
    "label": "Affillangan shaxslar"
  },
  {
    "value": "aksiyadorlarning-umumiy-yigilish-natijalari",
    "label": "Aksiyadorlarning umumiy yig'ilish natijalari"
  },
  {
    "value": "rivojlanish-strategiyasi",
    "label": "Rivojlanish strategiyasi"
  },
  {
    "value": "biznes-rejalar",
    "label": "Biznes rejalar"
  },
  {
    "value": "muhim-faktlar",
    "label": "Muhim faktlar"
  },
  {
    "value": "hisobotlar",
    "label": "Hisobotlar"
  },
  {
    "value": "asosiy-korsatkichlar",
    "label": "Asosiy ko'rsatkichlar"
  },
  {
    "value": "auditorlik-xulosalari",
    "label": "Auditorlik xulosalari"
  },
  {
    "value": "divedentlar",
    "label": "Divedentlar"
  },
  {
    "value": "matbuot-markazi",
    "label": "Matbuot markazi"
  },
  {
    "value": "yangiliklar",
    "label": "Yangiliklar"
  },
  {
    "value": "sayt-xaritasi",
    "label": "Sayt xaritasi"
  },
  {
    "value": "pochta",
    "label": "Pochta"
  },
  {
    "value": "bosh-ish-orinlari",
    "label": "Bo'sh ish o'rinlari"
  }
]

export const optionsObject: Record<string, string> = options.reduce<Record<string, string>>((data, item) => {
  data[item.value] = item.label;
  return data;
}, {});


