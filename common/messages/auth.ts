type LoginErrorsKeys = 'invalid-credential' | 'user-not-found' | 'wrong-password-or-email' | 'disabled-account';
export const loginErrors: Record<LoginErrorsKeys, LanguagesContentI> = {
	'disabled-account': {
		en: 'Your account is disabled',
		ar: 'حسابك معطل',
		fr: 'Votre compte est désactivé',
	},
	'invalid-credential': {
		en: 'Invalid credentials',
		ar: 'بيانات الدخول غير صحيحة',
		fr: 'Identifiants invalides',
	},
	'user-not-found': {
		en: 'User not found',
		ar: 'المستخدم غير موجود',
		fr: 'Utilisateur non trouvé',
	},
	'wrong-password-or-email': {
		en: 'Wrong password or email',
		ar: 'كلمة المرور أو البريد الإلكتروني خاطئ',
		fr: 'Mot de passe ou email incorrect',
	},
};
type RegisterErrorsKeys =
	| 'weak-password'
	| 'invalid-email'
	| 'operation-not-allowed'
	| 'email-already-in-use'
	| 'created-successfully';
export const registerErrors: Record<RegisterErrorsKeys, LanguagesContentI> = {
	'weak-password': {
		en: 'Weak password',
		ar: 'كلمة المرور ضعيفة',
		fr: 'Mot de passe faible',
	},
	'invalid-email': {
		en: 'Invalid email',
		ar: 'بريد إلكتروني غير صحيح',
		fr: 'Email invalide',
	},
	'operation-not-allowed': {
		en: 'Operation not allowed',
		ar: 'العملية غير مسموح بها',
		fr: 'Opération non autorisée',
	},
	'email-already-in-use': {
		en: 'Email already in use',
		ar: 'البريد الإلكتروني مستخدم بالفعل',
		fr: 'Email déjà utilisé',
	},
	'created-successfully': {
		en: 'Account created successfully',
		ar: 'تم إنشاء الحساب بنجاح',
		fr: 'Compte créé avec succès',
	},
};
type AuthErrorsKeys = LoginErrorsKeys | RegisterErrorsKeys;
export const authErrors: Record<AuthErrorsKeys, LanguagesContentI> = { ...loginErrors, ...registerErrors };
