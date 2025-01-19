import {defineField, defineType} from 'sanity'

export const systemVariables = defineType({
  name: 'systemVariables',
  title: 'System Variables',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'wineTypes',
      title: 'Wine Types',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of wine types.',
    }),
    defineField({
      name: 'rawMaterials',
      title: 'Raw Materials',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of raw materials.',
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of allergens.',
    }),
    defineField({
      name: 'sweetness',
      title: 'Sweetness',
      description: 'List of sweetness levels.',
      type: 'object',
      fields: [
        defineField({
          name: 'dessert',
          type: 'array',
          title: 'Dessert',
          of: [
            {
              type: 'string',
            },
          ],
        }),
        defineField({
          name: 'sparkling',
          type: 'array',
          title: 'Sparkling',
          of: [
            {
              type: 'string',
            },
          ],
        }),
        defineField({
          name: 'other',
          type: 'array',
          title: 'Other',
          of: [
            {
              type: 'string',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      description: 'List of pricing options.',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'plan',
          title: 'Plan',
          fields: [
            defineField({
              type: 'string',
              name: 'name',
              title: 'Name',
            }),
            defineField({
              type: 'number',
              name: 'price',
              title: 'Price',
            }),
            defineField({
              type: 'string',
              name: 'qrcodes',
              title: 'QR Codes',
            }),
            defineField({
              type: 'object',
              name: 'language',
              title: 'Language',
              fields: [
                defineField({
                  type: 'boolean',
                  name: 'available',
                  title: 'Available',
                }),
                defineField({
                  type: 'string',
                  name: 'description',
                  title: 'Description',
                }),
              ],
            }),
            defineField({
              type: 'object',
              name: 'editable',
              title: 'Editable',
              fields: [
                defineField({
                  type: 'boolean',
                  name: 'available',
                  title: 'Available',
                }),
                defineField({
                  type: 'string',
                  name: 'description',
                  title: 'Description',
                }),
              ],
            }),
            defineField({
              type: 'object',
              name: 'training',
              title: 'Training',
              fields: [
                defineField({
                  type: 'boolean',
                  name: 'available',
                  title: 'Available',
                }),
                defineField({
                  type: 'string',
                  name: 'description',
                  title: 'Description',
                }),
              ],
            }),
            defineField({
              type: 'object',
              name: 'tokenization',
              title: 'Tokenization',
              fields: [
                defineField({
                  type: 'boolean',
                  name: 'available',
                  title: 'Available',
                }),
                defineField({
                  type: 'string',
                  name: 'description',
                  title: 'Description',
                }),
              ],
            }),
            defineField({
              type: 'object',
              name: 'analytics',
              title: 'Analytics',
              fields: [
                defineField({
                  type: 'boolean',
                  name: 'available',
                  title: 'Available',
                }),
                defineField({
                  type: 'string',
                  name: 'description',
                  title: 'Description',
                }),
              ],
            }),
            defineField({
              type: 'object',
              name: 'earlyAccess',
              title: 'Early Access',
              fields: [
                defineField({
                  type: 'boolean',
                  name: 'available',
                  title: 'Available',
                }),
                defineField({
                  type: 'string',
                  name: 'description',
                  title: 'Description',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'volumes',
      title: 'Volumes',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of volumes.',
    }),
    defineField({
      name: 'countries',
      title: 'Contries',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'List of countries.',
    }),
  ],
})
