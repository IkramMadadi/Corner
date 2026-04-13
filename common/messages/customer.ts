type CustomerMessagesKeys =
	| 'customer-not-found'
	| 'wishlist-empty'
	| 'product-already-in-wishlist'
	| 'product-added-to-wishlist'
	| 'product-not-in-wishlist'
	| 'product-removed-from-wishlist'
	| 'customer-info-loaded'
	| 'customer-info-updated'
	| 'password-updated'
	| 'orders-loaded'
	| 'failed-to-load-orders'
	| 'points-loaded'
	| 'failed-to-load-points'
	| 'wishlist-loaded'
	| 'addresses-loaded'
	| 'address-added'
	| 'address-removed'
	| 'recovery-session-not-found'
	| 'recovery-session-loaded'
	| 'recovery-session-created'
	| 'recovery-session-verified'
	| 'recovery-session-expired'
	| 'failed-to-send-recovery-email'
	| 'invalid-otp'
	| 'failed-to-add-address'
	| 'no-addresses'
	| 'failed-to-remove-address'
	| 'failed-to-load-recovery-session'
	| 'failed-to-create-recovery-session'
	| 'need-to-be-logged-in'
	| 'failed-to-verify-recovery-session'
	| 'failed-to-reset-password'
	| 'password-reset';

