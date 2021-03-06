
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
    NO_UPPERCASE: 'Das Passwort muss mindestens einen Gro??buchstaben enthalten',
    NO_LOWERCASE: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten',
    NO_SPECIAL: 'Das Passwort muss mindestens ein Sonderzeichen enthalten',
    VERIFY_PASSWORD_EMPTY: 'Bitte geben Sie das Passwort zur Best??tigung noch einmal ein',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'Das neue Passwort muss sich vom alten unterscheiden',
    VERIFY_PASSWORD_DIFFERENT: 'Passw??rter m??ssen identisch sein',
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
    IS_EMPTY: 'La contrase??a no puede estar vac??a',
    IS_TOO_SHORT_OR_TOO_LONG: 'La contrase??a debe tener entre 6 y 32 caracteres',
    NO_NUMBER: 'La contrase??a debe tener al menos un n??mero',
    NO_LETTER: 'La contrase??a debe tener al menos una letra',
    NO_UPPERCASE: 'La contrase??a debe tener al menos una letra may??scula',
    NO_LOWERCASE: 'La contrase??a debe tener al menos una letra min??scula',
    NO_SPECIAL: 'La contrase??a debe tener al menos un car??cter especial',
    VERIFY_PASSWORD_EMPTY: 'Ingrese la contrase??a nuevamente para verificaci??n',
    NOT_SAME_AS_PREVIOUS_PASSWORD: 'La nueva contrase??a debe ser diferente a la anterior',
    VERIFY_PASSWORD_DIFFERENT: 'Las contrase??as deben ser id??nticas',
  },
  fr: {
    IS_EMPTY: 'Le mot de passe ne peut pas ??tre vide',
    IS_TOO_SHORT_OR_TOO_LONG: 'Le mot de passe doit avoir entre 6 et 32 caract??res',
    NO_NUMBER: 'Le mot de passe doit avoir au moins un chiffre',
    NO_LETTER: 'Le mot de passe doit avoir au moins une lettre',
    NO_UPPERCASE: 'Le mot de passe doit avoir au moins une lettre majuscule',
    NO_LOWERCASE: 'Le mot de passe doit avoir au moins une lettre minuscule',
    NO_SPECIAL: 'Le mot de passe doit avoir au moins un caract??re sp??cial',
    VERIFY_PASSWORD_EMPTY: 'Veuillez rentrer ?? nouveau le mot de passe pour v??rification',
    NOT_SAME_AS_PREVIOUS_PASSWORD: "Le nouveau mot de passe doit ??tre diff??rent de l'ancien",
    VERIFY_PASSWORD_DIFFERENT: 'Les mots de passe doivent ??tre identiques',
  },
  it: {
    IS_EMPTY: 'La password non pu?? essere vuota',
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
    NO_NUMBER: 'Het wachtwoord moet minimaal ????n cijfer hebben',
    NO_LETTER: 'Het wachtwoord moet minimaal uit ????n letter bestaan',
    NO_UPPERCASE: 'Het wachtwoord moet minimaal ????n hoofdletter bevatten',
    NO_LOWERCASE: 'Het wachtwoord moet minimaal ????n kleine letter bevatten',
    NO_SPECIAL: 'Het wachtwoord moet minimaal ????n speciaal teken bevatten',
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
    NO_UPPERCASE: 'mindestens ein Gro??buchstabe',
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
    NO_NUMBER: 'al menos un d??gito',
    NO_LETTER: 'al menos una letra',
    NO_UPPERCASE: 'al menos una may??scula',
    NO_LOWERCASE: 'al menos una min??scula',
    NO_SPECIAL: 'al menos un car??cter especial',
  },
  fr: {
    IS_TOO_SHORT_OR_TOO_LONG: 'entre 6 et 32 caract??res',
    NO_NUMBER: 'au moins un chiffre',
    NO_LETTER: 'au moins une lettre',
    NO_UPPERCASE: 'au moins une majuscule',
    NO_LOWERCASE: 'au moins une minuscule',
    NO_SPECIAL: 'au moins un caract??re sp??cial',
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
    NO_NUMBER: 'minstens ????n cijfer',
    NO_LETTER: 'minstens ????n letter',
    NO_UPPERCASE: 'minstens ????n hoofdletter',
    NO_LOWERCASE: 'minstens ????n kleine letter',
    NO_SPECIAL: 'ten minste ????n speciaal teken',
  },
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
