// src/language.ts
export const languages = [
  
  { code: 'en', name: 'English (US)', nativeName: 'English (US)' },
  { code: 'en-gb', name: 'English (UK)', nativeName: 'English (UK)' }, 
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာစာ' },
  { code: 'km', name: 'Cambodian', nativeName: 'ភាសាខ្មែរ' },
  { code: 'lo', name: 'Laotian', nativeName: 'ພາສາລາວ' },
  { code: 'ms-bn', name: 'Brunei Malay', nativeName: 'Bahasa Melayu (Brunei)' },
  { code: 'zh-sg', name: 'Chinese (Singapore)', nativeName: '新加坡华语' },  
  { code: 'tet', name: 'Tetum', nativeName: 'Tetun' },
];

export type Language = typeof languages[0];
