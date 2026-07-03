import {PackageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Cake',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block'
        }
      ]
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Badge',
      type: 'string',
      description: 'Optional highlight badge, e.g. "Fan Favourite", "New", "Seasonal"',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'flavors',
      title: 'Flavours',
      description: 'Flavour options a customer can choose — price does not vary by flavour',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'hasCustomisation',
      title: 'Has Customisation',
      type: 'boolean',
      options: {
        layout: 'checkbox'
      }
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      description:
        'Priced size options. Each size is the variant referenced by order_item.sanity_variant_id (via its _key).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'size',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              description: 'e.g. "6-inch", "Serves 10-12"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'number',
              validation: (rule) => rule.required().positive(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'price'},
            prepare({title, subtitle}) {
              return {
                title,
                subtitle: subtitle !== undefined ? `$${subtitle}` : undefined,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'category.title', media: 'images.0'},
  },
})
