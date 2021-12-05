# js-password-checker
A few utilities to help check passwords in JavaScript

## Motivation

It's some files I use from project to project that I'd like to share with you, if you find it useful.
It's not a library because I don't think it's useful as a library : 
- you probably want to name things another way, or pimp it up otherwise
- I don't want you to learn one more API for nothing

## What's in there

Even if you have to copy/paste the whole file with 7 objects/functions inside, you'll use only

- `onVerify`: a function to verify the new password is correct. It has an object as argument, loke the following example

```js
onVerify({ 
  password: null,
  newPassword: 'MyIncr3d1lePass!',
  verifyPassword: 'MyIncr3d1lePass!',
  locale: 'fr', 
  checkExistingPassword: false
})
```
it will return `{ ok: bool, error: string, focus: string }`, focus being one of `password`, `newPassword` or `verifyPassword`

- `computeHints`: give the `newPassword` and the `locale` and it will return a map of `{ caption: string, disabled: bool }` that you could use for example in React Native like

```js
{computeHints(newPassword, 'fr').map(({ caption, disabled }) => (
  <Text key={caption} style={[styles.hint, disabled && styles.disabled]}>
    {caption}
  </Text>
))}
```

## Full Code

```js

export const onVerify = ({
  password,
  newPassword,
  verifyPassword,
  checkExistingPassword = false,
  codesToErrors = codesToErrorsI18n.en,
}) => {
  newPassword = newPassword.trim()
  verifyPassword = verifyPassword.trim()
  password = password?.trim()
  if (checkExistingPassword) {
    if (password === '') {
      return { ok: false, focus: 'password', error: codesToErrors.IS_EMPTY }
    }
  }
  if (checkErrorPassword(newPassword)) {
    return {
      ok: false,
      focus: 'newPassword',
      error: codesToErrors[checkErrorPassword(newPassword)],
    }
  }
  if (checkExistingPassword && password === newPassword) {
    return { ok: false, focus: 'newPassword', error: codesToErrors.NOT_SAME_AS_PREVIOUS_PASSWORD }
  }
  if (verifyPassword === '') {
    return { ok: false, focus: 'verifyPassword', error: codesToErrors.VERIFY_PASSWORD_EMPTY }
  }
  if (newPassword !== verifyPassword) {
    return { ok: false, focus: 'verifyPassword', error: codesToErrors.VERIFY_PASSWORD_DIFFERENT }
  }
  return { ok: true }
}

export const computeHints = (newPassword, codesToHints) =>
  Object.keys(codesToHints).map((check, index, array) => {
    let caption = codesToHints[check]
    // capitalize the first caption
    if (index === 0) caption = capitalize(caption)
    if (index !== array.length - 1) caption = `${caption}, `
    return { caption, disabled: !checks[check](newPassword) }
  })


const checks = {
  IS_EMPTY: (password) => password === '',
  IS_TOO_SHORT_OR_TOO_LONG: (password) => password.length < 8 || password.length > 32,
  NO_NUMBER: (password) => !/\d/.test(password),
  NO_LETTER: (password) => !/[a-zA-Z]/g.test(password),
  NO_UPPERCASE: (password) => !/[A-Z]/g.test(password),
  NO_LOWERCASE: (password) => !/[a-z]/g.test(password),
  NO_SPECIAL: (password) => !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
}

export const checkErrorPassword = (password) => {
  for (let check of Object.keys(checks)) {
    if (checks[check](password)) return check
  }
  return null
}

const codesToErrorsI18n = {
  de: {
    IS_EMPTY: 'Das Passwort darf nicht leer sein',
    IS_TOO_SHORT_OR_TOO_LONG: 'Das Passwort muss zwischen 6 und 32 Zeichen lang sein',
    NO_NUMBER: 'Das Passwort muss mindestens eine Zahl haben',
    NO_LETTER: 'Das Passwort muss mindestens einen Buchstaben enthalten',
    NO_UPPERCASE: 'Das Passwort muss mindestens einen Großbuchstaben enthalten',
    NO_LOWERCASE: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten',
    NO_SPECIAL: 'Das Passwort muss mindestens ein Sonderzeichen enthalten',
    VERIFY_PASSWORD_EMPTY: 'Bitte geben Sie das Passwort zur Bestätigung noch einmal ein',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'Das neue Passwort muss sich vom alten unterscheiden',
    VERIFY_PASSWORD_DIFFERENT: 'Passwörter müssen identisch sein',
  },
  en: {
    IS_EMPTY: 'The password cannot be empty',
    IS_TOO_SHORT_OR_TOO_LONG: 'The password must be between 6 and 32 characters long',
    NO_NUMBER: 'The password must have at least one number',
    NO_LETTER: 'The password must have at least one letter',
    NO_UPPERCASE: 'The password must have at least one uppercase letter',
    NO_LOWERCASE: 'The password must have at least one lowercase letter',
    NO_SPECIAL: 'The password must have at least one special character',
    VERIFY_PASSWORD_EMPTY: 'Please enter the password again for verification',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'The new password must be different from the old one',
    VERIFY_PASSWORD_DIFFERENT: 'The passwords must match',
  },
  es: {
    IS_EMPTY: 'La contraseña no puede estar vacía',
    IS_TOO_SHORT_OR_TOO_LONG: 'La contraseña debe tener entre 6 y 32 caracteres',
    NO_NUMBER: 'La contraseña debe tener al menos un número',
    NO_LETTER: 'La contraseña debe tener al menos una letra',
    NO_UPPERCASE: 'La contraseña debe tener al menos una letra mayúscula',
    NO_LOWERCASE: 'La contraseña debe tener al menos una letra minúscula',
    NO_SPECIAL: 'La contraseña debe tener al menos un carácter especial',
    VERIFY_PASSWORD_EMPTY: 'Ingrese la contraseña nuevamente para verificación',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'La nueva contraseña debe ser diferente a la anterior',
    VERIFY_PASSWORD_DIFFERENT: 'Las contraseñas deben ser idénticas',
  },
  fr: {
    IS_EMPTY: 'Le mot de passe ne peut pas être vide',
    IS_TOO_SHORT_OR_TOO_LONG: 'Le mot de passe doit avoir entre 6 et 32 caractères',
    NO_NUMBER: 'Le mot de passe doit avoir au moins un chiffre',
    NO_LETTER: 'Le mot de passe doit avoir au moins une lettre',
    NO_UPPERCASE: 'Le mot de passe doit avoir au moins une lettre majuscule',
    NO_LOWERCASE: 'Le mot de passe doit avoir au moins une lettre minuscule',
    NO_SPECIAL: 'Le mot de passe doit avoir au moins un caractère spécial',
    VERIFY_PASSWORD_EMPTY: 'Veuillez rentrer à nouveau le mot de passe pour vérification',
    NOT_SAME_AS_PREVIOUS_PASSWORD: "Le nouveau mot de passe doit être différent de l'ancien",
    VERIFY_PASSWORD_DIFFERENT: 'Les mots de passe doivent être identiques',
  },
  it: {
    IS_EMPTY: 'La password non può essere vuota',
    IS_TOO_SHORT_OR_TOO_LONG: 'La password deve essere lunga tra 6 e 32 caratteri',
    NO_NUMBER: 'La password deve avere almeno un numero',
    NO_LETTER: 'La password deve contenere almeno una lettera',
    NO_UPPERCASE: 'La password deve contenere almeno una lettera maiuscola',
    NO_LOWERCASE: 'La password deve contenere almeno una lettera minuscola',
    NO_SPECIAL: 'La password deve contenere almeno un carattere speciale',
    VERIFY_PASSWORD_EMPTY: 'Inserire nuovamente la password per la verifica',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'La nuova password deve essere diversa da quella vecchia',
    VERIFY_PASSWORD_DIFFERENT: 'Le password devono essere identiche',
  },
  nl: {
    IS_EMPTY: 'Het wachtwoord mag niet leeg zijn',
    IS_TOO_SHORT_OR_TOO_LONG: 'Het wachtwoord moet tussen de 6 en 32 tekens lang zijn',
    NO_NUMBER: 'Het wachtwoord moet minimaal één cijfer hebben',
    NO_LETTER: 'Het wachtwoord moet minimaal uit één letter bestaan',
    NO_UPPERCASE: 'Het wachtwoord moet minimaal één hoofdletter bevatten',
    NO_LOWERCASE: 'Het wachtwoord moet minimaal één kleine letter bevatten',
    NO_SPECIAL: 'Het wachtwoord moet minimaal één speciaal teken bevatten',
    VERIFY_PASSWORD_EMPTY: 'Voer het wachtwoord nogmaals in ter verificatie',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'Het nieuwe wachtwoord moet anders zijn dan het oude',
    VERIFY_PASSWORD_DIFFERENT: 'Wachtwoorden moeten identiek zijn',
  },
}

const codesToHintsI18n = {
  de: {
    IS_TOO_SHORT_OR_TOO_LONG: 'zwischen 6 und 32 Zeichen',
    NO_NUMBER: 'mindestens eine Ziffer',
    NO_LETTER: 'mindestens ein Buchstabe',
    NO_UPPERCASE: 'mindestens ein Großbuchstabe',
    NO_LOWERCASE: 'mindestens ein Kleinbuchstabe',
    NO_SPECIAL: 'mindestens ein Sonderzeichen',
  },
  en: {
    IS_TOO_SHORT_OR_TOO_LONG: 'between 6 and 32 characters',
    NO_NUMBER: 'at least one digit',
    NO_LETTER: 'at least one letter',
    NO_UPPERCASE: 'at least one uppercase',
    NO_LOWERCASE: 'at least one lowercase',
    NO_SPECIAL: 'at least one special character',
  },
  es: {
    IS_TOO_SHORT_OR_TOO_LONG: 'entre 6 y 32 caracteres',
    NO_NUMBER: 'al menos un dígito',
    NO_LETTER: 'al menos una letra',
    NO_UPPERCASE: 'al menos una mayúscula',
    NO_LOWERCASE: 'al menos una minúscula',
    NO_SPECIAL: 'al menos un carácter especial',
  },
  fr: {
    IS_TOO_SHORT_OR_TOO_LONG: 'entre 6 et 32 caractères',
    NO_NUMBER: 'au moins un chiffre',
    NO_LETTER: 'au moins une lettre',
    NO_UPPERCASE: 'au moins une majuscule',
    NO_LOWERCASE: 'au moins une minuscule',
    NO_SPECIAL: 'au moins un caractère spécial',
  },
  it: {
    IS_TOO_SHORT_OR_TOO_LONG: 'tra 6 e 32 caratteri',
    NO_NUMBER: 'almeno una cifra',
    NO_LETTER: 'almeno una lettera',
    NO_UPPERCASE: 'almeno una maiuscola',
    NO_LOWERCASE: 'almeno una minuscola',
    NO_SPECIAL: 'almeno un carattere speciale',
  },
  nl: {
    IS_TOO_SHORT_OR_TOO_LONG: 'tussen 6 en 32 tekens',
    NO_NUMBER: 'minstens één cijfer',
    NO_LETTER: 'minstens één letter',
    NO_UPPERCASE: 'minstens één hoofdletter',
    NO_LOWERCASE: 'minstens één kleine letter',
    NO_SPECIAL: 'ten minste één speciaal teken',
  },
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
```


