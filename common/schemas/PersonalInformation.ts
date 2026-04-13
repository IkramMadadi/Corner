import { Schema } from 'mongoose';

import type {
	PersonalInformationInstanceMethods,
	PersonalInformationModel,
	PersonalInformationQueryHelpers,
	PersonalInformationSchemaOptions,
	PersonalInformationStaticMethods,
	PersonalInformationVirtual,
} from '!common/generated/schemas/PersonalInformation';

import { genderEnums } from '@common/data/enums/generalEnums';

const required = true;
/* --------------------- Schema --------------------- */
const personalInformationSchema = new Schema<
	PersonalInformationI,
	PersonalInformationModel,
	PersonalInformationInstanceMethods,
	PersonalInformationQueryHelpers,
	PersonalInformationVirtual,
	PersonalInformationStaticMethods,
	PersonalInformationSchemaOptions
>(
	{
		firstName: { type: String, required },
		lastName: { type: String, required },
		gender: { type: String, enum: genderEnums },
		birthday: { type: Date },
		note: { type: String },
		//honorific: { type: String },
	},
	{ timestamps: false, _id: false }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */

/* --------------------- Methods ---------------------  */
personalInformationSchema.methods.toOptimizedObject = function () {
	return this.toObject();
};

export { personalInformationSchema };