export const customerMessages: Record<CustomerMessagesKeys, LanguagesContentI> = {
	'customer-not-found': {
		en: 'Customer not found.',
		ar: 'العميل غير موجود.',
		fr: 'Client non trouvé.',
	},
	'wishlist-empty': {
		en: 'Customer wishlist is empty.',
		ar: 'قائمة رغبات العميل فارغة.',
		fr: 'La liste de souhaits du client est vide.',
	},
	'product-already-in-wishlist': {
		en: 'Product already in wishlist.',
		ar: 'المنتج موجود بالفعل في قائمة الرغبات.',
		fr: 'Produit déjà dans la liste de souhaits.',
	},
	'product-added-to-wishlist': {
		en: 'Product added to wishlist successfully.',
		ar: 'تمت إضافة المنتج إلى قائمة الرغبات بنجاح.',
		fr: 'Produit ajouté à la liste de souhaits avec succès.',
	},
	'product-not-in-wishlist': {
		en: 'Product not in wishlist.',
		ar: 'المنتج غير موجود في قائمة الرغبات.',
		fr: 'Produit non présent dans la liste de souhaits.',
	},
	'product-removed-from-wishlist': {
		en: 'Product removed from wishlist successfully.',
		ar: 'تمت إزالة المنتج من قائمة الرغبات بنجاح.',
		fr: 'Produit retiré de la liste de souhaits avec succès.',
	},
	'customer-info-loaded': {
		en: 'Customer information loaded successfully.',
		ar: 'تم تحميل معلومات العميل بنجاح.',
		fr: 'Informations client chargées avec succès.',
	},
	'customer-info-updated': {
		en: 'Personal information updated successfully.',
		ar: 'تم تحديث المعلومات الشخصية بنجاح.',
		fr: 'Informations personnelles mises à jour avec succès.',
	},
	'password-updated': {
		en: 'Password updated successfully.',
		ar: 'تم تحديث كلمة المرور بنجاح.',
		fr: 'Mot de passe mis à jour avec succès.',
	},
	'orders-loaded': {
		en: 'Orders loaded successfully.',
		ar: 'تم تحميل الطلبات بنجاح.',
		fr: 'Commandes chargées avec succès.',
	},
	'failed-to-load-orders': {
		en: 'Failed to load orders.',
		ar: 'فشل في تحميل الطلبات.',
		fr: 'Échec du chargement des commandes.',
	},
	'points-loaded': {
		en: 'Customer earned points loaded successfully.',
		ar: 'تم تحميل نقاط العميل المكتسبة بنجاح.',
		fr: 'Points gagnés par le client chargés avec succès.',
	},
	'failed-to-load-points': {
		en: 'Failed to load earned points.',
		ar: 'فشل في تحميل النقاط المكتسبة.',
		fr: 'Échec du chargement des points gagnés.',
	},
	'wishlist-loaded': {
		en: 'Wishlist loaded successfully.',
		ar: 'تم تحميل قائمة الرغبات بنجاح.',
		fr: 'Liste de souhaits chargée avec succès.',
	},
	'addresses-loaded': {
		en: 'Addresses loaded successfully.',
		ar: 'تم تحميل العناوين بنجاح.',
		fr: 'Adresses chargées avec succès.',
	},
	'address-added': {
		en: 'Address added successfully.',
		ar: 'تمت إضافة العنوان بنجاح.',
		fr: 'Adresse ajoutée avec succès.',
	},
	'address-removed': {
		en: 'Address removed successfully.',
		ar: 'تمت إزالة العنوان بنجاح.',
		fr: 'Adresse supprimée avec succès.',
	},
	'recovery-session-not-found': {
		en: 'Recovery session not found.',
		ar: 'جلسة الاسترداد غير موجودة.',
		fr: 'Session de récupération non trouvée.',
	},
	'recovery-session-loaded': {
		en: 'Recovery session loaded successfully.',
		ar: 'تم تحميل جلسة الاسترداد بنجاح.',
		fr: 'Session de récupération chargée avec succès.',
	},
	'recovery-session-created': {
		en: 'Recovery session created successfully.',
		ar: 'تم إنشاء جلسة الاسترداد بنجاح.',
		fr: 'Session de récupération créée avec succès.',
	},
	'recovery-session-verified': {
		en: 'Recovery session verified successfully.',
		ar: 'تم التحقق من جلسة الاسترداد بنجاح.',
		fr: 'Session de récupération vérifiée avec succès.',
	},
	'recovery-session-expired': {
		en: 'Recovery session expired.',
		ar: 'انتهت صلاحية جلسة الاسترداد.',
		fr: 'Session de récupération expirée.',
	},
	'invalid-otp': {
		en: 'Invalid OTP.',
		ar: 'OTP غير صالح.',
		fr: 'OTP invalide.',
	},
	'password-reset': {
		en: 'Password reset successfully.',
		ar: 'تم إعادة تعيين كلمة المرور بنجاح.',
		fr: 'Mot de passe réinitialisé avec succès.',
	},
	'failed-to-add-address': {
		en: 'Failed to add address.',
		ar: 'فشل في إضافة العنوان.',
		fr: "Échec de l'ajout de l'adresse.",
	},
	'no-addresses': {
		en: 'No addresses found.',
		ar: 'لم يتم العثور على عناوين.',
		fr: 'Aucune adresse trouvée.',
	},
	'failed-to-create-recovery-session': {
		en: 'Failed to create recovery session.',
		ar: 'فشل في إنشاء جلسة الاسترداد.',
		fr: 'Échec de la création de la session de récupération.',
	},
	'failed-to-load-recovery-session': {
		en: 'Failed to load recovery session.',
		ar: 'فشل في تحميل جلسة الاسترداد.',
		fr: 'Échec du chargement de la session de récupération.',
	},
	'failed-to-verify-recovery-session': {
		en: 'Failed to verify recovery session.',
		ar: 'فشل التحقق من جلسة الاسترداد.',
		fr: 'Échec de la vérification de la session de récupération.',
	},
	'failed-to-remove-address': {
		en: 'Failed to remove address.',
		ar: 'فشل في إزالة العنوان.',
		fr: "Échec de la suppression de l'adresse.",
	},
	'failed-to-reset-password': {
		en: 'Failed to reset password.',
		ar: 'فشل إعادة تعيين كلمة المرور.',
		fr: 'Échec de la réinitialisation du mot de passe.',
	},
	'need-to-be-logged-in': {
		en: 'You need to be logged in.',
		ar: 'يجب عليك تسجيل الدخول.',
		fr: 'Vous devez être connecté.',
	},
	'failed-to-send-recovery-email': {
		en: 'Failed to send recovery email.',
		ar: 'فشل في إرسال بريد الاسترداد.',
		fr: "Échec de l'envoi de l'email de récupération.",
	},
};
