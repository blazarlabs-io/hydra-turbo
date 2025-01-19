import {defineField, defineType} from 'sanity'
import {accountCard} from './accountCard'

export const manageAccount = defineType({
  name: 'manageAccount',
  title: 'Manage Account',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'string',
    }),
    defineField({
      name: 'changePassword',
      title: 'Change Password',
      type: 'object',
      fields: [...accountCard.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'deleteAccount',
      title: 'Delete Account',
      type: 'object',
      fields: [...accountCard.fields.map((f) => defineField(f))],
    }),
  ],
})
